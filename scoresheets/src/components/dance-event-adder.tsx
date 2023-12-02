"use client";

import { ReactNode, useState } from "react";
import PrelimAdder from "./prelim-adder";
import { CompetitionType, Division, Round } from "@/classes/Enums";

export default function DanceEventAdder() {
    const [useNewEvent, setUseNewEvent] = useState<boolean>(false);
    
    const [newEventNameText, setNewEventNameText] = useState<string>("");
    const [newEventDateText, setNewEventDateText] = useState<string>("");
    const [newEventLocationText, setNewEventLocationText] = useState<string>("");

    const [typeCompetitionInfo, setTypeCompetitionInfo] = useState<CompetitionType>(CompetitionType.JnJ);
    const [divisionCompetitionInfo, setDivisionCompetitionInfo] = useState<Division>(Division.AllStar);
    const [roundsCompetitionInfo, setRoundsCompetitionInfo] = useState<Array<Round>>();

    function HandlePrelimCompetition() {

    }

    function AddCompetitionCards() {
        var cards = new Array<ReactNode>;

        cards.push(
            <div className="rounded-xl bg-white p-11 mt-3 flex flex-row justify-center items-center">
                <div className="block">
                    <div>
                        <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition} />
                    </div>
                    <div className="grid grid-cols-2 mt-8">
                        <button className="btn-secondary mr-2" type="button">Back</button>
                        <button className="btn-primary" type="button">Next</button>
                    </div>
                </div>
            </div>
        );

        return cards;
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="block w-4/5">
                <div className="mb-2 flex justify-center">
                    <button type="button" className="mr-auto btn-secondary">Back</button>
                    <h1>Add Dance Event</h1>
                    <button type="button" className="btn-primary ml-auto">Upload</button>
                </div>
                <div className="rounded-xl bg-white p-11 flex flex-row justify-center items-center">
                    <div className="block">
                        <div className="align-middle grid grid-cols-2">
                            <div className="align-middle">
                                <div className="radio-container">
                                    <input type="radio" radioGroup="choose-dance-radio" />
                                    <label>Choose Existing</label>
                                </div>
                                <select className="select-primary" />
                            </div>
                            <div className="justify-center">
                                <div className="radio-container">
                                    <input type="radio" radioGroup="choose-dance-radio" />
                                    <label>Add New Event</label>
                                </div>
                                <div className="ml-4 mt-2">
                                    <div className="labeled-input-container">
                                        <label>Name</label>
                                        <input type="text" onChange={(e) => setNewEventNameText(e.target.value)} placeholder="Name" />
                                    </div>
                                    <div className="labeled-input-container">
                                        <label>Date</label>
                                        <input type="text" onChange={(e) => setNewEventDateText(e.target.value)} placeholder="MM/DD/YYYY" />
                                    </div>
                                    <div className="labeled-input-container">
                                        <label>Location</label>
                                        <input type="text" onChange={(e) => setNewEventLocationText(e.target.value)} placeholder="City, State" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn-primary">Next</button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-11 mt-3 flex flex-row justify-center items-center">
                    <div className="block">
                        <div className="justify-center">
                            <div className="labeled-input-container">
                                <label>Type</label>
                                <input type="text" placeholder="Type" />
                            </div>
                            <div className="labeled-input-container">
                                <label>Division</label>
                                <input type="text" placeholder="Division" />
                            </div>
                            <div className="labeled-input-container">
                                <label>Rounds</label>
                                <input type="text" placeholder="Rounds" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 mt-8">
                            <button className="btn-secondary mr-2" type="button">Back</button>
                            <button className="btn-primary" type="button">Next</button>
                        </div>
                    </div>
                </div>

                {AddCompetitionCards()}
            </div>
        </div>
    )
}