import { Division } from "./Enums";
import { Guid } from "./Guid";

export interface ICompetitorProfile {
    Id: Guid;
    FullName: string;
    Division: Division;
    LeaderRating: number;
    FollowerRating: number;
}

export interface ICompetitionProfile {
    
}