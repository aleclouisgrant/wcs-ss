"use client"

import Uploader from "@/components/uploader";
import { CompetitorsContextProvider } from "@/context/CompetitorsContext";

export default async function Page() {  
  return (
    <div>
      <CompetitorsContextProvider>
        <Uploader/>
      </CompetitorsContextProvider>
    </div>
  )
}