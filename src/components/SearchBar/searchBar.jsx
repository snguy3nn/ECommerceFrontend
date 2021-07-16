import React from 'react';
import useForm from '../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router';

export default function SearchBar(){
    const { values, handleChange, handleSubmit } = useForm(submitForm);
    const [redirect, setRedirect] = useState(false);


    async function submitForm(){
        let searchResults = {...values};
        console.log(searchResults);
        try{
            let response = await axios.get('https://localhost:44394/api/games/all', searchResults)
            console.log(response.data);
            setRedirect(true);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <React.Fragment>
            {!redirect ? 
            <React.Fragment>
                <h1>Search Games</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" onChange={handleChange}/>
                    </Form.Group>
                    <Button type="submit">Search</Button>
                </Form>
            </React.Fragment>
            :
            <Redirect to="/searchresults" />}
        </React.Fragment>
    )
}