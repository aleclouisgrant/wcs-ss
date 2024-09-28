import { Uuid, ICompetition, CompetitionType, Division } from 'wcs-ss-lib';
import { FinalCompetition } from './FinalCompetition';
import { PairedPrelimCompetition } from './PairedPrelimCompetition';

export class Competition implements ICompetition {
    public Id: Uuid;

    public CompetitionType: CompetitionType;
    public Division: Division;

    public PairedPrelimCompetitions: PairedPrelimCompetition[] = [];
    public FinalCompetition: FinalCompetition | undefined;

    constructor(competitionType?: CompetitionType, division?: Division) {
        this.Id = Uuid.MakeNew();

        this.CompetitionType = CompetitionType.JnJ;
        this.Division = division ?? Division.Open;
    }
}