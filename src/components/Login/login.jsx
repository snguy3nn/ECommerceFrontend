import React, { Component } from 'react';
import useForm from '../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Login(){
    const { values, handleChange, handleSubmit } = useForm(submitForm);

    async function submitForm(){
        let loggedInUser = {...values};
        console.log(loggedInUser);
        let response = await axios.post('https://localhost:44394/api/authentication/login', loggedInUser);
        try{
            console.log(response.data);
        }
        catch(err){
            console.log(err);
        }
        
    }

    return(
        <React.Fragment>
            <h1>Login page woooo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} value={values.username} required={true} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} value={values.password} required={true} />
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
        </React.Fragment>
    )
}