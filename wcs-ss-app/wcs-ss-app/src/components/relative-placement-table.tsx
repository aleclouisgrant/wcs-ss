"use client";

import { useState } from 'react';

export default function RelativePlacementTable() {
    enum OrderBy {
        Order,
        Place
    }

    const [error, setError] = useState(false);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [scores, setScores] = useState(new Array<Array<number>>);
    const [placements, setPlacements] = useState(new Array<number>);

    const [orderBy, setOrderBy] = useState(OrderBy.Order);

    function AddCouple() {
        let newScores = [...scores];
        newScores.push(new Array<number>(judgeCount).fill(-1));
        setScores(newScores);

        setCompetitorCount((prevCount) => prevCount + 1);
    }

    function AddJudge() {
        let newScores = [...scores];
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            newScores[competitorIndex].push(-1);
        }
        setScores(newScores);
        setJudgeCount((prevCount) => prevCount + 1);
    }
    
    function RemoveCompetitor(competitorIndex: number) {
        let newScores = [...scores];
        newScores.splice(competitorIndex, 1);
        
        setScores(newScores);
        setCompetitorCount((prevCount) => prevCount - 1);
    }

    function UpdateScore(newScore: number, competitorIndex: number, judgeIndex: number) {
        let newScores = [...scores];
        newScores[competitorIndex][judgeIndex] = newScore;
        setScores(newScores);

        CalculatePlacements();
    }

    function CompetitorRows() {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            var placementText = "-";

            placements.forEach((competitorIndex, placement) => {
                if(competitorIndex == i) {
                    placementText = (placement + 1).toString();
                }
            })

            competitorRows.push(
                <tr key={i}>
                    <td>
                        <div className='justify-center flex font-bold'>
                            {i+1}
                        </div>
                    </td>
                    <td>
                        <input type='text'/>
                        <button type='button' className='m-2 rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveCompetitor(i)}>x</button>
                    </td>
                    <JudgeScores competitorIndex={i}/>
                    <td>{placementText}</td>
                    <RelativePlacementScores competitorIndex={i}/>             
                </tr>
            )
        }

        return competitorRows;
    }

    function JudgesHeaders() {
        function RemoveJudge(judgeIndex: number) {
            let newScores = [...scores];
            for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
                newScores[competitorIndex].splice(judgeIndex, 1);
            }
            setScores(newScores);
            setJudgeCount((prevCount) => prevCount - 1);
        }

        var judgeHeaders = [];
        for (let i = 1; i <= judgeCount; i++) {
            judgeHeaders.push(
                <th key={i}>
                    <a>J{i}</a>
                    <button type='button' className='rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveJudge(i-1)}>x</button>
                </th>);
        }

        return judgeHeaders;
    }

    function JudgeScores(props: { competitorIndex: number }) {
        var judgeScores = [];
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            var score = -1;
            if (scores[props.competitorIndex][judgeIndex] != null) {
                score = scores[props.competitorIndex][judgeIndex];
            }

            var options = [];
            for (let i = 1; i <= competitorCount; i++) {
                options.push(<option key={i} value={i}>{i}</option>);
            }

            judgeScores.push(
                <td key={judgeIndex}>
                    <select value={scores[props.competitorIndex][judgeIndex]} 
                        onChange={e => UpdateScore(parseInt(e.target.value), props.competitorIndex, judgeIndex)}>
                        {options}
                    </select>
                </td>);
        }

        return judgeScores;
    }

    function RelativePlacementHeaders() {
        var rpHeaders = [];
        for (let i = 1; i <= competitorCount; i++) {
            rpHeaders.push(
                <th key={i}>1-{i}</th>);
        }

        return rpHeaders;
    }

    function RelativePlacementScores(props: { competitorIndex: number }) {        
        var rpScores = [];
        var competitorScores = new Array<number>();

        if (error) { //show all relative placement scores as "-" if there's an error
            for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
                rpScores.push(<td key={judgeIndex}>-</td>);    
            }

            return rpScores;
        }

        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            if (scores[props.competitorIndex][judgeIndex] != null) {
                competitorScores.push(scores[props.competitorIndex][judgeIndex]);
            }
        }
        
        for (let i = 1; i <= competitorCount; i++) {
            var count = 0;
            competitorScores.forEach((score) => {
                if (score <= i) {
                    count++;
                }
            });

            rpScores.push(<td key={i}>{count.toString()}</td>);
        }

        return rpScores;
    }

    function CalculatePlacements() {
        var newPlacements = [competitorCount];

        for (let rpScore = 1; rpScore <= competitorCount; rpScore++) {
            var majorityCompetitorIndex = -1;
            var majoritiesArray = new Array<number>();
            var countArray = [competitorCount];
            var sumArray = [competitorCount];
            for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
                if (newPlacements.includes(competitorIndex))
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

                if (count > judgeCount / 2) { //we have a majority
                    majoritiesArray.push(competitorIndex);
                    majorityCompetitorIndex = competitorIndex;
                } 
            }

            if (majoritiesArray.length > 1) { //must compare counts first
                var tiedArray = new Array<number>();
                var largestCount = 0;
                var largestCountCompetitorIndex = -1;
                majoritiesArray.forEach((competitorIndex) => {
                    if (countArray[competitorIndex] > largestCount) { //todo: not finished yet with this logic
                        largestCount = countArray[competitorIndex];
                        largestCountCompetitorIndex = competitorIndex;
                    }
                    else if (countArray[competitorIndex] == largestCount) {
                        tiedArray.push(competitorIndex);
                    }
                })

                if (tiedArray.length <= 1) {
                    newPlacements[rpScore - 1] = largestCountCompetitorIndex;
                }
                else {
                    // if not must compare sums
                    var smallestSumCompetitorIndex = -1;
                    var smallestSum = Number.MAX_VALUE;
                    majoritiesArray.forEach((competitorIndex) => {
                        if (sumArray[competitorIndex] < smallestSum){
                            smallestSum = sumArray[competitorIndex];
                            smallestSumCompetitorIndex = competitorIndex;
                        }
    
                        //TODO: if sums equal, check next scores
                        //TODO: if sums and next scores are all equal, then run as individual competition amongst tied competitors
                    })
    
                    newPlacements[rpScore - 1] = smallestSumCompetitorIndex;
                }
            } 
            else {
                newPlacements[rpScore - 1] = majorityCompetitorIndex;
            }
        }

        setPlacements(newPlacements);
    }

    function ToggleOrderBy() {
        if (orderBy == OrderBy.Order)
            setOrderBy(OrderBy.Place);
        else if (orderBy == OrderBy.Place)
            setOrderBy(OrderBy.Order);
    }

    function Clear() {
        setCompetitorCount(0);
        setJudgeCount(0);
        setScores(new Array<Array<number>>);
    }

    return (
        <div>
            <div className='inline-block'>
                <div className='inline-block'>
                    <button type='button' className='btn-primary mx-2' onClick={AddCouple}>+ Couple</button>
                    <button type='button' className='btn-primary mx-2' onClick={AddJudge}>+ Judge</button>
                    <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
                    <button type='button' className='btn-primary mx-2' onClick={ToggleOrderBy}>Order By {orderBy == OrderBy.Order ? "Place" : "Order"}</button>
                </div>
            </div>

            <table id='CompetitionTable' className='my-4 w-full'>
                <tbody>
                    <tr className="adder-table">
                        <th className='rounded-l-xl pl-7 py-2'>Order</th>
                        <th>Couples</th>
                        <JudgesHeaders/>
                        <th>Place</th>
                        <RelativePlacementHeaders/>
                        <th className='rounded-r-xl pr-7'></th>
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    )
}