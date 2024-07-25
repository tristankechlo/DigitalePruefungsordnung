import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare const self: ServiceWorkerGlobalScope;
self.__WB_DISABLE_DEV_LOGS = true;

let DLRG_ASSETS: Set<string>;
const FETCH_OPTIONS = { mode: 'cors', credentials: 'omit' } as RequestInit;

clientsClaim();
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', async function (event) {
    const caching = async () => {
        DLRG_ASSETS = await fetchAssets();
        console.log(`Caching ${DLRG_ASSETS.size} DLRG_ASSETS`, DLRG_ASSETS);
        return caches.open('dlrg').then((cache) => cache.addAll(DLRG_ASSETS));
    };
    event.waitUntil(caching());
});
registerRoute(
    ({ url }) => DLRG_ASSETS.has(url.href),
    new CacheFirst({
        cacheName: 'dlrg',
        fetchOptions: FETCH_OPTIONS, // prevents adding of additional buffer to the cached response (for opaque responses) => smaller cache size
        plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 28 * 24 * 60 * 60 })] // cache for 4 weeks
    })
);

registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// CUSTOM CODE
const defaultAssets = [
    'https://api.dlrg.net/ausbildung/v1/po', // api call to get all po's
    'https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=true', // api call to get all qualifications
    'https://dlrg.de/global/layout/2019/font/dlrg_regular.woff2',
    'https://dlrg.de/global/layout/2019/font/dlrg_regular.woff',
    'https://dlrg.de/global/layout/2019/font/dlrg_bold.woff2',
    'https://dlrg.de/global/layout/2019/font/dlrg_bold.woff',
    // 'https://api.dlrg.net/logo/v1/stammverband/svg?size=144&line1=Digitale&line2=Pr%C3%BCfungsordnung&farbe=vollfarbe&stacked=false', // logo
];

async function fetchAssets() {
    try {
        const reponse = await fetch('https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=false', FETCH_OPTIONS);
        if (!reponse.ok) {
            throw reponse;
        }
        const assets = new Set<string>(defaultAssets);
        const json = await reponse.json();
        for (let i = 0; i < json.length; i++) {
            const qualification = json[i];
            if (qualification.dokumente) {
                for (let j = 0; j < qualification.dokumente.length; j++) {
                    const document = qualification.dokumente[j];
                    if (document.typ === "abzeichen") {
                        assets.add(document.link.replace("www.dlrg.net", "dlrg.net"));
                    }
                }
            }
        }
        return assets;
    } catch (e) {
        console.error("Error loading assets: ", e);
        console.log("Using default assets");
        return new Set<string>(defaultAssets);
    }
}
