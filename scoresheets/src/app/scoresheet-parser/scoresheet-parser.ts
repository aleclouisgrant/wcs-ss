import { Division } from "wcs-ss-lib";
import { ParseEEProPrelimScoreSheet, ParseEEProFinalScoreSheet } from "./eepro-parser";
import { Competition } from "@/classes/Competition";

enum ScoresheetSource {
    EEPro,
    WorldDanceRegistry,
    DanceConvention,
    StepRightSolutions,
    ScoringDotDance
}

function DetermineScoresheetSource(htmlString: string) : ScoresheetSource {
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