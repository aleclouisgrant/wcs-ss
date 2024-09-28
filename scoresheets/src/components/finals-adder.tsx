"use client";

import { useContext, useState } from 'react';

import Selector from '@/components/person-selector';

import { FinalCompetition } from '@/classes/FinalCompetition';
import { FinalScore } from '@/classes/FinalScore';
import { CompetitorsContext } from '@/context/CompetitorsContext';
import { JudgesContext } from '@/context/JudgesContext';
import { Division, Round } from 'wcs-ss-lib';
import { Competitor } from '@/classes/Competitor';
import { Judge } from '@/classes/Judge';

export default function FinalsAdder(props: { 
        handleFinalsCompetition?: (finalsCompetition : FinalCompetition) => void, 
        division? : Division,
        date? : Date
    }) {
    const {value: competitorDb } = useContext(CompetitorsContext);
    const {value: judgeDb } = useContext(JudgesContext);

    const [competitorCount, setCompetitorCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);

    const [leaders, setLeaders] = useState(new Array<Competitor | undefined>());
    const [followers, setFollowers] = useState(new Array<Competitor | undefined>());
    const [judges, setJudges] = useState(new Array<Judge | undefined>());

    const [scores, setScores] = useState(new Array<Array<number>>);

    const [bibNumbers, setBibNumbers] = useState(new Array<string>());

    let division : Division;
    let date : Date;

    division = props.division ?? Division.AllStar;
    date = props.date ?? new Date();

    function UpdateFinalCompetition() {
        if (!props.handleFinalsCompetition) {
            return;
        }

        var competition = new FinalCompetition(date, division);

        var judgeList = new Array<Judge>();
        var finalScores = new Array<FinalScore>();

        for (let coupleIndex = 0; coupleIndex < competitorCount; coupleIndex++) {
            var leader = leaders[coupleIndex];

            if (leader == null) {
                leader = new Competitor("", "", 0);
            }
            
            var follower = followers[coupleIndex];

            if (follower == null) {
                follower = new Competitor("", "", 0);
            }

            leader.BibNumber = parseInt(bibNumbers[coupleIndex]);
            follower.BibNumber = parseInt(bibNumbers[coupleIndex]);

            for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
                var judge = judges[judgeIndex];
                var score = new FinalScore(leader, follower, judge, scores[coupleIndex][judgeIndex]);
                finalScores.push(score);
            }
        }

        judges.map((judge) => {
            if (judge != null) {
                judgeList.push(judge);
            }
        });

        competition.Judges = judgeList;

        props.handleFinalsCompetition(competition);
    }

    function AddCouple() {
        let newScores = [...scores];
        newScores.push(new Array<number>(judgeCount).fill(-1));
        setScores(newScores);

        let newBibNumbers = [...bibNumbers];
        newBibNumbers.push("");
        setBibNumbers(newBibNumbers)

        let newCompetitors = [...leaders];
        newCompetitors.push(undefined);
        setLeaders(newCompetitors);

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

    function SetCompetitor(competitor: Competitor | undefined, index: number) {
        var prevCompetitors = leaders;
        prevCompetitors[index] = competitor;
        setLeaders(prevCompetitors);
    }

    function SetJudge(judge: Judge | undefined, index: number) {
        var newJudges = judges;
        newJudges[index] = judge;
        setJudges(newJudges);
    }

    function UpdateScore(competitorIndex: number, judgeIndex: number, score: number) {
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
        
        let newCompetitors = [...leaders];
        newCompetitors.splice(competitorIndex, 1);
        
        let newBibNumbers = [...bibNumbers];
        newBibNumbers.splice(competitorIndex, 1);
        
        setScores(newScores);
        setBibNumbers(newBibNumbers);
        setCompetitorCount((prevCount) => prevCount - 1);
        setLeaders(newCompetitors);
    }

    function CompetitorRows() {
        var competitorRows = [];
        for (let i = 0; i < competitorCount; i++) {
            let key = "";
            var name = leaders[i]?.FullName ?? "";

            if (leaders[i]?.FullName){
                key += name;
            } 
            else {
                key += i.toString();
            }

            competitorRows.push(
                <tr key={key}>
                    <td>
                        <div className='justify-center flex font-bold'>
                            {i + 1}
                        </div>
                    </td>
                    <td>
                        <input type='text' 
                            value={bibNumbers[i]} 
                            onChange={(e) => SetBibNumber(i, e.target.value)}/>
                        <Selector 
                            personDb={competitorDb} 
                            selectedPerson={leaders[i]}
                            setSelectedPerson={(value: Competitor | undefined) => SetCompetitor(value, i)}/>
                        <button type='button' className='m-2 rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveCompetitor(i)}>x</button>
                    </td>
                    <td>
                        <input type='text' 
                            value={bibNumbers[i]} 
                            onChange={(e) => SetBibNumber(i, e.target.value)}/>
                        <Selector 
                            personDb={competitorDb} 
                            selectedPerson={leaders[i]}
                            setSelectedPerson={(value: Competitor | undefined) => SetCompetitor(value, i)}/>
                        <button type='button' className='m-2 rounded-full bg-red-600 font-sans text-white text-xs w-4 h-4' onClick={() => RemoveCompetitor(i)}>x</button>
                    </td>
                    <JudgeScores competitorIndex={i}/>                    
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

    function JudgeScores(props: { competitorIndex: number }) {
        var judgeScores = [];
        for (let judgeIndex = 0; judgeIndex < judgeCount; judgeIndex++) {
            var score = -1;
            if (scores[props.competitorIndex][judgeIndex] != null) {
                score = scores[props.competitorIndex][judgeIndex];
            }

            judgeScores.push(<td key={judgeIndex}>num</td>);
        }

        return judgeScores;
    }

    function Clear() {
        setCompetitorCount(0);
        setJudgeCount(0);
        setLeaders(new Array<Competitor | undefined>());
        setJudges(new Array<Judge | undefined>());
        setScores(new Array<Array<number>>);
        setBibNumbers(new Array<string>());

        division = Division.AllStar;
        date = new Date();
    }

    return (
        <div>
            <div className='inline-block'>
                <div className='mx-2 inline-block'>
                    <h2 className=''>{Round.Finals}</h2>
                </div>

                <div className='inline-block'>
                    <button type='button' className='btn-primary mx-2' onClick={AddCouple}>+ Couple</button>
                    <button type='button' className='btn-primary mx-2' onClick={AddJudge}>+ Judge</button>
                    <button type='button' className='btn-primary mx-2' onClick={Clear}>Clear</button>
                    <button type='button' className='btn-primary mx-2' onClick={UpdateFinalCompetition}>Save</button>
                </div>
            </div>

            <table id='CompetitionTable' className='my-4 w-full'>
                <tbody>
                    <tr className="adder-table">
                        <th className='rounded-l-xl pl-7 py-2'>Place</th>
                        <th>Leader</th> 
                        <th>Follower</th>
                        <JudgesHeaders/>
                        <th className='rounded-r-xl pr-7'>Ordered</th>
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    )
}