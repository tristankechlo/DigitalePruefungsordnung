import { List, Text } from "@mantine/core";
import { TEXT_PROPS } from "../../util/CommonProps";
import { IVoraussetzungHospitation } from "../../types/DLRGTypes";

export default function Hospitations({ entries }: { entries: IVoraussetzungHospitation[] }) {
    return (
        <List>
            {entries.map((s, i) => {
                return (
                    <List.Item p={0} m={0} key={i}>
                        <Text {...TEXT_PROPS} pb={0}>{s.kommentar}</Text>
                    </List.Item>
                );
            })}
        </List>
    );
}
