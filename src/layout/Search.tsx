import { Spotlight, spotlight, type SpotlightActionData, type SpotlightActionGroupData } from '@mantine/spotlight';
import { ActionIcon, Image, Kbd, UnstyledButton } from '@mantine/core';
import { DokumentTyp, type IQualifikation } from '../types/DLRGTypes';
import { compareQualification, qualificationToUrl } from '../util/Utils';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../util/AppState';
import { useContext, useMemo } from 'react';
import classes from './style.module.css';

function ActionIconImage({ q }: { q: IQualifikation }) {
    const titel = q.dokumente.find((d) => d.typ === DokumentTyp.Abzeichen)?.titel;
    if (titel === undefined) {
        return null;
    }
    return (
        <Image src={`/dlrg-assets/icons/${titel}`} w='25px' height='auto' fallbackSrc='/image-not-found.svg' loading='lazy' />
    );
}

/* global search, opened either by the searchbar (desktop) or the search button (mobile) */
export function GlobalSpotlight() {

    const appState = useContext(AppState);
    const navigate = useNavigate();

    const actions = useMemo<SpotlightActionGroupData[]>(() => {
        const grouped = new Map<number, SpotlightActionData[]>();

        Array.from(appState.qualifications?.values() ?? [])
            .sort(compareQualification)
            .forEach((q) => {
                const action: SpotlightActionData = {
                    id: q.id,
                    label: `${q.nr} - ${q.name}`,
                    keywords: [q.nr, q.name, q.abkuerzung ?? ''],
                    leftSection: <ActionIconImage q={q} />,
                    onClick: () => navigate(`/${qualificationToUrl(q)}`)
                };
                const group = grouped.get(q.poNr);
                if (group) {
                    group.push(action);
                } else {
                    grouped.set(q.poNr, [action]);
                }
            });

        return Array.from(grouped.entries())
            .sort(([a], [b]) => a - b)
            .map(([poNr, actions]) => ({
                group: appState.pos?.find((po) => po.nr === poNr)?.name ?? `PO ${poNr}`,
                actions
            }));
    }, [appState.qualifications, appState.pos, navigate]);

    return (
        <Spotlight
            actions={actions}
            nothingFound='Keine Qualifikation gefunden...'
            highlightQuery
            limit={25}
            scrollable
            searchProps={{
                leftSection: <IconSearch size={20} stroke={1.75} />,
                placeholder: 'Qualifikation suchen...'
            }}
        />
    );
}

/* searchbar shown on desktop, only used to open the spotlight */
export function SearchBar() {
    return (
        <UnstyledButton className={classes.searchBar} onClick={spotlight.open} visibleFrom='sm' aria-label='Suche ├Âffnen'>
            <IconSearch size={18} stroke={1.75} />
            <span className={classes.searchBarLabel}>Qualifikation suchen...</span>
            <Kbd size='sm'>Strg + K</Kbd>
        </UnstyledButton>
    );
}

/* search button shown on mobile, only used to open the spotlight */
export function SearchButton() {
    return (
        <ActionIcon variant='subtle' color='white' size='lg' hiddenFrom='sm' onClick={spotlight.open} aria-label='Suche ├Âffnen'>
            <IconSearch stroke={2} />
        </ActionIcon>
    );
}
