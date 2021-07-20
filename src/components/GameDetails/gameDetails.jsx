import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import Reviews from '../Reviews/reviews';

export default function GameDetails(props){

    const [game, setGame] = useState(null);
    const [token, setToken] = useState(null);
    //average rating goes on reviews

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        setToken(jwt);
        getGame();
    })

    async function getGame(){
        try{
            let response = await axios.get(`https://localhost:44394/api/games/${props.location.state.gameId}`);
            setGame(response.data);
        }
        catch(err){
            alert(err);
        }
    }

    return(
        <React.Fragment>
            {props.location.state.gameId ? 
            <div className='text-center'>
                {game && 
                <div className='row'>
                    <div className='col'/>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{game.name}</Card.Title>
                            <Card.Text>
                                <p>"{game.description}"</p>
                                <p>Platform: {game.platform.name}</p>
                                <h6>${game.price}</h6>
                            </Card.Text>
                            <Button as={Link} to={{pathname: '/searchResults', state: { searchQuery: props.location.state.searchQuery}}}>Back to results</Button>
                        </Card.Body>
                    </Card>
                    <div className='col'/>
                </div>
                }
                {token ? 
                <Reviews gameId={props.location.state.gameId} /> : <p>Log in to see reviews.</p>}
            </div>
            :
            <Redirect to="/" />
            }
        </React.Fragment>
        
    )
}