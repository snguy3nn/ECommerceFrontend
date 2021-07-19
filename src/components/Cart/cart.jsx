import React, { Component } from 'react';

export default function Cart(props){


    return(
        <React.Fragment>
            <div className='text-center'>
                <h1>My Cart</h1>
                <p>User Id from props: {props.user.username}</p>
            </div>
        </React.Fragment>
    )
}