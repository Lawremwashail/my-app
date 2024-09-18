import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './styles.css'

export default function StarRating({noOfStars = 10}) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    function handleStarRating(getCurrentIndex) {
        setRating(getCurrentIndex);
    }

    function handleStarHovering(getCurrentIndex) {
        setHover(getCurrentIndex);
    
    }

    function handleMouseLeaving() {
        setHover(rating)
    }
    return <div className='containter'>
        {
            [...Array(noOfStars)].map((_, index)=> {
                return <FaStar
                key={index}
                className={index <= (rating || hover) ? 'active' : 'inactive'}
                onClick={()=>handleStarRating(index)}
                onMouseMove={()=>handleStarHovering(index)}
                onMouseLeave={()=>handleMouseLeaving()}

                size={40}
                
                
                />
                
            })
}
    </div>
}