
interface Error {
    code: string;
    message: string;
}

enum DokumentTyp {
    Prüfungsordnung = "po",
    Merkblatt = "merkblatt",
    Abzeichen = "abzeichen"
}

interface Dokument {
    id: number; // integer
    titel: string;
    beschreibung?: string;
    typ?: DokumentTyp;
    link: string; // Link zum Abrufen des Dokuments (Assets) aus der globalen Medienverwaltung
}

interface PruefungsordnungInfo {
    nr: number; // integer, Eindeutige Nummer der Prüfungsordnung
    name: string; // example: Schwimmen / Rettungsschwimmen
}

interface Pruefungsordnung {
    nr: number; // integer, Nummer der Prüfungsordnung (PO)
    name: string; // Name der Prüfungsordnung
    qualifikationen: Qualifikation[];
}

interface Qualifikation {
    id: string; // Eindeutige UUID der Qualifikation
    nr: string; // Eindeutige PO Nummer (Prüfungsschlüssel) der Qualifikation gemäß der Prüfungsordnung
    poNr: number; // integer, Nummer der Prüfungsordnung (PO) in der die Qualifikation beschrieben ist
    istAktiv: boolean; // Ist die Qualifikation zum aktuellen Zeitpunkt aktiv?
    abkuerzung?: string; // example: DSJA Gold
    name: string; // example: Deutsches Schwimmabzeichen in Gold
    stellenLfdNr: number; // integer, Anzahl Stellen für die laufende Nummer der Registriernummer
    gueltigkeit?: number; // integer, Gültigkeit der Qualifikation in Jahren
    beauftragung?: number; // integer, Gültigkeit der Beauftragung/ des Lehrauftrags in Jahren
    wiederholung?: number; // integer, Empfehlung nach wie vielen Jahren die Qualifikation wiederholt werden sollte
    pruefungenGueltigkeit?: number; // integer, In welchem Zeitraum (in Monaten) müssen die Prüfungsleistungen abgelegt werden?
    verlaengerungUE?: number; // double, Anzahl der benötigten Lehreinheiten für die Verlängerung der Qualifikation.
    verlaengerungBeauftragungUE?: number; // double, Anzahl der benötigten Lehreinheiten für die Verländerung der Beauftragung der Qualifikation.
    inhalt: Inhalt[]; // Inhhalte der Qualifikation, sortiert
    voraussetzungen: Vorraussetzungen;
    pruefungen: Pruefung[]; // Notwendige Prüfungen für diese Qualifikation, sortiert
    prueferberechtigungen: QualifikationInfo[]; // Ausbildungen, die mit dieser Ausbildung ausgestellt werden dürfen
    dokumente: Dokument[]; // Zusätzliche Dokumente mit weiteren Informationen zur Qualifikation
}

interface QualifikationInfo {
    id: string; // Eindeutige UUID der Qualifikation
    nr: string; // Eindeutige PO Nummer (Prüfungsschlüssel) der Qualifikation gemäß der Prüfungsordnung
    poNr: number; // integer, Nummer der Prüfungsordnung (PO) in der die Qualifikation beschrieben ist
    istAktiv: boolean; // Ist die Qualifikation zum aktuellen Zeitpunkt aktiv?
    abkuerzung?: string; // example: DSJA Gold
    name: string; // example: Deutsches Schwimmabzeichen in Gold
}

enum PruefungEinordnung {
    Theoretisch = "theoretisch",
    Praktisch = "praktisch"
}

interface Pruefung { // In einer Qualifikation enthaltene Prüfung
    id: string; // Eindeutige UUID der Prüfung
    beschreibung: string; // example: Startsprung und 25 m Kraulschwimmen
    einordnung: PruefungEinordnung;
    gueltigkeit?: number; // integer, Gültigkeit in Monaten
}

enum InhaltEinordnung {
    Übergreifend = "uebergreifend",
    Fachlich = "fachlich",
    Methodisch_Didaktisch = "methodisch_didaktisch"
}

interface Inhalt { // Inhalt einer Qualifikation
    lehreinheiten: number; // double, example: 2.5
    inhalt: string;
    einordnung: InhaltEinordnung;
}

interface Vorraussetzungen { // Für eine Qualifikation notwendige Voraussetzung
    qualifikationen: VoraussetzungQualifikation[];
    hospitationen: VoraussetzungHospitation[];
    sonstiges: VoraussetzungSonstiges[];
    mindestalter: VoraussetzungMindestalter;
    aerztliche_tauglichkeit: Voraussetzung;
    mitgliedschaft: Voraussetzung;
    befuerwortung: Voraussetzung;
}

interface VoraussetzungQualifikation {
    qualifikation: QualifikationInfo;
    kommentar: string;
}

interface VoraussetzungHospitation {
    kommentar: string;
}

interface VoraussetzungSonstiges {
    anzahl: number;
    kommentar: string;
}

interface VoraussetzungMindestalter {
    istErforderlich: boolean;
    alter: number;
    kommentar: string;
}

interface Voraussetzung {
    istErforderlich: boolean;
    kommentar: string;
}

export type { Error, Dokument, PruefungsordnungInfo, Pruefungsordnung, Qualifikation, QualifikationInfo, Pruefung, Inhalt, Vorraussetzungen, VoraussetzungQualifikation, VoraussetzungHospitation, VoraussetzungSonstiges, VoraussetzungMindestalter, Voraussetzung };
export { DokumentTyp, PruefungEinordnung, InhaltEinordnung };
