"use client";

import { useState } from "react";
import { ParseScoreSheet } from "./scoresheet-parser";
import PrelimsScoresheet from "@/components/prelim-competition-viewer";
import { PrelimCompetition } from "@/classes/PrelimCompetition";
import { Division } from "wcs-ss-lib";

export default function Page() {  
  const [file, setFile] = useState<File | undefined>();
  const [leaderComp, setLeaderComp] = useState<PrelimCompetition | undefined>();
  const [followerComp, setFollowerComp] = useState<PrelimCompetition | undefined>();

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
  }

  async function parseScoreSheet() {
    const competition = ParseScoreSheet(await file?.text(), Division.AllStar);
    setLeaderComp(competition?.PairedPrelimCompetitions[0]?.LeaderPrelimCompetition);
    setFollowerComp(competition?.PairedPrelimCompetitions[0]?.FollowerPrelimCompetition);
  }

  function ScoreSheetView(leaderCompetition: PrelimCompetition | undefined, followerCompetition: PrelimCompetition | undefined) {
    if (leaderCompetition != undefined && followerCompetition != undefined) {
      return (
        <div>
          <PrelimsScoresheet competition={leaderComp}/>
          <PrelimsScoresheet competition={followerComp}/>
        </div>
      )
    }
    else {
      return <p>No prelim competition found in scoresheet</p>
    }
  }

  return (
    <div>
      <div>
        <input type="file" name="scoresheet" accept=".html" onChange={handleOnChange}/>
      </div>
      <button type="submit" onClick={parseScoreSheet}>Parse Sheet</button>

      {ScoreSheetView(leaderComp, followerComp)}
    </div>
  )
}