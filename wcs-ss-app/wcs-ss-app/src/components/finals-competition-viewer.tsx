import { FinalCompetition } from "@/classes/FinalCompetition";
import { FinalScore } from "@/classes/FinalScore";
import { Judge } from "@/classes/Judge";

export default function FinalsScoresheet(props: {competition : FinalCompetition}) {
    var comp = props.competition;

    const CompetitorRows = () => {
        var competitorRows = [];
        
        for (let i = 0; i < comp.CoupleCount; i++) {
            let coupleScores = comp.Scores[i];
            let leader = coupleScores[0]?.Leader;
            let follower = coupleScores[0]?.Follower;

            competitorRows.push(
                <tr key={i} className="">
                    <td className='p-2'>{i + 1}</td>
                    <td className='p-2'>{leader?.FullName + " & " + follower?.FullName}</td>
                    {coupleScores.map((score: FinalScore, index: number) => (
                        <td key={index} className='p-2'>{score.Score}</td>
                        ))}
                </tr>
            )
        }

        return competitorRows;
    }

    return (
        <div>
            <table className="table-auto m-4">
                <tbody className="divide-y divide-gray-200 p-4">
                    <tr className="bg-gray-500 p-4 px-12" >
                        <th className='p-2 rounded-l-full'>PLACE</th>
                        <th className='p-2'>COMPETITORS</th>
                        {comp.Judges.map((judge: Judge, index: number) => (
                            <th key={judge.Initials + index} className='p-2'>{judge.Initials}</th>
                            ))}
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    );
}