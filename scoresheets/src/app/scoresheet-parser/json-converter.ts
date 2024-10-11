import { Competition } from "@/classes/Competition";
import { Role, Round, Uuid, WcsUtil } from "wcs-ss-lib";

interface PrelimScoreJson {
    competitor_id: Uuid;
    judge_id: Uuid;
    callbackscore: string;
}

interface PrelimCompetitionJson {
    role: Role;
    alternate_1_id: Uuid;
    alternate_2_id: Uuid;
    scores: PrelimScoreJson[];
    promoted_competitors: Uuid[];
}

interface PairedPrelimCompetitionJson {
    round: Round;
    leader_prelim_competition: object;
    follower_prelim_competition: object;
}

interface FinalScoreJson {
    leader_id: Uuid;
    follower_id: Uuid;
    judge_id: Uuid;
    score: number;
}

interface FinalCompetitionJson {
    scores: FinalScoreJson[];
}

export function ConvertCompetitionToJson(competition : Competition) : object {
    var competitionJson = {
        "competition_type": competition.CompetitionType,
        "division": WcsUtil.DivisionToString(competition.Division),
        "leader_tier": WcsUtil.TierNumberFromTier(competition.LeaderTier),
        "follower_tier": WcsUtil.TierNumberFromTier(competition.FollowerTier),
        "paired_prelim_competitions": [] as PairedPrelimCompetitionJson[],
        "final_competition": undefined as FinalCompetitionJson | undefined
    }

    // prelim competitions
    competition.PairedPrelimCompetitions.forEach(pairedPrelimCompetition => {
        var ppcJson = {
            "round": pairedPrelimCompetition.Round,
            "leader_prelim_competition": {} as PrelimCompetitionJson,
            "follower_prelim_competition": {} as PrelimCompetitionJson
        };

        // leaders prelim competition
        var leaderCompJson = {
            "role": Role.Leader,
            "alternate_1_id": pairedPrelimCompetition.LeaderPrelimCompetition?.Alternate1?.Id,
            "alternate_2_id": pairedPrelimCompetition.LeaderPrelimCompetition?.Alternate2?.Id,
            "scores": [] as PrelimScoreJson[],
            "promoted_competitors": [] as Uuid[]
        } as PrelimCompetitionJson;

        pairedPrelimCompetition.LeaderPrelimCompetition?.Scores.forEach(score => {
            var scoreJson = {
                "competitor_id": score.Competitor?.Id,
                "judge_id": score.Judge?.Id,
                "callbackscore": WcsUtil.GetCallbackScoreShorthand(score.CallbackScore)
            } as PrelimScoreJson;
            leaderCompJson.scores.push(scoreJson);
        });

        pairedPrelimCompetition.LeaderPrelimCompetition?.Promoted.forEach(promotedCompetitor => {
            leaderCompJson.promoted_competitors.push(promotedCompetitor?.Id);
        });

        ppcJson.leader_prelim_competition = leaderCompJson;

        // followers prelim competition
        var followerCompJson = {
            "role": Role.Follower,
            "alternate_1_id": pairedPrelimCompetition.FollowerPrelimCompetition?.Alternate1?.Id,
            "alternate_2_id": pairedPrelimCompetition.FollowerPrelimCompetition?.Alternate2?.Id,
            "scores": [] as PrelimScoreJson[],
            "promoted_competitors": [] as Uuid[]
        } as PrelimCompetitionJson;

        pairedPrelimCompetition.FollowerPrelimCompetition?.Scores.forEach(score => {
            var scoreJson = {
                "competitor_id": score.Competitor?.Id,
                "judge_id": score.Judge?.Id,
                "callbackscore": WcsUtil.GetCallbackScoreShorthand(score.CallbackScore)
            } as PrelimScoreJson;
            followerCompJson.scores.push(scoreJson);
        });

        pairedPrelimCompetition.FollowerPrelimCompetition?.Promoted.forEach(promotedCompetitor => {
            followerCompJson.promoted_competitors.push(promotedCompetitor?.Id);
        });

        ppcJson.follower_prelim_competition = followerCompJson;

        competitionJson.paired_prelim_competitions.push(ppcJson);
    });

    // final competition
    if (competition.FinalCompetition != undefined) {
        competitionJson.final_competition = {
            "scores": [] as FinalScoreJson[]
        } as FinalCompetitionJson;

        competition.FinalCompetition.Scores.forEach(coupleRow => {
            coupleRow.forEach(score => {
                var scoreJson = {
                    "leader_id": score.Leader?.Id,
                    "follower_id": score.Follower?.Id,
                    "judge_id": score.Judge?.Id,
                    "score": score.Score
                } as FinalScoreJson;

                competitionJson.final_competition?.scores.push(scoreJson);
            });
        });
    }
    
    return competitionJson;
}