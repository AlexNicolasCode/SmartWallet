import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMensages } from "./mapMensages";

type CreateAccountData = {
    CreateNewAccount: () => void;
};

export const CreateAccount = createContext({} as CreateAccountData)

type CreateAccountProps = {
    children: ReactNode;
}

export const CreateAccountProvider = ({ children }: CreateAccountProps) => {
    const { msg, setMsg, indexMsg, allMsg, setAllMsg, mode, setMode, msgsCounter, setInputMsg, setError, setErrorMensage } = useMensages()
    const [ firstName, setFirstName ] = useState<string>()
    const [ lastName, setLastName ] = useState<string>()
    const [ email, setEmail ] = useState<string>()

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
                    sendDataNewAccount();
                    break;
                default:
                    return;
            }
        }
    }, [msgsCounter])
    
    const sendDataNewAccount = () => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email:  email,
            password: msg,
            data: new Date
        }
        setInputMsg('text')
        setAllMsg([
            ...allMsg,
            "Your account was been created"
        ])
        setMsg('')
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
        firstNameCreateAccount()
        setMode('create account')
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