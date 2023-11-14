import validator from "validator";

export class Uuid {
    constructor (public uuid: string) {
        if (validator.isUUID(uuid)) {
            this._uuid = uuid;
        }
        else {
            throw new TypeError("String " + uuid + " is trying to be used as a UUID but does not pass UUID validation");
        }
    }

    private _uuid: string;

    public toString(): string {
        return this._uuid;
    }

    static MakeNew(): Uuid {
        var result: string;
        var i: string;
        var j: number;

        result = "";
        for (j = 0; j < 32; j++) {
            if (j == 8 || j == 12 || j == 16 || j == 20)
                result = result + '-';
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }
        return new Uuid(result);
    }
}