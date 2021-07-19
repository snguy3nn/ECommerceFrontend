import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function GameDetails(props){
    return(
        <React.Fragment>
            {props.location.state.gameId ? 
            <p>Game Id from props: {props.location.state.gameId}</p>
            :
            <Redirect to="/" />
            }
        </React.Fragment>
        
    )
}