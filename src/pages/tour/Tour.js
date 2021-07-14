import React, { useEffect, useState } from 'react'
import { faTimes, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Consumer from '../../context/ApplicationContext'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getHighlightPhotos } from '../../services/request'
import Lottie from 'lottie-react-web'
import './Tour.scss'


function Tour(props){
    const [currentImage, setCurrentImage] = useState(0)
    const [overlayImage, setOverlayImage] = useState(null)
    const [highlightedImages, setHighlightedImages] = useState([])
    const [commonPhotos, setCommonPhotos] = useState([])
    const [page, setPage] = useState(0)
    const [loadedAllPhotos, setLoadedAllPhotos] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toggleFeedback } = props


    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if(!loadedAllPhotos)
                loadPhotosData()
        }
    };

    
    useEffect(() => loadPhotosData(), [])


    function loadPhotosData(){
        setLoading(true)

        getHighlightPhotos()
            .then((images) => setHighlightedImages(images))

        getApprovedPhotos(page + 1)
            .then((approved_images) => {
                setCommonPhotos([...commonPhotos,...approved_images])
                setPage(page + 1)

                if(approved_images.length < 15)
                    setLoadedAllPhotos(true);
            })
            .finally(() => setLoading(false))
    }

    function handleSlide(type){
        const go_to_beginning = (!highlightedImages[currentImage + 1] || !highlightedImages[currentImage + 2]);
        const go_to_end = (currentImage === 0);
        if(go_to_beginning && type === 'forward')
            setCurrentImage(0);
        else if(go_to_end && type === 'back'){
            highlightedImages.length % 2 === 0
                ? setCurrentImage(highlightedImages.length - 2)
                : setCurrentImage(highlightedImages.length - 1)
        }else if(type === 'forward')
            setCurrentImage(currentImage + 1); 
        else if(type === 'back')
            setCurrentImage(currentImage - 1);
    }


    function renderCatalogImages(currentLanguage){
        let arrayOfContainer = []
        let imageContainer = {}

        commonPhotos.forEach((image, index) => {
            if(index % 2 === 0){
                imageContainer.firstImage = image
                
                if(!commonPhotos[index +  1])
                    arrayOfContainer.push(imageContainer)
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
                            <img src={firstImage.imageUrl} onClick={() => handleImageClick(firstImage)} className="normal-image" alt={firstImageDescription}/>
                            <p className="photo-description">{firstImageDescription}</p>
                        </div>
                    }

                    {   secondImage &&
                        <div className="container-second-image">
                            <img src={secondImage.imageUrl} onClick={() => handleImageClick(secondImage)} className="normal-image" alt={secondImageDescription}/>
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

    function render_highlights_images(current_language){
        return highlightedImages.map((image) => {
            let image_alt = current_language === 'EN-US' ? image.englishDescription : image.portugueseDescription

            return (
                <div className="image-container">
                    <img
                        src={image.imageUrl}
                        alt={image_alt}
                        onClick={() => handleImageClick(image)}
                    />
                    {/*<p>
                        {   current_language === 'EN-US'
                            ? image.englishDescription
                            : image.portugueseDescription
                        }
                    </p>*/}
                </div>
            )
        })
    }

    
    return (
        <Consumer>
            {   context => {
                const { currentLanguage } = context
                const { photosPage } = context.language
    
                if(highlightedImages.length > 0){
                    var firstImage = highlightedImages[currentImage]
                }

                return (
                <>
                    <div className="tour-body">
                        
                        {   highlightedImages.length > 0 &&
                            <div className="slides-container">
                                {render_highlights_images(currentLanguage)}
                            </div>
                        }

                        <SendPhotosContainer toggleFeedback={toggleFeedback} />
                        
                        {   commonPhotos.length > 0 &&
                            <div className="images-catalog">
                                <h1>{photosPage.photosTitle}</h1>
                                {renderCatalogImages(currentLanguage)}

                                {   loading &&
                                    <div className="animation-container">
                                        <Lottie width="8%" height="100%" options={{animationData: require('../../assets/animations/loading.json')}} />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                
                    {   overlayImage &&
                        <div className="image-overlay">
                            <FontAwesomeIcon className="close-overlay" icon={faTimes} onClick={() => setOverlayImage('')} />
                            <FontAwesomeIcon className="download-button" icon={faDownload} onClick={downloadPhoto} />
                            <img
                                alt={currentLanguage === 'EN-US' ? overlayImage.imageUrl.englishDescription : overlayImage.imageUrl.portugueseDescription}
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