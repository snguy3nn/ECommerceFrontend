import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function MyListings(props){

    const [user, setUser] = useState(null);
    const [myListings, setMyListings] = useState(null);

    useEffect(() => {
        setUser(props.user);
        try{
            const jwt = localStorage.getItem('token');
            getMyListings(props.user);
        }
        catch(err){
            alert(err)
        };
    }, [props.user]);

    async function getMyListings(user){
        try{
            let response = await axios.get('https://localhost:44394/api/games/all');
            let allGames = response.data;
            let myGames = allGames.filter(game => game.userId === user.id);
            setMyListings(myGames);
        }
        catch(err){
            alert(err);
        }
    }

    async function deleteGame(game){
        try{
            const token = localStorage.getItem('token');
            let response = await axios.delete('https://localhost:44394/api/games', { headers: {Authorization: 'Bearer ' + token}, data: {GameId: game.gameId}});
            getMyListings(props.user);
        }
        catch(err){
            alert(err);
        }
    }

    function generateTable(){
        let tableBody = myListings.map(entry => {
            return(
            <tr key={entry.gameId}>
                <td>{entry.name}</td>
                <td>{entry.platform.name}</td>
                <td>${entry.price}</td>
                <td><strong>{entry.seller} (you)</strong></td>
                <td><Button size='sm' as={Link} to={{pathname: '/game', state: { gameId: entry.gameId, searchQuery: null, showAll: true}}}>Details</Button></td>
                <td><Button size='sm' variant='danger' onClick={() => deleteGame(entry)}>Delete Listing</Button></td>
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
        <React.Fragment>
            <div className='text-center'>
                <h1>Your Listings</h1>
                {myListings ? 
                <React.Fragment>
                    {myListings.length > 0 ? generateTable() : <p>No items to display.</p>}
                </React.Fragment>
                :
                <p>Loading...</p>}
            </div>
        </React.Fragment>
    )
}