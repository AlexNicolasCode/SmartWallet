import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useMensages } from "../contexts/mapMensages";
import { api } from "../pages/api/api";

type WalletData = {
    seeWallet: () => void;
};

export const Wallet = createContext({} as WalletData)

type WalletProps = {
    children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProps) => {
    const { allMsg, setAllMsg} = useMensages()    
    const [ walletValue, setWalletValue ] = useState<string>()
    const [ coinIcon, setCoinIcon ] = useState<string>()

    const seeWallet = async () => {
        await api.get(`/users/${user.id}`)
            .then(res => {
                setAllMsg([
                    allMsg,
                    `Do have you ${res.coinIcon} ${res.wallet}`,
                    <Menu />
                ])
            })

    }

    return (
        <Wallet.Provider value={{
            seeWallet,
        }}>
            {children}
        </Wallet.Provider>
    )
}

export const useWallet = () => {
    return useContext(Wallet);
}
