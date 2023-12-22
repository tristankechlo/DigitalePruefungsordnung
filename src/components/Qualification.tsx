import { VoraussetzungGeneric, VoraussetzungMindestalter } from './qualification/VoraussetzungEntries';
import { PruefungEinordnung, InhaltEinordnung } from '../types/DLRGTypes';
import { Container, Title, rem, Text, Accordion } from '@mantine/core';
import { InhaltCategory, PrüfungCategory } from './qualification/SortableEntries';
import { TEXT_PROPS, SUBTITLE_PROPS } from '../util/CommonProps';
import type { Qualifikation } from '../types/DLRGTypes';
import LinkedQualification from './qualification/LinkedQualification';
import ConditionalEntry from './qualification/ConditionalEntry';
import { useParams } from 'react-router-dom';
import Dokumente from './qualification/DokumenteEntry';
import classes from './Qualification.module.css';


// check if the categorie 'sonstiges' should be rendered
function shouldRenderSonstiges(q: Qualifikation) {
    return q.stellenLfdNr || q.gueltigkeit || q.beauftragung || q.wiederholung
        || q.pruefungenGueltigkeit || q.verlaengerungUE || q.verlaengerungBeauftragungUE
        || q.prueferberechtigungen.filter((q) => q.istAktiv).length > 0;
}


// check if the categorie 'vorraussetzungen' should be rendered
function shouldRenderVoraussetzungen(q: Qualifikation) {
    return q.voraussetzungen.mindestalter.istErforderlich
        || q.voraussetzungen.aerztliche_tauglichkeit.istErforderlich
        || q.voraussetzungen.mitgliedschaft.istErforderlich
        || q.voraussetzungen.befuerwortung.istErforderlich
        || q.voraussetzungen.sonstiges.length > 0
        || q.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).length > 0
        || q.voraussetzungen.hospitationen.length > 0;
}

interface QualificationProps {
    qualifikations?: Qualifikation[];
    openTabs?: string[];
    setOpenTabs: (tabs: string[]) => void;
}

export default function Qualification(props: QualificationProps) {

    const { id } = useParams();
    const quali = props.qualifikations?.find((q1) => q1.id === id);

    if (quali === undefined) {
        return (
            <Container size={rem(1200)} my='md' className={classes.qualification}>
                <Title order={1} mb='md'>Qualifikation wurde nicht gefunden</Title>
            </Container>
        );
    }

    const hasVoraussetzungen = shouldRenderVoraussetzungen(quali);
    const hasSonstiges = shouldRenderSonstiges(quali);

    return (
        <Container size={rem(1100)} my='md' className={classes.container}>
            <Title order={1} size='h3' mb='md' className={classes.mainTitle}>{quali.name}</Title>

            {quali.abkuerzung ? <Text {...TEXT_PROPS} className={classes.abkuerzung}><b>Abkürzung:</b> {quali.abkuerzung}</Text> : null}

            <Accordion multiple value={props.openTabs} onChange={props.setOpenTabs} classNames={{
                label: classes.accordionLabel,
                control: classes.accordionControl,
                content: classes.accordionContent,
            }}>
                {hasVoraussetzungen ? // render the 'vorraussetzungen' category if needed
                    <Accordion.Item value='voraussetzungen'>
                        <Accordion.Control>Voraussetzungen</Accordion.Control>
                        <Accordion.Panel>
                            <VoraussetzungMindestalter {...quali.voraussetzungen.mindestalter} />
                            <VoraussetzungGeneric {...quali.voraussetzungen.aerztliche_tauglichkeit} text='Ärztliche Tauglichkeitserklärung erforderlich' />
                            <VoraussetzungGeneric {...quali.voraussetzungen.mitgliedschaft} text='Mitgliedschaft in der DLRG erforderlich' />
                            <VoraussetzungGeneric {...quali.voraussetzungen.befuerwortung} text='Befürwortung durch den Ortsverein erforderlich' />
                            {quali.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).length > 0 ? <Text {...SUBTITLE_PROPS}>Erforderliche Qualifikationen:</Text> : null}
                            {quali.voraussetzungen.qualifikationen.filter((q) => q.qualifikation.istAktiv).map((q, i) =>
                                <LinkedQualification key={i} po={q.qualifikation.poNr} q={q.qualifikation} c={q.kommentar} />
                            )}
                            {quali.voraussetzungen.hospitationen.length > 0 ? <Text {...SUBTITLE_PROPS}>Erforderliche Hospitationen:</Text> : null}
                            {quali.voraussetzungen.hospitationen.map((h, i) => {
                                return (<Text {...TEXT_PROPS} key={i}>{h.kommentar}</Text>);
                            })}
                            {quali.voraussetzungen.sonstiges.length > 0 ? <Text {...SUBTITLE_PROPS}>Sonstige Voraussetzungen:</Text> : null}
                            {quali.voraussetzungen.sonstiges.map((s, i) => {
                                const prefix = s.anzahl > 1 ? `${s.anzahl}mal: ` : "";
                                return (<Text {...TEXT_PROPS} key={i}>- {prefix}{s.kommentar}</Text>);
                            })}
                        </Accordion.Panel>
                    </Accordion.Item> : null}

                {quali.inhalt.length > 0 ? // render the 'inhalte' category if needed
                    <Accordion.Item value='inhalte'>
                        <Accordion.Control>Inhalte</Accordion.Control>
                        <Accordion.Panel>
                            <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Fachlich} title="Fachlich" />
                            <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Methodisch_Didaktisch} title="Methodisch-Didaktisch" />
                            <InhaltCategory inhalte={quali.inhalt} e={InhaltEinordnung.Übergreifend} title="Fachübergreifend" />
                        </Accordion.Panel>
                    </Accordion.Item> : null}

                {quali.pruefungen.length > 0 ? // render the 'pruefungen' category if needed
                    <Accordion.Item value='pruefungen'>
                        <Accordion.Control>Prüfungen</Accordion.Control>
                        <Accordion.Panel>
                            <PrüfungCategory pruefungen={quali.pruefungen} einordnung={PruefungEinordnung.Theoretisch} title="Theoretisch" />
                            <PrüfungCategory pruefungen={quali.pruefungen} einordnung={PruefungEinordnung.Praktisch} title="Praktisch" />
                        </Accordion.Panel>
                    </Accordion.Item> : null}

                {hasSonstiges ? // render the 'sonstiges' category if needed
                    <Accordion.Item value='sonstiges'>
                        <Accordion.Control>Sonstiges</Accordion.Control>
                        <Accordion.Panel>
                            <ConditionalEntry content={quali.stellenLfdNr} text="Anzahl an Stellen für die laufende Nummer der Registriernummer" />
                            <ConditionalEntry content={quali.gueltigkeit} text="Gültigkeit der Qualifikation in Jahren" />
                            <ConditionalEntry content={quali.beauftragung} text="Gültigkeit der Beauftragung/ des Lehrauftrags in Jahren" />
                            <ConditionalEntry content={quali.wiederholung} text="Empfehlung nach wie vielen Jahren die Qualifikation wiederholt werden sollte" />
                            <ConditionalEntry content={quali.pruefungenGueltigkeit} text="Zeitraum (in Monaten) in dem alle Prüfungsleistungen abgelegt werden müssen" />
                            <ConditionalEntry content={quali.verlaengerungUE} text="Anzahl der benötigten Lehreinheiten für die Verlängerung der Qualifikation" />
                            <ConditionalEntry content={quali.verlaengerungBeauftragungUE} text="Anzahl der benötigten Lehreinheiten für die Verländerung der Beauftragung der Qualifikation" />

                            {quali.prueferberechtigungen.filter((q) => q.istAktiv).length > 0 ? <Text {...SUBTITLE_PROPS}>Ausbildungen, die mit dieser Ausbildung ausgestellt werden dürfen:</Text> : null}
                            {quali.prueferberechtigungen.filter((q) => q.istAktiv).map((q, i) =>
                                <LinkedQualification key={i} po={q.poNr} q={q} />
                            )}
                        </Accordion.Panel>
                    </Accordion.Item> : null}

                {quali.dokumente.length > 0 ? // render the 'dokumente' category if needed
                    <Accordion.Item value='dokumente'>
                        <Accordion.Control>Dokumente</Accordion.Control>
                        <Accordion.Panel>
                            <Dokumente dokumente={quali.dokumente} title='Zusätzliche Dokumente' />
                        </Accordion.Panel>
                    </Accordion.Item> : null}


            </Accordion>
        </Container>
    );

}
