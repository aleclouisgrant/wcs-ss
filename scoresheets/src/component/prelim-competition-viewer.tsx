import { PrelimCompetition } from '@/classes/Competition';
import { Competitor, Judge } from '@/classes/IPerson';
import { PrelimScore } from '@/classes/IScore';
import { Util } from '@/classes/Util';

import CallbackScoreViewer from '@/component/prelim-callback-score-viewer';

function IsPromoted(promoted : boolean) : string {
    if (promoted) {
        return "!";
    }
    else {
        return "";
    }
}

export default async function PrelimsScoresheet(props: {competition : PrelimCompetition}) {
    var comp = props.competition;

    const CompetitorRows = () => {
        var competitorRows = [];
        
        let count = 1;
        let sameCount = 1;
        for (let i = 0; i < comp.GetCompetitorCount(); i++) {
            let competitor = comp.Competitors[i];
            let sum = comp.GetCompetitorsSum(competitor);

            if (i - 1 > 0) {
                if (sum == comp.GetCompetitorsSum(comp.Competitors[i - 1]))
                {
                    sameCount++;
                }
                else
                {
                    count = count + sameCount + 1;
                    sameCount = 0;
                }
            }

            competitorRows.push(
                <tr>
                    <td>{count}</td>
                    <td>{competitor.BibNumber}</td>
                    <td>{competitor.FullName}</td>
                    {comp.ScoresByCompetitor(competitor).map((score: PrelimScore) => (
                        <td><CallbackScoreViewer callbackScore={score.CallbackScore}/></td>
                        ))}
                    <td>{sum}</td>
                    <td>{IsPromoted(comp.IsCompetitorPromoted(competitor))}</td>
                </tr>
            )
        }

        return competitorRows;
    }

    return (
        <div>
            <h3>{comp.Role}s (Tier {Util.TierNumberFromTier(comp.Tier)}: {comp.GetCompetitorCount()} competitors):</h3>
            <table>
                <tbody>
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
                    <CompetitorRows/>
                </tbody>
            </table>
        </div>
    );
}