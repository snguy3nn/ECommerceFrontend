import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchResults(props){

    const [results, setResults] = useState(null);

    useEffect(() => {runSearch()}, []);

    async function runSearch(){
        try {
            let response = await axios.get(`https://localhost:44394/api/games/title=${props.location.state.searchQuery}`);
            console.log(response.data);
        }
        catch(err){
            alert(err);
        }
    }

    return(
        <div className='text-center'>
            <h1>SearchResults</h1>
            <p>**Props are being passed from two separate components, App and LandingPage**</p>

            {props.location.state ?
            <div>
                <p>Search query being passed as a prop from LandingPage:</p>
                <h3>{props.location.state.searchQuery}</h3>
                <p>(We can make an axios call using the user's search query).</p>
            </div>
            :
            <p>This gets rendered if you go to /searchResults without actually running a search. We can replace this with a Redirect back to the home page.</p>}
            

            {props.user ? 
            <React.Fragment>
                <h3>If a user is logged in, their info is passed to SearchResults from the App component. <br />
                That means we can use their info to generate the 'Add to Cart' buttons and whatever else.</h3>
                <p>Here's your userId for example: {props.user.id}</p>
            </React.Fragment>
            :
            <p>User is logged out, so there is no user info to display.</p> }
        </div>
    )
}