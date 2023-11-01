'use client';

import { useState } from "react";

import { PrelimCompetition } from "@/classes/Competition";
import { DanceEvent } from "@/classes/DanceEvent";
import { Division, Role, Round } from "@/classes/Enums";
import { TestData } from "@/test-data/test-data";

import PrelimAdder from "./prelim-adder";
import PrelimsScoresheet from "./prelim-competition-viewer";

export default function Uploader() {
    var event = new DanceEvent("Swungalow Bungalow");

    var comp_leaders = TestData.TestPrelimCompetitionLeaders();
    var comp_followers = TestData.TestPrelimCompetitionFollowers();

    const [competition, setCompetition] = useState(new PrelimCompetition("test", Division.AllStar, Round.Prelims, Role.Follower));

    function HandlePrelimCompetition(prelimCompetition: PrelimCompetition | undefined) {
        if (prelimCompetition != null) {
            prelimCompetition.Print();
            setCompetition(prelimCompetition);
        }
    }

    return (
        <div>
            <h1>{event.Name}</h1>
            <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition} />
        </div>
    )
}