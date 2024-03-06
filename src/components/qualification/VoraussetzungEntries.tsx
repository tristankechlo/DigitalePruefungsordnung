import type { IVoraussetzung, IVoraussetzungMindestalter } from "../../types/DLRGTypes";
import { Text } from "@mantine/core";
import { TEXT_PROPS } from '../../util/CommonProps';

interface VoraussetzungGenericProps extends IVoraussetzung {
    text: string;
}

// renders a generic requirement
export function VoraussetzungGeneric({ istErforderlich, kommentar, text }: VoraussetzungGenericProps) {

    if (!istErforderlich) { return null; }

    // add brackets to the comment if there aren't any already (api is inconsistent, sometimes there are already brackets present)
    const isInBrackets = kommentar.startsWith("(") && kommentar.endsWith(")");
    const suffix = (kommentar.length > 0) ? isInBrackets ? ` ${kommentar}` : ` (${kommentar})` : "";

    return (
        <Text {...TEXT_PROPS}><b>{text}</b>{suffix}</Text>
    );

}

// render the required minimum age for a qualification
export function VoraussetzungMindestalter({ istErforderlich, alter, kommentar }: IVoraussetzungMindestalter) {

    if (!istErforderlich) { return null; }

    const suffix = (kommentar.length > 0) ? ` (${kommentar})` : "";

    return (
        <Text {...TEXT_PROPS}><b>Mindestalter:</b> {alter} Jahre{suffix}</Text>
    );

}
