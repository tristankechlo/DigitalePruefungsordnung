import { IconFileTypePng, IconFileTypePdf, IconFileUnknown } from '@tabler/icons-react';
import { Text, UnstyledButton } from '@mantine/core';
import type { IDokument } from '../../types/DLRGTypes';
import { DokumentTyp } from '../../types/DLRGTypes';
import classes from './main.module.css';
import { TEXT_PROPS } from '../../util/CommonProps';

function getDocIcon(d: IDokument) {
    if (d.titel.endsWith(".png")) {
        return IconFileTypePng;
    } else if (d.titel.endsWith(".pdf")) {
        return IconFileTypePdf;
    }
    return IconFileUnknown;
}

interface DokumenteProps {
    dokumente: IDokument[];
    title: string;
}

export default function Dokumente({ dokumente }: DokumenteProps) {

    if (dokumente.length === 0) { return null; }

    return (
        <>
            {dokumente.map((dokument, i) => {
                const Icon = getDocIcon(dokument);

                // if there is a document title present present, use it
                // if none present, try to use document type as title
                const title = dokument.titel !== ""
                    ? dokument.titel
                    : (dokument.typ !== undefined
                        ? Object.keys(DokumentTyp)[Object.values(DokumentTyp).indexOf(dokument.typ)] // use enum name as title
                        : "Dokumenten Titel unbekannt");
                return (
                    <UnstyledButton key={i} component='a' href={dokument.link} target='_blank' rel='noreferrer' className={classes.dokumenteRoot} mb={TEXT_PROPS.pb}>
                        <Icon stroke={1.75} size={25} color='blue' />
                        <Text {...TEXT_PROPS} c='blue' pb={0}>{title}</Text>
                    </UnstyledButton>
                );
            })}
        </>
    );

}
