import { Couple } from "./ICouple";

export module RatingService {
    const MAX_CHANGE = 32;
    const GAP_VALUE = 400;

    export function CalculateRatingsFinals(couples : Couple[]) {
        var ratingChanges = new Array<number>;
        
        couples.map((couple : Couple, placement) => {
            var totalRatingChange = 0;
            var rating = couple.Leader.LeaderRating + couple.Follower.FollowerRating;
         
            couples.map((oppCouple, oppPlacement) => {
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

    export function UpdateRating(rating : number, score : number, expectedScore : number) {
        return rating + MAX_CHANGE * (score - expectedScore);
    }
}