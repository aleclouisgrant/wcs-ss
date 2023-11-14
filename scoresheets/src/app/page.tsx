import FinalsScoresheet from "@/component/finals-competition-viewer";

import { TestData } from "@/test-data/test-data";

function Home() {
  return (
    <div>
      <FinalsScoresheet competition={TestData.TestFinalCompetition()}/>
    </div>
  )
}

export default Home;