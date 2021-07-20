import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import {FaStar } from  'react-icons/fa';
import useForm from '../../hooks/useForm';
import jwtDecode from 'jwt-decode';


export default function Reviews(props){

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const { values, handleChange, handleSubmit } = useForm(postReview);
    const [reviews, setReviews] = useState(null);
    const [canPost, setCanPost] = useState(false);

    useEffect(() => {
        getReviews();
    }, []);

    async function getReviews(){
        try{
            let response = await axios.get(`https://localhost:44394/api/reviews/game_${props.gameId}`);
            setReviews(response.data);
            checkCanPost(response.data);
        }
        catch(err){
            alert(err);
        }
    }

    function checkCanPost(reviewsArray){
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        let ids = reviewsArray.map(r => r.userId);
        if (!ids.includes(user.id)){
            setCanPost(true);
        }
    }

    function generateReviewsDisplay(){
        let display = reviews.map((review) => {
            return(
                <div className='mt-1 mb-1'>
                    <Alert variant='dark'>
                        <h3 className='text-left'>{review.userName} ({review.rating} stars)</h3>
                        <Alert variant='light'>{review.comment}</Alert>
                    </Alert>
                </div>
            )
        })

        return display;
    }

    async function postReview(){
        try{
            const jwt = localStorage.getItem('token');
            let newReview = {GameId: props.gameId, Comment: values.comment, Rating: rating};
            let response = await axios.post(`https://localhost:44394/api/reviews`, newReview, { headers: {Authorization: 'Bearer ' + jwt}});
            console.log(response.data);
            getReviews();
        }   
        catch(err){
            alert(err);
        }
    }
    return (
        <React.Fragment>
            {canPost ?
                <div className='row'>
                    <div className='col' />
                    <div className="col text-center">
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="comment">
                                <Form.Label>Post Comment</Form.Label>
                                <Form.Control as="textarea" rows={4} name="comment" onChange={handleChange} value={values.comment} required={true} />
                            </Form.Group>
                            {[...Array(5)].map((star, i) =>{
                            const ratingValue = i + 1;
                            return (
                            <label>
                                <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} required={true}/>
                                <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107": "#e4e5e9"} size={30}onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
                            </label> 
                            );
                        })}
                            <Button className='mt-2' type="submit">Submit</Button>
                        </Form>
                    </div>
                    <div className='col' />
                </div>
                :
                <div className='text-center'>
                    <p>(You have already posted a review for this game)</p>
                </div>
            }

            {reviews && 
            <div className='row overflow-auto'>
                <div className='col' />
                <div className='mt-2 col-8' >
                    {generateReviewsDisplay()}
                </div>
                <div className='col' />
            </div>}

        </React.Fragment>
         );
};


