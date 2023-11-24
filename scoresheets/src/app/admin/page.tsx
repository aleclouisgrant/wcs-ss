"use client"

import Uploader from "@/components/uploader";
import { CompetitorsContextProvider } from "@/context/CompetitorsContext";
import { JudgesContextProvider } from "@/context/JudgesContext";

export default async function Page() {  
  return (
    <div>
      <JudgesContextProvider>
        <CompetitorsContextProvider>
          <Uploader/>
        </CompetitorsContextProvider>
      </JudgesContextProvider>
    </div>
  )
}