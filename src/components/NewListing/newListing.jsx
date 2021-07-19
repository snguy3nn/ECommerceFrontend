import React, { Component } from 'react';

export default function NewListing(props){
    return(
        <div className='text-center'>
            <h1>Create New Listing</h1>
            <p>User Id from props: {props.user.id}</p>
        </div>
        
    )
}