import { InhaltEinordnung, PruefungEinordnung } from "../../types/DLRGTypes";
import { TEXT_PROPS, SUBTITLE_PROPS } from '../../util/CommonProps';
import type { IInhalt, IPruefung } from "../../types/DLRGTypes";
import { Text } from "@mantine/core";
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
