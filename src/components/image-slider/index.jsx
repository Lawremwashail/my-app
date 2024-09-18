import { useEffect, useState } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import './styles.css';


export default function ImageSlider({url, limit= 5, page= 1}) {
    
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        try {
            setLoading(true)

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data)
                setImages(data);
                setLoading(false);
        }
        catch(e) {
            setErrorMsg(e.message);
            setLoading(false)
        }

    }
    useEffect(()=> {
        if (url !== "") fetchImages(url)

    },[url]);

    console.log(images)

    if (loading) {
        return <div>Loading..., <br/> Please Wait </div>
    }
    
    if (errorMsg !== null) {
        return <div>Error Occurred {errorMsg}</div>
    }

    function handlePrevious() {
        setCurrentImage(currentImage === 0 ? images.length - 1: currentImage - 1)
    }

    function handleNext() {
        setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1 )
    }


    return <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
        {
            images && images.length ?
            images.map((imageItem, index)=> 
                <img
                key={imageItem.id}
                src={imageItem.download_url}
                alt={imageItem.download_url}
                className={currentImage === index ? "current-image" : "current-image hide-current-image"}
                />
            )
             
            : null
        }
        <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"/>
        <span className="circle-indicators">
        {
            images && images.length ?
            images.map((_, index)=> <button
            key={index}
            className={currentImage === index ? "current-indicator" : "current indicator inactive-indicator"

            }
            onClick={() => setCurrentImage(index)}

            ></button>) 
            : null
        }
        </span>

    </div>

}