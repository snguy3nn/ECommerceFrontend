import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';


export default function NewListing(props){

    const [token, setToken] = useState(null);
    const [platforms, setPlatforms] = useState(null);
    const { values, handleChange, handleSubmit, setValues } = useForm(submitForm);
    const [redirect, setRedirect] = useState(false);
    const [newGameId, setNewGameId] = useState(null);

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        try{
            setToken(jwt);
        }
        catch{};
        getAllPlatforms();
    }, []);

    async function getAllPlatforms(){
        try{
            let response = await axios.get('https://localhost:44394/api/games/platforms/all');
            let allPlatforms = response.data;
            setValues({Name: '', Description: '', platformName: allPlatforms[0].name, Price: 0.01})
            setPlatforms(allPlatforms);
        }
        catch(err){
            alert(err);
        }
    }

    function generatePlatformOptions(){
        let platformNamesJsx = platforms.map(entry => {return <option key={entry.name}>{entry.name}</option>});
        return platformNamesJsx;
    }

    async function submitForm(){
        let platformEntry = platforms.filter(entry => entry.name === values.platformName);
        let newGame;
        try{
            newGame = {Name: values.Name, Description: values.Description, PlatformId: platformEntry[0].platformId, Price: parseFloat(values.Price)};
        }
        catch(err){
            alert("Error creating new game \n" + err)
        }
        try{
            let response = await axios.post('https://localhost:44394/api/games', newGame, { headers: {Authorization: 'Bearer ' + token}});
            console.log(response.data)
            setNewGameId(response.data.gameId);
            setRedirect(true);
        }
        catch(err){
            alert(err);
        }
    }

    return(
        <div className='text-center'>
            {redirect && 
            <Redirect to={{pathname: '/game', state: { gameId: newGameId}}} /> }
            <div>
                <h1>New Listing</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="Name">
                            <Form.Label>Game Title</Form.Label>
                            <Form.Control type="text" name="Name" onChange={handleChange} value={values.Name} required={true} />
                        </Form.Group>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control type="number" min={0.01} step={0.01} name="Price" onChange={handleChange} value={values.Price} required={true} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="Description" onChange={handleChange} value={values.Description} required={true} />
                        </Form.Group>
                        {platforms && 
                            <Form.Group controlId="platformName">
                                <Form.Label>Platform</Form.Label>
                                <Form.Control as="select" name='platformName' onChange={handleChange} value={values.platformName} required={true}>
                                    {generatePlatformOptions()}
                                </Form.Control>
                            </Form.Group>
                        }
                        <Button type="submit">Submit</Button>
                    </Form>
                </div>
        </div>
        
    )
}