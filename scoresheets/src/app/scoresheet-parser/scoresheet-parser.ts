import { Division } from "wcs-ss-lib";
import { ParseEEProPrelimScoreSheet, ParseEEProFinalScoreSheet } from "./eepro-parser";
import { Competition } from "@/classes/Competition";

enum ScoresheetSource {
    EEPro,
    WorldDanceRegistry,
    DanceConvention,
    StepRightSolutions,
    ScoringDotDance,
    Other
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

function DetermineScoresheetSource(htmlString: string) : ScoresheetSource {
    // var parserString = GetSubString(htmlString, "<!-- saved from", " -->");

    // if (parserString.includes("worlddanceregistry"))
    //     return ScoresheetSource.WorldDanceRegistry;
    // else if (parserString.includes("steprightsolutions"))
    //     return ScoresheetSource.StepRightSolutions;
    // else if (parserString.includes("eepro"))
    //     return ScoresheetSource.EEPro;
    // else
    //     return ScoresheetSource.Other;

    return ScoresheetSource.EEPro;
}

export function ParsePrelimScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    let comp: Competition | undefined;
    switch (DetermineScoresheetSource(htmlString)) {
        case ScoresheetSource.EEPro:
            comp = ParseEEProPrelimScoreSheet(htmlString, searchDivision);
            break;
        }
        
    return comp;
}

export function ParseFinalScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    let comp: Competition | undefined;
    switch (DetermineScoresheetSource(htmlString)) {
        case ScoresheetSource.EEPro:
            comp = ParseEEProFinalScoreSheet(htmlString, searchDivision);
            break;
        }
    
    return comp;
}