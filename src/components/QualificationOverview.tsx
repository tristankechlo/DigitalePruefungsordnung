import { Container, rem } from '@mantine/core';
import type { Qualifikation } from '../types/DLRGTypes';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import QualificationPreview from './QualificationPreview';
import { useNavigate, useParams } from 'react-router-dom';

interface MainContentProps {
    qualifications?: Qualifikation[];
}

// pre selected list of qualifications displayed
// TODO: replace with user selectable favorites
const DEFAULT_QUALIFICATIONS = ['111', '121', '122', '123', '141', '151', '152', '153', '161']
const DEFAULT_FILTER = (q: Qualifikation) => {
    return DEFAULT_QUALIFICATIONS.includes(q.nr);
};

const PO_FILTER = (po: number, q: Qualifikation) => {
    return q.poNr === po;
}

// component that renderes all qualifications related to the currently selected 'prüfungsordnung'
export default function QualificationOverview(props: MainContentProps) {

    const [filteredQualifications, setFilteredQualifications] = useState<Qualifikation[] | undefined>(undefined);
    const { po } = useParams(); // read the selected 'prüfungsordnung' from the path
    const selectedPo = po ? parseInt(po) : 0;
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedPo && (selectedPo < 0 || selectedPo > 10)) {
            navigate('/', { replace: true });
        }
        if (selectedPo && props.qualifications) {
            // show qualifications
            setFilteredQualifications(props.qualifications.filter((q) => PO_FILTER(selectedPo, q)));
        } else if (props.qualifications) {
            // show the preselected qualifications
            setFilteredQualifications(props.qualifications.filter(DEFAULT_FILTER));
        }
    }, [props.qualifications, selectedPo]);

    return (
        <Container size={rem(1200)} my='md' px={0}>
            {filteredQualifications ? filteredQualifications.map((qualification) => {
                return <QualificationPreview q={qualification} key={qualification.id} largeIcon={selectedPo === 0} />;
            }) : <Loading />}
        </Container>
    );

}
