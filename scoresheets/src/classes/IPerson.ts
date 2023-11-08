import { Guid } from './Guid';

export interface IPerson {
    FullName : string;
    Id : Guid;
}

export abstract class Person implements IPerson {
    private _firstName: string;
    private _lastName: string;

    public Id: Guid;

    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;

        this.Id = Guid.MakeNew();
    }

    get FullName() : string {
        return this._firstName + " " + this._lastName;
    }

    public SetName(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
    }
}

export class Competitor extends Person {
    public BibNumber: number;

    constructor(firstName: string, lastName: string, bibNumber?: number) {
        super(firstName, lastName);

        this.BibNumber = bibNumber != null ? bibNumber : 0;
    }
}

export class Judge extends Person {

}