import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useMensages } from "../contexts/mapMensages";
import { api } from "../pages/api/api";

type DepositData = {
    newDeposit: () => void;
};

export const Wallet = createContext({} as DepositData)

type DepositProps = {
    children: ReactNode;
}

export const DepositProvider = ({ children }: DepositProps) => {
    const { msg, allMsg, setAllMsg, msgsCounter, setInputMsg} = useMensages()    

    useEffect(() => {
        if (allMsg[allMsg.length -2] == "How much can you to deposit?") {
            sendData();
        }
    }, [msgsCounter])

    const sendData = () => {
        if (msg[msg] != 0) {
            api.post(`/users/${user.id}`, { depositValue: msg });
            api.get(`/users/${user.id}`)
                .then(res => {     
                    setAllMsg([
                        allMsg,
                        `${res.coinIcon} ${msg} was been deposited in your wallet`,
                        <Menu />
                    ])
                    setInputMsg("text")
                })
        }
    }

    const newDeposit = async () => {
        await setAllMsg([
            allMsg,
            "How much can you to deposit?",
        ])
        setInputMsg("number")
    }

    return (
        <Wallet.Provider value={{
            newDeposit,
        }}>
            {children}
        </Wallet.Provider>
    )
}

export const useDeposit = () => {
    return useContext(Wallet);
}
