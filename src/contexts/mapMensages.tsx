import { useState, ReactNode, createContext, Dispatch, useContext, useEffect, SetStateAction } from "react";

type MapMensagesData = {
    msg: string;
    allMsg: string[];
    setMsg: Dispatch<string>;
    setAllMsg: Dispatch<string[]>;
    addNewMensage: () => void;
};

export const MapMensages = createContext({} as MapMensagesData)

type MapMensagesProps = {
    children: ReactNode;
}

export function MapMensagesProvider({ children }: MapMensagesProps) {
    const [ msg, setMsg ] = useState('')
    const [ allMsg, setAllMsg ] = useState([])

    const addNewMensage = () => {
        if (msg != '') {
            setAllMsg([...allMsg, msg]);
            setMsg('')
        }
    }

    return (
        <MapMensages.Provider value={{
            msg,
            allMsg,
            setMsg,
            setAllMsg,
            addNewMensage
        }}>
            {children}
        </MapMensages.Provider>
    )
}

export const useMensages = () => {
    return useContext(MapMensages);
}