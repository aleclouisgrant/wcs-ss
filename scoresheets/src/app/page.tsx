'use client';
import { DanceEvent } from '@/classes/DanceEvent';
import PrelimsScoresheet from '@/component/prelim-competition-viewer';
import PrelimCompetitionAdder from '@/component/prelim-competition-adder';
import PrelimAdder from '@/component/prelim-adder';

import { TestData } from '../test-data/test-data';
import { PrelimCompetition } from '@/classes/Competition';

export default function Home() {
  var event = new DanceEvent("Swungalow Bungalow");

  var comp_leaders = TestData.TestPrelimCompetitionLeaders();
  var comp_followers = TestData.TestPrelimCompetitionFollowers();

  var pendingPrelimCompetitions = new Array<PrelimCompetition>();

  function UploadPendingPrelimCompetitions() {
    console.log("upload");
    pendingPrelimCompetitions = new Array<PrelimCompetition>();
  }

  function AddPrelimCompetitionToPending(prelimCompetition: PrelimCompetition) {
    pendingPrelimCompetitions.push(prelimCompetition);
  }

  return (
    <div>
      <h1>{event.Name}</h1>
      <PrelimAdder />
      <button type='button' onClick={UploadPendingPrelimCompetitions}>Upload</button>
    </div>
  )
}