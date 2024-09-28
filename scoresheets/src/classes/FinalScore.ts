import { IFinalScore } from 'wcs-ss-lib';
import { Competitor } from './Competitor';
import { Judge } from './Judge';

export class FinalScore implements IFinalScore {
    public Leader : Competitor | undefined;
    public Follower: Competitor | undefined;
    public Judge: Judge | undefined;
    public Score: number | undefined;

    constructor (leader? : Competitor, follower? : Competitor, judge? : Judge, score? : number) {
        this.Leader = leader;
        this.Follower = follower;
        this.Judge = judge;
        this.Score = score;
    }
}