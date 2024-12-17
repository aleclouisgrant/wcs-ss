export class UnbreakableTieError extends Error {
    constructor() {
        super("Head judge scores are required to break tie.");
    }
}

export class DuplicateScoreError extends Error {
    constructor(competitorIndex: number, judgeIndex: number, score: number) {
        super("Duplicate Score Detected: score[" + competitorIndex + "][" + judgeIndex + "] = '" 
            + score + "' already seen.");
    }
}
export class ImpossiblySmallScoreError extends Error {
    constructor(competitorIndex: number, judgeIndex: number, score: number) {
        super("Impossible Score Detected: score[" + competitorIndex + "][" + judgeIndex + "] = '" 
            + score + "' is smaller than 1.");
    }
}
export class ImpossiblyLargeScoreError extends Error {
    constructor(competitorIndex: number, judgeIndex: number, score: number, competitorCount: number) {
        super("Impossible Score Detected: score[" + competitorIndex + "][" + judgeIndex + "] = '" 
            + score + "' is larger than number of competitors (" + competitorCount + ").");
    }
}
export class MissingScoreError extends Error {
    constructor(judgeIndex: number) {
        super("Missing Score Detected: Judge column '" + judgeIndex + "' is missing a score value.");
    }
}
export class InsufficientPeopleError extends Error {
    constructor(competitorCount: number, judgeCount: number) {
        super("Insufficient People Detected: Competitor count = '" + competitorCount 
            + "', Judge count = '" + judgeCount + "'.");
    }
}

/**
 * 
 * @property Placements: Array of numbers corresponding to the competitors' index from the 
 *                       original scores parameter in order of placement
 * @property UnbreakableTies: TODO
 */
export interface RelativePlacementReturn {
    Placements: number[],
    Counts: number[][],
    Sums: number[][],
    UnbreakableTies: UnbreakableTie[]
}

export class UnbreakableTie {
    Placement: number;
    CompetitorIndexes: number[];

    constructor (placement: number, competitorIndexes: number[]) {
        this.Placement = placement;
        this.CompetitorIndexes = competitorIndexes;
    }
}

/** 
 * Returns interface with an array of the placements and an array of the unbreakable ties.
 * 
 * @param scores The array of scores. Column for each judge, row for each competitor.
 * @param headJudgeScores An array of the head judge's scores. Should be in same order 
 *                        as competitor order in the scores parameter.
 */
export function CalculateRelativePlacements(scores: number[][], 
                                            headJudgeScores?: number[], 
                                            headToHead?: boolean) : RelativePlacementReturn {
    class RelativePlacementReturnImplementation implements RelativePlacementReturn {
        public Placements: number[];
        Counts: number[][];
        Sums: number[][];
        public UnbreakableTies: UnbreakableTie[];
    
        constructor (placements: number[], counts: number[][], sums: number[][], 
                     unbreakableTies: UnbreakableTie[]) {
            this.Placements = placements;
            this.Counts = counts;
            this.Sums = sums;
            this.UnbreakableTies = unbreakableTies;
        }
    }
    
    let competitorCount = scores.length;
    let judgeCount = scores[0].length;

    const countArray: number[][] = new Array<number>(competitorCount).fill(0).map(() => 
        new Array<number>(competitorCount).fill(0));
    const sumArray: number[][] = new Array<number>(competitorCount).fill(0).map(() => 
        new Array<number>(competitorCount).fill(0));

    let placements = new Array<number>(competitorCount);
    let unbreakableTies = new Array<UnbreakableTie>();

    let placementIndex = 0;

    // populate the count and sum arrays
    for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
        for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
            let count = 0;
            let sum = 0;
            for (let scoreIndex = 0; scoreIndex < judgeCount; scoreIndex++) {
                let score = scores[competitorIndex][scoreIndex];
                
                if (score <= rpScore) {
                    count++;
                    sum = sum + score;
                }
            } 
            countArray[competitorIndex][rpScore - 1] = count;
            sumArray[competitorIndex][rpScore - 1] = sum;
        }
    }

    // calculate placements
    for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
        let majoritiesArray = new Array<number>();
        let largestCount = -1;
        let largestCountTies = new Array<number>();

        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            // skip already placed competitors
            if (placements.includes(competitorIndex))
                continue;

            let count = countArray[competitorIndex][rpScore - 1];

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
                let smallestSum = Number.MAX_SAFE_INTEGER;
                let smallestSumTies = new Array<number>();
                
                largestCountTies.forEach((cIndex) => {
                    let sum = sumArray[cIndex][rpScore - 1];

                    if (sum < smallestSum) {
                        smallestSum = sum;
                        clearArray(smallestSumTies);
                        smallestSumTies.push(cIndex);
                    }
                    else if (sum == smallestSum) {
                        smallestSumTies.push(cIndex);
                    }
                })

                if (smallestSumTies.length == 1) {
                    placements[placementIndex] = smallestSumTies[0];
                    placementIndex++;
                }
                else if (smallestSumTies.length > 1) {
                    if (rpScore >= countArray[0].length) { //we've run out of next scores

                        //TODO: is it possible to hit here without identical scores?
                        // if we can hit here with nonidentical scores, we run head to head comp
                        // otherwise, we break tie on head judge scores

                        if (headJudgeScores == undefined) {
                            throw new UnbreakableTieError();
                        }
                    }

                    // if there are ties for smallest sum, use next scores to break tie
                    let largestNextScoreCount = -1;
                    let largestNextScoreCountTies = new Array<number>();

                    smallestSumTies.forEach((cIndex) => {
                        let nextScoreCount = countArray[cIndex][rpScore];
                        
                        if (nextScoreCount > largestNextScoreCount) {
                            largestNextScoreCount = nextScoreCount;
                            clearArray(largestNextScoreCountTies);
                            largestNextScoreCountTies.push(cIndex);
                        }
                        else if (nextScoreCount == largestNextScoreCount) {
                            largestNextScoreCountTies.push(cIndex);
                        }
                    })

                    if (largestNextScoreCountTies.length == 1) {
                        placements[placementIndex] = smallestSumTies[0];
                        placementIndex++;
                    }
                    else if (largestNextScoreCountTies.length > 1 && !headToHead) {
                        // break tie by running head to head comp
                        let newCompetitorCount = largestNextScoreCountTies.length;
                        let newScores: number[][] = new Array<number>(newCompetitorCount).fill(0)
                            .map(() => new Array<number>(judgeCount).fill(0));
                         
                        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
                            let competitors = [...largestNextScoreCountTies];
                            let newPlacement = 1;

                            while (competitors.length > 1) {
                                let cIndex =  getIndexOfSmallestValue(scores, 
                                    competitors, judgeIndex);
                                
                                
                                newScores[cIndex][judgeCount] = newPlacement;
                                newPlacement++;
                            }
                            
                            let results = CalculateRelativePlacements(newScores, undefined, true);
                            //TODO assign results to placements array
                        }
                    }
                    else if (largestNextScoreCountTies.length > 1 && headToHead) {
                        // if there is still a tie, scores are exactly equal
                        if (headJudgeScores == undefined) {
                            //without head judge scores, we don't have enough data to break a tie
                            throw new UnbreakableTieError();
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

    return new RelativePlacementReturnImplementation(
        placements, countArray, sumArray, unbreakableTies);
}

/**
 * Checks that the scores array contains compatible data for relative placement scoring system
 *
 * @param scores The array of scores. Column for each judge, row for each competitor.
 */
export function CheckScores(scores: number[][]) {
    let competitorCount = scores.length;
    let judgeCount = scores[0].length;

    if (judgeCount < 1 || competitorCount < 1) { //if there are 0 judges or competitors, nothing to calculate
        throw new InsufficientPeopleError(competitorCount, judgeCount);
    }

    for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
        let options = new Array<boolean>(competitorCount).fill(false);
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            if (scores[competitorIndex][judgeIndex] > options.length) { //score is larger than number of competitors
                throw new ImpossiblyLargeScoreError(competitorIndex, judgeIndex, scores[competitorIndex][judgeIndex], competitorCount);
            }
            if (scores[competitorIndex][judgeIndex] < 1) { //score is smaller than 1
                throw new ImpossiblySmallScoreError(competitorIndex, judgeIndex, scores[competitorIndex][judgeIndex]);
            }

            if (options[scores[competitorIndex][judgeIndex] - 1]) { //duplicate scores
                throw new DuplicateScoreError(competitorIndex, judgeIndex, scores[competitorIndex][judgeIndex]);
            }
            else {
                options[scores[competitorIndex][judgeIndex] - 1] = true;
            }
        }

        if (options.includes(false)) { //missing a score value
            throw new MissingScoreError(judgeIndex);
        }
    }
}

function clearArray<T>(arr: T[]) {
    while (arr.length > 0) {
        arr.pop();
    }
}

function removeValueFromArray<T>(arr: T[], val: T) {
    let index = -1;
    arr.map((value, arrayIndex) => {
        if (value == val) {
            index = arrayIndex;
        }
    })
    if (index != -1) {
        arr.splice(index, 1);
    }
}

function getIndexOfSmallestValue(array: number[][], indexes: number[], column: number) : number {
    let smallestIndex = -1;
    let smallestValue = -1;
    
    indexes.forEach((index) => {
        let value = array[index][column];
        if (smallestValue < value) {
            smallestIndex = index;
            smallestValue = value;
        }
    })

    return smallestIndex;
}