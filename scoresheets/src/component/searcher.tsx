"use client";

import { Competitor, IPerson } from "@/classes/IPerson";
import { PrelimCompetition } from "@/classes/Competition";
import { useState } from "react";

import { TestData } from '@/test-data/test-data';
import { DanceEvent } from "@/classes/DanceEvent";


function CompetitorScoreViewer(props: {competitor : Competitor, danceEvent : DanceEvent}) {

}

export default function Searcher() {
  const people = TestData.TestCompetitorsDb();

  const [searchText, setSearchText] = useState("");
  const [person, setPerson] = useState<Competitor>();

  function SearchText() {
    var searchedPerson = people.find((p) => p.FullName == searchText);
    setPerson(searchedPerson);
  }

  const CompetitionScores = () => {

  }

  return (
    <div>
      <label>Search</label>
      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      <button type="button" onClick={SearchText}>Search</button>

      <h1>{person?.FullName}</h1>
      <h3>Rating: </h3>




    </div>
  )
}