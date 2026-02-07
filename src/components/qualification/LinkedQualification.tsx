import { Flex, Group, Pill, Stack, Text, UnstyledButton } from '@mantine/core';
import type { IQualifikationInfo } from '../../types/DLRGTypes';
import { TEXT_PROPS } from '../../util/CommonProps';
import { NavLink } from 'react-router-dom';
import classes from './main.module.css';
import { qualificationToUrl } from '../../util/Utils';

// renders a qualification that is associated with the current one
export default function LinkedQualification({ q, c }: { q: IQualifikationInfo; c?: string; }) {

    const to = `/${qualificationToUrl(q)}`

    return (
        <UnstyledButton component={NavLink} to={to} mb={0} className={classes.linkedQualification}>
            <Group align='center' wrap='nowrap' gap={5}>
                <Flex w="65px" miw="65px" align="center">
                    <Pill bg="#0069b4" c="white">{q.nr}</Pill>
                </Flex>
                <Stack gap={0}>
                    <Text size={TEXT_PROPS.size}>{q.name}</Text>
                    {c && c.length > 0 &&
                        <Text size={TEXT_PROPS.size} c="gray">{c}</Text>
                    }
                </Stack>
            </Group>
        </UnstyledButton>
    );
}
