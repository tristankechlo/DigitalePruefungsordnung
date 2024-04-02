import { useSessionStorage } from '@mantine/hooks';
import QualificationOverview from './components/QualificationOverview';
import { useState, useEffect } from 'react';
import DLRG_API from './util/DLRG-API';
import type { IPruefungsordnungInfo, IQualifikation } from './types/DLRGTypes';
import { Route, Routes } from 'react-router-dom';
import Qualification from './components/Qualification';
import PageLayout from './layout/PageLayout';


export default function App() {

    const [pos, setPos] = useState<IPruefungsordnungInfo[] | undefined>(undefined);
    const [qualifications, setQualifications] = useState<IQualifikation[] | undefined>(undefined);
    const defaultTabs = ['voraussetzungen', 'inhalte', 'pruefungen', 'dokumente'];
    const [openTabs, setOpenTabs] = useSessionStorage({ key: 'qualification-open-tabs', defaultValue: defaultTabs });

    useEffect(() => {
        DLRG_API.getAllPOs().then((pos) => {
            setPos(pos.sort((a, b) => a.nr - b.nr));
        });
        DLRG_API.getAllQualifications().then((qualifications) => {
            setQualifications(qualifications.sort((a, b) => a.nr.localeCompare(b.nr)));
        });
    }, []);

    return (
        <Routes>
            <Route path='/' element={
                <PageLayout pos={pos} />
            }>
                <Route path='/:po/:id' element={
                    <Qualification qualifikations={qualifications} openTabs={openTabs} setOpenTabs={setOpenTabs} />
                } />
                <Route path='/:po?' element={
                    <QualificationOverview qualifications={qualifications} />
                } />
            </Route>
        </Routes>
    );
}
