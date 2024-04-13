import { PluginOption } from 'vite'

export default function sitemapPlugin(): PluginOption {

    const builder = new SitemapBuilder();

    const today = new Date().toISOString().substring(0, 10);
    builder.add({ loc: 'https://dlrg-abzeichen.de', lastmod: today });

    return {
        name: "rollup-plugin-add-sitemap",
        generateBundle() {
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: builder.build() });
        },
    }
}

class SitemapBuilder {

    private start = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    private end = `</urlset>`;
    private entries: SitemapEntry[] = [];

    public add(entry: SitemapEntry) {
        this.entries.push(entry);
    }

    public build() {
        let result = this.start;
        for (let entry of this.entries) {
            result += `<url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>monthly</changefreq></url>`
        }
        result += this.end;
        return result;
    }

}

interface SitemapEntry {
    loc: string,
    lastmod: string
}
