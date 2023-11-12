"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";
import { Competitor } from "@/classes/IPerson";

import CompetitorAnalytics from "@/component/CompetitorAnalytics"

export default function Page() {
  const [searchText, setSearchText] = useState<string>("")
  const [competitor, setCompetitor] = useState<Competitor>();

  const response = trpc.getUser.useQuery(searchText);

  function Search() {
    console.log("search")
    setCompetitor(new Competitor(response.data?.user?.firstName ?? "", response.data?.user?.lastName ?? ""));
  }

  return (
    <div>
      <div>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={Search}>Search</button>

        <CompetitorAnalytics competitor={competitor} />
      </div>
    </div>
  )
}