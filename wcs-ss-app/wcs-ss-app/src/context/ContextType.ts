import { ReactNode } from "react";

export interface ContextProviderProps {
    children: ReactNode;
}

export interface ContextType<T> {
    value: T;
    setValue: (value: T) => void;
}
