'use client';

import { useContext, useState } from 'react';

import { CallbackScore, Division, Role, Round } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';

import CallbackScoreViewer from '@/components/prelim-callback-score-viewer';
import Selector from '@/components/person-selector';

import { TestData } from '@/test-data/test-data';
import { Util } from '@/classes/Util';
import { PrelimCompetition } from '@/classes/Competition';
import { PrelimScore } from '@/classes/IScore';
import { CompetitorsContext } from '@/context/CompetitorsContext';

let JudgeDb = TestData.TestJudgesDb();

export default function PrelimAdder(props: { handlePrelimCompetition: (prelimCompetition: PrelimCompetition) => void }) {
    const {value: competitorDb } = useContext(CompetitorsContext);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [competitors, setCompetitors] = useState(new Array<Competitor | undefined>());
    const [judges, setJudges] = useState(new Array<Judge | undefined>());

    const [scores, setScores] = useState(new Array<Array<CallbackScore>>);

    const [compName, setCompName] = useState("");
    const [role, setRole] = useState(Role.Leader);
    const [division, setDivision] = useState(Division.AllStar);
    const [round, setRound] = useState(Round.Prelims);
    const [date, setDate] = useState(new Date());

    const [promotedCompetitorIndexes, setPromotedCompetitorIndexes] = useState(new Array<number>());
    const [bibNumbers, setBibNumbers] = useState(new Array<string>());

    const [currentCallbackScore, setCurrentCallbackScore] = useState(CallbackScore.Unscored);

    function UpdatePrelimCompetition() {
        var competition = new PrelimCompetition(compName, date, division, round, role);

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

    function StringFromDate(str: Date): string {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
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
            sum = sum + Util.GetCallbackScoreNumber(scores[competitorIndex][judgeIndex]);
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
                    <td>{i + 1}</td>
                    <td><input type='text' 
                            value={bibNumbers[i]} 
                            onChange={(e) => SetBibNumber(i, e.target.value)}/></td>
                    <td>
                        <Selector 
                            personDb={competitorDb} 
                            selectedPerson={competitors[i]}
                            setSelectedPerson={(value: Competitor | undefined) => SetCompetitor(value, i)}/>
                        <button type='button' onClick={() => RemoveCompetitor(i)}>d</button>
                    </td>
                    <JudgeScores competitorIndex={i}/>
                    <td>{CompetitorScoreSum(i)}</td>
                    <td><input type='checkbox' 
                            onChange={(e) => SetPromotedCompetitor(i, e.target.checked)} 
                            defaultChecked={IsCompetitorIndexPromoted(i)}/></td>
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
                    <Selector personDb={JudgeDb} selectedPerson={judges[i]}
                        setSelectedPerson={(value: Judge | undefined) => SetJudge(value, i)} />
                    <button type='button' onClick={() => RemoveJudge(i)}>d</button>
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
        setCompName("");
        setRole(Role.Leader);
        setDivision(Division.AllStar);
        setRound(Round.Prelims);
        setDate(new Date());
        setPromotedCompetitorIndexes(new Array<number>());
        setBibNumbers(new Array<string>());
    }

    return (
        <div>
            <div className='m-4'>
                <label htmlFor='nameInput' className='mr-4'>Name</label>
                <input id='nameInput' inputMode='text' onChange={(e) => setCompName(e.target.value)} value={compName}/>

                <label className='mx-4'>
                    Date:
                    <input id='dateInput' type='date' onChange={(e) => setDate(new Date(e.target.value))} value={StringFromDate(date)} />
                </label>

                <label className='mx-4'>
                    Role:
                    <select id='roleInput' onChange={(e) => setRole(Role[e.target.value as keyof typeof Role])} value={role}>
                        <option value={Role.Leader}>{Role.Leader}</option>
                        <option value={Role.Follower}>{Role.Follower}</option>
                    </select>
                </label>

                <label className='mx-4'>
                    Division:
                    <select name='divisionInput' onChange={(e) => setDivision(Util.StringToDivision(e.target.value))} value={division}>
                        <option value={Division.Newcomer}>{Division.Newcomer}</option>
                        <option value={Division.Novice}>{Division.Novice}</option>
                        <option value={Division.Intermediate}>{Division.Intermediate}</option>
                        <option value={Division.Advanced}>{Division.Advanced}</option>
                        <option value={Division.AllStar}>{Division.AllStar}</option>
                        <option value={Division.Champion}>{Division.Champion}</option>
                        <option value={Division.Open}>{Division.Open}</option>
                    </select>
                </label>

                <label className='mx-4'>
                    Round:
                    <select name='roundInput' onChange={(e) => setRound(Round[e.target.value as keyof typeof Round])} value={round}>
                        <option value={Round.Prelims}>{Round.Prelims}</option>
                        <option value={Round.Quarterfinals}>{Round.Quarterfinals}</option>
                        <option value={Round.Semifinals}>{Round.Semifinals}</option>
                        <option value={Round.Finals}>{Round.Finals}</option>
                    </select>
                </label>
            </div>

            <div className='mx-4'>
                <button type='button' className='btn-primary mx-2' onClick={AddCompetitor}>Add Competitor</button>
                <button type='button' className='btn-primary mx-2' onClick={AddJudge}>Add Judge</button>
                <button type='button' className='btn-primary mx-2' onClick={UpdatePrelimCompetition}>Save</button>
                <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
            </div>

            <div>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.Yes)} style={{ backgroundColor: "#34A56F", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.Yes)}
                </button>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.Alternate1)} style={{ backgroundColor: "#FFDF00", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.Alternate1)}
                </button>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.Alternate2)} style={{ backgroundColor: "#FBE7A1", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.Alternate2)}
                </button>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.Alternate3)} style={{ backgroundColor: "#FFFFC2", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.Alternate3)}
                </button>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.No)} style={{ backgroundColor: "#98AFC7", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.No)}
                </button>
                <button type="button" onClick={() => setCurrentCallbackScore(CallbackScore.Unscored)} style={{ backgroundColor: "red", width: 30, height: 30 }}>
                    {Util.CallbackScoreShorthand(CallbackScore.Unscored)}
                </button>
            </div>

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
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    )
}