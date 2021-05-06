import React, { useEffect, useState } from 'react'
import { faChevronLeft, faChevronRight, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tour.scss'
import Consumer from '../../context/ApplicationContext'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos } from '../../services/request'


function Tour(props){
    const [currentImage, setCurrentImage] = useState(0)
    const [overlayImage, setOverlayImage] = useState('')
    const [highlightedImages, setHighlightedImages] = useState([])
    const [commonPhotos, setCommonPhotos] = useState([])
    const [page, setPage] = useState(0)
    const { toggleFeedback } = props


    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page")
        }
    };

    
    useEffect(() => {
        getApprovedPhotos(page)
            .then((data) => {
                let highlightedItems = []
                let otherItems = []

                data.forEach((image) => {
                    if(image.highlightImage == 1){
                        highlightedItems.push(image)
                    }else{
                        otherItems.push(image)
                    }
                })

                setHighlightedImages(highlightedItems)
                setCommonPhotos(otherItems)
            })
    }, [])


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
        let arrayOfContainer = []
        let imageContainer = {}

        commonPhotos.forEach((image, index) => {
            if(index % 2 == 0){
                imageContainer.firstImage = image
                
                if(!commonPhotos[index +  1]){
                    arrayOfContainer.push(imageContainer)
                }
            }else{
                imageContainer.secondImage = image
                arrayOfContainer.push(imageContainer)

                imageContainer = {}
            }
        })

        return arrayOfContainer.map((obj, index) => {
            const { firstImage, secondImage } = obj
            const firstImageDescription = firstImage
                ? currentLanguage === 'EN-US' ? firstImage.englishDescription : firstImage.portugueseDescription
                : ''

            const secondImageDescription = secondImage
                ? currentLanguage === 'EN-US' ? secondImage.englishDescription : secondImage.portugueseDescription
                : ''

            return (
                <div className="image-row" key={firstImage ? firstImage.id : index}>
                    {   firstImage &&
                        <div className="container-first-image">
                            <img src={firstImage.imageUrl} onClick={() => handleImageClick(firstImage)} className="normal-image" alt={firstImageDescription} />
                            <p className="photo-description">{firstImageDescription}</p>
                        </div>
                    }

                    {   secondImage &&
                        <div className="container-second-image">
                            <img src={secondImage.imageUrl} onClick={() => handleImageClick(secondImage)} className="normal-image" alt={secondImageDescription} />
                            <p className="photo-description">{secondImageDescription}</p>
                        </div>
                    }
                </div>
            )
        })
    }


    function handleImageClick(selectedImage){
        setOverlayImage(selectedImage)
    }


    function downloadPhoto(){
        var downloadLink = document.createElement("a");
        downloadLink.href = overlayImage.imageUrl
        downloadLink.download = `download.${overlayImage.type}`

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    
    return (
        <Consumer>
            {   context => {
                const { currentLanguage } = context
                const { photosPage } = context.language
    
                if(highlightedImages.length > 0){
                    var firstImage = highlightedImages[currentImage]
                    var firstImageAlt = currentLanguage === 'EN-US' ? firstImage.englishDescription : firstImage.portugueseDescription

                    var secondImage = highlightedImages[currentImage + 1]

                    if(secondImage){
                        var secondImageAlt = currentLanguage === 'EN-US' ? secondImage.englishDescription : secondImage.portugueseDescription
                    }
                }

                return (
                <>
                    <div className="tour-body">
                        {   highlightedImages.length > 0 &&
                            <div className="slide-container">
                                <div className="slide">
                                    <div className="container-first-image">
                                        <img
                                            className="main-image"
                                            alt={firstImageAlt}
                                            src={firstImage.imageUrl}
                                            onClick={() => handleImageClick(firstImage)}
                                        />
                                        <p className="photo-description">
                                            {   currentLanguage === 'EN-US'
                                                ? firstImage.englishDescription
                                                : firstImage.portugueseDescription
                                            }
                                        </p>
                                    </div>
                                    {   secondImage && 
                                        <div className="container-second-image">
                                            <img
                                                className="main-image"
                                                alt={secondImageAlt}
                                                src={secondImage.imageUrl}
                                                onClick={() => handleImageClick(secondImage)}
                                            />
                                            <p className="photo-description">
                                                {   currentLanguage === 'EN-US'
                                                    ? secondImage.englishDescription
                                                    : secondImage.portugueseDescription
                                                }
                                            </p>
                                        </div>
                                    }
                                    
                                </div>
                                {   highlightedImages.length > 2 &&
                                    <div className="arrows-container">
                                        <FontAwesomeIcon onClick={() => handleSlide('back')} className="arrow left-arrow" icon={faChevronLeft} />
                                        <FontAwesomeIcon onClick={() => handleSlide('forward')} className="arrow right-arrow" icon={faChevronRight} />  
                                    </div>
                                }
                            </div>
                        }

                        <SendPhotosContainer toggleFeedback={toggleFeedback} />
                        
                        {   commonPhotos.length > 0 &&
                            <div className="images-catalog">
                                <h1>{photosPage.photosTitle}</h1>
                                {renderCatalogImages(currentLanguage)}
                            </div>
                        }
                    </div>
                
                    {   overlayImage !== '' &&
                        <div className="image-overlay">
                            <FontAwesomeIcon className="close-overlay" icon={faTimes} onClick={() => setOverlayImage('')} />
                            <FontAwesomeIcon className="download-button" icon={faDownload} onClick={downloadPhoto} />
                            <img
                                alt={currentLanguage === 'EN-US' ? firstImage.englishDescription : firstImage.portugueseDescription}
                                src={overlayImage.imageUrl}
                            />
                        </div>
                    }
                </>
                )
            }}
        </Consumer>
    )
}


export default Tour