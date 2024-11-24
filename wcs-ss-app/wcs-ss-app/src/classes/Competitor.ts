import { ICompetitor, Uuid } from "wcs-ss-lib";
import { Person } from "./Person";

export class Competitor extends Person implements ICompetitor  {
    public BibNumber: number;
    public WsdcId: number;

    constructor(firstName: string, lastName: string, bibNumber?: number, wsdcId?: number, id?: Uuid) {
        super(firstName, lastName);

        this.WsdcId = wsdcId ?? 0;
        this.BibNumber = bibNumber ?? 0;
        this.Id = id ?? Uuid.MakeNew();
    }
}