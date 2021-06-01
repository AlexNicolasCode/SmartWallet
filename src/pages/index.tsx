import { useCreateAccount } from '../contexts/create-account/CreateAccount'
// import { GetProps } from '../components/getProps'
import { useLogin } from '../contexts/login/login'
import { useMensages } from '../contexts/mapMensages/mapMensages'
import { H1, Chat, DefaultMensage, Input, ButtonSend, OptionsBtn, Sender } from '../components/styles/mensage
// import styles from '../styles/Home.module.css'

export default function Home() {
  const { msg, allMsg, setMsg, addNewMensage, inputMsg, error, errorMensage } = useMensages()
  const { AccountLogin } = useLogin()
  const { CreateNewAccount } = useCreateAccount()

  return (
    <div>
      <header>
        <H1><strong>Smart</strong>Wallet</H1>
      </header>
      <main>
        <Chat>
          <DefaultMensage>Hi, I'm SmartCoin</DefaultMensage>
          <DefaultMensage>
            <OptionsBtn onClick={AccountLogin}>Login</OptionsBtn>
            <OptionsBtn onClick={CreateNewAccount}>Create Account</OptionsBtn>
          </DefaultMensage>
          {allMsg.map((prop, index) => (
            <DefaultMensage key={index}>{prop}</DefaultMensage>
          ))}
        </Chat>
        <Sender>
          <Input type={inputMsg} value={msg} onChange={event => setMsg(event.target.value)}/>
          <ButtonSend type="submit" onClick={addNewMensage}>Send</ButtonSend>
        </Sender>
      </main>
      <footer>
        { error && 
          <span>{errorMensage}</span>
        }
      </footer>
    </div>
  )
}
