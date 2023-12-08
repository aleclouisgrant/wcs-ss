import { Competitor, Judge } from './IPerson';
import { CallbackScore } from './Enums';

export interface IScore {
    Competitor: Competitor | null | undefined;
    Judge: Judge | null | undefined;
}

export abstract class Score implements IScore {
    public Competitor: Competitor | null | undefined;
    public Judge: Judge | null | undefined;

    constructor(competitor? : Competitor, judge? : Judge){
        this.Competitor = competitor;
        this.Judge = judge;
    }
}

export class PrelimScore extends Score {
        public CallbackScore : CallbackScore;

    constructor(competitor? : Competitor, judge? : Judge, callbackScore? : CallbackScore) {
        super(competitor, judge);

        if (callbackScore == null) {
            this.CallbackScore = CallbackScore.Unscored;
        }
        else {
            this.CallbackScore = callbackScore;
        }

    }
}

export class FinalScore {
    public Leader : Competitor;
    public Follower: Competitor;
    Judge: Judge | null | undefined;
    public Score: number;

    constructor (leader : Competitor, follower : Competitor, judge? : Judge, score? : number) {
        this.Leader = leader;
        this.Follower = follower;
        this.Judge = judge;
        this.Score = score ?? -1;
    }
}