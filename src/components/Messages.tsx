import {useContext} from 'react'
import {Alert} from 'react-bootstrap'
import {MessagesContext} from '../contexts/MessagesContext'


export default function Messages () {
    const {messages, removeMessage} = useContext(MessagesContext)

    return(
        <>{
            messages.map( (message, index) =>
                <Alert key={index} variant={message.variant} onClose={() => removeMessage(index)} dismissible>
                    {message.title && <Alert.Heading>{message.title}</Alert.Heading>}
                    <p>{message.text}</p>
                </Alert>
            )
        }
        </>
    )
}