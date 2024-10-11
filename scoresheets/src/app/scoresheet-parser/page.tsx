"use client";

import { useState } from "react";
import { ParsePrelimScoreSheet, ParseFinalScoreSheet } from "./scoresheet-parser";
import PrelimsScoresheet from "@/components/prelim-competition-viewer";
import FinalsScoresheet from "@/components/finals-competition-viewer";
import { PrelimCompetition } from "@/classes/PrelimCompetition";
import { Division, Round, WcsUtil } from "wcs-ss-lib";
import { FinalCompetition } from "@/classes/FinalCompetition";

export default function Page() {  
  const [file, setFile] = useState<File | undefined>();
  const [leaderComp, setLeaderComp] = useState<PrelimCompetition | undefined>();
  const [followerComp, setFollowerComp] = useState<PrelimCompetition | undefined>();
  const [finalComp, setFinalComp] = useState<FinalCompetition | undefined>();
  const [round, setRound] = useState<Round>(Round.Finals);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
  }

  async function parseScoreSheet() {
    let htmlString = await file?.text();
    if (htmlString == undefined)
      return;

    switch (round) {
      case Round.Finals: {
        let competition = ParseFinalScoreSheet(htmlString, Division.AllStar);
        setFinalComp(competition?.FinalCompetition);
        return;
      }
      default:
      case Round.Prelims:
      case Round.Semifinals:
        let competition = ParsePrelimScoreSheet(htmlString, Division.AllStar);
        setLeaderComp(competition?.PairedPrelimCompetitions[0]?.LeaderPrelimCompetition);
        setFollowerComp(competition?.PairedPrelimCompetitions[0]?.FollowerPrelimCompetition);
        return;
    }
  }

  function PrelimScoreSheets(leaderCompetition: PrelimCompetition | undefined, followerCompetition: PrelimCompetition | undefined) {
    if (leaderCompetition != undefined && followerCompetition != undefined && round != Round.Finals) {
      return (
        <div>
          <PrelimsScoresheet competition={leaderCompetition}/>
          <PrelimsScoresheet competition={followerCompetition}/>
        </div>
      )
    }
    else {
      return;
    }
  }

  function FinalScoreSheet(finalCompetition: FinalCompetition | undefined) {
    if (finalCompetition != undefined && round == Round.Finals) {
      return <FinalsScoresheet competition={finalCompetition}/> 
    }
    else {
      return;
    }
  }

  function changeRound(e: React.ChangeEvent<HTMLSelectElement>) {
    let value = WcsUtil.ContainsRoundString(e.target.value);
    if (value != undefined)
      setRound(value);
  }

  return (
    <div>
      <div>
        <input type="file" name="scoresheet" accept=".html" onChange={handleOnChange}/>
      </div>
      
      <label htmlFor="round-selector">Round:</label>
      <select name="round-selector" onChange={changeRound} value={round}>
        <option value={Round.Prelims}>Prelims</option>
        <option value={Round.Semifinals}>Semis</option>
        <option value={Round.Finals}>Finals</option>
      </select>

      <div>
        <button type="submit" onClick={parseScoreSheet}>Parse Sheet</button>
      </div>

      {PrelimScoreSheets(leaderComp, followerComp)}
      {FinalScoreSheet(finalComp)}
    </div>
  )
}