import { Uuid } from "./Uuid";

export interface IPerson {
    Id : Uuid;
    FirstName: string;
    LastName: string;
    FullName : string;
}