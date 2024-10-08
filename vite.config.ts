import replace, { RollupReplaceOptions } from '@rollup/plugin-replace'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pwaOptions from './vite-pwa.config.js';
import sitemapPlugin from './vite-plugins/sitemap.js';
import minifyJson from './vite-plugins/minify-json.js';
import path from 'path';

import packageJson from './package.json';
const VERSION = packageJson.version;
const MAIN_URL = packageJson.homepage;
const HASH = (process.env.HASH ?? "").substring(0, 8);

var replaceOptions: RollupReplaceOptions = {
    values: {
        __DATE__: new Date().toISOString(),
        __VERSION__: VERSION,
        __HASH__: HASH,
        __BUILD__: HASH === "" ? `${VERSION}` : `${VERSION}+${HASH}`,
        __REPO_URL__: `https://github.com/tristankechlo/DigitalePruefungsordnung/`,
        __COMMIT_URL__: `https://github.com/tristankechlo/DigitalePruefungsordnung/commit/${HASH}`,
        __MAIN_URL__: MAIN_URL,
        __TITLE__: "Digitale Prüfungsordnung",
    },
    preventAssignment: true
};

const publicDir = path.join(path.dirname(import.meta.filename), "public");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: false,
        target: 'ES2022',
    },
    plugins: [
        react(),
        sitemapPlugin(),
        VitePWA(pwaOptions),
        replace(replaceOptions),
        minifyJson(publicDir)
    ],
})
