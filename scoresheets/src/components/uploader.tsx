"use client";

import { PrelimCompetition } from "@/classes/Competition";
import PrelimAdder from "./prelim-adder";
import PersonAdder from "./person-adder";
import DanceConventionAdder from "./dance-convention-adder";

export default function Uploader() {
    function HandlePrelimCompetition(prelimCompetition: PrelimCompetition | undefined) {
        if (prelimCompetition != null) {
            prelimCompetition.Print();
        }
    }

    return (
        <div>
            <div>
                <PersonAdder/>
                <DanceConventionAdder/>
            </div>
            <div className="m-4">
                <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition}/>
            </div>
        </div>
    )
}