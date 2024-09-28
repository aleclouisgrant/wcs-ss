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

export function ParseScoreSheet(htmlString: string | undefined) : Competition | undefined {
    if (htmlString == undefined)
        return;
    
    switch (DetermineScoresheetSource(htmlString)) {
        case ScoresheetSource.EEPro:
            ParseEEProScoreSheet(htmlString);
            break;
        }
        
    var comp = new Competition();
        
    return comp;
}

