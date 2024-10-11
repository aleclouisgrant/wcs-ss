import { Division } from "./Enums";
import { IFinalScore } from "./IFinalScore";
import { IJudge } from "./IJudge";

export interface IFinalCompetition {    
    Judges: Array<IJudge>;
    Division: Division;
    Scores: Array<Array<IFinalScore>>;
    get CoupleCount() : number;
}