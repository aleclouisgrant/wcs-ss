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

export class FinalScore extends Score {
    constructor(competitor? : Competitor, judge? : Judge) {
        super(competitor, judge);
    }
}