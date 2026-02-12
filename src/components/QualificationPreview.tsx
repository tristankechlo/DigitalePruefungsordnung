import { UnstyledButton, Group, Image, Text } from '@mantine/core';
import type { IQualifikation } from '../types/DLRGTypes';
import { DokumentTyp } from '../types/DLRGTypes';
import { NavLink } from 'react-router-dom';
import classes from './QualificationPreview.module.css';
import { qualificationToUrl } from '../util/Utils';

function hasAbzeichen(q: IQualifikation) {
    return q.dokumente.some((d) => d.typ === DokumentTyp.Abzeichen);
}

interface QualificationPreviewProps {
    q: IQualifikation;
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

export default function QualificationPreview({ q }: QualificationPreviewProps) {

    const to = `/${qualificationToUrl(q)}`;

    // if the given qualification has an icon, render the preview with an icon
    if (hasAbzeichen(q)) {
        const titel = q.dokumente.find((d) => d.typ === DokumentTyp.Abzeichen)?.titel;
        const abzeichenUrl = `/dlrg-assets/icons/${titel}`;
        return (
            <QualifikationWrapper to={to}>
                <Image src={abzeichenUrl} w="25px" width="25px" height='auto' fallbackSrc='/image-not-found.svg' loading='lazy' />
                <Text>{q.nr} - {q.name}</Text>
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