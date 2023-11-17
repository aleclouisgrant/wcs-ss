import { Competitor } from "@/classes/IPerson";
import { JSX } from "react";

import { CallbackScore, Round } from "@/classes/Enums";
import { Util } from "@/classes/Util";
import { FinalScore, PrelimScore } from "@/classes/IScore";

export interface PrelimScoreViewerProps {
  round: Round;
  callbackScore: CallbackScore;
  rank: number;
  totalCompetitors: number;
  prelimScores: Array<PrelimScore>;
}

export function CompetitorPrelimScoreViewer(props: PrelimScoreViewerProps ) {
  var judgeHeaders: JSX.Element[] = [];
  var scoreRows: JSX.Element[] = [];

  props.prelimScores.forEach((score, index) => {
    judgeHeaders.push(<th key={index}>{score.Judge?.FullName}</th>);
    scoreRows.push(<td key={index}>{Util.CallbackScoreShorthand(score.CallbackScore)}</td>);
  });

  return (
    <div>
      <h3>{props.round}</h3>
      <h3>{Util.CallbackScoreShorthand(props.callbackScore)} ({props.rank}/{props.totalCompetitors})</h3>
      <table>
        <tbody>
          <tr>
            {judgeHeaders}
          </tr>
          <tr>
            {scoreRows}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export interface FinalScoreViewerProps {
  placement: number;
  partner: Competitor;
  totalCompetitors: number;
  finalScores: Array<FinalScore>;
}

export function CompetitorFinalScoreViewer(props: FinalScoreViewerProps ) {
  var judgeHeaders: JSX.Element[] = [];
  var scoreRows: JSX.Element[] = [];

  props.finalScores?.forEach((score, index) => {
    judgeHeaders.push(<th key={index}>{score.Judge?.FullName}</th>);
    scoreRows.push(<td key={index}>{score.Score}</td>);
  });

  return (
    <div>
      <h3>{Round.Finals} ({props.totalCompetitors})</h3>
      <h3>{props.placement}</h3>
      <h3>{props.partner?.FullName}</h3>
      <table>
        <tbody>
          <tr>
            {judgeHeaders}
          </tr>
          <tr>
            {scoreRows}
          </tr>
        </tbody>
      </table>
    </div>
  )
}