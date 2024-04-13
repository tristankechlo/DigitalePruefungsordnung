import { UnstyledButton, Group, Image, Text } from '@mantine/core';
import type { IQualifikation } from '../types/DLRGTypes';
import { DokumentTyp } from '../types/DLRGTypes';
import { NavLink, useParams } from 'react-router-dom';
import classes from './QualificationPreview.module.css';

function hasAbzeichen(q: IQualifikation) {
    return q.dokumente.some((d) => d.typ === DokumentTyp.Abzeichen);
}

interface QualificationPreviewProps {
    q: IQualifikation;
    largeIcon: boolean;
}

function QualifikationWrapper({ children, to }: { children: React.ReactNode, to: string }) {
    return (
        <UnstyledButton className={classes.preview} mb='sm' component={NavLink} to={to} >
            <Group className={classes.previewGroup}>
                {children}
            </Group>
        </UnstyledButton>
    );
}

export default function QualificationPreview({ q, largeIcon }: QualificationPreviewProps) {

    const { po } = useParams();
    const to = `/${po ?? 0}/${q.id}`;

    // if the given qualification has an icon, render the preview with an icon
    if (hasAbzeichen(q)) {
        const abzeichenUrl = q.dokumente.find((d) => d.typ === DokumentTyp.Abzeichen)?.link.replace('www.dlrg.net', 'dlrg.net');
        const size = largeIcon ? 50 : 25;
        return (
            <QualifikationWrapper to={to}>
                <Image src={abzeichenUrl} w={size} fallbackSrc='/image-not-found.svg' loading='lazy'/>
                <Text>{largeIcon ? null : `${q.nr} - `}{q.name}</Text>
            </QualifikationWrapper>
        );
    }

    // render default preview without icon
    return (
        <QualifikationWrapper to={to}>
            <Text>{q.nr} - {q.name}</Text>
        </QualifikationWrapper>
    );
}