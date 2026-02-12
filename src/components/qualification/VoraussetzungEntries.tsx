import type { IVoraussetzung, IVoraussetzungMindestalter } from "../../types/DLRGTypes";
import { Flex, Stack, Text } from "@mantine/core";
import { TEXT_PROPS } from '../../util/CommonProps';
import { IconCake } from "@tabler/icons-react";
import { CustomIconType } from "../../util/Icons";

interface VoraussetzungGenericProps extends IVoraussetzung {
    text: string;
    icon?: CustomIconType;
}

// renders a generic requirement
export function VoraussetzungGeneric({ istErforderlich, kommentar, text, icon: Icon }: VoraussetzungGenericProps) {

    if (!istErforderlich) { return null; }

    const hasComment = kommentar.length > 0;

    return (
        <Flex gap="xs" align="center" pb={TEXT_PROPS.pb} mb="xs">
            {Icon ? <Icon size={24} style={{ minWidth: "24px" }} /> : null}
            <Stack gap={0}>
                <Text size={TEXT_PROPS.size} lh="xs" fw="bold">{text}</Text>
                {hasComment &&
                    <Text size={TEXT_PROPS.size} lh="xs">{kommentar}</Text>
                }
            </Stack>
        </Flex>
    );

}

// render the required minimum age for a qualification
export function VoraussetzungMindestalter({ istErforderlich, alter, kommentar }: IVoraussetzungMindestalter) {

    if (!istErforderlich) { return null; }

    const suffix = (kommentar.length > 0) ? ` (${kommentar})` : "";

    return (
        <Flex gap="xs" align="center" pb={TEXT_PROPS.pb} mb="xs">
            <IconCake size={24} />
            <Text size={TEXT_PROPS.size} lh="xs"><b>Mindestalter:</b> {alter} Jahre{suffix}</Text>
        </Flex>
    );

}
