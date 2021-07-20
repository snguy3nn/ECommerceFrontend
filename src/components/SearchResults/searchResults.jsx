import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

export default function SearchResults(props){

    const [results, setResults] = useState(null);
    const [gamesInCart, setGamesInCart] = useState(null);

    useEffect(() => {
        if(typeof props.location.state !== 'undefined'){
            runSearch()
        }
    }, []);

    async function runSearch(){
        if (!props.location.state.showAll){
            try {
                let response = await axios.get(`https://localhost:44394/api/games/title=${props.location.state.searchQuery}`);
                setResults(response.data);
            }
            catch(err){
                alert(err);
            }
        }
        else{
            try{
                let response = await axios.get('https://localhost:44394/api/games/all');
                setResults(response.data);
            }
            catch(err){
                alert(err);
            }
        }
        getCart();
    }

    async function getCart(){
        const jwt = localStorage.getItem('token');
        if (jwt !== null){
            try{
                
                let response = await axios.get(`https://localhost:44394/api/cart`, { headers: {Authorization: 'Bearer ' + jwt}});
                let entries = response.data;
                setGamesInCart(entries);
            }
            catch(err){
            alert(err);
            }
        }
    }

    async function addToCart(gameId){
        try{
            const jwt = localStorage.getItem('token');
            let ids = gamesInCart.map(g => g.gameId);
            if (!ids.includes(gameId)){
                let response = await axios.post('https://localhost:44394/api/cart', {GameId: gameId, Quantity: 1}, { headers: {Authorization: 'Bearer ' + jwt}});
                if (response.status === 201){
                    alert("Added!");
                    getCart();
                }
                else{alert(response.data + '44')}
            }
            else{
                let selectedGame = gamesInCart.filter(g => g.gameId === gameId);
                selectedGame = selectedGame[0];
                let response = await axios.put(`https://localhost:44394/api/cart/edit/gameId_${gameId}`, {Quantity: (selectedGame.quantity + 1)}, { headers: {Authorization: 'Bearer ' + jwt}});
                if (response.status === 200){
                    alert(`Added "${selectedGame.gameTitle}" to cart! New quantity: ${selectedGame.quantity + 1}`);
                    getCart();
                }
                else{alert(response.data = '54')}
            }
        }
        catch(err){
            alert(err + ' 58');
        }
    }


    function generateTable(){
        let tableBody = results.map(entry => {
            return(
            <tr key={entry.gameId}>
                <td>{entry.name}</td>
                <td>{entry.platform.name}</td>
                <td>${entry.price}</td>
                {props.user ?
                <React.Fragment>
                    {entry.userId !== props.user.id ? <td>{entry.seller}</td> : <td><strong>{entry.seller} (you)</strong></td>}
                </React.Fragment>
                :
                <td>{entry.seller}</td>}
                <td><Button size='sm' as={Link} to={{pathname: '/game', state: { gameId: entry.gameId, searchQuery: props.location.state.searchQuery, showAll: props.location.state.showAll}}}>Details</Button></td>
                {props.user && 
                <React.Fragment>
                    {entry.userId !== props.user.id ? 
                    <td><Button size='sm' variant='success' onClick={() => addToCart(entry.gameId)}>Add to Cart</Button></td>
                    : <td></td>
                    }
                </React.Fragment>
            }
            </tr>)});

        return(
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Platform</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>)
    }

    return(
        <div className='text-center'>
            {props.user ? 
                    <p>{props.user.username}</p>
            :
            '' }

            <h1>Search Results</h1>

            {props.location.state ?
            <div>
                {props.location.state.searchQuery ? <h3>"{props.location.state.searchQuery}"</h3> : <h3>View All Listings</h3>}
                {results ?
                <React.Fragment>
                    {results.length > 0 ? generateTable() : <p>No items to display.</p>}
                </React.Fragment>
                :
                <p>Loading...</p>}
            </div>
            :
            <Redirect to="/" />}
        
        </div>
    )
}