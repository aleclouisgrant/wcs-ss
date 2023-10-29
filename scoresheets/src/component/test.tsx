'use client';

import { useState } from "react";
import Selector from "./person-selector";
import { TestData } from "@/test-data/test-data";
import { Competitor, Person } from "@/classes/IPerson";

export default function Uploader() {
    const [person, setPerson] = useState(new Competitor("Test", "Testy", 300));

    function HandlePerson(competitor: Competitor | undefined) {
        if (competitor != null) {
            setPerson(competitor);
        }
    }

    return (
        <div>
            <Selector personDb={TestData.TestCompetitorsDb()} selectedPerson={person} setSelectedPerson={HandlePerson}></Selector>
            <h2>{person.FullName}</h2>
        </div>
    )
}

