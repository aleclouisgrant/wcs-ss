'use client';

import { ReactNode, useContext, useEffect, useState } from "react";

import { trpc } from "@/app/_trpc/client";
import { Competitor } from "@/classes/IPerson";
import { PrelimCompetition } from "@/classes/Competition";
import PrelimAdder from "./prelim-adder";
import { CompetitorsContext } from "@/context/CompetitorsContext";
import { Uuid } from "@/classes/Uuid";

export default function Uploader() {
    const [firstNameText, setFirstNameText] = useState<string>("")
    const [lastNameText, setLastNameText] = useState<string>("")
    const [wsdcIdText, setWsdcIdText] = useState<string>("")

    const { value: competitors, setValue: setCompetitors } = useContext(CompetitorsContext);

    const { data } = trpc.getUsers.useQuery();
    const addCompetitor = trpc.addUser.useMutation();

    useEffect(() => {
        if (data) {
            setCompetitors(data.map((competitorData) => {
                var competitor = new Competitor(
                    competitorData.FirstName, 
                    competitorData.LastName,
                    undefined,
                    undefined);
                competitor.Id = new Uuid(competitorData.Id);

                return competitor;
            }));
        }
    },[data]);

    function AddCompetitor() {
        var newCompetitor = new Competitor(firstNameText, lastNameText, 0, +wsdcIdText);

        addCompetitor.mutate(newCompetitor, {onSuccess() {
            var newCompetitors = [...competitors];
            newCompetitors.push(newCompetitor);
            setCompetitors(newCompetitors);
        }});
    }

    function HandlePrelimCompetition(prelimCompetition: PrelimCompetition | undefined) {
        if (prelimCompetition != null) {
            prelimCompetition.Print();
        }
    }

    function Competitors(props: {competitors: Array<Competitor>}) {
        var nodes = Array<ReactNode>();
        props.competitors.forEach((competitor) => {
            nodes.push(<div key={competitor.Id.toString()}>{competitor.FullName} {competitor.Id.toString()}</div>)
        })

        return (
            <div>{nodes}</div>
        );
    }

    return (
        <div>
            <div>
                <div>
                    <label>
                        First Name:
                        <input type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        WSDC Id:
                        <input type="text" value={wsdcIdText} onChange={(e) => setWsdcIdText(e.target.value)} />
                    </label>
                </div>
                <button onClick={AddCompetitor}>Add</button>
            </div>

            <br/>
            <Competitors competitors={competitors}/>
            <br/>

            <div>
                <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition}/>
            </div>
        </div>
    )
}