import { IconExternalLink } from '@tabler/icons-react';
import classes from './ExternalLink.module.css';
import { Button } from "@mantine/core";

interface ExternalLinkProps {
    text: string;
    href?: string;
}

export default function ExternalLink(props: ExternalLinkProps) {

    const { text, href } = props;

    return (
        <Button component="a" href={href} target="_blank" referrerPolicy="no-referrer" variant="transparent" size="xs" title={text} c='black'
            rightSection={<IconExternalLink size={14} />} classNames={classes}>
            {text}
        </Button>
    );
}
