import { compareQualification, DEFAULT_SITES, qualificationToUrl, sanitizeName } from './util/Utils';
import type { IPruefungsordnungInfo, IQualifikation } from './types/DLRGTypes';
import QualificationOverview from './components/QualificationOverview';
import { useSessionStorage } from '@mantine/hooks';
import { useState, useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import { AppState } from './util/AppState';
import DLRG_API from './util/DLRG-API';

const Qualification = lazy(() => import('./components/Qualification'));


export default function App() {

    const [pos, setPos] = useState<IPruefungsordnungInfo[]>();
    const [quickAccess, setQuickAccess] = useState<Map<string, string>>();
    const [qualifications, setQualifications] = useState<Map<string, IQualifikation>>();
    const [openTabs, setOpenTabs] = useSessionStorage<string[]>({ key: 'open-qualification-tabs', defaultValue: [] });

    useEffect(() => {
        DLRG_API.getAllPOs().then((pos) => {
            setPos(pos.sort((a, b) => a.nr - b.nr));
        });
        DLRG_API.getAllQualifications().then((qualifications) => {
            const quickAccessMap = new Map<string, string>(DEFAULT_SITES);
            const qualiMap = new Map<string, IQualifikation>();

            qualifications.sort(compareQualification);
            qualifications.forEach((q) => {
                qualiMap.set(q.id, q);
                quickAccessMap.set(qualificationToUrl(q), q.id);
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

