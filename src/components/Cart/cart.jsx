import React, {  useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function Cart(props){

    const [cartEntries, setCartEntries] = useState(null);

    useEffect(() => {
        try{
            const jwt = localStorage.getItem('token');
            getCart(jwt);
        }
        catch(err){
            alert(err)
        }
    },[] )

    async function getCart(jwt){
        try{
            let response = await axios.get(`https://localhost:44394/api/cart`, { headers: {Authorization: 'Bearer ' + jwt}});
            let entries = response.data;
            setCartEntries(entries);
        }
        catch(err){
        alert(err);
        }
    }

    async function getGameInfo(gameId){
        try{
            let response = await axios.get(`https://localhost:44394/api/games/${gameId}`);
            return response.data
        }
        catch(err){
            alert(err);
        }
    }

    async function deleteEntry(gameId){
        if (window.confirm('Are you sure?')){
            try{
                const jwt = localStorage.getItem('token');
                let response = await axios.delete(`https://localhost:44394/api/cart/delete/gameId_${gameId}`, { headers: {Authorization: 'Bearer ' + jwt}});
                console.log(response);
                getCart(jwt);
            }
            catch(err){
                alert(err);
            }
        }
    }

    function generateCartTable(){
        //gameTitle, seller, quantity,
        let tableBody = cartEntries.map(entry => {
            return(
            <tr key={entry.gameTitle}>
                <td>{entry.gameTitle}</td>
                <td>{entry.seller}</td>
                <td>${entry.gamePrice}</td>
                <td>{entry.quantity}</td>
                <td><Button size='sm' variant='danger' onClick={() => deleteEntry(entry.gameId)}>Remove</Button></td>
            </tr>)})
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Seller</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
        )
    }
    
    
    return(
        <div className='text-center'>
            <h1>My Cart</h1>
            {cartEntries && 
            generateCartTable()}
        </div>
    )
}