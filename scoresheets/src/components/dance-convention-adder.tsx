"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Uuid } from "@/classes/Uuid";
import { DanceConvention } from "@/classes/DanceConvention";
import { DanceConventionsContext } from "@/context/DanceConventionsContext";
import { StringFromDate } from "@/classes/utils";

export default function DanceConventionAdder() {
    const [nameText, setNameText] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date());

    const { value: danceConventions, setValue: setDanceConventions } = useContext(DanceConventionsContext);

    const { data: danceConventionsData } = trpc.getDanceConventions.useQuery();

    const addConvention = trpc.addDanceConvention.useMutation();

    useEffect(() => {
        if (danceConventionsData) {
            setDanceConventions(danceConventionsData.map((danceConventionData) => {
                var danceConvention = new DanceConvention(
                    danceConventionData.Name,
                    new Date(danceConventionData.Date));
                danceConvention.Id = new Uuid(danceConventionData.Id);

                return danceConvention;
            }));
        }
    },[danceConventionsData]);

    function AddDanceConvention(e: FormEvent) {
        e.preventDefault();
        var newDanceConvention = new DanceConvention(nameText, date);

        addConvention.mutate(newDanceConvention, {onSuccess(data) {
            newDanceConvention.Id = data.id;
            var newDanceConventions = [...danceConventions];
            newDanceConventions.push(newDanceConvention);
            setDanceConventions(newDanceConventions);

            setNameText("");
            setDate(new Date());
        }});
    }

    return (
        <div>
            <form onSubmit={(e) => AddDanceConvention(e)} className="m-8">
                <div>
                    <label htmlFor="nameInput" className="block mb-2 text-sm font-medium text-black">Name</label>
                    <input id="nameInput" type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}
                        className="input-primary"/>
                </div>
                <div>
                    <label htmlFor="dateInput" className="block mb-2 text-sm font-medium text-black">Date</label>
                    <input id="dateInput" type="date" value={StringFromDate(date)} onChange={(e) => setDate(new Date(e.target.value))}
                        className="input-primary"/>
                </div>

                <div>
                    <button type="submit" className="btn-primary mr-2 mt-2">Add Dance Convention</button>
                </div>
            </form>
        </div>
    )
}