import { Competitor } from '@/classes/IPerson';
import { useState, createContext } from 'react';
import { ContextProviderProps, ContextType } from './ContextType';

export const CompetitorsContext = createContext<ContextType<Array<Competitor>>>(
        {
            value: new Array<Competitor>,
            setValue: () => {}
        }
    );

export const CompetitorsContextProvider = ({ children } : ContextProviderProps) => {
    const [competitors, setCompetitors] = useState(new Array<Competitor>);

    return (
        <CompetitorsContext.Provider value={{ value: competitors, setValue: setCompetitors}}>
            {children}
        </CompetitorsContext.Provider>
    )
}