import { Division } from "wcs-ss-lib";
import { ParseEEProPrelimScoreSheet, ParseEEProFinalScoreSheet } from "./eepro-parser";
import { Competition } from "@/classes/Competition";
import { ParseWorldDanceRegistryFinalScoreSheet, ParseWorldDanceRegistryPrelimScoreSheet } from "./worlddanceregistry-parser";

enum ScoresheetSource {
    EEPro,
    WorldDanceRegistry,
    DanceConvention,
    StepRightSolutions,
    ScoringDotDance,
    Other
}

function DetermineScoresheetSource(htmlString: string) : ScoresheetSource {
    var parserString = htmlString.substring(0, 200);

    if (parserString.includes("worlddanceregistry"))
        return ScoresheetSource.WorldDanceRegistry;
    else if (parserString.includes("steprightsolutions"))
        return ScoresheetSource.StepRightSolutions;
    else if (parserString.includes("eepro"))
        return ScoresheetSource.EEPro;
    else
        return ScoresheetSource.Other;
}

export function ParsePrelimScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    let comp: Competition | undefined;
    switch (DetermineScoresheetSource(htmlString)) {
        case ScoresheetSource.EEPro:
            comp = ParseEEProPrelimScoreSheet(htmlString, searchDivision);
            break;
        case ScoresheetSource.WorldDanceRegistry:
            comp = ParseWorldDanceRegistryPrelimScoreSheet(htmlString, searchDivision);
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
        case ScoresheetSource.WorldDanceRegistry:
            comp = ParseWorldDanceRegistryFinalScoreSheet(htmlString, searchDivision);
            break;
        }
    
    return comp;
}