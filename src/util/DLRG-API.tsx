import type { IPruefungsordnungInfo, IQualifikation, IError } from "../types/DLRGTypes";

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
                throw data as IError;
            }
            throw `Network response was not ok. ${response.status} ${response.statusText}`;
        }
        return data as T;
    } catch (error) {
        throw { message: `Error while fetching url '${url}'`, error: error };
    }
}

/* Gibt die Nummern und Namen aller Prüfungsordnungen aus */
async function getAllPOs(): Promise<IPruefungsordnungInfo[]> {
    const url = "/dlrg-assets/po.json";
    return fetchWrapper(url);
}

/* Gibt alle Qualifikationen mit sämtlichen Inhalten aus */
async function getAllQualifications(): Promise<IQualifikation[]> {
    const url = `/dlrg-assets/qualifications.json`;
    return fetchWrapper(url);
}

const DLRG_API = {
    getAllPOs,
    getAllQualifications,
};

export default DLRG_API;
