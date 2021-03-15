import styles from '../styles/pages/login.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import {useContext, useState, useEffect, FormEvent} from 'react'
import { CurrentUserContext } from '../contexts/UserContext'
import Messages from '../components/Messages'
import { MessagesContext } from '../contexts/MessagesContext'
 
export default function Login () {

    const router = useRouter()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {isLoggedIn, login} = useContext(CurrentUserContext)
    const {clear} = useContext(MessagesContext)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        clear()
        login(username, password)
    }

    useEffect(() =>
    {
        isLoggedIn && router.push('/home')
    }, [isLoggedIn])

    return (
    <main className={styles.formSignin}>
        <Form onSubmit={handleSubmit}>
            <img className="mb-4" src="favicon.png" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <Messages />
            <Form.Group>
                <Form.Control id="inputEmail" className={`${styles.formControl} ${styles.inputUp}`}  type="email"  
                placeholder="Email address" required autoFocus 
                onChange={event => setUsername(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="password" className={`${styles.formControl} ${styles.inputDown}`} 
                placeholder="Password" required 
                onChange={event => setPassword(event.target.value)}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Check 
                    type="checkbox"
                    label="Remember me"
                />
            </Form.Group>
            <Button variant="primary" size="lg" className="w-100" type="submit">Sign in</Button>
            <Button variant="secondary" size="lg" className={`w-100 ${styles.buttonDown}`}
                onClick={() => router.push('/register')}>
                Register
            </Button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </Form>
    </main>
    )
}