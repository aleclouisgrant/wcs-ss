'use client';
import { useState } from 'react';
import { CallbackScore, Role } from '../types/Enums';
import { Competitor, Judge } from '@/types/IPerson';

import CallbackScoreViewer from '@/component/prelim-callback-score-viewer';

import { TestData } from '../test-data/test-data';

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

const CompetitorSelector = () => {
    return (
        <select>
            {CompetitorDb.map((competitor, index) =>
                <option key={index}>{competitor.FullName}</option>)}
        </select>
    )
}

export default function PrelimAdder() {
    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [competitors, setCompetitors] = useState(new Array<Competitor>());
    const [judges, setJudges] = useState(new Array<Judge>());

    var count = 1;

    function AddCompetitor() {
        setCompetitorCount(competitorCount + 1);
    }

    function AddJudge() {
        setJudgeCount(judgeCount + 1);
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
                <tr>
                    <td>{count++}</td>
                    <td><input type='text'/></td>
                    <td><CompetitorSelector/></td>
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