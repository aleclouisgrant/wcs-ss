import { CallbackScore } from "./Enums";
import { ICompetitor } from "./ICompetitor";
import { IJudge } from "./IJudge";

export interface IPrelimScore {
    Competitor: ICompetitor | undefined;
    Judge: IJudge | undefined;
    CallbackScore: CallbackScore;
}