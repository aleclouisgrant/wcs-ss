import { FinalCompetition, PrelimCompetition } from './Competition';
import { Guid } from './Guid';
import { Util } from './Util';

export class DanceEvent {
    private _id: Guid;

    public Name: string;
    public Date: Date;

    public PrelimCompetitions: Array<PrelimCompetition>;
    public FinalCompetitions: Array<FinalCompetition>;

    constructor(name?: string, date?: Date) {
        this._id = Guid.MakeNew();

        this.Date = date != null ? date : new Date();
        this.Name = name != null ? name : "";

        this.PrelimCompetitions = new Array<PrelimCompetition>();
        this.FinalCompetitions = new Array<FinalCompetition>();
    }
}