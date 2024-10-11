"use client";

import { JSX } from "react";
import { CallbackScore, Role } from "wcs-ss-lib";
import { Competitor } from "@/classes/Competitor";

import { TestData } from '@/test-data/test-data';
import { DanceConvention } from "@/classes/DanceConvention";
import { CompetitorFinalScoreViewer, CompetitorPrelimScoreViewer, FinalScoreViewerProps, PrelimScoreViewerProps } from "./competitor-score-viewer";

const danceEvent = TestData.TestDanceEvent();

export default function CompetitorAnalytics(props: {competitor: Competitor | undefined}) {
  var person = props.competitor;
  if (person == null) {
    return (
      <div></div>
    );
  }

  const CompetitionScores = (person: Competitor, danceEvent : DanceConvention, role : Role) => {
    var competition = danceEvent.Competitions[0];
    
    var prelimCompetitions = 
      [ competition.PairedPrelimCompetitions[0].LeaderPrelimCompetition,
      competition.PairedPrelimCompetitions[0].FollowerPrelimCompetition ];

    var finalCompetition = competition.FinalCompetition;

    var prelimCompetitionScoreViewers: JSX.Element[] = [];
    var finalCompetitionScoreViewer;

    if (prelimCompetitions != null) {
      prelimCompetitions.forEach((prelimCompetition, index) => {
        const i = prelimCompetition?.Competitors.indexOf(person);
        var rank = 0;

        if (i != undefined)
          rank = i + 1;

        var prelimProps : PrelimScoreViewerProps = {
          round: prelimCompetition?.Round,
          callbackScore:  prelimCompetition?.IsCompetitorPromoted(person) ? CallbackScore.Yes : CallbackScore.No,
          rank: rank,
          totalCompetitors: prelimCompetition?.GetCompetitorCount(),
          prelimScores: prelimCompetition?.ScoresByCompetitor(person)
        };
        prelimCompetitionScoreViewers.push(<div key={index}>{CompetitorPrelimScoreViewer(prelimProps)}</div>);
      })
    }

    if (finalCompetition != null && finalCompetition?.GetPlacement(person) != 0) {
      var placement = finalCompetition.GetPlacement(person);
      var partner : Competitor | undefined;

      if (finalCompetition.Scores[placement - 1][0].Leader == person) {
        partner = finalCompetition.Scores[placement - 1][0].Follower;
      } 
      else {
        partner = finalCompetition.Scores[placement - 1][0].Leader;
      }

      var finalProps: FinalScoreViewerProps = {
        placement: placement,
        partner: partner,
        totalCompetitors: finalCompetition.CoupleCount,
        finalScores: finalCompetition.Scores[placement - 1]
      };

      finalCompetitionScoreViewer = <div>{CompetitorFinalScoreViewer(finalProps)}</div>;
    }
    
    return (
      <div>
        <h3>{danceEvent.Name} ({danceEvent.Date.toDateString()})</h3>
        <h3>Jack & Jill ({role})</h3>
        {prelimCompetitionScoreViewers}
        {finalCompetitionScoreViewer}
      </div>
    )
  }

  return (
    <div>
      <h1>{person?.FullName}</h1>
      <h3>Rating: </h3>

      {CompetitionScores(person, danceEvent, Role.Leader)}
    </div>
  )
}