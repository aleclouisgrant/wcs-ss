"use client";

import { useState } from "react";
import { ParseScoreSheet } from "./scoresheet-parser";
import PrelimsScoresheet from "@/components/prelim-competition-viewer";
import { Competition } from "@/classes/Competition";

export default async function Page() {  
  const [file, setFile] = useState<File | undefined>();
  const [comp, setComp] = useState<Competition | undefined>();

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
  }

  async function parseScoreSheet() {
    const htmlString : string | undefined = await file?.text();
    setComp(ParseScoreSheet(htmlString));
  }

  return (
    <div>
      <div>
        <input type="file" name="scoresheet" accept=".html" onChange={handleOnChange}/>
        <button type="submit" formAction={parseScoreSheet}>Parse Sheet</button>
      </div>

      <PrelimsScoresheet competition={comp?.PairedPrelimCompetitions[0].LeaderPrelimCompetition}/>
    </div>
  )
}