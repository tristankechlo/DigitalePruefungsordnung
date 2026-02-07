import { InhaltEinordnung, PruefungEinordnung } from "../../types/DLRGTypes";
import { TEXT_PROPS, SUBTITLE_PROPS } from '../../util/CommonProps';
import type { IInhalt, IPruefung } from "../../types/DLRGTypes";
import { List, Text } from "@mantine/core";


function hasType(array: (IInhalt | IPruefung)[], e: InhaltEinordnung | PruefungEinordnung) {
    return array.some((a) => a.einordnung === e);
}

// single entry of the category 'inhalte'
export function InhaltCategory({ inhalte, e, title }: { inhalte: IInhalt[], e: InhaltEinordnung, title: string }) {

    if (!hasType(inhalte, e)) {
        return null;
    }

    return (
        <>
            <Text {...SUBTITLE_PROPS}>{title}:</Text>
            <List>
                {inhalte.filter((i) => i.einordnung === e).map((inhalt, i) => {
                    const suffix = inhalt.lehreinheiten > 0 ? ` (${inhalt.lehreinheiten} LE)` : "";
                    return (
                        <List.Item key={i} p={0} m={0}>
                            <Text {...TEXT_PROPS}>{inhalt.inhalt}{suffix}</Text>
                        </List.Item>
                    );
                })}
            </List>
        </>
    );
}
