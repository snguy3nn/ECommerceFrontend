import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jwtDecode from 'jwt-decode';
import './navBar.css';



export default function NavBar(props){

    const [user, setUser] = useState(props.user);

    useEffect(() => {setUser(props.user)}, [props.user])

    return(
        <React.Fragment>
            {user ? 
            <Navbar className="color-nav" variant="light">
                <Container>
                    <Navbar.Brand><u><h1>Gamebay</h1></u></Navbar.Brand>
                    <Nav>
                        <Nav.Item className="text-lg"> 
                            <Nav.Link as={Link} to="/"><h5>Home</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item> 
                            <Nav.Link as={Link} to="/newListing"><h5>New Listing</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item> 
                            <Nav.Link as={Link} to="/myListings"><h5>My Listings</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={{pathname: '/searchResults', state: { searchQuery: null, showAll: true}}}><h5>All Listings</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/cart"><h5>My Cart</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button variant='danger' onClick={() => props.logout()} ><h6>Logout</h6></Button>
                        </Nav.Item>
                    </Nav>
                </Container>
                <br />
            </Navbar>
            :
            <Navbar className="color-nav" variant="light">
                <Container>
                    <Navbar.Brand><u><h1>Gamebay</h1></u></Navbar.Brand>
                    <Nav>
                    <Nav.Item> 
                            <Nav.Link as={Link} to="/"><h5>Home</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item> 
                            <Nav.Link as={Link} to="/login"><h5>Login</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item> 
                            <Nav.Link as={Link} to="/register"><h5>Register</h5></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar> }
            <br />
        </React.Fragment>
    )

}