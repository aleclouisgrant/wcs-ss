import { Competitor } from "./IPerson";

export interface ICouple {
    Leader : Competitor;
    Follower : Competitor;
}

export class Couple implements ICouple {
    public Leader: Competitor;
    public Follower: Competitor;

    constructor(leader: Competitor, follower: Competitor) {
        this.Leader = leader;
        this.Follower = follower;
    }
}