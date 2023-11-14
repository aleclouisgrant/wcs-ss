import { CallbackScore, Division, Role, Round, Tier } from "@/classes/Enums";
import { Uuid } from "@/classes/Uuid";

export interface IDatabaseModel {
    Id: Uuid;
}

export interface UserDbModel {
    Id: string;
    FirstName: string;
    LastName: string;
    WsdcId: number; 
}

export interface CompetitorProfileDbModel extends IDatabaseModel {
    UserId: Uuid;

    LeaderDivision: Division;
    LeaderAllowedDivision: Division;
    LeaderNewcomerPoints: number;
    LeaderNovicePoints: number;
    LeaderIntermediatePoints: number;
    LeaderAdvancedPoints: number;
    LeaderAllStarPoints: number;
    LeaderChampionPoints: number;

    FollowerDivision: Division;
    FollowerAllowedDivision: Division;
    FollowerNewcomerPoints: number;
    FollowerNovicePoints: number;
    FollowerIntermediatePoints: number;
    FollowerAdvancedPoints: number;
    FollowerAllStarPoints: number;
    FollowerChampionPoints: number;
}

export interface CompetitorRecordDbModel extends IDatabaseModel {
    CompetitorProfileId: Uuid;
    DanceConventionId: Uuid;
    BibNumber: number;
}

export interface JudgeProfileDbModel extends IDatabaseModel {
    UserId: Uuid;
}

export interface DanceConventionDbModel extends IDatabaseModel {
    Name: string;
    Date: Date;
    Location: string;
    Timezone: string;
}

export interface CompetitionDbModel extends IDatabaseModel {
    DanceConventionId: Uuid;
    Division: Division;
    LeaderTier: Tier;
    FollowerTier: Tier;
}

export interface PrelimCompetitionDbModel extends IDatabaseModel {
    CompetitionId: Uuid;
    DateTime: Date;
    Role: Role;
    Round: Round;
    PromotedCompetitors: Uuid[];
    CompetitorsRanking: Uuid[];
}

export interface PrelimScoreDbModel extends IDatabaseModel {
    PrelimCompetitionId: Uuid;
    JudgeId: Uuid;
    CompetitorId: Uuid;
    CallbackScore: CallbackScore;
}

export interface FinalCompetitionDbModel extends IDatabaseModel {
    CompetitionId: Uuid;
    DateTime: Date;
    Placements: {leader: Uuid, follower: Uuid}[];
}

export interface FinalScoreDbModel extends IDatabaseModel {
    FinalCompetitionId: Uuid;
    JudgeId: Uuid;
    LeaderId: Uuid;
    FollowerId: Uuid;
    Score: number;
}