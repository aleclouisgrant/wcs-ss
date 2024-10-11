import { Round } from "./Enums";
import { IPrelimCompetition } from "./IPrelimCompetition";

export interface IPairedPrelimCompetition {
    Round: Round;
    LeaderPrelimCompetition: IPrelimCompetition | undefined;
    FollowerPrelimCompetition: IPrelimCompetition | undefined;
}