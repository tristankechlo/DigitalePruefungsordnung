import type { IAppState } from "../App";
import type { IQualifikation, IQualifikationInfo } from "../types/DLRGTypes";

// changes also needed in vite-plugin.ts
export function sanitizeName(name: string) {
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

export function qualificationToUrl(q: IQualifikation | IQualifikationInfo) {
    const number = q.nr == "Ohne" ? '' : `${q.nr}-`;
    return number + sanitizeName(q.name);
}

export function getActivePO(search: string, appState: IAppState): number {
    search = search.replace(/\//g, ''); // remove slashes
    const po = appState.pos?.find((po) => search === sanitizeName(po.name));
    if (po !== undefined) {
        return po.nr;
    }
    const quali = getQualification(search, appState);
    if (quali !== undefined) {
        return quali.poNr;
    }
    return 0;
}

export function getQualification(search: string, appState: IAppState): IQualifikation | undefined {
    let x = undefined;
    if ((x = appState.quickAccess?.get(search)) !== undefined) {
        return appState.qualifications?.get(x);
    }
    return appState.qualifications?.get(search);
}

// collection of special links, where routing should work too
export const DEFAULT_SITES = new Map<string, string>([
    ['seepferdchen', '0017fa5d-fa6d-c933-ce51-a8afe2b02922'],
    ['dsa-bronze', '0017fa5d-15b3-f192-cdb3-ceeda7f4fa81'],
    ['dsa-silber', '0017fa5d-1750-4b68-5b5f-acf50201417e'],
    ['dsa-gold', '0017fa5d-18ec-a53d-fdd1-f63a1f5272b3'],
    ['juniorretter', '0017fa5d-1f5e-0c95-575b-4bc629fc499c'],
    ['drsa-bronze', '0017fa5d-20fa-666b-61ad-ad4a8f2cfeef'],
    ['drsa-silber', '0017fa5d-2296-c041-80c6-7a10e772322b'],
    ['drsa-gold', '0017fa5d-2433-1a17-b4a5-b219e56e7bf8'],
    ['schnorcheltauchabzeichen', '0017fa5d-ebee-a04d-c39b-71557cdc832d'],
]);
