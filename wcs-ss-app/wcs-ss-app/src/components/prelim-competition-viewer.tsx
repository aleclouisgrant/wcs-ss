import CallbackScoreViewer from '@/components/prelim-callback-score-viewer';
import { WcsUtil } from 'wcs-ss-lib';
import { PrelimScore } from '@/classes/PrelimScore';
import { Judge } from '@/classes/Judge';
import { PrelimCompetition } from '@/classes/PrelimCompetition';
import { Competitor } from '@/classes/Competitor';

function IsPromoted(competition: PrelimCompetition, competitor: Competitor) : string {
    if (competition.IsCompetitorPromoted(competitor)) {
        return "Y"
    };
    if (competition.Alternate1?.Id === competitor?.Id) {
        return "A1";
    }
    if (competition.Alternate2?.Id === competitor?.Id) {
        return "A2";
    }

    return "";
}

export default function PrelimsScoresheet(props: {competition : PrelimCompetition | undefined}) {
    if (props.competition == undefined) {
        return;
    }
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
                    {comp.ScoresByCompetitor(competitor).map((score: PrelimScore, index: number) => (
                        <td key={competitor.BibNumber + index}><CallbackScoreViewer callbackScore={score.CallbackScore}/></td>
                        ))}
                    <td>{sum}</td>
                    <td>{IsPromoted(comp, competitor)}</td>
                </tr>
            )
        }

        return competitorRows;
    }

    return (
        <div>
            <h3>{comp.Role}s (Tier {WcsUtil.TierNumberFromTier(comp.Tier)}: {comp.GetCompetitorCount()} competitors):</h3>
            <table className="table-auto">
                <tbody className="even:bg-gray-500 odd:bg-white">
                    <tr>
                        <th>Count</th>
                        <th>Bib</th>
                        <th>Competitor</th>
                        {comp.Judges.map((judge: Judge, index: number) => (
                            <th key={judge.Initials + index}>{judge.FullName}</th>
                            ))}
                        <th>Sum</th>
                        <th>Promoted</th>
                    </tr>
                    {CompetitorRows()}
                </tbody>
            </table>
        </div>
    );
}