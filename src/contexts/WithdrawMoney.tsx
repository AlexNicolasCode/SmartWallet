import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useMensages } from "../contexts/mapMensages";
import { api } from "../pages/api/api";

type WithdrawMoneyData = {
    newWithdrawMoney: () => void;
};

export const WithdrawMoney = createContext({} as WithdrawMoneyData)

type WithdrawMoneyProps = {
    children: ReactNode;
}

export const WithdrawMoneyProvider = ({ children }: WithdrawMoneyProps) => {
    const { msg, allMsg, setAllMsg, msgsCounter, setInputMsg} = useMensages()    

    useEffect(() => {
        if (allMsg[allMsg.length -2] == "How much can you to deposit?") {
            sendData();
        }
    }, [msgsCounter])

    const sendData = () => {
        if (msg[msg] != 0) {
            api.post(`/users/${user.id}`, { withdrawValue: msg });
            api.get(`/users/${user.id}`)
                .then(res => {     
                    setAllMsg([
                        allMsg,
                        `${user.coinIcon} ${msg} was been withdraw of your wallet`,
                        <Menu />
                    ])
                    setInputMsg("text")
                })
        }
    }

    const newWithdrawMoney = () => {
        setAllMsg([
            allMsg,
            "How much money do you want to withdraw?",
        ])
        setInputMsg("number")
    }

    return (
        <WithdrawMoney.Provider value={{
            newWithdrawMoney,
        }}>
            {children}
        </WithdrawMoney.Provider>
    )
}

export const useWithdrawMoney = () => {
    return useContext(WithdrawMoney);
}
