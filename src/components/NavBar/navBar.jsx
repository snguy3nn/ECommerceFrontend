import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jwtDecode from 'jwt-decode';

export default function NavBar(props){

    const [user, setUser] = useState(props.user);

    useEffect(() => {setUser(props.user)}, [props.user])

    return(
        <React.Fragment>
            {user ? 
            <Navbar>
                <Container>
                    <Navbar.Brand>Gamebay</Navbar.Brand>
                    <Nav>
                        <Nav.Item> 
                            <Nav.Link as={Link} to="/newListing">New Listing</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Button onClick={() => props.logout()} >Logout</Button>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            :
            <p>navbar if logged out</p> }
        </React.Fragment>
    )

}