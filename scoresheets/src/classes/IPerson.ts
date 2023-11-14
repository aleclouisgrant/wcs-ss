import { Uuid } from './Uuid';

export interface IPerson {
    Id : Uuid;
    FirstName: string;
    LastName: string;
    FullName : string;
}

export abstract class Person implements IPerson {
    public Id: Uuid;
    public FirstName: string;
    public LastName: string;

    constructor(firstName: string, lastName: string) {
        this.FirstName = firstName;
        this.LastName = lastName;

        this.Id = Uuid.MakeNew();
    }

    get FullName() : string {
        return this.FirstName + " " + this.LastName;
    }
}

export class Competitor extends Person {
    public BibNumber: number;
    public WsdcId: number;

    constructor(firstName: string, lastName: string, bibNumber?: number, wsdcId?: number) {
        super(firstName, lastName);

        this.WsdcId = wsdcId ?? 0;
        this.BibNumber = bibNumber ?? 0;
    }
}

export class Judge extends Person {

}