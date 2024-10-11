import { Uuid, ICompetition, CompetitionType, Division, Tier, WcsUtil, Role } from 'wcs-ss-lib';
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

    public get LeaderTier(): Tier {
        return this.GetTier(Role.Leader);
    }

    public get FollowerTier(): Tier {
        return this.GetTier(Role.Follower);
    }

    GetTier(role : Role) : Tier {
        if (this.PairedPrelimCompetitions[0] == undefined)
            return Tier.NoTier;

        let competition = this.PairedPrelimCompetitions[0];

        if (role == Role.Leader) {
            if (competition.LeaderPrelimCompetition == undefined)
                return Tier.NoTier;

            return WcsUtil.GetTier(competition.LeaderPrelimCompetition?.Competitors.length);
        }
        else if (role == Role.Follower) {
            if (competition.FollowerPrelimCompetition == undefined)
                return Tier.NoTier;

            return WcsUtil.GetTier(competition.FollowerPrelimCompetition.Competitors.length);
        }
        else {
            return Tier.NoTier;
        }
    }
}