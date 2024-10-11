"use client";

import { useContext, useState } from 'react';


import CallbackScoreViewer from '@/components/prelim-callback-score-viewer';
import Selector from '@/components/person-selector';

import { PrelimCompetition } from '@/classes/PrelimCompetition';
import { PrelimScore } from '@/classes/PrelimScore';
import { CompetitorsContext } from '@/context/CompetitorsContext';
import { JudgesContext } from '@/context/JudgesContext';
import { CallbackScore, Division, Role, Round, WcsUtil } from 'wcs-ss-lib';
import { Competitor } from '@/classes/Competitor';
import { Judge } from '@/classes/Judge';

export default function PrelimAdder(props: { 
        handlePrelimCompetition: (prelimCompetition : PrelimCompetition) => void, 
        round? : Round, 
        role? : Role,
        division? : Division,
        date? : Date
    }) {
    const {value: competitorDb } = useContext(CompetitorsContext);
    const {value: judgeDb } = useContext(JudgesContext);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [competitors, setCompetitors] = useState(new Array<Competitor | undefined>());
    const [judges, setJudges] = useState(new Array<Judge | undefined>());

    const [scores, setScores] = useState(new Array<Array<CallbackScore>>);

    const [promotedCompetitorIndexes, setPromotedCompetitorIndexes] = useState(new Array<number>());
    const [bibNumbers, setBibNumbers] = useState(new Array<string>());

    const [currentCallbackScore, setCurrentCallbackScore] = useState(CallbackScore.Unscored);

    let role : Role;
    let round : Round;
    let division : Division;
    let date : Date;

    role = props.role ?? Role.Leader;
    round = props.round ?? Round.Prelims;
    division = props.division ?? Division.AllStar;
    date = props.date ?? new Date();

    function UpdatePrelimCompetition() {
        var competition = new PrelimCompetition(date, division, round, role);

        var competitorList = new Array<Competitor>();
        var judgeList = new Array<Judge>();
        var prelimScores = new Array<PrelimScore>();

        for (let competitorIndex = 0; competitorIndex < competitorCount; competitorIndex++) {
            var competitor = competitors[competitorIndex];

            if (competitor == null) {
                competitor = new Competitor("", "", 0);
            }

            competitor.BibNumber = parseInt(bibNumbers[competitorIndex]);
            competitorList.push(competitor);

            for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
                var judge = judges[judgeIndex];
                var score = new PrelimScore(competitor, judge, scores[competitorIndex][judgeIndex]);
                prelimScores.push(score);
            }
        }

        for (let i = 0; i < promotedCompetitorIndexes.length; i++) {
            var promotedCompetitor = competitorList[promotedCompetitorIndexes[i]];
            if (promotedCompetitor != null) {
                competition.AddPromotedCompetitor(promotedCompetitor);
            }
        }

        judges.map((judge) => {
            if (judge != null) {
                judgeList.push(judge);
            }
        });

        competition.Judges = judgeList;
        competition.Competitors = competitorList;
        competition.Scores = prelimScores;

        props.handlePrelimCompetition(competition);
    }

    function AddCompetitor() {
        let newScores = [...scores];
        newScores.push(new Array<CallbackScore>(judgeCount).fill(CallbackScore.Unscored))
        setScores(newScores);

        let newBibNumbers = [...bibNumbers];
        newBibNumbers.push("");
        setBibNumbers(newBibNumbers)

        let newCompetitors = [...competitors];
        newCompetitors.push(undefined);
        setCompetitors(newCompetitors);

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

    function IsCompetitorIndexPromoted(competitorIndex: number): boolean {
        return promotedCompetitorIndexes.findIndex((c) => c == competitorIndex) > -1;
    }

    function CompetitorScoreSum(competitorIndex: number): number {
        var sum = 0;

        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            sum = sum + WcsUtil.GetCallbackScoreValue(scores[competitorIndex][judgeIndex]);
        }

        return sum;
    }

    function UpdateScore(competitorIndex: number, judgeIndex: number, score: CallbackScore) {
        let newScores = [...scores];
        newScores[competitorIndex][judgeIndex] = score;
        setScores(newScores);
    }

    function SetBibNumber(competitorIndex: number, bibNumber: string) {
        let newBibNumbers = [...bibNumbers];
        newBibNumbers[competitorIndex] = bibNumber;
        setBibNumbers(newBibNumbers);
    }
    
    function RemoveCompetitor(competitorIndex: number) {
        let newScores = [...scores];
        newScores.splice(competitorIndex, 1);
        
        let newCompetitors = [...competitors];
        newCompetitors.splice(competitorIndex, 1);
        
        let newBibNumbers = [...bibNumbers];
        newBibNumbers.splice(competitorIndex, 1);
        
        if (promotedCompetitorIndexes.includes(competitorIndex)){
            let newPromotedCompetitorList = [...promotedCompetitorIndexes];
            newPromotedCompetitorList = newPromotedCompetitorList.filter(obj => obj != competitorIndex);
            setPromotedCompetitorIndexes(newPromotedCompetitorList);
        }

        setScores(newScores);
        setBibNumbers(newBibNumbers);
        setCompetitorCount((prevCount) => prevCount - 1);
        setCompetitors(newCompetitors);
    }

    function CompetitorRows() {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            let key = "";
            var name = competitors[i]?.FullName ?? "";

            if (competitors[i]?.FullName){
                key += name;
            } 
            else {
                key += i.toString();
            }

            competitorRows.push(
                <tr key={key}>
                    <td>
                        <label className="promoted-checkbox-container flex justify-center">
                            <input type='checkbox'
                                onChange={(e) => SetPromotedCompetitor(i, e.target.checked)} 
                                defaultChecked={IsCompetitorIndexPromoted(i)}/>
                            <span className="promoted-checkbox-checkmark m-auto"/>
                        </label>
                    </td>
                    <td>
                        <div className='justify-center flex font-bold'>
                            {i + 1}
                        </div>
                    </td>
                    <td><input type='text' 
                            value={bibNumbers[i]} 
                            onChange={(e) => SetBibNumber(i, e.target.value)}/></td>
                    <td>
                        <Selector 
                            personDb={competitorDb} 
                            selectedPerson={competitors[i]}
                            setSelectedPerson={(value: Competitor | undefined) => SetCompetitor(value, i)}/>
                        <button type='button' className='m-2 rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveCompetitor(i)}>x</button>
                    </td>
                    <JudgeScores competitorIndex={i}/>
                    <td>{CompetitorScoreSum(i)}</td>
                    
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

            let newJudges = [...judges];
            newJudges.splice(judgeIndex, 1);

            setJudgeCount((prevCount) => prevCount - 1);
            setJudges(newJudges);
        }

        var judgeHeaders = [];
        for (let i = 0; i < judgeCount; i++) {
            judgeHeaders.push(
                <th key={i}>
                    <Selector personDb={judgeDb} selectedPerson={judges[i]}
                        setSelectedPerson={(value: Judge | undefined) => SetJudge(value, i)} />
                    <button type='button' className='rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveJudge(i)}>x</button>
                </th>);
        }

        return judgeHeaders;
    }

    function ScoreButton(props: { score: CallbackScore, competitorIndex: number, judgeIndex: number }) {
        const [callbackScore, setScore] = useState(props.score);

        function SetScore() {
            setScore(currentCallbackScore);
            UpdateScore(props.competitorIndex, props.judgeIndex, currentCallbackScore)
        }

        return (
            <button onClick={SetScore}>
                <CallbackScoreViewer callbackScore={callbackScore} />
            </button>
        )
    }

    function JudgeScores(props: { competitorIndex: number }) {
        var judgeScores = [];
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            var callbackScore = CallbackScore.Unscored;
            if (scores[props.competitorIndex][judgeIndex] != null) {
                callbackScore = scores[props.competitorIndex][judgeIndex];
            }

            judgeScores.push(<td key={judgeIndex}><ScoreButton score={callbackScore} competitorIndex={props.competitorIndex} judgeIndex={judgeIndex} /></td>);
        }

        return judgeScores;
    }

    function Clear() {
        setCompetitorCount(0);
        setJudgeCount(0);
        setCompetitors(new Array<Competitor | undefined>());
        setJudges(new Array<Judge | undefined>());
        setScores(new Array<Array<CallbackScore>>);
        setPromotedCompetitorIndexes(new Array<number>());
        setBibNumbers(new Array<string>());

        role = Role.Leader;
        division = Division.AllStar;
        round = Round.Prelims;
        date = new Date();
    }

    return (
        <div>
            <div className='inline-block'>
                <div className='mx-2 inline-block'>
                    <h2 className=''>{round} ({role})</h2>
                </div>

                <div className='mx-2 inline-block'>
                    <button type="button" className='mr-1' onClick={() => setCurrentCallbackScore(CallbackScore.Yes)}>
                        <CallbackScoreViewer callbackScore={CallbackScore.Yes}/>
                    </button>
                    <button type="button" className='mr-1' onClick={() => setCurrentCallbackScore(CallbackScore.Alternate1)}>
                        <CallbackScoreViewer callbackScore={CallbackScore.Alternate1}/>
                    </button>
                    <button type="button" className='mr-1'  onClick={() => setCurrentCallbackScore(CallbackScore.Alternate2)}>
                        <CallbackScoreViewer callbackScore={CallbackScore.Alternate2}/>
                    </button>
                    <button type="button" className='mr-1' onClick={() => setCurrentCallbackScore(CallbackScore.Alternate3)}>
                        <CallbackScoreViewer callbackScore={CallbackScore.Alternate3}/>
                    </button>
                    <button type="button" className='mr-1' onClick={() => setCurrentCallbackScore(CallbackScore.No)}>
                        <CallbackScoreViewer callbackScore={CallbackScore.No}/>
                    </button>
                </div>
                <div className='inline-block'>
                    <button type='button' className='btn-primary mx-2' onClick={AddCompetitor}>+ Competitor</button>
                    <button type='button' className='btn-primary mx-2' onClick={AddJudge}>+ Judge</button>
                    <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
                    <button type='button' className='btn-primary mx-2' onClick={UpdatePrelimCompetition}>Save</button>
                </div>
            </div>

            <table id='CompetitionTable' className='my-4 w-full'>
                <tbody>
                    <tr className="adder-table">
                        <th className='rounded-l-xl pl-7 py-2'>Promoted</th>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th> 
                        <JudgesHeaders/>
                        <th className='rounded-r-xl pr-7'>Sum</th>
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    )
}