import { Division, Role, Round } from "./Enums";
import { ICompetitor } from "./ICompetitor";
import { IJudge } from "./IJudge";
import { IPrelimScore } from "./IPrelimScore";
import { Uuid } from "./Uuid";

export interface IPrelimCompetition {
    Id: Uuid;
    Scores: Array<IPrelimScore>;

    Division: Division;
    Round: Round;
    Role: Role;

    Competitors: Array<ICompetitor>;
    Judges: Array<IJudge>;

    Promoted: Array<ICompetitor>;
    Alternate1: ICompetitor | undefined;
    Alternate2: ICompetitor | undefined;
}