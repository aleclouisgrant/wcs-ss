import { useState, createContext, useEffect } from 'react';
import { ContextProviderProps, ContextType } from './ContextType';

import { Judge } from '@/classes/Judge';
import { Uuid } from 'wcs-ss-lib';
import { TestData } from '@/test-data/test-data';

export const JudgesContext = createContext<ContextType<Array<Judge>>>(
        {
            value: new Array<Judge>,
            setValue: () => {}
        }
    );

export const JudgesContextProvider = ({ children } : ContextProviderProps) => {
    const [judges, setJudges] = useState(new Array<Judge>);
    
    useEffect(() => {
        fetch('http://localhost:3000/api/v0/judges')
        .then(response => response.json())
        .then((json: {first_name: string, last_name: string, id: string | undefined}[]) => {
            let newJudges = new Array<Judge>();
            json.forEach((judgeData) => {
                var newJudge = new Judge(
                    judgeData.first_name,
                    judgeData.last_name,
                );
                if (judgeData.id != undefined)
                    newJudge.Id = new Uuid(judgeData.id);

                newJudges.push(newJudge);
            });

            setJudges(newJudges);
        })
        .catch(error => {
            console.error(error);
            setJudges(TestData.TestJudgesDb());
    });
    }, []);

    return (
        <JudgesContext.Provider value={{ value: judges, setValue: setJudges}}>
            {children}
        </JudgesContext.Provider>
    )
}