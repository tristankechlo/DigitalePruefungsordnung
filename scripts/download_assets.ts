import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const FETCH_TIMEOUT_MS = 30_000;
const API_BASE_URL = "https://api.dlrg.net/ausbildung/v1";
const PROJECT_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TARGET_DIR = path.join(PROJECT_ROOT, "public", "dlrg-assets");

interface Asset {
    url: string;
    fileName: string;
    dirName: string;
}

interface QualificationDocument {
    typ?: string;
    titel?: string;
    link?: string;
}

interface Qualification {
    dokumente?: QualificationDocument[];
}

const defaultAssets: Asset[] = [
    { url: "https://dlrg.de/global/layout/2019/font/dlrg_regular.woff2", fileName: "dlrg_regular.woff2", dirName: "fonts" },
    { url: "https://dlrg.de/global/layout/2019/font/dlrg_regular.woff", fileName: "dlrg_regular.woff", dirName: "fonts" },
    { url: "https://dlrg.de/global/layout/2019/font/dlrg_bold.woff2", fileName: "dlrg_bold.woff2", dirName: "fonts" },
    { url: "https://dlrg.de/global/layout/2019/font/dlrg_bold.woff", fileName: "dlrg_bold.woff", dirName: "fonts" },
];

(async () => {
    try {
        // Collect the complete set of assets first, then replace the output directory.
        const assets = await fetchAssets();
        await resetAssetDirectory(TARGET_DIR);

        // Download every asset into the public folder structure used by the app.
        for (const asset of assets.values()) {
            const target = path.join(TARGET_DIR, asset.dirName, asset.fileName);
            await downloadAsset(asset.url, target);
        }

        // The API response files are also stored locally and formatted for a cleaner diff.
        const poFile = path.join(TARGET_DIR, "po.json");
        await downloadAsset(`${API_BASE_URL}/po`, poFile);
        await formatJson(poFile);

        const qualificationsFile = path.join(TARGET_DIR, "qualifications.json");
        await downloadAsset(`${API_BASE_URL}/qualifikationen?activeOnly=true`, qualificationsFile);
        await formatJson(qualificationsFile, true);
    } catch (error) {
        console.error("Failed to update DLRG assets.", error);
        process.exitCode = 1;
    }
})();

async function fetchAssets(): Promise<Map<string, Asset>> {
    // Use the asset URL as the unique key, so identical downloads are collapsed naturally.
    const assets = new Map<string, Asset>();

    for (const asset of defaultAssets) {
        assets.set(asset.url, asset);
    }

    try {
        console.log("Fetching qualification metadata...");
        const response = await fetchJson<Qualification[]>(`${API_BASE_URL}/qualifikationen?activeOnly=true`);

        for (const qualification of response) {
            for (const document of qualification.dokumente ?? []) {
                if (document.typ !== "abzeichen" || !document.titel || !document.link) {
                    continue;
                }

                const url = normalizeAssetUrl(document.link);
                if (!url) {
                    continue;
                }

                assets.set(url, {
                    url,
                    fileName: document.titel,
                    dirName: "icons",
                });
            }
        }
    } catch (error) {
        console.warn("Unable to load the qualifications list. Falling back to the default assets.", error);
    }

    // Sort by URL so downloads are deterministic and easier to review in logs or diffs.
    return new Map([...assets.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function normalizeAssetUrl(link: string): string | null {
    try {
        return new URL(link.replace("www.dlrg.net", "dlrg.net")).toString();
    } catch {
        return null;
    }
}

async function resetAssetDirectory(rootPath: string): Promise<void> {
    if (fs.existsSync(rootPath)) {
        fs.rmSync(rootPath, { recursive: true, force: true });
    }

    fs.mkdirSync(rootPath, { recursive: true });
}

async function downloadAsset(url: string, filePath: string): Promise<void> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        console.log(`Starting download: '${url}'`);
        console.log(`Saving to: '${filePath}'`);

        const response = await fetch(url, {
            signal: controller.signal,
        });

        if (!response.ok || !response.body) {
            throw new Error(`Request failed with status ${response.status}: ${url}`);
        }

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await pipeline(Readable.fromWeb(response.body as any), fs.createWriteStream(filePath));

        console.log("Download completed");
    } catch (error) {
        console.error(`Download failed for '${url}'`, error);
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

async function fetchJson<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${url}`);
        }

        return (await response.json()) as T;
    } finally {
        clearTimeout(timeout);
    }
}

async function formatJson(filePath: string, deduplicate = false): Promise<void> {
    const content = fs.readFileSync(filePath, { encoding: "utf8" });
    const json = JSON.parse(content);

    if (deduplicate) {
        removeDuplicatePrueferberechtigungen(json);
    }

    fs.writeFileSync(filePath, JSON.stringify(json, null, "    "), { encoding: "utf8" });
}

function removeDuplicatePrueferberechtigungen(value: unknown): void {
    if (Array.isArray(value)) {
        value.forEach(removeDuplicatePrueferberechtigungen);
        return;
    }

    if (value === null || typeof value !== "object") {
        return;
    }

    const record = value as Record<string, unknown>;
    const authorisations = record.prueferberechtigungen;
    if (Array.isArray(authorisations)) {
        // Keep only the first examiner authorization per qualification ID.
        const uniqueAuthorisations = new Map<string, unknown>();

        for (const authorisation of authorisations) {
            if (authorisation !== null && typeof authorisation === "object") {
                const nr = (authorisation as Record<string, unknown>).nr;
                if (typeof nr === "string" && !uniqueAuthorisations.has(nr)) {
                    uniqueAuthorisations.set(nr, authorisation);
                }
            }
        }

        record.prueferberechtigungen = Array.from(uniqueAuthorisations.values());
    }

    Object.values(record).forEach(removeDuplicatePrueferberechtigungen);
}
