"use client"

import DanceEventAdder from "@/components/dance-event-adder";

import { CompetitorsContextProvider } from "@/context/CompetitorsContext";
import { DanceConventionsContextProvider } from "@/context/DanceConventionsContext";
import { JudgesContextProvider } from "@/context/JudgesContext";

export default async function Page() {  
  return (
    <div className="h-screen w-screen bg-neutral-300">
      <DanceConventionsContextProvider>
        <JudgesContextProvider>
          <CompetitorsContextProvider>
            <DanceEventAdder/>
          </CompetitorsContextProvider>
        </JudgesContextProvider>
      </DanceConventionsContextProvider>
    </div>
  )
}