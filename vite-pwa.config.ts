import type { VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
    mode: 'development',
    base: '/',
    injectRegister: 'inline',
    strategies: 'injectManifest',
    filename: 'sw.ts',
    srcDir: 'src',
    registerType: 'autoUpdate',
    includeAssets: [ // include static assets for caching
        'image-not-found.svg',
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
    ],
    manifest: {
        name: "Digitale Prüfungsordnung",
        short_name: "Prüfungsordnung",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            }
        ],
        theme_color: "#e30613",
        background_color: "#e30613",
        start_url: "/",
        id: "/",
        display: "standalone"
    },
    devOptions: {
        enabled: false,
        type: 'module',
        navigateFallback: 'index.html',
    },
}

export default pwaOptions;
