import { InhaltEinordnung, PruefungEinordnung } from "../../types/DLRGTypes";
import { TEXT_PROPS, SUBTITLE_PROPS } from '../../util/CommonProps';
import type { IInhalt, IPruefung } from "../../types/DLRGTypes";
import { Text, List } from "@mantine/core";
import classes from './main.module.css';
import React from "react";


function hasType(array: (IInhalt | IPruefung)[], e: InhaltEinordnung | PruefungEinordnung) {
    return array.some((a) => a.einordnung === e);
}

// single entry of the category 'inhalte'
export function InhaltCategory({ inhalte, e, title }: { inhalte: IInhalt[], e: InhaltEinordnung, title: string }) {

    if (!hasType(inhalte, e)) {
        return null;
    }

    return (
        <React.Fragment>
            <Text {...SUBTITLE_PROPS}>{title}:</Text>
            {inhalte.filter((i) => i.einordnung === e).map((inhalt, i) => {
                const suffix = inhalt.lehreinheiten > 0 ? ` (${inhalt.lehreinheiten} LE)` : "";
                return (<Text {...TEXT_PROPS} key={i}>- {inhalt.inhalt}{suffix}</Text>);
            })}
        </React.Fragment>
    );
}

interface PrüfungCategoryProps {
    pruefungen: IPruefung[];
    einordnung: PruefungEinordnung;
    title: string;
}

// single entry of the category 'prüfungen'
export function PrüfungCategory({ pruefungen, einordnung, title }: PrüfungCategoryProps) {

    if (!hasType(pruefungen, einordnung)) {
        return null;
    }

    return (
        <>
            <Text {...SUBTITLE_PROPS}>{title}</Text>
            <List {...TEXT_PROPS} withPadding={true} pl="0.5rem" icon="•" classNames={{
                itemWrapper: classes.listItemWrapper
            }}>
                {pruefungen.filter((p) => p.einordnung === einordnung).map((pruefung, i) => {
                    const suffix = pruefung.gueltigkeit ? ` (Gültigkeit in Monaten: ${pruefung.gueltigkeit})` : "";
                    return (<List.Item key={i} className='listItem'>{pruefung.beschreibung}{suffix}</List.Item>);
                })}
            </List>
        </>
    );

}
