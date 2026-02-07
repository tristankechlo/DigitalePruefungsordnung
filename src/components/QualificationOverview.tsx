import { Container, rem } from '@mantine/core';
import type { IQualifikation } from '../types/DLRGTypes';
import { useState, useEffect, useContext } from 'react';
import Loading from '../layout/Loading';
import QualificationPreview from './QualificationPreview';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../util/AppState';
import { getActivePO } from '../util/Utils';


// component that renderes all qualifications related to the currently selected 'prüfungsordnung'
export default function QualificationOverview() {

    const appState = useContext(AppState);

    const { pathname } = useLocation();
    const selectedPo = getActivePO(pathname, appState);
    const qualiName = appState.pos?.find((po) => po.nr === selectedPo)?.name;

    const [filteredQualifications, setFilteredQualifications] = useState<IQualifikation[] | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${qualiName} | __TITLE__`;
        (document.getElementById('canonical') as HTMLLinkElement).href = `__MAIN_URL__/${pathname.replace(/\//g, '')}`
    }, [pathname, qualiName]);

    useEffect(() => {
        const qualifications = Array.from(appState.qualifications?.values() ?? []);
        if (selectedPo <= 0 || selectedPo > 10) {
            // invalid number for PO
            navigate('/', { replace: true });
        }
        // show qualifications
        setFilteredQualifications(qualifications.filter((q) => selectedPo === q.poNr));
    }, [appState.qualifications, selectedPo, navigate]);

    return (
        <Container size={rem(1200)} my='md' px={0}>
            {filteredQualifications
                ? filteredQualifications.map((qualification) => <QualificationPreview q={qualification} key={qualification.id} />)
                : <Loading />
            }
        </Container>
    );

}
