import { PluginOption } from 'vite'

// keep up to date from ./src/util/Utils.ts
function sanitizeName(name: string) {
    name = name.toLowerCase();
    name = name.replace(/ä/g, 'ae');
    name = name.replace(/ö/g, 'oe');
    name = name.replace(/ü/g, 'ue');
    name = name.replace(/[^a-z0-9.*]+/g, '-');
    if (name.slice(-1) === '-') {
        name = name.substring(0, name.length - 1);
    }
    return name;
}

function compare(a, b) {
    let a2 = Number.parseFloat(a.nr);
    let b2 = Number.parseFloat(b.nr);
    if (!Number.isNaN(a2) && !Number.isNaN(b2)) {
        return a2 - b2;
    }
    return a.nr.localeCompare(b.nr);
}

export default function sitemapPlugin(): PluginOption {

    const builder = new SitemapBuilder();
    const URL = "https://dlrg-abzeichen.de";

    const today = new Date().toISOString().substring(0, 10);
    builder.add({ loc: URL, lastmod: today });

    // add special urls
    builder.add({ loc: URL + "/seepferdchen", lastmod: today });
    builder.add({ loc: URL + "/dsa-bronze", lastmod: today });
    builder.add({ loc: URL + "/dsa-silber", lastmod: today });
    builder.add({ loc: URL + "/dsa-gold", lastmod: today });
    builder.add({ loc: URL + "/juniorretter", lastmod: today });
    builder.add({ loc: URL + "/drsa-bronze", lastmod: today });
    builder.add({ loc: URL + "/drsa-silber", lastmod: today });
    builder.add({ loc: URL + "/drsa-gold", lastmod: today });
    builder.add({ loc: URL + "/schnorcheltauchabzeichen", lastmod: today });

    return {
        name: "rollup-plugin-add-sitemap",
        async generateBundle() {

            // download all qualifications
            let url = "https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=true"
            const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
            const json = await response.json();
            this.info(`Loaded ${json.length} qualifications`)

            // add qualifications to sitemap
            json.sort(compare);
            json.forEach((q) => {
                let number = q.nr == "Ohne" ? '' : `${q.nr}-`;
                builder.add({ loc: `${URL}/${number}${sanitizeName(q.name)}`, lastmod: today });
            });

            // add sitemap to bundle
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: builder.build() });
            this.info(`Created sitemap.xml with ${builder.size()} entries`)
        },
    }
}

class SitemapBuilder {

    private start = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    private end = `\n</urlset>`;
    private entries: SitemapEntry[] = [];

    public add(entry: SitemapEntry) {
        this.entries.push(entry);
    }

    public size(): number {
        return this.entries.length;
    }

    public build() {
        let result = this.start;
        for (let entry of this.entries) {
            result += `\n<url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><changefreq>weekly</changefreq></url>`
        }
        result += this.end;
        return result;
    }

}

interface SitemapEntry {
    loc: string,
    lastmod: string
}
