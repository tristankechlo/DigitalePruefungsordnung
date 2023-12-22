import { Text, UnstyledButton } from '@mantine/core';
import type { QualifikationInfo } from '../../types/DLRGTypes';
import { TEXT_PROPS } from '../../util/CommonProps';
import { NavLink } from 'react-router-dom';
import classes from './main.module.css';

// renders a qualification that is associated with the current one
export default function LinkedQualification({ po, q, c }: { po: number; q: QualifikationInfo; c?: string; }) {

    const suffix = c && c.length > 0 ? ` (${c})` : "";

    return (
        <UnstyledButton component={NavLink} to={`/${po}/${q.id}`} mb={TEXT_PROPS.pb} className={classes.linkedQualification}>
            <Text {...TEXT_PROPS} pb={0}>{q.nr} - {q.name}{suffix}</Text>
        </UnstyledButton>
    );
}
