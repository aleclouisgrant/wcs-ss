import { Division } from "./Enums";
import { Uuid } from "./Uuid";

export interface ICompetitorProfile {
    Id: Uuid;
    FullName: string;
    Division: Division;
    LeaderRating: number;
    FollowerRating: number;
}

export interface ICompetitionProfile {
    
}