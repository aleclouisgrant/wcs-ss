"use client";

import { trpc } from "../_trpc/client";
import { FormEvent, useEffect, useState } from "react";
import { Competitor } from "@/classes/IPerson";

import CompetitorAnalytics from "@/components/CompetitorAnalytics"
import { Uuid } from "@/classes/Uuid";

export default function Page() {
  const [searchText, setSearchText] = useState<string>("")
  const [competitor, setCompetitor] = useState<Competitor>();
  
  const { data, refetch } = trpc.getUserByName.useQuery(searchText, {enabled: false});
  
  useEffect(() => {
    if (data) {
      var idData = data?.user?.Id?.uuid ?? "";
  
      var newCompetitor = new Competitor(
        data?.user?.FirstName ?? "", 
        data?.user?.LastName ?? "",
        0,
        0);
  
        newCompetitor.Id = new Uuid(idData);
  
      setCompetitor(newCompetitor);
    }
  },[data]);

  function Search(e : FormEvent) {
    e.preventDefault();
    refetch();
  }

  return (
    <div>
      <form onSubmit={(e) => Search(e)} className="m-4">
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-full focus:ring-blue-500 focus:border-blue-500 inline-block p-1 px-2 w-2/5"/>
        <button className="btn-primary mx-2">Search</button>
      </form>
      <div className="m-4">
        <CompetitorAnalytics competitor={competitor} />
      </div>
    </div>
  )
}