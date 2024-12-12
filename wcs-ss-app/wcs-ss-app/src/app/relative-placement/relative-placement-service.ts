export class UnbreakableTieError extends Error {}

/**
 * 
 * @property Placements: Array of numbers corresponding to the competitors' index from the original scores parameter in order of placement
 * @property UnbreakableTies: TODO
 */
export interface RelativePlacementReturn {
    Placements: number[],
    UnbreakableTies: number[]
}

/** 
 * Returns interface with an array of the placements and an array of the unbreakable ties.
 * 
 * @param scores The array of scores. Column for each judge, row for each competitor.
 * @param headJudgeScores An array of the head judge's scores. Should be in same order as competitor order in the scores parameter.
 */
export function CalculateRelativePlacements(scores: number[][], headJudgeScores?: number[]) : RelativePlacementReturn {
    class RelativePlacementReturnImplementation implements RelativePlacementReturn {
        public Placements: number[];
        public UnbreakableTies: number[];
    
        constructor (placements: number[], unbreakableTies: number[]) {
            this.Placements = placements;
            this.UnbreakableTies = unbreakableTies;
        }
    }
    
    var competitorCount = scores.length;
    var judgeCount = scores[0].length;

    var placements = [competitorCount];
    var unbreakableTies = new Array<number>();

    for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
        var majorityCompetitorIndex = -1;
        var majoritiesArray = new Array<number>();
        var countArray = [competitorCount];
        var sumArray = [competitorCount];
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            if (placements.includes(competitorIndex))
                continue;

            var count = 0;
            var sum = 0;
            for (let scoreIndex = 0; scoreIndex < judgeCount; scoreIndex++) {
                var score = scores[competitorIndex][scoreIndex];
                sum = sum + score;

                if (score <= rpScore)
                    count++;
            } 
            countArray[competitorIndex] = count;
            sumArray[competitorIndex] = sum;

            if (count > judgeCount / 2) { //competitor reached a majority on this column
                majoritiesArray.push(competitorIndex);
                majorityCompetitorIndex = competitorIndex;
            }
        }

        //must first compare # of counts amongst competitors who reached a majority on the same column
        if (majoritiesArray.length > 1) { 
            BreakTieWithCount(placements, rpScore, majoritiesArray, countArray, sumArray, headJudgeScores);
        } 
        else {
            placements[rpScore - 1] = majorityCompetitorIndex;
        }
    }

    return new RelativePlacementReturnImplementation(placements, unbreakableTies);
}

function BreakTieWithCount(
    placements: number[], rpScore: number, 
    majoritiesArray: number[], countArray: number[], 
    sumArray: number[], headJudgeScores?: number[]) 
    {
    var largestCountArray = new Array<number>();
    var largestCount = 0;
    var largestCountCompetitorIndex = -1;
    majoritiesArray.forEach((competitorIndex) => {
        if (countArray[competitorIndex] > largestCount) {
            largestCount = countArray[competitorIndex];
            largestCountCompetitorIndex = competitorIndex;
            clearArray(largestCountArray);
            largestCountArray.push(competitorIndex);
        }
        else if (countArray[competitorIndex] == largestCount) {
            largestCountArray.push(competitorIndex);
        }
    })

    if (largestCountArray.length == 1) {
        placements[rpScore - 1] = largestCountCompetitorIndex;
        
        //remove the newly placed competitor to check for additional ties
        removeValueFromArray(majoritiesArray, largestCountCompetitorIndex);

        //if other competitors had a tied majority, 
        //they need to be assigned the next placements after tie breaking by count again
        if (majoritiesArray.length > 0) {
            BreakTieWithCount(placements, rpScore + 1, majoritiesArray, countArray, sumArray, headJudgeScores);
        }
    }
    else {
        //if largest count was reached by more than one competitor, must compare sums
        BreakTieWithSum(placements, rpScore, majoritiesArray, sumArray, headJudgeScores);
    }
}

function BreakTieWithSum(
    placements: number[], rpScore: number, 
    majoritiesArray: number[], sumArray: number[],
    headJudgeScores?: number[]) 
    {
    var smallestSumArray = new Array<number>();
    var smallestSumCompetitorIndex = -1;
    var smallestSum = Number.MAX_VALUE;
    majoritiesArray.forEach((competitorIndex) => {
        if (sumArray[competitorIndex] < smallestSum) {
            smallestSum = sumArray[competitorIndex];
            smallestSumCompetitorIndex = competitorIndex;
            clearArray(smallestSumArray);
            smallestSumArray.push(competitorIndex);
        }
        else if (sumArray[competitorIndex] == smallestSum) {
            smallestSumArray.push(competitorIndex);
        }
    })

    if (smallestSumArray.length == 1) {
        placements[rpScore - 1] = smallestSumCompetitorIndex;

        removeValueFromArray(smallestSumArray, smallestSumCompetitorIndex);
        if (smallestSumArray.length > 0) {
            BreakTieWithSum(placements, rpScore + 1, majoritiesArray, sumArray, headJudgeScores);
        }
    }
    else {
        BreakTieWithNextScores(headJudgeScores);
    }
}

//TODO: if sums equal, check next scores
function BreakTieWithNextScores(headJudgeScores?: number[]) {


    BreakTieHeadToHead(headJudgeScores);
}

//TODO: if sums and next scores are all equal, then run as individual competition amongst tied competitors
function BreakTieHeadToHead(headJudgeScores?: number[]) {

    if (headJudgeScores == undefined) {
        //don't have enough data at this point to break a tie
        throw new UnbreakableTieError("Head judge scores required to break tie");
    }
}

function clearArray<T>(arr: T[]) {
    while (arr.length > 0) {
        arr.pop();
    }
}

function removeValueFromArray<T>(arr: T[], val: T) {
    var index = -1;
    arr.map((value, arrayIndex) => {
        if (value == val) {
            index = arrayIndex;
        }
    })
    if (index != -1) {
        arr.splice(index, 1);
    }
}