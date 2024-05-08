import { Container, rem } from '@mantine/core';
import type { IQualifikation } from '../types/DLRGTypes';
import { useState, useEffect, useContext } from 'react';
import Loading from '../layout/Loading';
import QualificationPreview from './QualificationPreview';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../App';
import { getActivePO } from '../util/Utils';

// pre selected list of qualifications displayed
// TODO: replace with user selectable favorites
const DEFAULT_QUALIFICATIONS = ['111', '121', '122', '123', '141', '151', '152', '153', '161']
const DEFAULT_FILTER = (q: IQualifikation) => {
    return DEFAULT_QUALIFICATIONS.includes(q.nr);
};

// component that renderes all qualifications related to the currently selected 'prüfungsordnung'
export default function QualificationOverview() {

    const appState = useContext(AppState);
    
    document.title = "__TITLE__";
    (document.getElementById('canonical') as HTMLLinkElement).href = `__MAIN_URL__`

    const [filteredQualifications, setFilteredQualifications] = useState<IQualifikation[] | undefined>(undefined);
    const { pathname } = useLocation();
    const selectedPo = getActivePO(pathname, appState);
    const navigate = useNavigate();
    
    useEffect(() => {
        let qualifications = Array.from(appState.qualifications?.values() ?? []);
        if (selectedPo && (selectedPo < 0 || selectedPo > 10)) {
            // invalid number for PO
            navigate('/', { replace: true });
        }
        if (selectedPo && appState.qualifications) {
            // show qualifications
            setFilteredQualifications(qualifications.filter((q) => selectedPo === q.poNr));
        } else if (appState.qualifications) {
            // show the preselected qualifications
            setFilteredQualifications(qualifications.filter(DEFAULT_FILTER));
        }
    }, [appState.qualifications, selectedPo, navigate]);

    return (
        <Container size={rem(1200)} my='md' px={0}>
            {filteredQualifications ? filteredQualifications.map((qualification) => {
                return <QualificationPreview q={qualification} key={qualification.id} largeIcon={selectedPo === 0} />;
            }) : <Loading />}
        </Container>
    );

}
