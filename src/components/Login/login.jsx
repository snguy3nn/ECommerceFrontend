import React from 'react';
import useForm from '../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router';

export default function Login(){
    const { values, handleChange, handleSubmit } = useForm(submitForm);
    const [redirect, setRedirect] = useState(false);


    async function submitForm(){
        let loggedInUser = {...values};
        try{
            let response = await axios.post('https://localhost:44394/api/authentication/login', loggedInUser);
            let token = response.data.token;
            localStorage.setItem('token', token);
            setRedirect(true);
        }
        catch(err){
            if (err.response.status && err.response.status === 401){
                alert("Incorrect username or password!")
            }
            else{
                console.log(err);
            }
        }
        
    }

    return(
        <React.Fragment>
            {!redirect ? 
            <React.Fragment>
                <h1>Login</h1>
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
            :
            <Redirect to="/" />}
        </React.Fragment>
    )
}