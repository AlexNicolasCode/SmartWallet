import '../../styles/globals.css'
import { CreateAccountProvider } from '../contexts/user/CreateAccount'
import { DepositProvider } from '../contexts/transactions/Deposit'
import { LoginProvider } from '../contexts/user/login'
import { MapMensagesProvider } from '../contexts/messages/mapMensages'
import { NewDefaultCoinProvider } from '../contexts/transactions/newDefaultCoin'
import { WalletProvider } from '../contexts/transactions/SeeWallet'
import { WithdrawMoneyProvider } from '../contexts/transactions/WithdrawMoney'
import { SeeTransactionsProvider } from '../contexts/transactions/SeeTransactions'

function MyApp({ Component, pageProps }) {
  return (
    <MapMensagesProvider>
      <LoginProvider>
        <CreateAccountProvider>
          <WalletProvider>
            <DepositProvider>
              <WithdrawMoneyProvider>
               <NewDefaultCoinProvider>
                  <SeeTransactionsProvider>
                    <Component {...pageProps} />
                  </SeeTransactionsProvider>
                </NewDefaultCoinProvider>
              </WithdrawMoneyProvider>
            </DepositProvider>
          </WalletProvider>
        </CreateAccountProvider>
      </LoginProvider>
    </MapMensagesProvider>
  )
}

export default MyApp
