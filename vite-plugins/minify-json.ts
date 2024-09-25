import { PluginOption } from 'vite'
import path from 'path';
import fs from "fs";

const dlrg = "dlrg-assets"

// all json dlrg-assets are stored in the source code with proper formatting for better version control
// during build those files should be minified again, to decrease the filesize
export default function minifyJson(publicDir: string): PluginOption {
    const dlrgAssetDir = path.join(publicDir, dlrg);

    return {
        name: 'vite-plugin-minify-json',

        async generateBundle(options) {
            const outDir = path.join(options.dir, dlrg);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir);
            }

            const po = loadJsonMinified(path.join(dlrgAssetDir, "po.json"));
            this.emitFile({ type: "asset", fileName: `${dlrg}/po.json`, source: po });
            this.info("minified 'po.json'");

            const qualifications = loadJsonMinified(path.join(dlrgAssetDir, "qualifications.json"));
            this.emitFile({ type: "asset", fileName: `${dlrg}/qualifications.json`, source: qualifications });
            this.info("minified 'qualifications.json'")
        },
    }
}

function loadJsonMinified(fileName: string) {
    const json = JSON.parse(fs.readFileSync(fileName, { encoding: "utf8" }));
    return JSON.stringify(json);
}