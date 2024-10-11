import { CallbackScore, Division, Role, Round, Tier } from './Enums';

export namespace WcsUtil {
    export function GetTier(numberOfCompetitors: number) : Tier {
        if (numberOfCompetitors >= 5 && numberOfCompetitors <= 10)
            return Tier.Tier1;
        else if (numberOfCompetitors >= 11 && numberOfCompetitors < 20)
            return Tier.Tier2;
        else if (numberOfCompetitors >= 20 && numberOfCompetitors < 40)
            return Tier.Tier3;
        else if (numberOfCompetitors >= 40 && numberOfCompetitors < 80)
            return Tier.Tier4;
        else if (numberOfCompetitors >= 80 && numberOfCompetitors < 130)
            return Tier.Tier5;
        else if (numberOfCompetitors >= 130)
            return Tier.Tier6;
        else
            return Tier.NoTier;;
    }

    export function GetAwardedPoints(tier: Tier, placement: number, date?: Date) : number {
        const dateTime = date.getDate() ?? Date.now();
        const ruleChangeDate = Date.parse("2023-01-01");
        const ruleChangeEffect : boolean = dateTime >= ruleChangeDate;

        switch(tier) {
            case Tier.Tier1:
                if (placement == 1)
                    return 3;
                else if (placement == 2)
                    return 2;
                else if (placement == 3)
                    return 1;
                else
                    return 0;
            case Tier.Tier2:
                if (placement == 1)
                    return 6;
                else if (placement == 2)
                    return 4;
                else if (placement == 3)
                    return 3;
                else if (placement == 4)
                    return 2;
                else if (placement == 5)
                    return 1;
                else
                    return 0;
            case Tier.Tier3:
                if (placement == 1)
                    return 10;
                else if (placement == 2)
                    return 8;
                else if (placement == 3)
                    return 6;
                else if (placement == 4)
                    return 4;
                else if (placement == 5)
                    return 2;
                else if (placement > 5 && placement <= 10 && ruleChangeEffect)
                    return 1;
                else if (placement > 5 && placement <= 12 && !ruleChangeEffect)
                    return 1;
                else
                    return 0;
            case Tier.Tier4:
                if (placement == 1)
                    return 15;
                else if (placement == 2)
                    return 12;
                else if (placement == 3)
                    return 10;
                else if (placement == 4)
                    return 8;
                else if (placement == 5)
                    return 6;
                else if (placement > 5 && placement <= 15)
                    return 1;
                else
                    return 0;
            case Tier.Tier5:
                if (placement == 1)
                    return 20;
                else if (placement == 2)
                    return 16;
                else if (placement == 3)
                    return 14;
                else if (placement == 4)
                    return 12;
                else if (placement == 5)
                    return 10;
                else if (placement > 5 && placement <= 15)
                    return 2;
                else
                    return 0;
            case Tier.Tier6:
                if (placement == 1)
                    return 25;
                else if (placement == 2)
                    return 22;
                else if (placement == 3)
                    return 18;
                else if (placement == 4)
                    return 15;
                else if (placement == 5)
                    return 12;
                else if (placement > 5 && placement <= 15)
                    return 2;
                else
                    return 0;
            default:
            case Tier.NoTier:
                return 0;
        }
    }
    
    export function GetCallbackScoreValue(callbackScore? : CallbackScore) : number {
        switch (callbackScore) {
            case CallbackScore.Yes:
                return 10;
            case CallbackScore.Alternate1:
                return 4.5;
            case CallbackScore.Alternate2:
                return 4.3;
            case CallbackScore.Alternate3:
                return 4.2;
            case CallbackScore.No:
                return 0;
            default:
            case CallbackScore.Unscored:
                return 0;
        }
    }

    export function GetCallbackScoreShorthand(callbackScore?: CallbackScore) : string {
        switch (callbackScore) {
            case CallbackScore.Yes:
                return "Y";
            case CallbackScore.Alternate1:
                return "A1";
            case CallbackScore.Alternate2:
                return "A2";
            case CallbackScore.Alternate3:
                return "A3";
            case CallbackScore.No:
                return "N";
            default:
            case CallbackScore.Unscored:
                return "";
        }
    }
    export function TierNumberFromTier(tier: Tier) : number {
        switch (tier) {
            case Tier.Tier1:
                return 1;
            case Tier.Tier2:
                return 2;
            case Tier.Tier3:
                return 3;
            case Tier.Tier4:
                return 4;
            case Tier.Tier5:
                return 5;
            case Tier.Tier6:
                return 6;
            default:
            case Tier.NoTier:
                return 0;
        }
    }

    export function StringToRole(str: string) : Role {
        switch (str)
        {
            case "Follower":
            case "follower":
                return Role.Follower;
            case "Leader":
            case "leader":
            default:
                return Role.Leader;
        }
    }
    export function StringToDivision(str: string) : Division {
        switch (str)
        {
            case "Newcomer":
            case "newcomer":
            case "NEW":
            case "New":
            case "new":
                return Division.Newcomer;
            case "Novice":
            case "novice":
            case "NOV":
            case "Nov":
            case "nov":
                return Division.Novice;
            case "Intermediate":
            case "intermediate":
            case "INT":
            case "Int":
            case "int":
                return Division.Intermediate;
            case "Advanced":
            case "advanced":
            case "ADV":
            case "Adv":
            case "adv":
                return Division.Advanced;
            case "AllStar":
            case "Allstar":
            case "allStar":
            case "All Star":
            case "all_star":
            case "allstar":
            case "all star":
            case "All-Star":
            case "all-star":
            case "ALS":
            case "Als":
            case "als":
                return Division.AllStar;
            case "Champion":
            case "champion":
            case "Champ":
            case "champ":
            case "CHM":
            case "CMP":
                return Division.Champion;
            default:
                return Division.Open;
        }
    }
    export function StringToCallbackScore(str: string) : CallbackScore {
        switch (str)
        {
            case "a1":
            case "A1":
            case "alt1":
            case "Alt1":
            case "Alternate1":
            case "alternate1":
            case "alternate_1":
            case "45":
            case "4.5":
                return CallbackScore.Alternate1;
            case "a2":
            case "A2":
            case "alt2":
            case "Alt2":
            case "Alternate2":
            case "alternate2":
            case "alternate_2":
            case "43":
            case "4.3":
                return CallbackScore.Alternate2;
            case "a3":
            case "A3":
            case "alt3":
            case "Alt3":
            case "Alternate3":
            case "alternate3":
            case "alternate_3":
            case "42":
            case "4.2":
                return CallbackScore.Alternate3;
            case "y":
            case "Y":
            case "yes":
            case "Yes":
            case "100":
            case "10":
                return CallbackScore.Yes;
            case "n":
            case "no":
            case "N":
            case "No":
            case "0":
                return CallbackScore.No;
            default:
                return CallbackScore.Unscored;
        }
    }
    export function NumberToCallbackScore(value: number) : CallbackScore {
        switch (value)
        {
            case 10:
                return CallbackScore.Yes;
            case 4.5:
                return CallbackScore.Alternate1;
            case 4.3:
                return CallbackScore.Alternate2;
            case 4.2:
                return CallbackScore.Alternate3;
            case 0:
                return CallbackScore.No;
            default:
                return CallbackScore.Unscored;
        }
    }

    export function ContainsDivisionString(str: string) : Division | undefined {
        if (str.includes("Newcomer") ||
            str.includes("newcomer") ||
            str.includes("NEWCOMER") ||
            str.includes("NEW") ||
            str.includes("New") ||
            str.includes("new"))
                return Division.Newcomer;

        if (str.includes("Novice") ||
            str.includes("novice") ||
            str.includes("NOV") ||
            str.includes("Nov") ||
            str.includes("nov"))
                return Division.Novice;

        if (str.includes("Intermediate") ||
            str.includes("intermediate") ||
            str.includes("INTERMEDIATE") ||
            str.includes("INT") ||
            str.includes("Int") ||
            str.includes("int"))
                return Division.Intermediate;

        if (str.includes("Advanced") ||
            str.includes("ADVANCED") ||
            str.includes("advanced") ||
            str.includes("ADV") ||
            str.includes("Adv") ||
            str.includes("adv"))
                return Division.Advanced;
            
        if (str.includes("AllStar") ||
            str.includes("Allstar") ||
            str.includes("ALLSTAR") ||
            str.includes("ALL STAR") ||
            str.includes("ALL-STAR") ||
            str.includes("allStar") ||
            str.includes("All Star") ||
            str.includes("all_star") ||
            str.includes("allstar") ||
            str.includes("all star") ||
            str.includes("All-Star") ||
            str.includes("all-star"))
                return Division.AllStar;
        
        if (str.includes("Champion") ||
            str.includes("champion") ||
            str.includes("CHAMPION") ||
            str.includes("CHAMP") ||
            str.includes("Champ") ||
            str.includes("champ")||
            str.includes("CHM") ||
            str.includes("CMP"))
                return Division.Champion;

        if (str.includes("Open") ||
            str.includes("OPEN") ||
            str.includes("open"))
            return Division.Open;

        return null;
    }
    export function ContainsRoleString(str: string) : Role | undefined {
        if (str.includes("LEADER") ||
            str.includes("leader") ||
            str.includes("Leader") ||
            str.includes("LEAD") ||
            str.includes("lead") ||
            str.includes("Lead"))
                return Role.Leader;

        if (str.includes("Follower") ||
            str.includes("FOLLOWER") ||
            str.includes("follower") ||
            str.includes("follow") ||
            str.includes("FOLLOW") ||
            str.includes("Follow"))
                return Role.Follower;

        return null;
    }
    export function ContainsRoundString(str: string) : Round | undefined {
        if (str.includes("Prelims") ||
            str.includes("PRELIMS") ||
            str.includes("prelims") ||
            str.includes("Prelim") ||
            str.includes("PRELIM") ||
            str.includes("prelim") ||
            str.includes("Preliminaries") ||
            str.includes("preliminaries") ||
            str.includes("PRELIMINARIES") ||
            str.includes("Preliminary") ||
            str.includes("preliminary") ||
            str.includes("PRELIMINARY"))
                return Round.Prelims;

        if (str.includes("Quarterfinals") ||
            str.includes("QUARTERFINALS") ||
            str.includes("quarterfinals") ||
            str.includes("Quarters") ||
            str.includes("QUARTERS") ||
            str.includes("quarters") ||
            str.includes("Quarterfinal") ||
            str.includes("QUARTERFINAL") ||
            str.includes("quarterfinal") ||
            str.includes("Quarter") ||
            str.includes("QUARTER") ||
            str.includes("quarter"))
                return Round.Quarterfinals;

        if (str.includes("Semifinals") ||
            str.includes("SEMIFINALS") ||
            str.includes("semifinals") ||
            str.includes("Semis") ||
            str.includes("SEMIS") ||
            str.includes("semis") ||
            str.includes("Semifinal") ||
            str.includes("SEMIFINAL") ||
            str.includes("semifinal") ||
            str.includes("Semi") ||
            str.includes("SEMI") ||
            str.includes("semi"))
                return Round.Semifinals;

        if (str.includes("finals") ||
            str.includes("FINALS") ||
            str.includes("finals") ||
            str.includes("final") ||
            str.includes("FINAL") ||
            str.includes("final"))
                return Round.Finals;

        return null;
    }

    export function DivisionToString(division: Division) : string {
        switch(division)
        {
            case Division.Newcomer:
                return "Newcomer";
            case Division.Novice:
                return "Novice";
            case Division.Intermediate:
                return "Intermediate";
            case Division.Advanced:
                return "Advanced";
            case Division.AllStar:
                return "All Star";
            case Division.Champion:
                return "Champion";
            default:
            case Division.Open:
                return "Open";
        }
    }
}