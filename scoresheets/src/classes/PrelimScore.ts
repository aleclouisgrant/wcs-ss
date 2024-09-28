import { CallbackScore, IPrelimScore } from 'wcs-ss-lib';
import { Judge } from './Judge';
import { Competitor } from './Competitor';

export class PrelimScore implements IPrelimScore {
        public Competitor: Competitor | undefined;
        public Judge: Judge | undefined;
        public CallbackScore : CallbackScore;

    constructor(competitor? : Competitor, judge? : Judge, callbackScore? : CallbackScore) {
        this.Competitor = competitor;
        this.Judge = judge;

        this.CallbackScore = callbackScore ? callbackScore : CallbackScore.Unscored;
    }
}
