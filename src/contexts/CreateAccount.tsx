import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMensages } from "./mapMensages";
import { Menu } from "../components/Menu/Menu";
import api from "../services/api";

type CreateAccountData = {
    CreateNewAccount: () => void;
};

export const CreateAccount = createContext({} as CreateAccountData)

type CreateAccountProps = {
    children: ReactNode;
}

export const CreateAccountProvider = ({ children }: CreateAccountProps) => {
    const { msg, setMsg, indexMsg, allMsg, setAllMsg, mode, setMode, msgsCounter, setInputMsg, setError, setErrorMensage, auth, setAuth } = useMensages()
    const [ firstName, setFirstName ] = useState<string>()
    const [ lastName, setLastName ] = useState<string>()
    const [ email, setEmail ] = useState<string>()
    const [ password, setPassword ] = useState<string>()

    useEffect(() => {
        if (mode == 'create account') {
            switch (allMsg[allMsg.length -2]) {
                case "What's your first name?":
                    lastNameCreateAccount();
                    break;
                case "What's your last name?":
                    emailCreateAccount();
                    break;
                case "What's your email?":
                    passwordCreateAccount();
                    break;
                case "What's your password?":
                    walletCreateAccount();
                    break;
                case "How much are you want to deposit in your account?":
                    sendDataNewAccount();
                    break;
                default:
                    return;
            }
        }
    }, [msgsCounter])
    
    const sendDataNewAccount = async () => {
        if (msg > 0) {
            const user = {
                firstName: firstName,
                lastName: lastName,
                email:  email,
                password: password,
                wallet: msg,
            }

            api.post(`/`, user)
            .then(res => {
                console.log(res.data.message)
                const auth = res.data.message

                if (auth == "New user created!") {
                    setError(false)
                    setMsg('')
                    setAllMsg([
                        ...allMsg,
                        "Welcome",
                        <Menu />
                    ])
                    setAuth(true)
                    setInputMsg('text');
                } else {
                    setError(true)
                    setErrorMensage("this account don't exist")
                    setInputMsg('text');
                    emailCreateAccount()
                }
            })
        }
    }

    const walletCreateAccount = () => {
        if (allMsg[allMsg.length -2] != "How much you can deposit in your account?") {
            setInputMsg('number')
            setPassword(msg)
            setAllMsg([
                ...allMsg,
                "How much are you want to deposit in your account?"
            ])
            setMsg('')
            setError(false)
        }
    }

    const passwordCreateAccount = () => {
        if (allMsg[allMsg.length -2] != "What's your password?" && validateEmail(msg)) {
            setInputMsg('password')
            setEmail(msg)
            setAllMsg([
                ...allMsg,
                "What's your password?"
            ])
            setMsg('')
            setError(false)
        }

        if (!validateEmail(msg)) {
            setError(true)
            setErrorMensage('this email is not valid')
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
            setMsg('')
            
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const emailCreateAccount = () => {
         if (allMsg[allMsg.length -1] != "What's your email?") {
            setLastName(msg)
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
            setMsg('')
        }
    }

    const lastNameCreateAccount = () => {
        if (allMsg[allMsg.length -1] != "What's your last name?") {
            setFirstName(msg)
            setAllMsg([
                ...allMsg,
                "What's your last name?"
            ])
            setMsg('')
        }
    }

    const firstNameCreateAccount = () => {
        if (allMsg.length == 0) {
            setAllMsg([
                "What's your first name?"
            ])
        } else if (allMsg[allMsg.length -1] != "What's your first name?") {
            setAllMsg([
                ...allMsg,
                "What's your first name?"
            ])
            setMsg('')
        }
    }

    const CreateNewAccount = () => {
        if (auth === false) {
            firstNameCreateAccount()
            setMode('create account')
        }
    }

    return (
        <CreateAccount.Provider value={{
            CreateNewAccount,
        }}>
            {children}
        </CreateAccount.Provider>

    )
}

export const useCreateAccount = () => {
    return useContext(CreateAccount);
}