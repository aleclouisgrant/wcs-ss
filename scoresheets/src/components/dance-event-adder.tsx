"use client";

import PrelimAdder from "./prelim-adder";

export default function DanceEventAdder() {

    function HandlePrelimCompetition() {

    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="block w-3/5">
                <div className="mb-2">
                    <button className="inline-block">Back</button>
                    <h1 className="inline-block">Add Dance Event</h1>
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
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <div className="labeled-input-container">
                                        <label>Date</label>
                                        <input type="text" placeholder="MM/DD/YYYY" />
                                    </div>
                                    <div className="labeled-input-container">
                                        <label>Location</label>
                                        <input type="text" placeholder="City, State" />
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

                <div className="rounded-xl bg-white p-11 mt-3">
                    <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition}/>
                </div>
            </div>
        </div>
    )
}