import { PrelimCompetition } from '../classes/Competition';
import { Competitor, Judge } from '../classes/IPerson';
import { PrelimScore } from '../classes/IScore';
import { Util } from '../classes/Util';

import CallbackScoreViewer from './prelim-callback-score-viewer';

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
    var count = 1;

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

                    {comp.Competitors.map((competitor: Competitor) => (
                        <tr>
                        <td>{count++}</td>
                        <td>{competitor.BibNumber}</td>
                        <td>{competitor.FullName}</td>
                        {comp.ScoresByCompetitor(competitor).map((score: PrelimScore) => (
                            <td><CallbackScoreViewer callbackScore={score.CallbackScore}/></td>
                            ))}
                        <td>{comp.GetCompetitorsSum(competitor)}</td>
                        <td>{IsPromoted(comp.IsCompetitorPromoted(competitor))}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}