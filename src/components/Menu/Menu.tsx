import { useDeposit } from "../../contexts/Deposit"
import { useMensages } from "../../contexts/mapMensages"
import { useWallet } from "../../contexts/SeeWallet"
import { useWithdrawMoney } from "../../contexts/WithdrawMoney"
import { OptionsBtn } from "../styles/styles"

export const Menu = () => {
    const { setAuth } = useMensages()
    const { seeWallet } = useWallet()
    const { newDeposit } = useDeposit()
    const { newWithdrawMoney } = useWithdrawMoney()

    const Logout = () => {
        setAuth(false)
    }

    return (
        <>
            What do you want to do now?<br />
            <OptionsBtn onClick={seeWallet}>See My Wallet</OptionsBtn><br />
            <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn><br />
            <OptionsBtn onClick={newWithdrawMoney}>Withdraw Money</OptionsBtn><br />
            <OptionsBtn onClick={Logout}>Logout</OptionsBtn><br />
        </>

    )
}