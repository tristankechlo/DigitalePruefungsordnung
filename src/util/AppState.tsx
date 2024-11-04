import { createContext } from "react";
import type { IPruefungsordnungInfo, IQualifikation } from "../types/DLRGTypes";

export interface IAppState {
    pos?: IPruefungsordnungInfo[];
    qualifications?: Map<string, IQualifikation>;
    quickAccess?: Map<string, string>;
}
export const AppState = createContext<IAppState>({});
