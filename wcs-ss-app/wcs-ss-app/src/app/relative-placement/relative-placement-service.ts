export class UnbreakableTieError extends Error {}

/**
 * 
 * @property Placements: Array of numbers corresponding to the competitors' index from the original scores parameter in order of placement
 * @property UnbreakableTies: TODO
 */
export interface RelativePlacementReturn {
    Placements: number[],
    Counts: number[][],
    Sums: number[][],
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
        Counts: number[][];
        Sums: number[][];
        public UnbreakableTies: number[];
    
        constructor (placements: number[], counts: number[][], sums: number[][], unbreakableTies: number[]) {
            this.Placements = placements;
            this.Counts = counts;
            this.Sums = sums;
            this.UnbreakableTies = unbreakableTies;
        }
    }
    
    var competitorCount = scores.length;
    var judgeCount = scores[0].length;

    const countArray: number[][] = new Array<number>(competitorCount).fill(0).map(() => new Array<number>(competitorCount).fill(0));
    const sumArray: number[][] = new Array<number>(competitorCount).fill(0).map(() => new Array<number>(competitorCount).fill(0));

    var placements = new Array<number>(competitorCount);
    var unbreakableTies = new Array<number>();

    var placementIndex = 0;

    // populate the count and sum arrays
    for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
        var count = 0;
        var sum = 0;
        for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
            for (let scoreIndex = 0; scoreIndex < judgeCount; scoreIndex++) {
                var score = scores[competitorIndex][scoreIndex];
                sum = sum + score;

                if (score <= rpScore)
                    count++;
            } 
            countArray[competitorIndex][rpScore] = count;
            sumArray[competitorIndex][rpScore] = sum;
        }
    }

    // calculate placements
    for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
        var majoritiesArray = new Array<number>();
        var largestCount = -1;
        var largestCountTies = new Array<number>();

        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            // skip already placed competitors
            if (placements.includes(competitorIndex))
                continue;

            var count = countArray[competitorIndex][rpScore];

            // check if competitor received a majority at this score
            if (count > judgeCount / 2) {
                majoritiesArray.push(competitorIndex);

                if (count > largestCount) {
                    largestCount = count;
                    clearArray(largestCountTies);
                    largestCountTies.push(competitorIndex);
                }
                else if (count == largestCount) {
                    largestCountTies.push(competitorIndex);
                }
            }
        }

        // if no ties at majority, competitor is awarded placement
        if (majoritiesArray.length == 1) {
            placements[placementIndex] = majoritiesArray[0];
            placementIndex++;
        }
        // if there are ties, award highest count 
        else if (majoritiesArray.length > 1) {
            // if there are no ties for largest count at this score, award placement
            if (largestCountTies.length == 1) {
                placements[placementIndex] = largestCountTies[0];
                placementIndex++;
            }
            // if there are ties for largest count, use sums to break tie
            else if (largestCountTies.length > 1) {
                var smallestSum = Number.MAX_SAFE_INTEGER;
                var smallestSumTies = new Array<number>();
                
                largestCountTies.forEach((competitorIndex1) => {
                    var sum = sumArray[competitorIndex1][rpScore];

                    if (sum < smallestSum) {
                        smallestSum = sum;
                        clearArray(smallestSumTies);
                        smallestSumTies.push(competitorIndex1);
                    }
                    else if (sum == smallestSum) {
                        smallestSumTies.push(competitorIndex1);
                    }
                })

                if (smallestSumTies.length == 1) {
                    placements[placementIndex] = smallestSumTies[0];
                    placementIndex++;
                }
                else if (smallestSumTies.length > 1) {
                    // if there are ties for smallest sum, use next scores to break tie
                    var largestNextScoreCount = -1;
                    var largestNextScoreCountTies = new Array<number>();

                    smallestSumTies.forEach((competitorIndex2) => {
                        var nextScoreCount = countArray[competitorIndex2][rpScore + 1];
                        
                        if (nextScoreCount > largestNextScoreCount) {
                            largestNextScoreCount = nextScoreCount;
                            clearArray(largestNextScoreCountTies);
                            largestNextScoreCountTies.push(competitorIndex2);
                        }
                        else if (nextScoreCount == largestNextScoreCount) {
                            largestNextScoreCountTies.push(competitorIndex2);
                        }
                    })

                    if (largestNextScoreCountTies.length == 1) {
                        placements[placementIndex] = smallestSumTies[0];
                        placementIndex++;
                    }
                    else if (largestNextScoreCountTies.length > 1) {
                        // break tie by running head to head comp
                        // TODO


                        // if there is still a tie, ie if scores are exactly equal
                        if (headJudgeScores == undefined) {
                            //don't have enough data at this point to break a tie
                            throw new UnbreakableTieError("Head judge scores required to break tie");
                        }
                        else {
                            // break tie with head judges scores
                            // TODO
                        }
                    }
                }
            }
        }
    }

    return new RelativePlacementReturnImplementation(placements, sumArray, countArray, unbreakableTies);
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