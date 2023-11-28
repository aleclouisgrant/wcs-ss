"use client";

export default function DanceEventAdder() {
    return (
        <div className="h-screen flex items-center justify-center">
            <button className="rounded-lg">Back</button>
            <h1 className="font-bold text-black text-xl">Add Dance Event</h1>
            <div className="rounded-xl bg-white p-11 w-3/5">
                <div className="align-middle grid grid-cols-3">
                    <div className="align-middle">
                        <div>
                            <label className="radio-container" radioGroup="choose-dance-radio">Choose Existing
                                <input type="radio"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="bg-zinc-600 h-3/5 w-1"/>
                    <div className="align-middle">
                        <div>
                            <label className="radio-container" radioGroup="choose-dance-radio">Add New Event
                                <input type="radio"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}