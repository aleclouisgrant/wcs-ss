"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";
import { Competitor } from "@/classes/IPerson";

import CompetitorAnalytics from "@/component/CompetitorAnalytics"

export default function Page() {
  const [searchText, setSearchText] = useState<string>("")
  const [firstNameText, setFirstNameText] = useState<string>("")
  const [lastNameText, setLastNameText] = useState<string>("")

  const [competitor, setCompetitor] = useState<Competitor>();

  const response = trpc.getUser.useQuery(searchText);
  const addCompetitor = trpc.addCompetitor.useMutation();

  function AddCompetitor() {
    var comp = new Competitor(firstNameText, lastNameText);
    console.log("GUID: " + comp.Id.toString());

    addCompetitor.mutate(comp);
  }

  function Search() {
    setCompetitor(new Competitor(response.data?.user?.firstName ?? "", response.data?.user?.lastName ?? ""));
  }

  return (
    <div>
      <div>
        <input type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
        <input type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)} />
        <button onClick={AddCompetitor}>Add</button>
      </div>

      <br/>

      <div>
        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={Search}>Search</button>

        <CompetitorAnalytics competitor={competitor} />

      </div>
    </div>
  )
}