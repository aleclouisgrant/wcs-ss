"use client"

import Uploader from "@/components/uploader";
import { CompetitorsContextProvider } from "@/context/CompetitorsContext";
import { DanceConventionsContextProvider } from "@/context/DanceConventionsContext";
import { JudgesContextProvider } from "@/context/JudgesContext";

export default async function Page() {  
  return (
    <div>
      <DanceConventionsContextProvider>
        <JudgesContextProvider>
          <CompetitorsContextProvider>
            <Uploader/>
          </CompetitorsContextProvider>
        </JudgesContextProvider>
      </DanceConventionsContextProvider>
    </div>
  )
}