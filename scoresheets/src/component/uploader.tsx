'use client';

import { ReactNode, useContext, useEffect, useState } from "react";

import { trpc } from "@/app/_trpc/client";
import { Competitor } from "@/classes/IPerson";
import { PrelimCompetition } from "@/classes/Competition";

import PrelimAdder from "./prelim-adder";
import { CompetitorsContext } from "@/context/CompetitorsContext";
import { Guid } from "@/classes/Guid";

export default function Uploader() {
    const [firstNameText, setFirstNameText] = useState<string>("")
    const [lastNameText, setLastNameText] = useState<string>("")

    const { value: competitors, setValue: setCompetitors } = useContext(CompetitorsContext);

    const addCompetitor = trpc.addCompetitor.useMutation();
    const { data } = trpc.getCompetitors.useQuery();

    useEffect(() => {
        if (data) {
            setCompetitors(data.map((competitor) => new Competitor(competitor.firstName, competitor.lastName, undefined, new Guid(competitor.id))));
        }
    },[data]);

    function Competitors(props: { competitors: Array<Competitor> }) {
        let nodes = Array<ReactNode>();
        props.competitors.forEach((competitor) => {
            nodes.push(<div key={competitor.Id.toString()}>{competitor.FullName} ({competitor.Id.toString()})</div>)
        })

        return (
            <div>
                {nodes}
            </div>
        )
    }

    function AddCompetitor() {
        var comp = new Competitor(firstNameText, lastNameText);
        addCompetitor.mutate(comp);

        var newCompetitors = [...competitors];
        newCompetitors.push(comp);
        setCompetitors(newCompetitors);
    }

    function HandlePrelimCompetition(prelimCompetition: PrelimCompetition | undefined) {
        if (prelimCompetition != null) {
            prelimCompetition.Print();
        }
    }

    return (
        <div>
            <div>
                <input type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
                <input type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)} />
                <button onClick={AddCompetitor}>Add</button>
            </div>

            <br />
            <Competitors competitors={competitors}/>
            <br />

            <div>
                <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition} />
            </div>
        </div>
    )
}