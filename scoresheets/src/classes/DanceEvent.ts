import { FinalCompetition, PrelimCompetition } from './Competition';
import { Guid } from './Guid';

export class DanceEvent {
    private _id: Guid;

    public Name: string;
    public Date: Date;

    public PrelimCompetitions: Array<PrelimCompetition>;
    public FinalCompetitions: Array<FinalCompetition>;

    constructor(name?: string, date?: Date) {
        this._id = Guid.MakeNew();

        this.Name = name ?? "";
        this.Date = date ?? new Date();

        this.PrelimCompetitions = new Array<PrelimCompetition>();
        this.FinalCompetitions = new Array<FinalCompetition>();
    }
}