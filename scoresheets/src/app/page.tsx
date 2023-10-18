import { DanceEvent } from '@/classes/DanceEvent';
import PrelimsScoresheet from '@/component/prelim-competition-viewer';
import PrelimCompetitionAdder from '@/component/prelim-competition-adder';
import PrelimAdder from '@/component/prelim-adder';

import { TestData } from '../test-data/test-data';

export default function Home() {
  var event = new DanceEvent("Swungalow Bungalow");

  var comp_leaders = TestData.TestPrelimCompetitionLeaders();
  var comp_followers = TestData.TestPrelimCompetitionFollowers();

  return (
    <div>
      <h1>{event.Name}</h1>
      <PrelimsScoresheet competition={comp_leaders}/>
      <PrelimsScoresheet competition={comp_followers}/>
    </div>
  )
}