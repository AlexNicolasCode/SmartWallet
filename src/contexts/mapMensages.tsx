import { useState, ReactNode, createContext, Dispatch, useContext, useEffect, useRef, MutableRefObject } from "react";
import { UserMensage } from '../components/styles/styles'

type MapMensagesData = {
    msg: any;
    indexMsg: any;
    allMsg: string[];
    msgsCounter: Number;
    setMsg: Dispatch<string>;
    setAllMsg: Dispatch<any[]>;
    addNewMensage: () => void;
    mode: string;
    setMode: Dispatch<string>;
    inputMsg: string;
    setInputMsg: Dispatch<string>;
    error: boolean;
    errorMensage: string;
    setError: Dispatch<boolean>;
    setErrorMensage: Dispatch<string>;
    auth: boolean;
    setAuth: Dispatch<boolean>
};

export const MapMensages = createContext({} as MapMensagesData)

type MapMensagesProps = {
    children: ReactNode;
}

export function MapMensagesProvider({ children }: MapMensagesProps) {
    const [ auth, setAuth ] = useState(true)
    const [ msg, setMsg ] = useState('')
    const [ inputMsg, setInputMsg ] = useState('text')
    const [ allMsg, setAllMsg ] = useState([])
    const [ indexMsg, setIndexMsg ] = useState<any>()
    const [ mode, setMode ] = useState<string>('')
    const [ error, setError ] = useState<boolean>(false)
    const [ errorMensage, setErrorMensage ] = useState<string>()
    const [ msgsCounter, setMsgsCounter ] = useState(0)

    useEffect(() => {
        setIndexMsg(<UserMensage>{msg}</UserMensage>)
    }, [msg])

    const addNewMensage = () => {
        if (msg != '') {
            if (allMsg.length != 0) {
                setAllMsg([
                    ...allMsg,
                    indexMsg
                ]);
            } else {
                setAllMsg([
                    indexMsg
                ]);                
            }
            setMsgsCounter(msgsCounter + 1)
        }
    }

    return (
        <MapMensages.Provider value={{
            msg,
            indexMsg,
            allMsg,
            msgsCounter,
            setMsg,
            setAllMsg,
            addNewMensage,
            mode, 
            setMode,
            inputMsg, 
            setInputMsg,
            errorMensage, 
            setErrorMensage,
            error, 
            setError,
            auth, 
            setAuth
        }}>
            {children}
        </MapMensages.Provider>
    )
}

export const useMensages = () => {
    return useContext(MapMensages);
}