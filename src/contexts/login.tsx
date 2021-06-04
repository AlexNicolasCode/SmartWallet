import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { useMensages } from "./mapMensages";
import { Menu } from "../components/Menu/Menu";

type LoginData = {
    AccountLogin: () => void;
};

export const Login = createContext({} as LoginData)

type LoginProps = {
    children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProps) => {
    const { msg, setMsg, allMsg, setAllMsg, msgsCounter, setMode, mode, setInputMsg, setError, setErrorMensage } = useMensages()
    const [ emailLogin, setEmailLogin ] = useState<string>()

    useEffect(() => {
        if (mode == 'login') {
            switch (allMsg[allMsg.length -2]) {
                case "What's your email?":
                    passwordAccountLogin();
                    break;
                case "What's your password?":
                    sendDataLogin();
                    break;
                default:
                    return;
            }
        }
    }, [msgsCounter])
    
    const sendDataLogin = () => {
        const user = {
            email:  emailLogin,
            password: msg
        }
        setMsg('')
        setAllMsg([
            ...allMsg,
            "Welcome",
            <Menu />
        ])
        setInputMsg('text');
    }

    const passwordAccountLogin = () => {
        if (allMsg[allMsg.length -2] != "What's your password?" && validateEmail(msg)) {
            setInputMsg('password')
            setEmailLogin(msg)
            setAllMsg([
                ...allMsg,
                "What's your password?",
            ])
            setError(false)
            setMsg('')
        }

        if (!validateEmail(msg)) {
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
            setError(true)
            setErrorMensage('this email is not valid')
            setMsg('')
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const emailAccountLogin = () => {
        if (allMsg.length == 0) {
            setAllMsg([
                "What's your email?"
            ])
        } else if (allMsg[allMsg.length -1] != "What's your email?") {
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
        }
    }

    const AccountLogin = () => {
        emailAccountLogin()
        setMode('login')
    }

    return (
        <Login.Provider value={{
            AccountLogin,
        }}>
            {children}
        </Login.Provider>
    )
}

export const useLogin = () => {
    return useContext(Login);
}