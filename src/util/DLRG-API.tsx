import type { PruefungsordnungInfo, Pruefungsordnung, Qualifikation, Error } from "../types/DLRGTypes";

async function fetchWrapper<T>(url: string): Promise<T> {
    const options = {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // response from api should always be json
        if (!response.ok) {
            if (typeof data.code !== 'undefined' && typeof data.message !== 'undefined') { // api should always return code and message on error
                throw data as Error;
            }
            throw `Network response was not ok. ${response.status} ${response.statusText}`;
        }
        return data as T;
    } catch (error) {
        throw { message: `Error while fetching url '${url}'`, error: error };
    }
}

/* Gibt die Nummern und Namen aller Prüfungsordnungen aus */
async function getAllPOs(): Promise<PruefungsordnungInfo[]> {
    const url = "https://api.dlrg.net/ausbildung/v1/po";
    return fetchWrapper(url);
}

/* Gibt alle Qualifikationen der spezifizierten Prüfungsordnung aus */
async function getPo(nr: number, activeOnly: boolean = true): Promise<Pruefungsordnung> {
    const url = `https://api.dlrg.net/ausbildung/v1/po/${nr}?activeOnly=${activeOnly}`;
    return fetchWrapper(url);
}

/* Gibt alle Qualifikationen mit sämtlichen Inhalten aus */
async function getAllQualifications(activeOnly: boolean = true): Promise<Qualifikation[]> {
    const url = `https://api.dlrg.net/ausbildung/v1/qualifikationen?activeOnly=${activeOnly}`;
    return fetchWrapper(url);
}

/* Gibt die spezifizierte Qualifikation mit sämtlichen Inhalten aus */
async function getQualification(id: string): Promise<Qualifikation> {
    const url = `https://api.dlrg.net/ausbildung/v1/qualifikationen/${id}`;
    return fetchWrapper(url);
}

const DLRG_API = {
    getAllPOs,
    getPo,
    getAllQualifications,
    getQualification
};

export default DLRG_API;
