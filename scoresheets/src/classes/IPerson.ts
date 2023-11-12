import { Guid } from './Guid';

export interface IPerson {
    Id : Guid;
    FirstName: string;
    LastName: string;
    FullName : string;
}

export abstract class Person implements IPerson {
    public Id: Guid;
    public FirstName: string;
    public LastName: string;

    constructor(firstName: string, lastName: string, id?: Guid, ) {
        this.FirstName = firstName;
        this.LastName = lastName;

        this.Id = id ?? Guid.MakeNew();
    }

    get FullName() : string {
        return this.FirstName + " " + this.LastName;
    }
}

export class Competitor extends Person {
    public BibNumber: number;

    constructor(firstName: string, lastName: string, bibNumber?: number, id?: Guid) {
        super(firstName, lastName, id);

        this.BibNumber = bibNumber != null ? bibNumber : 0;
    }
}

export class Judge extends Person {

}