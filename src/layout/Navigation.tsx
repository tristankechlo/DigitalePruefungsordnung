import {
    IconSwimming, IconWaterpolo, IconFirstAidKit, IconLifebuoy, IconSpeedboat, IconScubaMask, IconCloudStorm, IconBan, IconJacket
} from '@tabler/icons-react';
import { Box, Divider, Flex, ScrollArea, Skeleton, Stack, Text, UnstyledButton } from "@mantine/core";
import { CustomIconType, IconWalkieTalkie, IconWhistle } from '../util/Icons';
import { getActivePO, sanitizeName } from '../util/Utils';
import { FORMATTING_OPTIONS } from '../util/CommonProps';
import { NavLink, useLocation } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import ProjectInfoModal from './ProjectInfo';
import { AppState } from '../util/AppState';
import { useContext } from 'react';
import classes from './style.module.css';

/* 
    the icons that will be used in the navigation, order of icons matters,
    based on the assumption that the number of the departments stays the same
*/
const ICONS: CustomIconType[] = [
    IconSwimming, IconWaterpolo, IconFirstAidKit, IconLifebuoy, IconSpeedboat,
    IconScubaMask, IconWalkieTalkie, IconCloudStorm, IconWhistle, IconJacket
];

function NavigationItem({ path, name, active, Icon }: { path: string, name: string, active: boolean, Icon: CustomIconType }) {
    return (
        <UnstyledButton component={NavLink} to={path} className={classes.link} data-active={active}>
            <Icon className={classes.linkIcon} stroke={1.75} />
            <span>{name}</span>
        </UnstyledButton>
    );
}

export default function Navigation() {

    const appState = useContext(AppState);
    const pos = appState.pos;

    const { pathname } = useLocation();
    const selectedPo = getActivePO(pathname, appState);
    const date = new Date("__DATE__").toLocaleString('de-DE', FORMATTING_OPTIONS)

    return (
        <ScrollArea type='hover' h='100%' w='100%' mah='100%' classNames={{ viewport: classes.scrollbarViewport }}>
            <Stack h='100%' mah='100%' justify='space-between' gap={0}>

                <Box h='100%'>
                    <Text size="lg" mt='xs' mb='md'>Fachbereich auswählen</Text>

                    {/* Display all entries, or 10 placefillers until data is loaded */}
                    {pos ? pos.map((po, i) => {
                        const Icon = ICONS[i] || IconBan;
                        const path = `/${sanitizeName(po.name)}`;
                        return (
                            <NavigationItem key={i} name={po.name} path={path} active={selectedPo === po.nr} Icon={Icon} />
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