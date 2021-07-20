import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reviews(props){

    return(
        <React.Fragment>
            <div>
                <p>Reviews for gameid {props.gameId}</p>
            </div>
        </React.Fragment>
    )
}