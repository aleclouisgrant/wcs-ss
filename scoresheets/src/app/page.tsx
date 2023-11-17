import FinalsScoresheet from "@/components/finals-competition-viewer";

import { TestData } from "@/test-data/test-data";

function Home() {
  return (
    <div>
      <FinalsScoresheet competition={TestData.TestFinalCompetition()}/>
    </div>
  )
}

export default Home;