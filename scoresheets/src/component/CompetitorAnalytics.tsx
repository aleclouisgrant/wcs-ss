"use client";

import { Competitor } from "@/classes/IPerson";
import { JSX } from "react";

import { TestData } from '@/test-data/test-data';
import { DanceEvent } from "@/classes/DanceEvent";
import { CallbackScore, Role } from "@/classes/Enums";
import { CompetitorFinalScoreViewer, CompetitorPrelimScoreViewer, FinalScoreViewerProps, PrelimScoreViewerProps } from "./competitor-score-viewer";

const danceEvent = TestData.TestDanceEvent();

export default function CompetitorAnalytics(props: {competitor: Competitor | undefined}) {
  var person = props.competitor;
  if (person == null) {
    return (
      <div></div>
    );
  }

  const CompetitionScores = (person: Competitor, danceEvent : DanceEvent, role : Role) => {

    var prelimCompetitions = danceEvent.PrelimCompetitions;
    var finalCompetition = danceEvent.FinalCompetitions[0];

    var prelimCompetitionScoreViewers: JSX.Element[] = [];
    var finalCompetitionScoreViewer;

    if (prelimCompetitions != null) {
      prelimCompetitions.forEach((prelimCompetition, index) => {
        console.log(prelimCompetition.ScoresByCompetitor(person)?.length);

        prelimCompetition.ScoresByCompetitor(person).forEach((score) => {
          console.log("(" + score.Competitor?.FullName + ", " + score.Judge?.FullName + ": " + score.CallbackScore + ")");
        })

        var prelimProps : PrelimScoreViewerProps = {
          round: prelimCompetition.Round,
          callbackScore:  prelimCompetition.IsCompetitorPromoted(person) ? CallbackScore.Yes : CallbackScore.No,
          rank: prelimCompetition.Competitors.indexOf(person) + 1,
          totalCompetitors: prelimCompetition.GetCompetitorCount(),
          prelimScores: prelimCompetition.ScoresByCompetitor(person)
        };
        prelimCompetitionScoreViewers.push(<div key={index}>{CompetitorPrelimScoreViewer(prelimProps)}</div>);
      })
    }

    if (finalCompetition != null && finalCompetition?.GetPlacement(person) != 0) {
      var placement = finalCompetition.GetPlacement(person);
      var partner : Competitor;

      if (finalCompetition.Scores[placement - 1][0].Leader == person){
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