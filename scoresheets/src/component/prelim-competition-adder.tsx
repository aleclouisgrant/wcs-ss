'use client';

import { useState } from 'react';

import { PrelimCompetition } from '../classes/Competition';
import { CallbackScore, Division, Role, Round } from '../classes/Enums';
import { Judge } from '../classes/IPerson';
import CallbackScoreViewer from './prelim-callback-score-viewer';

import { TestData } from '../test-data/test-data';

let JudgeDb = TestData.TestJudgesDb();
let CompetitorDb = TestData.TestCompetitorsDb();

let comp = new PrelimCompetition();

const [judges, setJudges] = useState(new Array<Judge>());

const JudgeSelector = () => 
  <select>{
    JudgeDb.map((judge, index) => 
      <option key={index}>{judge.FullName}</option> )
  }</select>;

function PrelimCompetitionAdder() {

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={100}>Select:</th>
                    </tr>
                    <tr>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.Yes}/></td>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.Alternate1}/></td>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.Alternate2}/></td>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.Alternate3}/></td>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.No}/></td>
                        <td><CallbackScoreViewer callbackScore={CallbackScore.Unscored}/></td>
                    </tr>
                </tbody>
            </table>

            <h3>
                Add Judge:
                <JudgeSelector/>
            </h3>

            <table id='CompetitionTable'>
                <tbody>
                    <tr>
                        <th colSpan={100} align='left'>
                            <label>Division:</label>
                            <select>
                                <option value={Division.Newcomer}>Newcomer</option>
                                <option value={Division.Novice}>Novice</option>
                                <option value={Division.Intermediate}>Intermediate</option>
                                <option value={Division.Advanced}>Advanced</option>
                                <option value={Division.AllStar}>All Star</option>
                                <option value={Division.Champion}>Champion</option>
                            </select>
                            <label>Role:</label>
                            <select>
                                <option value={Role.Leader}>Leader</option>
                                <option value={Role.Follower}>Follower</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th>
                        {comp.Judges.map((judge: Judge) => (
                            <th>{judge.FullName}</th>
                        ))}
                        <th>Sum</th>
                        <th>Promoted</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PrelimCompetitionAdder;