"use client";

import { CalculateRelativePlacements, CheckScores, DuplicateScoreError, ImpossiblyLargeScoreError, ImpossiblySmallScoreError, InsufficientPeopleError, MissingScoreError, UnbreakableTieError } from '@/app/relative-placement/relative-placement-service';
import { useState } from 'react';

export default function RelativePlacementTable() {
    enum OrderMethod {
        Order,
        Place
    }

    const UNSELECTED_VALUE = 0;

    const [error, setError] = useState(true);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [scores, setScores] = useState(new Array<number>(competitorCount).fill(UNSELECTED_VALUE).map(() => new Array<number>(judgeCount).fill(UNSELECTED_VALUE)));
    const [placements, setPlacements] = useState(new Array<number>);
    const [counts, setCounts] = useState(new Array<number>(competitorCount).fill(0).map(() => new Array<number>(competitorCount).fill(0)));
    const [sums, setSums] = useState(new Array<number>(competitorCount).fill(0).map(() => new Array<number>(competitorCount).fill(0)));

    const [orderMethod, setOrderMethod] = useState(OrderMethod.Order);

    function AddCouple() {
        let newScores = [...scores];
        newScores.push(new Array<number>(judgeCount).fill(UNSELECTED_VALUE));

        setCompetitorCount((prevCount) => prevCount + 1);
        UpdateScores(newScores);
    }

    function AddJudge() {
        let newScores = [...scores];
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            newScores[competitorIndex].push(UNSELECTED_VALUE);
        }

        UpdateScores(newScores);
        setJudgeCount((prevCount) => prevCount + 1);
    }
    
    function UpdateScore(newScore: number, competitorIndex: number, judgeIndex: number) {
        let newScores = [...scores];
        newScores[competitorIndex][judgeIndex] = newScore;
        UpdateScores(newScores);
    }

    function UpdateScores(newScores: number[][]) {
        setError(true);
        setPlacements([]);
        setScores(newScores);

        if (CheckScoresArray(newScores))
            CalculatePlacements();
    }

    function CompetitorRows() {
        function RemoveCompetitor(competitorIndex: number) {
            let newScores = [...scores];
            newScores.splice(competitorIndex, 1);

            var newCompetitorCount = competitorCount - 1;
            newScores.forEach((competitorScores) => {
                competitorScores.forEach((score, index, arr) => {
                    if (score > newCompetitorCount)
                        arr[index] = 0;
                })
            })
            
            setCompetitorCount((prevCount) => prevCount - 1);
            UpdateScores(newScores);
        }

        let competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            
            let competitorIndex = i;
            if (!error && orderMethod == OrderMethod.Place) {
                //TODO: sort
            }
            
            let placementText = "-";
            placements.forEach((cIndex, placement) => {
                if (cIndex == i) {
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
                        <input name="competitor-name" type='text'/>
                        <button type='button' className='m-2 rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveCompetitor(i)}>-</button>
                    </td>
                    <JudgeScores competitorIndex={competitorIndex}/>
                    <td className='text-center'>{placementText}</td>
                    <RelativePlacementScores competitorIndex={competitorIndex}/>             
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

            setJudgeCount((prevCount) => prevCount - 1);
            UpdateScores(newScores);
        }

        let judgeHeaders = [];
        for (let i = 1; i <= judgeCount; i++) {
            judgeHeaders.push(
                <th key={i}>
                    <a>J{i}</a>
                    <button type='button' className='rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveJudge(i-1)}>-</button>
                </th>);
        }

        return judgeHeaders;
    }

    function JudgeScores(props: { competitorIndex: number }) {
        let judgeScores = [];
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            let options = [];
            options.push(<option key={0} value={0}>-</option>);
            for (let i = 1; i <= competitorCount; i++) {
                options.push(<option key={i} value={i}>{i}</option>);
            }

            judgeScores.push(
                <td key={judgeIndex} className='text-center'>
                    <select name="judge-score" value={scores[props.competitorIndex][judgeIndex]} 
                        onChange={e => UpdateScore(parseInt(e.target.value), props.competitorIndex, judgeIndex)}>
                        {options}
                    </select>
                </td>);
        }

        return judgeScores;
    }

    function RelativePlacementHeaders() {
        let rpHeaders = [];
        for (let i = 1; i <= competitorCount; i++) {
            rpHeaders.push(
                <th key={i}>1-{i}</th>);
        }

        return rpHeaders;
    }

    function RelativePlacementScores(props: { competitorIndex: number }) {        
        let rpScores = [];

        if (error) { 
            //show all relative placement scores as "-" if there's an error
            for (let i = 0; i < competitorCount; i++) {
                rpScores.push(<td key={i} className='text-center'>-</td>);    
            }
            return rpScores;
        }

        for (let i = 0; i < competitorCount; i++) {
            let count = counts[props.competitorIndex][i];
            let sum = sums[props.competitorIndex][i];

            rpScores.push(<td key={i} className='text-center'>{count.toString()}({sum.toString()})</td>);
        }

        return rpScores;
    }

    function CheckScoresArray(scores: number[][]) : boolean {
        try {
            CheckScores(scores);

            setError(false);
            return true;
        }
        catch (e) {
            if (e instanceof DuplicateScoreError ||
                e instanceof ImpossiblySmallScoreError ||
                e instanceof ImpossiblyLargeScoreError ||
                e instanceof MissingScoreError ||
                e instanceof InsufficientPeopleError) {
                setError(true);
                console.log(e.message);
            }
            return false;
        }
    }

    function CalculatePlacements() {
        try {
            let rp = CalculateRelativePlacements(scores);
            if (rp.UnbreakableTies.length > 0) {
                //TODO: alert need head judge scores
            }
            else {
                setError(false);
                setCounts(rp.Counts);
                setSums(rp.Sums);
                setPlacements(rp.Placements);
            }
        }
        catch (e) {
            if (e instanceof UnbreakableTieError) {
                //TODO: alert need head judge scores
                console.log(e.message);
            }

            setError(true);
        }
    }
    
    function ToggleOrderBy() {
        if (orderMethod == OrderMethod.Order)
            setOrderMethod(OrderMethod.Place);
        else if (orderMethod == OrderMethod.Place)
            setOrderMethod(OrderMethod.Order);
    }

    function Clear() {
        setError(true);
        setOrderMethod(OrderMethod.Order);
        setCompetitorCount(0);
        setJudgeCount(0);
        setScores(new Array<number>(0).fill(UNSELECTED_VALUE).map(() => new Array<number>(0).fill(UNSELECTED_VALUE)));
        setCounts(new Array<number>(0).fill(0).map(() => new Array<number>(0).fill(0)));
        setSums(new Array<number>(0).fill(0).map(() => new Array<number>(0).fill(0)))
        setPlacements(new Array<number>)
    }

    return (
        <div>
            <div className='inline-block'>
                <div className='inline-block'>
                    <button type='button' className='btn-primary mx-2' onClick={AddCouple}>+ Couple</button>
                    <button type='button' className='btn-primary mx-2' onClick={AddJudge}>+ Judge</button>
                    <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
                    <button type='button' disabled={error} className='btn-primary mx-2' onClick={ToggleOrderBy}>Sort By {orderMethod == OrderMethod.Order ? "Place" : "Order"}</button>
                </div>
            </div>

            <table id='CompetitionTable' className='my-4 w-full'>
                <tbody>
                    <tr className="adder-table">
                        <th className='rounded-l-xl pl-7 py-2'>Order</th>
                        <th className='text-left'>Couples</th>
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