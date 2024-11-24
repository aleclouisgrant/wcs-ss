import { Uuid, IPerson } from 'wcs-ss-lib';

export abstract class Person implements IPerson {
    public Id: Uuid;
    public FirstName: string;
    public LastName: string;

    constructor(firstName: string, lastName: string, id?: Uuid) {
        this.FirstName = firstName;
        this.LastName = lastName;

        this.Id = id ?? Uuid.MakeNew();
    }

    get FullName() : string {
        return this.FirstName + " " + this.LastName;
    }
}