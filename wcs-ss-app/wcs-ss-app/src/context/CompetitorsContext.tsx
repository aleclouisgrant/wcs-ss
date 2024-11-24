import { useState, createContext, useEffect } from 'react';
import { ContextProviderProps, ContextType } from './ContextType';

import { Competitor } from '@/classes/Competitor';
import { Uuid } from 'wcs-ss-lib';
import { trpc } from '@/app/_trpc/client';

export const CompetitorsContext = createContext<ContextType<Array<Competitor>>>(
        {
            value: new Array<Competitor>,
            setValue: () => {}
        }
    );

export const CompetitorsContextProvider = ({ children } : ContextProviderProps) => {
    const [competitors, setCompetitors] = useState(new Array<Competitor>);

    useEffect(() => {
        fetch('http://localhost:3000/api/v0/competitors')
        .then(response => response.json())
        .then((json: {first_name: string, last_name: string, wsdc_id: number, id: string | undefined}[]) => {
            let newCompetitors = new Array<Competitor>();
            json.forEach((competitorData) => {
                var newCompetitor = new Competitor(
                    competitorData.first_name,
                    competitorData.last_name,
                    undefined,
                    competitorData.wsdc_id
                );
                if (competitorData.id != undefined)
                    newCompetitor.Id = new Uuid(competitorData.id);

                newCompetitors.push(newCompetitor);
            });

            setCompetitors(newCompetitors);
        })
        .catch(error => console.error(error));
    }, []);

    // const { data, refetch } = trpc.getCompetitors.useQuery();
  
    // useEffect(() => {
    //     if (data) {
    //         let newCompetitors = new Array<Competitor>();

    //         data.forEach((competitorData) => {
    //             var newCompetitor = new Competitor(
    //                 competitorData.FirstName,
    //                 competitorData.LastName,
    //                 undefined,
    //                 undefined,
    //                 new Uuid(competitorData.Id)
    //             );

    //             newCompetitors.push(newCompetitor);
    //         });
        
    //         setCompetitors(newCompetitors);
    //     }
    //     }, [data]);

    return (
        <CompetitorsContext.Provider value={{ value: competitors, setValue: setCompetitors}}>
            {children}
        </CompetitorsContext.Provider>
    )
}