import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import useForm from '../../hooks/useForm';


export default function LandingPage(props){

    const [user, setUser] = useState(null);
    const { values, handleChange, handleSubmit } = useForm(submitForm);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {setUser(props.user)}, [props.user]);

    function submitForm(){
        setRedirect(true);
    }

    return(
        <React.Fragment>
            {redirect && <Redirect to={{pathname: '/searchResults', state: { searchQuery: values.title}}} />}
            {user ? 
            <div className='text-center'>
                <h1> Welcome!</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Search titles</Form.Label>
                        <Form.Control type="text" name="title" onChange={handleChange} value={values.title} required={true} />
                    </Form.Group>
                    <Button type="submit">Search</Button>
                </Form>
            </div>
            :
            <div className='text-center'>
                <h1>Welcome! Please log in or create an account.</h1>
            </div>}
        </React.Fragment>
    )
}