import { Guid } from './Guid';
import { Score } from './IScore';

export interface IPerson {
    FullName : string;
}

export abstract class Person implements IPerson {
    private _firstName: string;
    private _lastName: string;

    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
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
    private _id: Guid;
    public BibNumber: number;
    public Scores: Array<Score>;

    constructor(firstName: string, lastName: string, bibNumber?: number) {
        super(firstName, lastName);

        this._id = Guid.MakeNew();
        this.Scores = new Array<Score>;

        this.BibNumber = bibNumber != null ? bibNumber : 0;
    }
}

export class Judge extends Person {

}