import { InhaltEinordnung, PruefungEinordnung } from "../../types/DLRGTypes";
import { TEXT_PROPS, SUBTITLE_PROPS } from '../../util/CommonProps';
import type { IInhalt, IPruefung } from "../../types/DLRGTypes";
import { Text, List } from "@mantine/core";


function hasType(array: (IInhalt | IPruefung)[], e: InhaltEinordnung | PruefungEinordnung) {
    return array.some((a) => a.einordnung === e);
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
            <List>
                {pruefungen.filter((p) => p.einordnung === einordnung).map((pruefung) => {
                    const suffix = pruefung.gueltigkeit ? ` (Gültigkeit in Monaten: ${pruefung.gueltigkeit})` : "";

                    return (
                        <List.Item key={pruefung.id} p={0} m={0}>
                            <Text {...TEXT_PROPS}>{pruefung.beschreibung}{suffix}</Text>
                        </List.Item>
                    );
                })}
            </List>
        </>
    );

}
