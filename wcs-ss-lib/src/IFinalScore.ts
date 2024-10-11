import { ICompetitor } from "./ICompetitor";
import { IJudge } from "./IJudge";

export interface IFinalScore {
    Leader: ICompetitor | undefined;
    Follower: ICompetitor | undefined;
    Judge: IJudge | undefined;
    Score: number | undefined;
}