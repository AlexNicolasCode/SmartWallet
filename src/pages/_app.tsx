import '../../styles/globals.css'
import { CreateAccountProvider } from '../contexts/create-account/CreateAccount'
import { LoginProvider } from '../contexts/login/login'
import { MapMensagesProvider } from '../contexts/mapMensages/mapMensages'

function MyApp({ Component, pageProps }) {
  return (
    <MapMensagesProvider>
      <LoginProvider>
        <CreateAccountProvider>
          <Component {...pageProps} />
        </CreateAccountProvider>
      </LoginProvider>
    </MapMensagesProvider>
  )
}

export default MyApp
