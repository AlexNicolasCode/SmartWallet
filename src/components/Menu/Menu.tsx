import { useDeposit } from "../../contexts/Deposit"
import { useWallet } from "../../contexts/SeeWallet"
import { useWithdrawMoney } from "../../contexts/WithdrawMoney"
import { OptionsBtn } from "../styles/styles"

export const Menu = () => {
    const { seeWallet } = useWallet()
    const { newDeposit } = useDeposit()
    const { newWithdrawMoney } = useWithdrawMoney()

    return (
        <>
            What do you want to do now?<br />
            <OptionsBtn onClick={seeWallet}>See My Wallet</OptionsBtn><br />
            <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn><br />
            <OptionsBtn onClick={newWithdrawMoney}>Withdraw Money</OptionsBtn><br />
        </>

    )
}