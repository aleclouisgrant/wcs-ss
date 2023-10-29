'use client';

import { useState } from 'react';
import { Competitor, Judge } from '@/classes/IPerson';

export default function DatabaseAdder() {
    const [competitors, setCompetitors] = useState(new Array<Competitor>());
    const [judges, setJudges] = useState(new Array<Judge>());

    function AddCompetitor(){
        let compFirstName = (document.getElementById("compFirstNameInput") as HTMLInputElement).value;
        let compLastName = (document.getElementById("compLastNameInput") as HTMLInputElement).value;
        let compBibNumber = parseInt((document.getElementById("compBibNumberInput") as HTMLInputElement).value);

        setCompetitors([...competitors, new Competitor(compFirstName, compLastName, compBibNumber)]);
    }

    function AddJudge() {
        let judgeFirstName = (document.getElementById("judgeFirstNameInput") as HTMLInputElement).value;
        let judgeLastName = (document.getElementById("judgeLastNameInput") as HTMLInputElement).value;

        if (judgeFirstName != null && judgeLastName != null && judgeFirstName != '' && judgeLastName != '') {
            setJudges([...judges, new Judge(judgeFirstName, judgeLastName)]);
        }
    }

    return (
        <div>
            <form>
                <label>First name:</label>
                <input type="text" id='compFirstNameInput'/>
                <label>Last name:</label>
                <input type="text" id='compLastNameInput'/>
                <label>Bib number:</label>
                <input type="text" id='compBibNumberInput'/>
                <button type="button" onClick={AddCompetitor}>Add Competitor</button>
            </form>

            <form>
                <label>First name:</label>
                <input type="text" id='judgeFirstNameInput'/>
                <label>Last name:</label>
                <input type="text" id='judgeLastNameInput'/>
                <button type="button" onClick={AddJudge}>Add Judge</button>
            </form>
        </div>
    )
}