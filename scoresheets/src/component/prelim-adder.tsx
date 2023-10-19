'use client';
import { useState } from 'react';

import { CallbackScore, Role } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';

import CallbackScoreViewer from '@/component/prelim-callback-score-viewer';
import Selector from '@/component/person-selector';

import { TestData } from '@/test-data/test-data';
import { Util } from '@/classes/Util';

let JudgeDb = TestData.TestJudgesDb();
let CompetitorDb = TestData.TestCompetitorsDb();

export default function PrelimAdder() {
    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);
    
    const [competitors, setCompetitors] = useState(new Array<Competitor | undefined>());
    const [judges, setJudges] = useState(new Array<Judge | undefined>());

    const [scores, setScores] = useState(new Array<Array<CallbackScore>>);

    const [promotedCompetitorIndexes, setPromotedCompetitorIndexes] = useState(new Array<number>());
    const [bibNumbers, setBibNumbers] = useState(new Array<string>());

    function AddCompetitor() {
        let newScores = [...scores];
        newScores.push(new Array<CallbackScore>(judgeCount).fill(CallbackScore.Unscored))
        setScores(newScores);

        let newBibNumbers = [...bibNumbers];
        newBibNumbers.push("");
        setBibNumbers(newBibNumbers)
        
        setCompetitorCount((prevCount) => prevCount + 1);
    }

    function AddJudge() {
        let newScores = [...scores];
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            newScores[competitorIndex].push(CallbackScore.Unscored);
        }
        setScores(newScores);
        setJudgeCount((prevCount) => prevCount + 1);
    }

    function SetCompetitor(competitor: Competitor | undefined, index: number) {
        var prevCompetitors = competitors;
        prevCompetitors[index] = competitor;
        setCompetitors(prevCompetitors);
    }

    function SetJudge(judge: Judge | undefined, index: number) {
        var newJudges = judges;
        newJudges[index] = judge;
        setJudges(newJudges);
    }

    function SetPromotedCompetitor(competitorIndex: number, value: boolean) {
        if (value) {
            AddPromotedCompetitor(competitorIndex);
        }
        else {
            RemovePromotedCompetitor(competitorIndex);
        }
    }

    function AddPromotedCompetitor(competitorIndex: number) {
        var newPromotedCompetitorList = [...promotedCompetitorIndexes];
        newPromotedCompetitorList.push(competitorIndex);
        setPromotedCompetitorIndexes(newPromotedCompetitorList);
    }

    function RemovePromotedCompetitor(competitorIndex: number) {
        var newPromotedCompetitorList = [...promotedCompetitorIndexes];
        var index = newPromotedCompetitorList.findIndex((c) => c == competitorIndex, 0);
        if (index > -1) {
            newPromotedCompetitorList.splice(index, 1);
            setPromotedCompetitorIndexes(newPromotedCompetitorList);
        }
    }

    function IsCompetitorIndexPromoted(competitorIndex: number) : boolean {
        return promotedCompetitorIndexes.findIndex((c) => c == competitorIndex) > -1;
    }

    function SetBibNumber(competitorIndex: number, bibNumber: string) {
        let newBibNumbers = [...bibNumbers];
        newBibNumbers[competitorIndex] = bibNumber;
        setBibNumbers(newBibNumbers);
    }

    function UpdateScore(competitorIndex: number, judgeIndex: number, score: CallbackScore) {
        let newScores = [...scores];
        newScores[competitorIndex][judgeIndex] = score;
        setScores(newScores);
    }

    function JudgesHeaders() {
        var judgeHeaders = [];
        for (let i = 0; i < judgeCount; i++ ) {
            judgeHeaders.push(
                <th key={i}>
                    <Selector personDb={JudgeDb} selectedPerson={judges[i]}
                        setSelectedPerson={(value : Judge | undefined) => SetJudge(value, i)}/>
                </th>);
        }

        return judgeHeaders;
    }

    function JudgeScores(props : {competitorIndex: number}) {
        var judgeScores = [];
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++ ) {
            var callbackScore = CallbackScore.Unscored;
            if (scores[props.competitorIndex][judgeIndex] != null) {
                callbackScore = scores[props.competitorIndex][judgeIndex];
            }

            judgeScores.push(<td key={judgeIndex}><CallbackScoreViewer callbackScore={callbackScore}/></td>);
        }

        return judgeScores;
    }

    function CompetitorScoreSum(competitorIndex: number) : number {
        var sum = 0;

        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++){
            sum = sum + Util.GetCallbackScoreNumber(scores[competitorIndex][judgeIndex]);
        }

        return sum;
    }

    function CompetitorRows() {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            competitorRows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input type='text' onChange={(e) => SetBibNumber(i, e.target.value)} value={bibNumbers[i]}/></td>
                    <td><Selector personDb={CompetitorDb} selectedPerson={competitors[i]} 
                            setSelectedPerson={(value: Competitor | undefined) => SetCompetitor(value, i)}/></td>
                    <JudgeScores competitorIndex={i}/>
                    <td>{CompetitorScoreSum(i)}</td>
                    <td><input type='checkbox' onChange={(e) => SetPromotedCompetitor(i, e.target.checked)} defaultChecked={IsCompetitorIndexPromoted(i)}/></td>
                </tr>
            )
        }

        return competitorRows;
    }

    function PrintSheet() {
        console.log("Scores: ");
        for (let i = 0; i < scores.length; i++) {
            var judgeScores = '';
            for (let j = 0; j < scores[i].length; j++) {
                judgeScores += Util.CallbackScoreShorthand(scores[i][j]) + " ";
            }
            console.log(judgeScores);
        }
    }

    return (
        <div>
            <button type='button' onClick={PrintSheet}>Print scores</button>

            <label>Role:</label>
            <select>
                <option value={Role.Leader}>Leader</option>
                <option value={Role.Follower}>Follower</option>
            </select>

            <button type='button' onClick={AddCompetitor}>Add Competitor</button>
            <button type='button' onClick={AddJudge}>Add Judge</button>

            <table id='CompetitionTable'>
                <tbody>
                    <tr>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th>
                        <JudgesHeaders/>
                        <th>Sum</th>
                        <th>Promoted</th>
                    </tr>
                    <CompetitorRows/>
                </tbody>
            </table>
        </div>
    )
}