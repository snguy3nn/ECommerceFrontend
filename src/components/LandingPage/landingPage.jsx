import React, { Component } from 'react';
import { useState, useEffect } from 'react';

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
            {/* <NavBar user={user}/> */}
            {user ? 
            <h1> hello user </h1>
            :
            <h1>Not logged in</h1>}
        </React.Fragment>
    )
}