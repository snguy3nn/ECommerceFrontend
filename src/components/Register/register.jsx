import React, { Component } from 'react';
import useForm from '../../hooks/useForm';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Register(){
    const { values, handleChange, handleSubmit } = useForm(submitForm);

    async function submitForm(){
        let newUser = {...values};
        console.log(newUser);
        let response = await axios.post('https://localhost:44394/api/authentication', newUser);
        try{
            console.log(response.data);
        }
        catch(err){
            console.log(err);
        }
        
    }

    return(
        <React.Fragment>
            <h1>Register page woooo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstname" onChange={handleChange} value={values.firstName} required={true} />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastname" onChange={handleChange} value={values.lastName} required={true} />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} value={values.username} required={true} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} value={values.password} required={true} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} value={values.email} required={true} />
                </Form.Group>
                <Form.Group controlId="phonenumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="tel" name="phonenumber" onChange={handleChange} value={values.phonenumber} required={true} />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </React.Fragment>
    )
}