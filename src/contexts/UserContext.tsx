import { LoggedUser, login as apiLogin, register as apiRegister} from '../services/user.service'
import {createContext, ReactNode, useContext, useState} from 'react'
import { MessagesContext } from './MessagesContext';

interface ICurrentUserContext {
    isLoggedIn: boolean;
    loggedUser: LoggedUser;
    registeredUserKey: string;
    login: (username: string, password: string) => void;
    register: (first_name: string, last_name: string, email: string, password1: string, password2: string, picture: File) => void;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode
  }

export const CurrentUserContext = createContext({} as ICurrentUserContext)

export function UserProvider({ children }: UserProviderProps) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null as LoggedUser);
    const [registeredUserKey, setRegisteredUserKey] = useState(null as string)
    const {addApiMessage} = useContext(MessagesContext)
    
    async function login(username: string, password: string) {
        apiLogin(username, password)
        .then(response => {setIsLoggedIn(true); setLoggedUser(response);})
        .catch(error => {
            setIsLoggedIn(false); 
            setLoggedUser(null); 
            addApiMessage(error.response.data);
        })
    }

    async function register(first_name: string, last_name: string, email: string, password1: string, password2: string, picture: File){
        apiRegister(first_name, last_name, email, password1, password2, picture)
        .then(response => {
            setRegisteredUserKey(response)
        })
        .catch(error => {setRegisteredUserKey(null); addApiMessage(error.response.data);})
    }

    function logout() {
        setIsLoggedIn(false)
        setLoggedUser(null)
        setRegisteredUserKey(null)
    }

    return (
        <CurrentUserContext.Provider value={{
            isLoggedIn,
            loggedUser,
            registeredUserKey,
            login,
            register,
            logout
        }}> 
        {children}
        </CurrentUserContext.Provider>
    )
}

