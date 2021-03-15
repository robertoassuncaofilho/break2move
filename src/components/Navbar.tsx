import { Fragment, useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { CurrentUserContext } from '../contexts/UserContext'
import { useRouter } from 'next/router'

export default function HomeNavbar() {

    const {logout} = useContext(CurrentUserContext)
    const router = useRouter()

    function clickLogout() {
        logout()
        router.push('/')
    }
    return (
        <Fragment>
            <Navbar collapseOnSelect bg="light" expand="lg">
            <Navbar.Brand href="#home">Break2Move</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={() => clickLogout()} >Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}