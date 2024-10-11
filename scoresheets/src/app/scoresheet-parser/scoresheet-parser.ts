import { Division } from "wcs-ss-lib";
import { ParseEEProScoreSheet } from "./eepro-parser";
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

export function ParseScoreSheet(htmlString: string | undefined, searchDivision: Division) : Competition | undefined {
    if (htmlString == undefined) {
        return;
    }
    
    let comp: Competition | undefined;
    switch (DetermineScoresheetSource(htmlString)) {
        case ScoresheetSource.EEPro:
            comp = ParseEEProScoreSheet(htmlString, searchDivision);
            break;
        }
        
    return comp;
}