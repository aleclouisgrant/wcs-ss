import { Uuid, Division } from "wcs-ss-lib";

export interface ICompetitorProfile {
    Id: Uuid;
    FullName: string;
    Division: Division;
    LeaderRating: number;
    FollowerRating: number;
}

export interface ICompetitionProfile {
    
}