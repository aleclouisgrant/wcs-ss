import { Uuid, IDanceConvention } from 'wcs-ss-lib';
import { Competition } from './Competition';

export class DanceConvention implements IDanceConvention {
    public Id: Uuid;

    public Name: string;
    public Date: Date;
    public Competitions: Competition[];

    constructor(name?: string, date?: Date) {
        this.Id = Uuid.MakeNew();

        this.Name = name ?? "";
        this.Date = date ?? new Date();
        this.Competitions = [];
    }
}