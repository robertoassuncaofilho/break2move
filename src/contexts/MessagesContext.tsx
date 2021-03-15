import {createContext, ReactNode, useState} from 'react'

interface IMessage {
    title?: string;
    text: string;
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
}

interface MessagesContextData {
    messages: IMessage[];
    addMessage: (message: IMessage) => void;
    addApiMessage: (data: Object) => void;
    clear: () => void;
    removeMessage: (index: number) => void;
}

interface MessagesProviderProps {
    children: ReactNode
}


export const MessagesContext = createContext({} as MessagesContextData)

export function MessagesProvider ({children}:MessagesProviderProps) {
    
    const [messages, setMessages] = useState([] as IMessage[])
    
    function addMessage(message: IMessage) {
        setMessages(messages.concat(message))
    }

    function addApiMessage(data:Object){
        let key: any = ''
        for (key in data){
                let s = ''
                for (s in data[key]){
                    addMessage({text: data[key][s], variant: 'danger'})
                }
        }
    }

    function clear() {
        setMessages([])
    }

    function removeMessage(index: number) {
        let copy = messages.slice()
        copy.splice(index,1)
        setMessages(copy)
    }
    return (
        <MessagesContext.Provider value={{
            messages,
            addMessage,
            addApiMessage,
            clear,
            removeMessage
        }}>
            {children}
        </MessagesContext.Provider>
    )
} 



