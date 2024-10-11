import { Uuid } from './Uuid';
import { ICompetition } from './ICompetition';

export interface IDanceConvention {
    Id: Uuid;

    Name: string;
    Date: Date;
    Competitions: ICompetition[];
}