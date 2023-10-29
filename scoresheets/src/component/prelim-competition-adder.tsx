'use client';

import { Component } from 'react';

import { CallbackScore, Division, Role, Round } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';

import CallbackScoreViewer from '@/component/prelim-callback-score-viewer';
import Selector from '@/component/person-selector';

import { TestData } from '@/test-data/test-data';
import { Util } from '@/classes/Util';
import { PrelimCompetition } from '@/classes/Competition';
import { PrelimScore } from '@/classes/IScore';

let JudgeDb = TestData.TestJudgesDb();
let CompetitorDb = TestData.TestCompetitorsDb();

type PrelimAdderProps = {
    prelimCompetition: PrelimCompetition | undefined,
    setPrelimCompetition: (prelimCompetition: PrelimCompetition | undefined) => void
};

type PrelimAdderState = {
    value: PrelimCompetition | undefined;
}

var competitorCount: number = 0;
var judgeCount: number = 0;
var competitors = Array<Competitor | undefined>();
var judges = Array<Judge | undefined>();

var bibNumbers = Array<string>();
var role = Role.Leader;
var division = Division.AllStar;
var round = Round.Prelims;

var promotedCompetitorIndexes = Array<number>();
var scores = new Array<Array<CallbackScore>>

export default class PrelimAdder extends Component<PrelimAdderProps, PrelimAdderState> {
    constructor(props : PrelimAdderProps) {
        super(props);
        this.state = { value: this.props.prelimCompetition };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var competition = new PrelimCompetition(
            "TEST NAME", 
            Division.AllStar,
            Round.Prelims,
            role);

        var prelimScores = new Array<PrelimScore>();

        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            var competitor = competitors[competitorIndex];

            if (competitor == null){
                continue;
            }

            competitor.BibNumber = parseInt(bibNumbers[competitorIndex]);
            for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
                var judge = judges[judgeIndex];
                var score = new PrelimScore(competitor, judge, scores[competitorIndex][judgeIndex]);
                prelimScores.push(score);
            }
        }

        for (let i = 0; i < promotedCompetitorIndexes.length; i++) {
            var competitor = competitors[promotedCompetitorIndexes[i]];
            if (competitor != null) {
                competition.AddPromotedCompetitor(competitor);
            }
        }

        competition.AddScores(prelimScores);

        this.setState({value: competition});
        this.props.setPrelimCompetition(competition);
    }

    AddCompetitor() {
        scores.push(new Array<CallbackScore>(judgeCount).fill(CallbackScore.Unscored))
        bibNumbers.push("");
        competitorCount++;
    }

    AddJudge() {
        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            scores[competitorIndex].push(CallbackScore.Unscored);
        }
        judgeCount++;
    }

    SetCompetitor(competitor: Competitor | undefined, index: number) {
        competitors[index] = competitor;
    }

    SetJudge(judge: Judge | undefined, index: number) {
        judges[index] = judge;
    }

    SetRole(newRole: Role) {
        role = newRole;
    }

    SetPromotedCompetitor(competitorIndex: number, value: boolean) {
        if (value) {
            this.AddPromotedCompetitor(competitorIndex);
        }
        else {
            this.RemovePromotedCompetitor(competitorIndex);
        }
    }

    AddPromotedCompetitor(competitorIndex: number) {
        promotedCompetitorIndexes.push(competitorIndex);
    }

    RemovePromotedCompetitor(competitorIndex: number) {
        var index = promotedCompetitorIndexes.findIndex((c) => c == competitorIndex, 0);
        if (index > -1) {
            promotedCompetitorIndexes.splice(index, 1);
        }
    }

    IsCompetitorIndexPromoted(competitorIndex: number) : boolean {
        return promotedCompetitorIndexes.findIndex((c) => c == competitorIndex) > -1;
    }

    SetBibNumber(competitorIndex: number, bibNumber: string) {
        bibNumbers[competitorIndex] = bibNumber;
    }

    UpdateScore(competitorIndex: number, judgeIndex: number, score: CallbackScore) {
        scores[competitorIndex][judgeIndex] = score;
    }

    JudgesHeaders() {
        var judgeHeaders = [];
        for (let i = 0; i < judgeCount; i++ ) {
            judgeHeaders.push(
                <th key={i}>
                    <Selector personDb={JudgeDb} selectedPerson={judges[i]}
                        setSelectedPerson={(value : Judge | undefined) => this.SetJudge(value, i)}/>
                </th>);
        }

        return judgeHeaders;
    }

    JudgeScores(props : {competitorIndex: number}) {
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

    CompetitorScoreSum(competitorIndex: number) : number {
        var sum = 0;
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++){
            sum = sum + Util.GetCallbackScoreNumber(scores[competitorIndex][judgeIndex]);
        }
        return sum;
    }

    CompetitorRows() {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            competitorRows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td><input type='text' onChange={(e) => this.SetBibNumber(i, e.target.value)} value={bibNumbers[i]}/></td>
                    <td><Selector personDb={CompetitorDb} selectedPerson={competitors[i]} 
                            setSelectedPerson={(value: Competitor | undefined) => this.SetCompetitor(value, i)}/></td>
                    <this.JudgeScores competitorIndex={i}/>
                    <td>{this.CompetitorScoreSum(i)}</td>
                    <td><input type='checkbox' onChange={(e) => this.SetPromotedCompetitor(i, e.target.checked)} defaultChecked={this.IsCompetitorIndexPromoted(i)}/></td>
                </tr>
            )
        }

        return competitorRows;
    }

    render() {
        return(
            <div>
            <label>Role:</label>
            <select onChange={(e) => this.SetRole(Util.StringToRole(e.target.value))}>
                <option value={Role.Leader}>Leader</option>
                <option value={Role.Follower}>Follower</option>
            </select>

            <button type='button' onClick={this.AddCompetitor}>Add Competitor</button>
            <button type='button' onClick={this.AddJudge}>Add Judge</button>
            <button type='button' onClick={this.handleSubmit}>Save</button>

            <table id='CompetitionTable'>
                <tbody>
                    <tr>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th>
                        <this.JudgesHeaders/>
                        <th>Sum</th>
                        <th>Promoted</th>
                    </tr>
                    <this.CompetitorRows/>
                </tbody>
            </table>
        </div>
        )
    }
}