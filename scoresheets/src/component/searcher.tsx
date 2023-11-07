"use client";

import { Competitor, IPerson } from "@/classes/IPerson";
import { useState } from "react";

import { TestData } from '@/test-data/test-data';

export default function Searcher() {
  const people = TestData.TestCompetitorsDb();

  const [searchText, setSearchText] = useState("");
  const [person, setPerson] = useState<Competitor>();

  function SearchText() {
    var searchedPerson = people.find((p) => p.FullName == searchText);
    setPerson(searchedPerson);
  }

  return (
    <div>
      <label>Search</label>
      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      <button type="button" onClick={SearchText}>Search</button>

      <h1>{person?.FullName}</h1>
      <h3>Current Rating: </h3>
      
    </div>
  )
}