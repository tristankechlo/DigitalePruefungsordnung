import https from 'https';
import path from 'path';
import fs from "fs";

const FETCH_OPTIONS = { mode: 'cors', credentials: 'omit' } as RequestInit;

interface Asset {
    url: string;
    fileName: string;
    dirName: string;
}

const defaultAssets: Asset[] = [
    { url: 'https://dlrg.de/global/layout/2019/font/dlrg_regular.woff2', fileName: "dlrg_regular.woff2", dirName: "fonts" },
    { url: 'https://dlrg.de/global/layout/2019/font/dlrg_regular.woff', fileName: "dlrg_regular.woff", dirName: "fonts" },
    { url: 'https://dlrg.de/global/layout/2019/font/dlrg_bold.woff2', fileName: "dlrg_bold.woff2", dirName: "fonts" },
    { url: 'https://dlrg.de/global/layout/2019/font/dlrg_bold.woff', fileName: "dlrg_bold.woff", dirName: "fonts" },
];

(async () => {
    let assets = Array.from(await fetchAssets());

    // make sure directory exists
    let p = path.dirname(path.dirname(import.meta.filename));
    p = path.join(p, "public", "dlrg-assets");
    if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true });
    }
    fs.mkdirSync(p);

    for (let index = 0; index < assets.length; index++) {
        const e = assets[index];
        let location = path.join(p, e.dirName, e.fileName);
        fs.mkdirSync(path.dirname(location), { recursive: true });
        await downloadAsset(e.url, location);
    }

    let pos = "https://api.dlrg.net/ausbildung/v1/po";
    let fileName = path.join(p, "po.json");
    await downloadAsset(pos, fileName);

    let qualifications = "https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=true";
    fileName = path.join(p, "qualifications.json");
    await downloadAsset(qualifications, fileName);

    process.exit(0);
})();


async function fetchAssets(): Promise<Set<Asset>> {
    try {
        const response = await fetch('https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=false', FETCH_OPTIONS);
        if (!response.ok) {
            throw response;
        }
        const assets = new Set<Asset>(defaultAssets);
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            const qualification = json[i];
            if (qualification.dokumente) {
                for (let j = 0; j < qualification.dokumente.length; j++) {
                    const document = qualification.dokumente[j];
                    if (document.typ === "abzeichen" && document.titel != "") {
                        let asset: Asset = {
                            url: document.link.replace("www.dlrg.net", "dlrg.net"),
                            fileName: document.titel,
                            dirName: "icons"
                        };
                        assets.add(asset);
                    }
                }
            }
        }
        return assets;
    } catch (e) {
        console.error("Error loading assets: ", e);
        console.log("Using default assets");
        return new Set<Asset>(defaultAssets);
    }
}

async function downloadAsset(url: string, filePath: string) {
    const res = await fetch(url);
    if (!res.ok || res.body == null) {
        throw res;
    }
    const file = fs.createWriteStream(filePath);
    console.log("Starting Download: '" + url + "'");
    console.log("Saving to: '" + filePath + "'");
    return new Promise<void>((resolve) => {
        https.get(url, (response) => {
            response.pipe(file);

            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
                resolve();
            });
        });
    });
}
