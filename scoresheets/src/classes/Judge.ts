import { IJudge } from "wcs-ss-lib";
import { Person } from "./Person";

export class Judge extends Person implements IJudge {
    get Initials() : string {
        return this.FirstName.charAt(0) + this.LastName.charAt(0);
    }
}