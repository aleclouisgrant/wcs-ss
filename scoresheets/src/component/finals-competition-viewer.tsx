import { FinalCompetition } from '@/classes/Competition';
import { Judge } from '@/classes/IPerson';
import { FinalScore } from '@/classes/IScore';

export default async function FinalsScoresheet(props: {competition : FinalCompetition}) {
    var comp = props.competition;

    const CompetitorRows = () => {
        var competitorRows = [];
        
        for (let i = 0; i < comp.CoupleCount; i++) {
            let coupleScores = comp.Scores[i];
            let leader = coupleScores[0]?.Leader;
            let follower = coupleScores[0]?.Follower;

            competitorRows.push(
                <tr>
                    <td>{i + 1}</td>
                    <td>{leader?.FullName + " & " + follower?.FullName}</td>
                    {coupleScores.map((score: FinalScore) => (
                        <td>{score.Score}</td>
                        ))}
                </tr>
            )
        }

        return competitorRows;
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Place</th>
                        <th>Competitors</th>
                        {comp.Judges.map((judge: Judge) => (
                            <th>{judge.FullName}</th>
                            ))}
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    );
}