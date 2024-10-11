import { IPerson } from "./IPerson";

export interface ICompetitor extends IPerson {
    BibNumber: number | undefined;
    WsdcId: number | undefined;
}