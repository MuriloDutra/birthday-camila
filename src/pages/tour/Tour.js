import React, { useState } from 'react'
import partyImages from '../../constants/partyImages'
import { faArrowCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tour.scss'


function Tour(props){
    const [currentImage, setCurrentImage] = useState(0)


    function handleSlide(type){
        if(type === 'forward' && currentImage !== 3){
            setCurrentImage(currentImage + 1)
        }else if(type === 'back' && currentImage !== 0){
            setCurrentImage(currentImage - 1)
        }
    }


    return (
        <div className="tour-body">
            <div className="images-slide">
                <FontAwesomeIcon onClick={() => handleSlide('back')} className="arrow" icon={faArrowCircleLeft} />
                <div>
                    <img className="main-image" src={partyImages[currentImage].imageUrl} />
                    <p>{partyImages[currentImage].description}</p>
                </div>
                <FontAwesomeIcon onClick={() => handleSlide('forward')} className="arrow" icon={faArrowAltCircleRight} />
            </div>
        </div>
    )
}


export default Tour