import { ICompetitor } from "./ICompetitor";

export interface ICompetitorRegistration {
    Competitor: ICompetitor | undefined;
    BibNumber: string | undefined;
}