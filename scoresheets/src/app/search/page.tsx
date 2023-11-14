"use client";

import { trpc } from "../_trpc/client";
import { useEffect, useState } from "react";
import { Competitor } from "@/classes/IPerson";

import CompetitorAnalytics from "@/component/CompetitorAnalytics"
import { Uuid } from "@/classes/Uuid";

export default function Page() {
  const [searchText, setSearchText] = useState<string>("")
  const [competitor, setCompetitor] = useState<Competitor>();
  
  const { data, refetch } = trpc.getUser.useQuery(searchText, {enabled: false});
  
  useEffect(() => {
    if (data) {
      var idData = data?.user?.Id?.uuid ?? "";
  
      var newCompetitor = new Competitor(
        data?.user?.FirstName ?? "", 
        data?.user?.LastName ?? "",
        0,
        data?.user?.WsdcId ?? 0);
  
        newCompetitor.Id = new Uuid(idData);
  
      setCompetitor(newCompetitor);
    }
  },[data]);

  function Search() {
    refetch();
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