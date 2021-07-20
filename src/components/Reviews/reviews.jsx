import axios from 'axios';
import react, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import {FaStar } from  'react-icons/fa';
import useForm from '../../hooks/useForm';
import { Form } from 'react-bootstrap';


export default function Reviews(props){

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)
    const [results, setResults] = useState(null);
    const { values, handleChange, handleSubmit } = useForm(postReview);

async function postReview(){
    try{
        // let response = await axios.post(`https://localhost:44394/api/reviews`);
        // //let entries = response.data;
        // console.log(response.data);
        // setResults(response.data);
        console.logDOM(props.location.state.gameId);
        console.log(values.comment);
        console.log(rating);
    }   
    catch(err){
        alert(err);
    }
}
    return (
     <div className="text-center">
         {[...Array(5)].map((star, i) =>{
             const ratingValue = i + 1;
             return (
             <label>
                 <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                 <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107": "#e4e5e9"} size={30}onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
             </label> 
             );
         })}
         <div >
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="comment">
                <Form.Label>Post Comment</Form.Label>
                <Form.Control type="text" name="comment" onChange={handleChange} value={values.comment} required={true} />
            </Form.Group>
            <Button className='mt-2' type="submit">Submit</Button>
         </Form>
         </div>
    </div>
         );
};
const styles = {
    container:{
        display: "flex",
        flexdirection: "column",
        alignItems: "center",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        margin: "20px 0",
        minHeight: 100,
        padding: 10
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10
    }
}
