"use client";

import { FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Uuid } from "@/classes/Uuid";
import { Competitor, Judge } from "@/classes/IPerson";
import { PrelimCompetition } from "@/classes/Competition";
import { CompetitorsContext } from "@/context/CompetitorsContext";
import { JudgesContext } from "@/context/JudgesContext";
import PrelimAdder from "./prelim-adder";

export default function Uploader() {
    const [firstNameText, setFirstNameText] = useState<string>("")
    const [lastNameText, setLastNameText] = useState<string>("")
    const [wsdcIdText, setWsdcIdText] = useState<string>("")

    const { value: competitors, setValue: setCompetitors } = useContext(CompetitorsContext);
    const { value: judges, setValue: setJudges } = useContext(JudgesContext);

    const { data: competitorsData } = trpc.getCompetitors.useQuery();
    const { data: judgesData } = trpc.getJudges.useQuery();

    const addCompetitor = trpc.addCompetitor.useMutation();
    const addJudge = trpc.addJudge.useMutation();

    useEffect(() => {
        if (competitorsData) {
            setCompetitors(competitorsData.map((competitorData) => {
                var competitor = new Competitor(
                    competitorData.FirstName, 
                    competitorData.LastName,
                    undefined,
                    competitorData.WsdcId);
                competitor.Id = new Uuid(competitorData.Id);

                return competitor;
            }));
        }
    },[competitorsData]);

    function AddCompetitor(e: FormEvent) {
        e.preventDefault();
        var newCompetitor = new Competitor(firstNameText, lastNameText, 0, +wsdcIdText);

        addCompetitor.mutate(newCompetitor, {onSuccess(data) {
            newCompetitor.Id = data.id;
            var newCompetitors = [...competitors];
            newCompetitors.push(newCompetitor);
            setCompetitors(newCompetitors);

            setFirstNameText("");
            setLastNameText("");
            setWsdcIdText("");
        }});
    }

    function AddJudge(e: FormEvent) {
        e.preventDefault();
        var newJudge = new Judge(firstNameText, lastNameText);

        addJudge.mutate(newJudge, {onSuccess(data) {
            newJudge.Id = data.id;
            var newJudges = [...judges];
            newJudges.push(newJudge);
            setJudges(newJudges);

            setFirstNameText("");
            setLastNameText("");
            setWsdcIdText("");
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
            nodes.push(<div key={competitor.Id.toString()}>{competitor.Id.toString()} {competitor.FullName} ({competitor.WsdcId})</div>)
        })

        return (
            <div>{nodes}</div>
        );
    }

    function SearchForWsdcId(){

    }

    return (
        <div>
            <form onSubmit={(e) => AddCompetitor(e)} className="m-8">
                <div>
                    <label htmlFor="firstNameInput" className="block mb-2 text-sm font-medium text-black">First Name</label>
                    <input id="firstNameInput" type="text" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)}
                        className="input-primary"/>
                </div>
                <div>
                    <label htmlFor="lastNameInput" className="block mb-2 text-sm font-medium text-black">Last Name</label>
                    <input id="lastNameInput" type="text" value={lastNameText} onChange={(e) => setLastNameText(e.target.value)}
                        className="input-primary"/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">WSDC Id</label>
                    <input type="text" value={wsdcIdText} onChange={(e) => setWsdcIdText(e.target.value)}
                        className="input-primary"/>
                    <button className="btn-primary m-1 inline-block" onClick={SearchForWsdcId}>?</button>
                </div>

                <div>
                    <button type="submit" className="btn-primary mr-2 mt-2">Add Competitor</button>
                    <button type="submit" className="btn-primary ml-2" onClick={(e) => AddJudge(e)}>Add Judge</button>
                </div>
            </form>

            <div className="m-4">
                <PrelimAdder handlePrelimCompetition={HandlePrelimCompetition}/>
            </div>
        </div>
    )
}