import { Text, UnstyledButton } from '@mantine/core';
import type { IQualifikationInfo } from '../../types/DLRGTypes';
import { TEXT_PROPS } from '../../util/CommonProps';
import { NavLink } from 'react-router-dom';
import classes from './main.module.css';
import { sanitizeName } from '../../util/Utils';

// renders a qualification that is associated with the current one
export default function LinkedQualification({ q, c }: { q: IQualifikationInfo; c?: string; }) {

    const suffix = c && c.length > 0 ? ` (${c})` : "";
    const to = `/${q.id}-${sanitizeName(q.name)}`

    return (
        <UnstyledButton component={NavLink} to={to} mb={TEXT_PROPS.pb} className={classes.linkedQualification}>
            <Text {...TEXT_PROPS} pb={0}>{q.nr} - {q.name}{suffix}</Text>
        </UnstyledButton>
    );
}
