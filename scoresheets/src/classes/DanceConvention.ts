import { FinalCompetition, PrelimCompetition } from './Competition';
import { Uuid } from './Uuid';

export class DanceConvention {
    public Id: Uuid;

    public Name: string;
    public Date: Date;

    public PrelimCompetitions: Array<PrelimCompetition>;
    public FinalCompetitions: Array<FinalCompetition>;

    constructor(name?: string, date?: Date) {
        this.Id = Uuid.MakeNew();

        this.Name = name ?? "";
        this.Date = date ?? new Date();

        this.PrelimCompetitions = new Array<PrelimCompetition>();
        this.FinalCompetitions = new Array<FinalCompetition>();
    }
}