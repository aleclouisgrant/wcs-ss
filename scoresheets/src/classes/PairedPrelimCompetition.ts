import { IPairedPrelimCompetition, Round } from "wcs-ss-lib";
import { PrelimCompetition } from "./PrelimCompetition";

export class PairedPrelimCompetition implements IPairedPrelimCompetition {
    Round: Round;
    LeaderPrelimCompetition: PrelimCompetition | undefined;
    FollowerPrelimCompetition: PrelimCompetition | undefined;

    constructor(round: Round) {
        this.Round = round;
    }
}