import styles from '../styles/pages/register.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'
import {useEffect, useState, useContext, FormEvent} from 'react'
import { CurrentUserContext } from '../contexts/UserContext'
import { MessagesContext } from '../contexts/MessagesContext'
import Messages from '../components/Messages'

export default function Register () {

    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);

    const {registeredUserKey, register} = useContext(CurrentUserContext)
    const {addMessage, clear} = useContext(MessagesContext)

    useEffect( () => {
        if (registeredUserKey) {
            router.push('/login')
            .then(success => {
                addMessage({text: 'User created sucessfulle', title:'Success!', variant: 'success'})
            }
            )
        }   
    }, [registeredUserKey])

    useEffect(() => clear(), [])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        clear()
        register(firstName, lastName, email, password1, password2, selectedFile)
    }

    return (
    <main className={styles.formSignin}>
        <Messages />
        <Form onSubmit={handleSubmit}>
            <img className="mb-4" src="favicon.png" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Registration</h1>
            <Form.Group>
                <Form.Control id="firstName" className={`${styles.formControl} ${styles.inputUp}`}  type="text"  
                placeholder="First name" required autoFocus
                onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Control id="lastName" className={`${styles.formControl} ${styles.inputMiddle}`}  type="text"  
                placeholder="Last name" required autoFocus 
                onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Control id="inputEmail" className={`${styles.formControl} ${styles.inputMiddle}`}  type="email"  
                placeholder="Email address" required autoFocus 
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="password" className={`${styles.formControl} ${styles.inputMiddle}`} 
                placeholder="Password" required 
                onChange={(e) => setPassword1(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="password" className={`${styles.formControl} ${styles.inputMiddle}`} 
                placeholder="Password Confirmation" required 
                onChange={(e) => setPassword2(e.target.value)}/>
            </Form.Group>
            <div className="input-group mb-3">
                <span className="input-group-text">Profile Picture</span>
                <input type="file" className="form-control" placeholder="Profile Picture" aria-label="Picture"
                onChange={(e) => setSelectedFile(e.target.files[0])} />
            </div>
            {/* <div className="custom-file">
                <label className={`custom-file-label ${styles.inputFile}`} htmlFor="inputGroupFile01">Profile Picture</label>
                <input id="inputFilePicture" type="file" className="custom-file-input" 
                    onChange={(e) => setSelectedFile(e.target.files[0])}/>
            </div> */}

            <br/> <br/> 
            <Button variant="primary" size="lg" className="w-100" type="submit">Register</Button>
            <Button variant="secondary" size="lg" className={`w-100 ${styles.buttonDown}`} type="submit"
                onClick={() => router.push('/login')}>
                Cancel
            </Button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </Form>
    </main>
    )
}