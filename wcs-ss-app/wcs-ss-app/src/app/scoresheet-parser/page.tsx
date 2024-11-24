"use client";

import { CompetitorsContextProvider } from "@/context/CompetitorsContext";
import { DanceConventionsContextProvider } from "@/context/DanceConventionsContext";
import { JudgesContextProvider } from "@/context/JudgesContext";

import ScoresheetParserPage from "./scoresheet-parser-page";

export default function Page() {  
  return (
    <div className="h-screen w-screen">
      <DanceConventionsContextProvider>
        <JudgesContextProvider>
          <CompetitorsContextProvider>
            <ScoresheetParserPage/>
          </CompetitorsContextProvider>
        </JudgesContextProvider>
      </DanceConventionsContextProvider>
    </div>
  )
}