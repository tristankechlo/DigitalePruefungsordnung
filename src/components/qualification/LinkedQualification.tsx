import { Box, Group, Pill, Stack, Text, UnstyledButton } from '@mantine/core';
import type { IQualifikationInfo } from '../../types/DLRGTypes';
import { TEXT_PROPS } from '../../util/CommonProps';
import { NavLink } from 'react-router-dom';
import classes from './main.module.css';
import { qualificationToUrl } from '../../util/Utils';

// renders a qualification that is associated with the current one
export default function LinkedQualification({ q, c }: { q: IQualifikationInfo; c?: string; }) {

    const to = `/${qualificationToUrl(q)}`

    return (
        <UnstyledButton component={NavLink} to={to} mb={TEXT_PROPS.pb} className={classes.linkedQualification}>
            <Group align='center' wrap='nowrap' gap={5}>
                <Box w="65px" miw="65px">
                    <Pill bg="#0069b4" c="white">{q.nr}</Pill>
                </Box>
                <Stack gap={0}>
                    <Text size={TEXT_PROPS.size} lh="xs">{q.name}</Text>
                    {c && c.length > 0 &&
                        <Text size={TEXT_PROPS.size} lh="xs" c="gray">{c}</Text>
                    }
                </Stack>
            </Group>
        </UnstyledButton>
    );
}
