'use client';
import { useState } from 'react';

import { CallbackScore, Role } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';

import CallbackScoreViewer from '@/component/prelim-callback-score-viewer';
import Selector from '@/component/person-selector';

import { TestData } from '@/test-data/test-data';

let JudgeDb = TestData.TestJudgesDb();
let CompetitorDb = TestData.TestCompetitorsDb();

const JudgeSelector = () => {
    return (
        <select>
            {JudgeDb.map((judge, index) =>
                <option key={index}>{judge.FullName}</option>)}
        </select>
    )
}

export default function PrelimAdder() {
    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);
    
    const [competitors, setCompetitors] = useState(new Array<Competitor>());
    const [judges, setJudges] = useState(new Array<Judge>());

    var scoreArray : CallbackScore[][];

    function AddCompetitor() {
        setCompetitorCount((prevCount) => prevCount + 1);
    }

    function AddJudge() {
        setJudgeCount((prevCount) => prevCount + 1);
    }

    function SetCompetitor(competitor: Competitor, index: number) {
        console.log("index: " + index + " competitor: " + competitor.FullName);

        var prevCompetitors = competitors;
        prevCompetitors[index] = competitor;
        setCompetitors(prevCompetitors);
    }

    const JudgesHeaders = () => {
        var judgeHeaders = [];
        for (let i = 0; i < judgeCount; i++ ) {
            judgeHeaders.push(<th><JudgeSelector/></th>);
        }

        return judgeHeaders;
    }

    const JudgeScores = () => {
        var judgeScores = [];
        for (let i = 0; i < judgeCount; i++ ) {
            judgeScores.push(<td><CallbackScoreViewer callbackScore={CallbackScore.Yes}/></td>);
        }

        return judgeScores;
    }

    const CompetitorRows = () => {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            competitorRows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input type='text'/></td>
                    <td><Selector index={i} personDb={CompetitorDb} selectedPerson={competitors[i]} setSelectedPerson={SetCompetitor}/></td>
                    <JudgeScores/>
                    <td>sum</td>
                    <td>*</td>
                </tr>
            )
        }

        return competitorRows;
    }

    return (
        <div>
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