import { CompetitionType, Division } from "./Enums";
import { IFinalCompetition } from "./IFinalCompetition";
import { IPairedPrelimCompetition } from "./IPairedPrelimCompetition";
import { Uuid } from "./Uuid";

export interface ICompetition {
    Id: Uuid;

    CompetitionType: CompetitionType;
    Division: Division;
    PairedPrelimCompetitions: Array<IPairedPrelimCompetition>;
    FinalCompetition: IFinalCompetition | undefined;
}