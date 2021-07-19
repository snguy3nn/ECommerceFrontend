import axios from 'axios';
import react, {useState} from 'react';
import { Button } from 'react-bootstrap';
import {FaStar } from  'react-icons/fa';

async function postReview(){
    try{
        let response = await axios.post(`https://localhost:44394/api/reviews`);
        let entries = response.data;
    }
    catch(err){
        alert(err);
    }
}
const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)
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
         <textarea
            placeholder="What is your feedback on the game?"
            style={styles.textarea}>
         </textarea>
         </div>
         <Button style={styles.button} onClick="function postReview()">Submit</Button>
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

export default StarRating