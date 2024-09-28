"use client";

import { useContext, useState } from 'react';

import CallbackScoreViewer from '@/components/prelim-callback-score-viewer';
import Selector from '@/components/person-selector';

import { PrelimCompetition } from '@/classes/PrelimCompetition';
import { PrelimScore } from '@/classes/PrelimScore';
import { CompetitorsContext } from '@/context/CompetitorsContext';
import { JudgesContext } from '@/context/JudgesContext';
import { StringFromDate } from '@/classes/utils';
import { Competitor } from '@/classes/Competitor';
import { Judge } from '@/classes/Judge';
import { CallbackScore, Division, Role, Round, WcsUtil } from 'wcs-ss-lib';

export default function PrelimAdder(props: { handlePrelimCompetition: (prelimCompetition: PrelimCompetition) => void }) {
    const {value: competitorDb } = useContext(CompetitorsContext);
    const {value: judgeDb } = useContext(JudgesContext);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [competitors, setCompetitors] = useState(new Array<Competitor | undefined>());
    const [judges, setJudges] = useState(new Array<Judge | undefined>());

    const [scores, setScores] = useState(new Array<Array<CallbackScore>>);

    const [role, setRole] = useState(Role.Leader);
    const [division, setDivision] = useState(Division.AllStar);
    const [round, setRound] = useState(Round.Prelims);
    const [date, setDate] = useState(new Date());

    const [promotedCompetitorIndexes, setPromotedCompetitorIndexes] = useState(new Array<number>());
    const [bibNumbers, setBibNumbers] = useState(new Array<string>());

    const [currentCallbackScore, setCurrentCallbackScore] = useState(CallbackScore.Unscored);

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
            sum = sum + WcsUtil.GetCallbackScoreNumber(scores[competitorIndex][judgeIndex]);
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
                        <label className="promoted-checkbox-container justify-center flex">&nbsp;
                            <input type='checkbox' 
                                onChange={(e) => SetPromotedCompetitor(i, e.target.checked)} 
                                defaultChecked={IsCompetitorIndexPromoted(i)}/>
                            <span className="promoted-checkbox-checkmark"/>
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
        setRole(Role.Leader);
        setDivision(Division.AllStar);
        setRound(Round.Prelims);
        setDate(new Date());
        setPromotedCompetitorIndexes(new Array<number>());
        setBibNumbers(new Array<string>());
    }

    return (
        <div>
            <div className='m-2'>
                <label className='mx-2'>Date:</label>
                <input id='dateInput' type='date' onChange={(e) => setDate(new Date(e.target.value))} value={StringFromDate(date)} />

                <label className='mx-2'>Role:</label>
                <select id='roleInput' onChange={(e) => setRole(Role[e.target.value as keyof typeof Role])} value={role}>
                    <option value={Role.Leader}>{Role.Leader}</option>
                    <option value={Role.Follower}>{Role.Follower}</option>
                </select>

                <label className='mx-2'>Division:</label>
                <select name='divisionInput' onChange={(e) => setDivision(WcsUtil.StringToDivision(e.target.value))} value={division}>
                    <option value={Division.Newcomer}>{Division.Newcomer}</option>
                    <option value={Division.Novice}>{Division.Novice}</option>
                    <option value={Division.Intermediate}>{Division.Intermediate}</option>
                    <option value={Division.Advanced}>{Division.Advanced}</option>
                    <option value={Division.AllStar}>{Division.AllStar}</option>
                    <option value={Division.Champion}>{Division.Champion}</option>
                    <option value={Division.Open}>{Division.Open}</option>
                </select>

                <label className='mx-2'>Round:</label>
                <select name='roundInput' onChange={(e) => setRound(Round[e.target.value as keyof typeof Round])} value={round}>
                    <option value={Round.Prelims}>{Round.Prelims}</option>
                    <option value={Round.Quarterfinals}>{Round.Quarterfinals}</option>
                    <option value={Round.Semifinals}>{Round.Semifinals}</option>
                    <option value={Round.Finals}>{Round.Finals}</option>
                </select>
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
                <button type='button' className='btn-primary mx-2' onClick={UpdatePrelimCompetition}>Save</button>
                <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
            </div>

            <table id='CompetitionTable'>
                <tbody>
                    <tr>
                        <th>Promoted</th>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th>
                        <JudgesHeaders/>
                        <th>Sum</th>
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    )
}