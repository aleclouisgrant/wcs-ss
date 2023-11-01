import { CallbackScore, Division, Role, Tier } from './Enums';

export module Util {
    export function GetAwardedPoints(tier: Tier, placement: number) : number {
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
                        else if (placement > 5 && placement <= 10)
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

    export function GetCallbackScoreNumber(callbackScore? : CallbackScore) : number {
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

    export function CallbackScoreShorthand(callbackScore?: CallbackScore) : string {
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
        if (str == "Follower") {
            return Role.Follower;
        }
        else {
            return Role.Leader;
        }
    }

    export function StringToDivision(str: string) : Division {
        switch (str) {
            case "Newcomer":
                return Division.Newcomer;
            case "Novice":
                return Division.Novice;
            case "Intermediate":
                return Division.Intermediate;
            case "Advanced":
                return Division.Advanced;
            case "All Star":
            case "All-Star":
            case "AllStar":
                return Division.AllStar;
            case "Champion":
                return Division.Champion;
            default:
            case "Open":
                return Division.Open;
        }
    }
}