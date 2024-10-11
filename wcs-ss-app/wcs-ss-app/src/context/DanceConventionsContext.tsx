import { useState, createContext } from 'react';
import { ContextProviderProps, ContextType } from './ContextType';
import { DanceConvention } from '@/classes/DanceConvention';

export const DanceConventionsContext = createContext<ContextType<Array<DanceConvention>>>(
        {
            value: new Array<DanceConvention>,
            setValue: () => {}
        }
    );

export const DanceConventionsContextProvider = ({ children } : ContextProviderProps) => {
    const [danceConventions, setDanceConventions] = useState(new Array<DanceConvention>);

    return (
        <DanceConventionsContext.Provider value={{ value: danceConventions, setValue: setDanceConventions}}>
            {children}
        </DanceConventionsContext.Provider>
    )
}