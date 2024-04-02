import replace, { RollupReplaceOptions } from '@rollup/plugin-replace'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pwaOptions from './vite-pwa.config.js';

const VERSION = require('./package.json').version;
const MAIN_URL = require('./package.json').homepage;
const HASH = (process.env.HASH ?? "").substring(0, 8);
const REPO = process.env.REPO ?? "";

var replaceOptions: RollupReplaceOptions = {
    values: {
        __DATE__: new Date().toISOString(),
        __VERSION__: VERSION,
        __HASH__: HASH,
        __BUILD__: `${VERSION}+${HASH}`,
        __REPO_URL__: `https://github.com/${REPO}`,
        __COMMIT_URL__: `https://github.com/${REPO}/commit/${HASH}`,
        __MAIN_URL__: MAIN_URL,
    },
    preventAssignment: true
};

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
        sourcemap: false,
        target: 'ES2022',
    },
    plugins: [
        react(),
        VitePWA(pwaOptions),
        replace(replaceOptions)
    ],
})
