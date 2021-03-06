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
    const [avgRating, setAvgRating] = useState(null);
    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        getReviews();
    }, []);

    async function getReviews(){
        try{
            let response = await axios.get(`https://localhost:44394/api/reviews/game_${props.gameId}`);
            let reviews = response.data;
            if (reviews.length > 0){
                let allRatings = reviews.map(r => r.rating);
                let sum = 0;
                for (let i=0; i<allRatings.length; i++){
                    sum += allRatings[i];
                }
                let avg = sum/allRatings.length;
                setAvgRating(avg);
            }
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
        if (props.sellerId === user.id){
            setIsCreator(true);
            setCanPost(false);
        }
    }

    function generateReviewsDisplay(){
        let display = reviews.map((review) => {
            return(
                <div key={review.userName} className='mt-1 mb-1'>
                    <Alert variant='dark'>
                        <h3 className='text-left'>{review.userName} ({review.rating} <FaStar className="star align-top"  size={30} color={"#ffc107"}/>)</h3>
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
            setCanPost(false);
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
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="comment">
                                <Form.Label>Post Comment</Form.Label>
                                <Form.Control as="textarea" rows={4} name="comment" onChange={handleChange} value={values.comment} required={true} />
                            </Form.Group>
                            <Form.Group className='mt-1 mb-1 row'>
                                {[...Array(5)].map((star, i) =>{
                                const ratingValue = i + 1;
                                return (
                                <label className="col" key={i}>
                                    <input className='invisible' key={i+1} type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} required={true}/>
                                    <FaStar key={i+2} className="star" color={ratingValue <= (hover || rating) ? "#ffc107": "#e4e5e9"} size={30}onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
                                </label> 
                                );
                                })}
                            </Form.Group>
                            <Button className='mt-4' type="submit">Submit</Button>
                        </Form>
                    </div>
                    <div className='col' />
                </div>
            :
                <React.Fragment>
                {!isCreator ? 
                    <div className='text-center'>
                        <p>(You have already posted a review for this game)</p>
                    </div>
                :
                    <div className='text-center'>
                        <p>(Cannot review your own listing)</p>
                    </div>
                }
                </React.Fragment>
            }

            {reviews && 
            <div className='row overflow-auto'>
                <div className='col' />
                <div className='mt-2 col-8' >
                    {avgRating && 
                    <div className='d-flex justify-content-center text-center'>
                        <h3 className='w-50 bg-dark'>
                            Average rating: {avgRating} <FaStar className="star align-top"  size={30} color={"#ffc107"}/>
                        </h3>
                    </div>}
                    {generateReviewsDisplay()}
                </div>
                <div className='col' />
            </div>}

        </React.Fragment>
        );
};


