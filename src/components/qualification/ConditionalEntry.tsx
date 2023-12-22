import { TEXT_PROPS } from "../../util/CommonProps";
import { Text } from "@mantine/core";

export default function ConditionalEntry({ content, text }: { content?: number, text: string }) {

    if (content === undefined || content === null) {
        return null;
    }

    return (
        <Text {...TEXT_PROPS}><b>{text}:</b> {content}</Text>
    );
}
