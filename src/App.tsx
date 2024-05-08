import { useSessionStorage } from '@mantine/hooks';
import QualificationOverview from './components/QualificationOverview';
import { useState, useEffect, lazy, createContext } from 'react';
import DLRG_API from './util/DLRG-API';
import type { IPruefungsordnungInfo, IQualifikation } from './types/DLRGTypes';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import { DEFAULT_SITES, sanitizeName } from './util/Utils';

const Qualification = lazy(() => import('./components/Qualification'));

export interface IAppState {
    pos?: IPruefungsordnungInfo[];
    qualifications?: Map<string, IQualifikation>;
    quickAccess?: Map<string, string>;
}
export const AppState = createContext<IAppState>({  });

export default function App() {

    const [pos, setPos] = useState<IPruefungsordnungInfo[]>();
    const [quickAccess, setQuickAccess] = useState<Map<string, string>>();
    const [qualifications, setQualifications] = useState<Map<string, IQualifikation>>();
    const defaultTabs = ['voraussetzungen', 'inhalte', 'pruefungen', 'dokumente'];
    const [openTabs, setOpenTabs] = useSessionStorage({ key: 'qualification-open-tabs', defaultValue: defaultTabs });

    useEffect(() => {
        DLRG_API.getAllPOs().then((pos) => {
            pos.push({ nr: 0, name: 'Vorauswahl' });
            setPos(pos.sort((a, b) => a.nr - b.nr));
        });
        DLRG_API.getAllQualifications().then((qualifications) => {
            let quickAccessMap = new Map<string, string>(DEFAULT_SITES);
            let qualiMap = new Map<string, IQualifikation>();

            qualifications.sort((a, b) => a.nr.localeCompare(b.nr));
            qualifications.forEach((q) => {
                qualiMap.set(q.id, q);
                quickAccessMap.set(sanitizeName(q.name), q.id);
                quickAccessMap.set(sanitizeName(q.nr), q.id);
            });

            setQualifications(qualiMap);
            setQuickAccess(quickAccessMap);
        });
    }, []);

    return (
        <AppState.Provider value={{ pos, qualifications, quickAccess }}>
            <Routes>
                <Route path='/' element={<PageLayout />} >

                    {/* base route displaying the preselected items */}
                    <Route path='/' element={<QualificationOverview />} />

                    {/* routes for all categories */}
                    {pos ? pos.map((po, i) => {
                        return (
                            <Route key={i} path={sanitizeName(po.name)} element={
                                <QualificationOverview />
                            } />
                        );
                    }) : null}

                    {/* routes for all qualifications */}
                    <Route path='/*' element={
                        <Qualification openTabs={openTabs} setOpenTabs={setOpenTabs} />
                    } />
                </Route>
            </Routes>
        </AppState.Provider>
    );
}

