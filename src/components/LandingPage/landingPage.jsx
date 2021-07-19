import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Button from 'react-bootstrap/Button'


export default function LandingPage(props){
    const [user, setUser] = useState(null);

    useEffect(() => {setUser(props.user)}, [props.user])

    return(
        <React.Fragment>
            {user ? 
            <div className='text-center'>
                <h1> LandingPage (logged in)</h1>
                <h3>**Search form goes here**</h3>
                <Button as={Link} to={{pathname: '/searchResults', state: { searchQuery: "user's search query"}}}>Search</Button>
                <p>**User input gets passed to the SearchResults component using the Search button. (It's actually a React-Router Link in disguise).<br /> 
                We can make the axios call from the SearchResults component with useEffect or componentDidMount.**</p>
            </div>
            :
            <div className='text-center'>
                <h1>Welcome! Please log in or create an account.</h1>
            </div>}
        </React.Fragment>
    )
}