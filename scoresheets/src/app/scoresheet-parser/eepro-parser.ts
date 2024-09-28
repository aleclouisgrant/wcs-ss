import { Competition } from "@/classes/Competition";
import { ICompetition } from "wcs-ss-lib";

function IndexOfN(s: string, match: string, n: number) : number {
    var i = 1;
    var index = -1;

    while (i <= n && (index = s.indexOf(match, index + 1)) != -1) {
        if (i == n)
            return index;
        i++;
    }

    return -1;
}

function GetSubString(s: string, from: string, to: string) : string {
    if (s == null || s == "") {
        return "";
    }

    const fromIndex = s.indexOf(from) + from.length;
    const choppedString = s.substring(fromIndex, s.length - fromIndex);
    const toIndex = choppedString.indexOf(to) + fromIndex;

    var sub = "";
    sub = s.substring(fromIndex, toIndex - fromIndex);

    return sub;
}

function GetSubStringN(s: string, from: string, to: string, n: number) : string {
    const fromIndex = IndexOfN(s, from, n) + from.length;
    const toIndex = IndexOfN(s, to, n);
    
    var sub = "";
    sub = s.substring(fromIndex, toIndex - fromIndex);

    return sub;
}

export function ParseEEProScoreSheet(htmlString: string) : ICompetition {
    //const doc = DOMParser.parseFromString(htmlString);

    //TODO: implement parser for EEPro score sheet
    console.log("htmlString: ", htmlString);

    var comp = new Competition();
    return comp;
}