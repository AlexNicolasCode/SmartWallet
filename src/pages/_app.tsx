import '../../styles/globals.css'
import { CreateAccountProvider } from '../contexts/CreateAccount'
import { DepositProvider } from '../contexts/Deposit'
import { LoginProvider } from '../contexts/login'
import { MapMensagesProvider } from '../contexts/mapMensages'
import { WalletProvider } from '../contexts/SeeWallet'
import { WithdrawMoneyProvider } from '../contexts/WithdrawMoney'

function MyApp({ Component, pageProps }) {
  return (
    <MapMensagesProvider>
      <LoginProvider>
        <CreateAccountProvider>
          <WalletProvider>
            <DepositProvider>
              <WithdrawMoneyProvider>
                <Component {...pageProps} />
              </WithdrawMoneyProvider>
            </DepositProvider>
          </WalletProvider>
        </CreateAccountProvider>
      </LoginProvider>
    </MapMensagesProvider>
  )
}

export default MyApp
