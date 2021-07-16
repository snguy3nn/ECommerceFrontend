import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import SearchBar from '../SearchBar/searchBar';


export default function LandingPage(props){
    const [user, setUser] = useState(null);

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            setUser(user);
        }
        catch{}
    }, [])

    return(
        <React.Fragment>
            <div>
                <SearchBar />
            </div>
            {/* <NavBar user={user}/> */}
            {user ? 
            <h1> Logged in </h1>
            :
            <h1>Not logged in</h1>}
        </React.Fragment>
    )
}