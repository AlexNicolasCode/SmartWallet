import { createContext, ReactNode, useContext, useState } from "react";
import { OptionsBtn } from "../components/styles/styles";
import { useMensages } from "./mapMensages";
import { api } from "../pages/api/api";
import { useWallet } from "./SeeWallet";
import { useWithdrawMoney } from "./WithdrawMoney";
import { useDeposit } from "./Deposit";

type MenuData = {
    MenuBase: () => void;
};

export const Menu = createContext({} as MenuData)

type MenuProps = {
    children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProps) => {
    const { allMsg, setAllMsg, setMode } = useMensages()
    const { seeWallet } = useWallet()
    const { newDeposit } = useDeposit()
    const { newWithdrawMoney } = useWithdrawMoney()

    const MenuBase = () => {
        if (allMsg.length == 0) {
            if (allMsg[allMsg.length -1] != "What do you want to do now?") {
                setMode('menu')
                setAllMsg([
                    "What do you want to do now?",
                    <OptionsBtn onClick={seeWallet}>See My Wallet</OptionsBtn>,
                    <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn>,
                    <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn>,
                    <OptionsBtn onClick={newWithdrawMoney}>Withdraw Money</OptionsBtn>,
                    // <OptionsBtn onClick={Logout}>Logout</OptionsBtn>
                ])
            }
        } else {
            setMode('menu')
            setAllMsg([
                ...allMsg,
                "What do you want to do now?",
                <OptionsBtn onClick={seeWallet}>See My Wallet</OptionsBtn>,
                <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn>,
                <OptionsBtn onClick={newWithdrawMoney}>Withdraw Money</OptionsBtn>,
                // <OptionsBtn onClick={Logout}>Logout</OptionsBtn>
            ])
        }
    }

    return (
        <Menu.Provider value={{
            MenuBase,
        }}>
            {children}
        </Menu.Provider>

    )
}

export const useMenu = () => {
    return useContext(Menu);
}