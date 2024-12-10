import { CallbackScore, WcsUtil } from "wcs-ss-lib";
import { Couple } from "./ICouple";
import { PrelimCompetition } from "./PrelimCompetition";
import { PrelimScore } from "./PrelimScore";
import { Competitor } from "./Competitor";

export module RatingService {
    const MAX_CHANGE = 32;
    const GAP_VALUE = 400;

    export function CalculateRatingsFinals(couples : Couple[]) {
        var ratingChanges = new Array<number>;
        
        couples.forEach((couple : Couple, placement) => {
            var totalRatingChange = 0;
            var rating = couple.Leader.LeaderRating + couple.Follower.FollowerRating;
         
            couples.forEach((oppCouple, oppPlacement) => {
                if (couple != oppCouple) {
                    var oppRating = oppCouple.Leader.LeaderRating + oppCouple.Follower.FollowerRating;
                    var expectedScore = 1 / (1 + 10^((oppRating - rating)/GAP_VALUE));
                    var score = placement < oppPlacement ? 1 : 0; //lower placement "wins"
                    totalRatingChange = totalRatingChange + UpdateRating(rating, score, expectedScore);
                }
            });
            ratingChanges.push(totalRatingChange);
        });
        
        for (var i = 0; i < couples.length; i++) { 
           couples[i].Leader.LeaderRating = couples[i].Leader.LeaderRating + ratingChanges[i]; 
           couples[i].Follower.FollowerRating = couples[i].Follower.FollowerRating + ratingChanges[i];
        }

        //return new ratings
    }

    export function CalculateRatingsPrelims(prelimCompetition: PrelimCompetition) {
        // first need to calculate the amount of available prelim points
        var numYes = 0;
        var alt1Exists = false;
        var alt2Exists = false;
        var alt3Exists = false;

        // arbitrarily grab the first judge's scores to determine how many Y were given out
        // and if any Alt1, Alt2, and Alt3 were given out, too
        var firstJudgeScores = new Array<PrelimScore>();
        prelimCompetition.Scores.forEach((score) => {
            if (score.Judge == prelimCompetition.Judges[0]){
                firstJudgeScores.push(score);
            }
        });

        firstJudgeScores.forEach((score) => {
            switch (score.CallbackScore) {
                case CallbackScore.Yes:
                    numYes++;
                    break;
                case CallbackScore.Alternate1:
                    alt1Exists = true;
                    break;
                case CallbackScore.Alternate2:
                    alt2Exists = true;
                    break;
                case CallbackScore.Alternate3:
                    alt3Exists = true;
                    break;
                default:
                    break;
            }
        });

        var maxIndividualCompetitorScore = prelimCompetition.Judges.length * WcsUtil.GetCallbackScoreValue(CallbackScore.Yes);
        var maxIndividualJudgeValue = numYes * WcsUtil.GetCallbackScoreValue(CallbackScore.Yes);
        if (alt1Exists)
            maxIndividualJudgeValue += WcsUtil.GetCallbackScoreValue(CallbackScore.Alternate1);
        if (alt2Exists)
            maxIndividualJudgeValue += WcsUtil.GetCallbackScoreValue(CallbackScore.Alternate2);
        if (alt3Exists)
            maxIndividualJudgeValue += WcsUtil.GetCallbackScoreValue(CallbackScore.Alternate3);

        var maxAvailableJudgeValue = maxIndividualJudgeValue * prelimCompetition.Judges.length;
        
        // The score of a competitor is defined by: 
        // What percentage of the max available judging points, 
        // up to the max individual competitor value,
        // was the competitor awarded? 

        var ratingChanges = new Array<{competitor: Competitor, newRating: number}>();
        prelimCompetition.Competitors.forEach((competitor, index) => {
            var sum = 0;
            prelimCompetition.ScoresByCompetitor(competitor).forEach(score => {
                sum = sum + WcsUtil.GetCallbackScoreValue(score.CallbackScore);
            });

            var score = sum / maxAvailableJudgeValue;
            var highestPossibleScore = maxIndividualCompetitorScore / maxAvailableJudgeValue;
            var expectedScore = 1 / (1 + 10^((oppRating - rating)/GAP_VALUE));

            var newRating = UpdateRating(competitor.Rating, score, expectedScore);
            ratingChanges.push({competitor, newRating});
        })
    }

    export function UpdateRating(rating : number, score : number, expectedScore : number) {
        return rating + MAX_CHANGE * (score - expectedScore);
    }
}
