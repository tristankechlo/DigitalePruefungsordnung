import { Container, Title, rem, Text, Accordion, Grid, Image, Box, Divider, TitleProps, DividerProps, BoxProps, Pill, Group, Stack } from '@mantine/core';
import { VoraussetzungGeneric, VoraussetzungMindestalter } from './qualification/VoraussetzungEntries';
import { compareQualification, getQualification, qualificationToUrl } from '../util/Utils';
import { PruefungEinordnung, InhaltEinordnung, DokumentTyp } from '../types/DLRGTypes';
import AdditionalRequirements from './qualification/AdditionalRequirements';
import { IconClipboardHeart, IconUserCheck } from '@tabler/icons-react';
import LinkedQualification from './qualification/LinkedQualification';
import { PrüfungCategory } from './qualification/PrüfungCategory';
import { TEXT_PROPS, SUBTITLE_PROPS } from '../util/CommonProps';
import { InhaltCategory } from './qualification/InhaltCategory';
import ConditionalEntry from './qualification/ConditionalEntry';
import type { IQualifikation } from '../types/DLRGTypes';
import Hospitations from './qualification/Hospitations';
import Dokumente from './qualification/DokumenteEntry';
import classes from './Qualification.module.css';
import { useLocation } from 'react-router-dom';
import { AppState } from '../util/AppState';
import { useContext, useEffect } from 'react';


// check if the categorie 'vorraussetzungen' should be rendered
function shouldRenderVoraussetzungen(q: IQualifikation) {
    return q.voraussetzungen.mindestalter.istErforderlich
        || q.voraussetzungen.aerztliche_tauglichkeit.istErforderlich
        || q.voraussetzungen.mitgliedschaft.istErforderlich
        || q.voraussetzungen.befuerwortung.istErforderlich
        || q.voraussetzungen.sonstiges.length > 0
        || q.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).length > 0
        || q.voraussetzungen.hospitationen.length > 0;
}

interface QualificationProps {
    openTabs?: string[];
    setOpenTabs: (tabs: string[]) => void;
}

const DIVIDER_PROPS: DividerProps = { size: "sm", labelPosition: 'left', color: "gray" }
const DIVIDER_TITLE_PROPS: TitleProps = { order: 2, size: 'h3', my: 'xs', c: "#000000", className: classes.dividerTitle }
const BOX_PROPS: BoxProps = { mb: "xs", mx: "sm" }

export default function Qualification(props: QualificationProps) {

    const appState = useContext(AppState);
    const { pathname } = useLocation();
    const quali = getQualification(pathname.replace(/\//g, ''), appState);

    if (quali === undefined) {
        return (
            <Container size={rem(1200)} my='md' className={classes.qualification}>
                <Title order={1} mb='md'>Qualifikation wurde nicht gefunden</Title>
            </Container>
        );
    }

    useEffect(() => {
        document.title = `${quali.name} | __TITLE__`;
        (document.getElementById('canonical') as HTMLLinkElement).href = `__MAIN_URL__/${qualificationToUrl(quali)}`
    }, [quali]);

    const hasVoraussetzungen = shouldRenderVoraussetzungen(quali);
    const titel = quali.dokumente.find((d) => d.typ === DokumentTyp.Abzeichen)?.titel;
    const abzeichenUrl = `/dlrg-assets/icons/${titel}`;
    const hasIcon = titel !== undefined;

    const neededFor = [...appState.qualifications?.values() || []].filter(q => q.voraussetzungen.qualifikationen.find(a => a.qualifikation.id === quali.id)).sort(compareQualification);
    const createdBy = [...appState.qualifications?.values() || []].filter(q => q.prueferberechtigungen.find(a => a.id === quali.id)).sort(compareQualification);
    const prueferFor = quali.prueferberechtigungen.filter((q) => q.istAktiv).sort(compareQualification);

    const hasRelation = createdBy.length > 0 || neededFor.length > 0 || prueferFor.length > 0;

    return (
        <Container size={rem(1100)} mt='md' mb="xl" className={classes.container}>

            <Grid gutter={0} justify='space-between'>
                <Grid.Col span="auto">
                    <Group gap={0} align="center" mb="xs">
                        <Pill bg="#0069b4" c="white" size='md' mr="xs">{quali.nr}</Pill>
                        <Title c="#0069b4" order={1} size='h3' className={classes.mainTitle}>
                            {quali.name}
                        </Title>
                    </Group>
                    {quali.abkuerzung &&
                        <Text {...TEXT_PROPS}><b>Abkürzung:</b> {quali.abkuerzung}</Text>
                    }
                    {quali.gueltigkeit &&
                        <Text {...TEXT_PROPS}><b>Gültigkeit der Qualifikation:</b> {quali.gueltigkeit} Jahre</Text>
                    }
                    <ConditionalEntry content={quali.verlaengerungUE} text="Anzahl der benötigten Lehreinheiten für die Verlängerung der Qualifikation" />
                    {quali.pruefungenGueltigkeit &&
                        <Text {...TEXT_PROPS}><b>Zeitraum in dem alle Prüfungsleistungen abgelegt werden müssen:</b> {quali.pruefungenGueltigkeit} Monate</Text>
                    }
                    {quali.beauftragung &&
                        <Text {...TEXT_PROPS}><b>Gültigkeit der Beauftragung / des Lehrauftrags:</b> {quali.beauftragung} Jahre</Text>
                    }
                    <ConditionalEntry content={quali.wiederholung} text="Empfehlung nach wie vielen Jahren die Qualifikation wiederholt werden sollte" />
                    <ConditionalEntry content={quali.stellenLfdNr} text="Anzahl an Stellen für die laufende Nummer der Registriernummer" />
                </Grid.Col>
                {hasIcon ?
                    <Grid.Col span="content">
                        <Image m={5} src={abzeichenUrl} w={{ base: 60, xs: 75, md: 100 }} width={60} height='auto' fallbackSrc='/image-not-found.svg' loading='lazy' />
                    </Grid.Col> : null}
            </Grid>
            {hasVoraussetzungen && (<>
                <Divider {...DIVIDER_PROPS} label={
                    <Title {...DIVIDER_TITLE_PROPS}>Voraussetzungen</Title>}
                />
                <Box {...BOX_PROPS}>
                    <VoraussetzungMindestalter {...quali.voraussetzungen.mindestalter} />
                    <VoraussetzungGeneric
                        {...quali.voraussetzungen.aerztliche_tauglichkeit}
                        text='Ärztliche Tauglichkeitserklärung'
                        icon={IconClipboardHeart}
                    />
                    <VoraussetzungGeneric
                        {...quali.voraussetzungen.mitgliedschaft}
                        text='Mitgliedschaft in der DLRG'
                        icon={IconUserCheck}
                    />
                    <VoraussetzungGeneric {...quali.voraussetzungen.befuerwortung} text='Befürwortung durch den Ortsverein' />

                    {quali.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).length > 0 &&
                        <Box mt="xs">
                            <Text {...SUBTITLE_PROPS}>Erforderliche Qualifikationen:</Text>
                            <Stack gap={5}>
                                {quali.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).map((q, i) =>
                                    <LinkedQualification key={i} q={q.qualifikation} c={q.kommentar} />
                                )}
                            </Stack>
                        </Box>
                    }

                    {quali.voraussetzungen.hospitationen.length > 0 &&
                        <Box mt="xs">
                            <Text {...SUBTITLE_PROPS} pb={0}>Erforderliche Hospitationen:</Text>
                            <Hospitations entries={quali.voraussetzungen.hospitationen} />
                        </Box>
                    }
                    {quali.voraussetzungen.sonstiges.length > 0 &&
                        <Box mt="xs">
                            <Text {...SUBTITLE_PROPS} pb={0}>Weitere Voraussetzungen:</Text>
                            <AdditionalRequirements entries={quali.voraussetzungen.sonstiges} />
                        </Box>
                    }
                </Box>
            </>)}

            {quali.inhalt.length > 0 && (<>
                <Divider {...DIVIDER_PROPS} label={
                    <Title {...DIVIDER_TITLE_PROPS}>Inhalte</Title>}
                />
                <Box {...BOX_PROPS}>
                    <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Fachlich} title="Fachlich" />
                    <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Methodisch_Didaktisch} title="Methodisch-Didaktisch" />
                    <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Übergreifend} title="Fachübergreifend" />
                </Box>
            </>)}

            {quali.pruefungen.length > 0 && (<>
                <Divider {...DIVIDER_PROPS} label={
                    <Title {...DIVIDER_TITLE_PROPS}>Prüfungen</Title>}
                />
                <Box {...BOX_PROPS}>
                    <PrüfungCategory pruefungen={quali.pruefungen} einordnung={PruefungEinordnung.Theoretisch} title="Theoretisch" />
                    <PrüfungCategory pruefungen={quali.pruefungen} einordnung={PruefungEinordnung.Praktisch} title="Praktisch" />
                </Box>
            </>)}

            {quali.dokumente.length > 0 && (<>
                <Divider {...DIVIDER_PROPS} label={
                    <Title {...DIVIDER_TITLE_PROPS}>Dokumente</Title>}
                />
                <Box {...BOX_PROPS}>
                    <Dokumente dokumente={quali.dokumente} />
                </Box>
            </>)}

            {hasRelation && (<>
                <Divider {...DIVIDER_PROPS} label={
                    <Title {...DIVIDER_TITLE_PROPS}>Beziehung zu anderen Qualifikationen</Title>}
                />

                <Accordion multiple value={props.openTabs} onChange={props.setOpenTabs}>

                    {createdBy.length > 0 &&
                        <Accordion.Item value='erstellt_von'>
                            <Accordion.Control>Ausgestellt/Geprüft durch:</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={5}>
                                    {createdBy.map((q) => (
                                        <LinkedQualification key={q.id} q={q} />
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    }

                    {prueferFor.length > 0 &&
                        <Accordion.Item value='pruefer_fuer'>
                            <Accordion.Control>Befähigt zur Prüfung von:</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={5}>
                                    {prueferFor.map((q) => (
                                        <LinkedQualification key={q.id} q={q} />
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    }

                    {neededFor.length > 0 &&
                        <Accordion.Item value='voraussetzung_fuer'>
                            <Accordion.Control>Voraussetzung für weitere Qualifikation</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={5}>
                                    {neededFor.map((q) => (
                                        <LinkedQualification key={q.id} q={q} />
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    }

                </Accordion>
            </>)}

        </Container >
    );

}
