import { Division } from "./Enums";


export interface ICompetitorProfile {
    FullName: string;
    Division: Division;
    LeaderRating: number;
    FollowerRating: number;
}