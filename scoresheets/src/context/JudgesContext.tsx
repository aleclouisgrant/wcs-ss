import { Judge } from '@/classes/Judge';
import { useState, createContext } from 'react';
import { ContextProviderProps, ContextType } from './ContextType';

export const JudgesContext = createContext<ContextType<Array<Judge>>>(
        {
            value: new Array<Judge>,
            setValue: () => {}
        }
    );

export const JudgesContextProvider = ({ children } : ContextProviderProps) => {
    const [judges, setJudges] = useState(new Array<Judge>);

    return (
        <JudgesContext.Provider value={{ value: judges, setValue: setJudges}}>
            {children}
        </JudgesContext.Provider>
    )
}