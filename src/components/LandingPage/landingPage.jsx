import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';


export default function LandingPage(props){
    const [user, setUser] = useState(null);

    useEffect(() => {setUser(props.user)}, [props.user])

    return(
        <React.Fragment>
            {user ? 
            <h1> Logged in </h1>
            :
            <h1>Not logged in</h1>}
        </React.Fragment>
    )
}