import { Competitor } from "@/classes/Competitor";
import { FinalScore } from "@/classes/FinalScore";
import { PrelimScore } from "@/classes/PrelimScore";
import { JSX } from "react";

import { CallbackScore, Round, WcsUtil } from "wcs-ss-lib";

export interface PrelimScoreViewerProps {
  round: Round | undefined;
  callbackScore: CallbackScore | undefined;
  rank: number | undefined;
  totalCompetitors: number | undefined;
  prelimScores: Array<PrelimScore> | undefined;
}

export function CompetitorPrelimScoreViewer(props: PrelimScoreViewerProps ) {
  var judgeHeaders: JSX.Element[] = [];
  var scoreRows: JSX.Element[] = [];

  props.prelimScores?.forEach((score, index) => {
    judgeHeaders.push(<th key={index}>{score.Judge?.FullName}</th>);
    scoreRows.push(<td key={index}>{WcsUtil.GetCallbackScoreShorthand(score.CallbackScore)}</td>);
  });

  return (
    <div>
      <h3>{props.round}</h3>
      <h3>{WcsUtil.GetCallbackScoreShorthand(props.callbackScore)} ({props.rank}/{props.totalCompetitors})</h3>
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
  partner: Competitor | undefined;
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