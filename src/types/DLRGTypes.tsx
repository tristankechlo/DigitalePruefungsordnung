
interface IError {
    code: string;
    message: string;
}

enum DokumentTyp {
    Prüfungsordnung = "po",
    Merkblatt = "merkblatt",
    Abzeichen = "abzeichen"
}

interface IDokument {
    id: number; // integer
    titel: string;
    beschreibung?: string;
    typ?: DokumentTyp;
    link: string; // Link zum Abrufen des Dokuments (Assets) aus der globalen Medienverwaltung
}

interface IPruefungsordnungInfo {
    nr: number; // integer, Eindeutige Nummer der Prüfungsordnung
    name: string; // example: Schwimmen / Rettungsschwimmen
}

interface IPruefungsordnung {
    nr: number; // integer, Nummer der Prüfungsordnung (PO)
    name: string; // Name der Prüfungsordnung
    qualifikationen: IQualifikation[];
}

interface IQualifikation {
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
    inhalt: IInhalt[]; // Inhhalte der Qualifikation, sortiert
    voraussetzungen: IVorraussetzungen;
    pruefungen: IPruefung[]; // Notwendige Prüfungen für diese Qualifikation, sortiert
    prueferberechtigungen: IQualifikationInfo[]; // Ausbildungen, die mit dieser Ausbildung ausgestellt werden dürfen
    dokumente: IDokument[]; // Zusätzliche Dokumente mit weiteren Informationen zur Qualifikation
}

interface IQualifikationInfo {
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

interface IPruefung { // In einer Qualifikation enthaltene Prüfung
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

interface IInhalt { // Inhalt einer Qualifikation
    lehreinheiten: number; // double, example: 2.5
    inhalt: string;
    einordnung: InhaltEinordnung;
}

interface IVorraussetzungen { // Für eine Qualifikation notwendige Voraussetzung
    qualifikationen: IVoraussetzungQualifikation[];
    hospitationen: IVoraussetzungHospitation[];
    sonstiges: IVoraussetzungSonstiges[];
    mindestalter: IVoraussetzungMindestalter;
    aerztliche_tauglichkeit: IVoraussetzung;
    mitgliedschaft: IVoraussetzung;
    befuerwortung: IVoraussetzung;
}

interface IVoraussetzungQualifikation {
    qualifikation: IQualifikationInfo;
    kommentar: string;
}

interface IVoraussetzungHospitation {
    kommentar: string;
}

interface IVoraussetzungSonstiges {
    anzahl: number;
    kommentar: string;
}

interface IVoraussetzungMindestalter {
    istErforderlich: boolean;
    alter: number;
    kommentar: string;
}

interface IVoraussetzung {
    istErforderlich: boolean;
    kommentar: string;
}

export type { IError, IDokument, IPruefungsordnungInfo, IPruefungsordnung, IQualifikation, IQualifikationInfo, IPruefung, 
    IInhalt, IVorraussetzungen, IVoraussetzungQualifikation, IVoraussetzungHospitation, IVoraussetzungSonstiges, 
    IVoraussetzungMindestalter, IVoraussetzung };
export { DokumentTyp, PruefungEinordnung, InhaltEinordnung };
