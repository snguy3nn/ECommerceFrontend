import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function GameDetails(props){
    return(
        <React.Fragment>
            {props.location.state.gameId ? 
            <div className='text-center'>
                <p>Details for game Id: {props.location.state.gameId}</p>
            </div>
            :
            <Redirect to="/" />
            }
        </React.Fragment>
        
    )
}