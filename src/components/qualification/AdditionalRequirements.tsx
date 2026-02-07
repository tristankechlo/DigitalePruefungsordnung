import { List, Text } from "@mantine/core";
import { TEXT_PROPS } from "../../util/CommonProps";
import { IVoraussetzungSonstiges } from "../../types/DLRGTypes";

export default function AdditionalRequirements({ entries }: { entries: IVoraussetzungSonstiges[] }) {
    return (
        <List>
            {entries.map((s, i) => {
                const prefix = s.anzahl > 1 ? `${s.anzahl}mal: ` : "";
                return (
                    <List.Item p={0} m={0} key={i}>
                        <Text {...TEXT_PROPS} pb={0}>{prefix}{s.kommentar}</Text>
                    </List.Item>
                );
            })}
        </List>
    );
}
