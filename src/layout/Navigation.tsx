import {
    IconSwimming, IconWaterpolo, IconFirstAidKit, IconLifebuoy, IconSpeedboat, IconScubaMask, IconCloudStorm, IconBan, IconStar
} from '@tabler/icons-react';
import { IconLifeJacket, IconWalkieTalkie, IconWhistle } from '../util/Icons';
import { Box, Divider, Flex, ScrollArea, Skeleton, Stack, Text, UnstyledButton } from "@mantine/core";
import classes from './style.module.css';
import type { PruefungsordnungInfo } from "../types/DLRGTypes";
import { useParams, NavLink } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import ProjectInfoModal from './ProjectInfo';
import { FORMATTING_OPTIONS } from '../util/CommonProps';

/* 
    the icons that will be used in the navigation, order of icons matters,
    based on the assumption that the number of the departmets stays the same
*/
const ICONS = [IconStar, IconSwimming, IconWaterpolo, IconFirstAidKit, IconLifebuoy, IconSpeedboat, IconScubaMask, IconWalkieTalkie, IconCloudStorm, IconWhistle, IconLifeJacket];


export default function Navigation({ pos }: { pos?: PruefungsordnungInfo[] }) {

    const { po } = useParams();
    const selectedPo = po ? parseInt(po) : 0;
    const entries: PruefungsordnungInfo[] = [{ nr: 0, name: "Vorauswahl" }, ...(pos ? pos : [])];
    const date = new Date("__DATE__").toLocaleString('de-DE', FORMATTING_OPTIONS)

    return (
        <ScrollArea type='hover' h='100%' w='100%' mah='100%' classNames={{ viewport: classes.scrollbarViewport }}>
            <Stack h='100%' mah='100%' justify='space-between' gap={0}>

                <Box h='100%'>
                    <Text size="lg" mt='xs' mb='md'>Fachbereich auswählen</Text>

                    {/* Display all entries, or 10 placefillers until data is loaded */}
                    {pos ? entries.map((po, i) => {
                        const Icon = ICONS[i] || IconBan;
                        return (
                            <UnstyledButton component={NavLink} to={`/${po.nr}`} key={po.nr} className={classes.link} data-active={selectedPo === po.nr}>
                                <Icon className={classes.linkIcon} stroke={1.75} />
                                <span>{po.name}</span>
                            </UnstyledButton>
                        );
                    }) : Array(10).fill(0).map((_, i) => {
                        return (
                            <Skeleton key={i} height={40} radius='sm' mb='xs' />
                        );
                    })}
                </Box>

                <Flex direction='column'>
                    <Divider my='md' />
                    <ProjectInfoModal />
                    <Flex direction='row' align='center'>
                        <Text>Source:</Text>
                        <ExternalLink text='GitHub' href='__REPO_URL__' />
                    </Flex>
                    <Text>Released: {date}</Text>
                    <Flex direction='row' align='center'>
                        <Text>Build:</Text>
                        <ExternalLink text='__BUILD__' href='__COMMIT_URL__' />
                    </Flex>
                </Flex>
            </Stack>
        </ScrollArea>
    );
}