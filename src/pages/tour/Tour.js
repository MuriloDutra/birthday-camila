import React, { useState } from 'react'
import partyImages from '../../constants/slideImages'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tour.scss'
import catalogImages from '../../constants/catalogImages'
import Consumer from '../../context/ApplicationContext'


function Tour(props){
    const [currentImage, setCurrentImage] = useState(0)

    function handleSlide(type){
        if(type === 'forward' && currentImage !== 2){
            setCurrentImage(currentImage + 2)
        }else if(type === 'back' && currentImage !== 0){
            setCurrentImage(currentImage - 2)
        }

        if(type === 'forward' && currentImage === 2){
            setCurrentImage(0)
        }else if(type === 'back' && currentImage === 0){
            setCurrentImage(2)
        }
    }


    function renderCatalogImages(currentLanguage){
        let secondPictureOfColumn = 1

        return catalogImages.map((image, index) => {
            if((index + 1) !== catalogImages.length && secondPictureOfColumn !== index){
                secondPictureOfColumn = index + 1

                return (
                    <div className="image-row">
                        <div className="container-first-image">
                            <img className="normal-image" src={image.imageUrl} />
                            <p className="photo-description">
                                {   currentLanguage === 'EN-US'
                                    ? image.englishDescription
                                    : image.portugueseDescription
                                }
                            </p>
                        </div>
                        <div className="container-second-image">
                            <img className="normal-image" src={catalogImages[index + 1].imageUrl} />
                            <p className="photo-description">
                                {   currentLanguage === 'EN-US'
                                    ? catalogImages[index + 1].englishDescription
                                    : catalogImages[index + 1].portugueseDescription
                                }
                            </p>
                        </div>
                    </div>
                )
            }
        })
    }


    return (
        <Consumer>
            {   context => {
                const { currentLanguage } = context

                return (
                    <div className="tour-body">
                        <div className="slide-container">
                            <FontAwesomeIcon onClick={() => handleSlide('back')} className="arrow left-arrow" icon={faChevronLeft} />

                            <div className="slide">
                                <div className="container-first-image">
                                    <img className="main-image" alt={partyImages[currentImage].description} src={partyImages[currentImage].imageUrl} />
                                    <p className="photo-description">
                                        {   currentLanguage === 'EN-US'
                                            ? partyImages[currentImage].englishDescription
                                            : partyImages[currentImage].portugueseDescription
                                        }
                                    </p>
                                </div>

                                <div className="container-second-image">
                                    <img className="main-image" alt={partyImages[currentImage + 1].description} src={partyImages[currentImage + 1].imageUrl} />
                                    <p className="photo-description">
                                        {   currentLanguage === 'EN-US'
                                            ? partyImages[currentImage + 1].englishDescription
                                            : partyImages[currentImage + 1].portugueseDescription
                                        }
                                    </p>
                                </div>
                            </div>

                            <FontAwesomeIcon onClick={() => handleSlide('forward')} className="arrow right-arrow" icon={faChevronRight} />
                        </div>

                        <div className="images-catalog">
                            <h1>Veja mais fotos</h1>
                            {renderCatalogImages(currentLanguage)}
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default Tour