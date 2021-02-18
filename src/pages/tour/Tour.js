import React, { useState } from 'react'
import partyImages from '../../constants/slideImages'
import { faChevronLeft, faChevronRight, faTimes, faDownload, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tour.scss'
import catalogImages from '../../constants/catalogImages'
import Consumer from '../../context/ApplicationContext'
import { sendPhotos } from '../../services/request'


function Tour(props){
    const [currentImage, setCurrentImage] = useState(0)
    const [overlayImage, setOverlayImage] = useState('')
    const [photos, setPhotos] = useState([])


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

                const firstImage = image
                const secondImage = catalogImages[index + 1]
                const firstImageAlt = currentLanguage === 'EN-US' ? firstImage.englishDescription : firstImage.portugueseDescription
                const secondImageAlt = currentLanguage === 'EN-US' ? secondImage.englishDescription : secondImage.portugueseDescription

                return (
                    <div className="image-row" key={image.id}>
                        <div className="container-first-image">
                            <img
                                className="normal-image"
                                src={firstImage.imageUrl}
                                alt={firstImageAlt}
                                onClick={() => handleImageClick(firstImage)}
                            />
                            <p className="photo-description">
                                {   currentLanguage === 'EN-US'
                                    ? firstImage.englishDescription
                                    : firstImage.portugueseDescription
                                }
                            </p>
                        </div>
                        <div className="container-second-image">
                            <img
                                className="normal-image"
                                src={secondImage.imageUrl}
                                alt={secondImageAlt}
                                onClick={() => handleImageClick(secondImage)}
                            />
                            <p className="photo-description">
                                {   currentLanguage === 'EN-US'
                                    ? secondImage.englishDescription
                                    : secondImage.portugueseDescription
                                }
                            </p>
                        </div>
                    </div>
                )
            }
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


    function toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => {reject(error)};
        });
    }


    function convertImagesToBase64(){
        let base64 = photos.map((photo, index) => toBase64(photo).then(newPhoto => newPhoto))
        return Promise.all(base64)
    }


    function handleSubmit(){
        convertImagesToBase64()
            .then(convertedImages => {
                let body = {"imagesBase64": convertedImages}
                
                sendPhotos(body)
                    .then(data => console.log('DATA: ', data))
                    .catch(error => console.log('ERRROR: ', error))
            })
    }


    return (
        <Consumer>
            {   context => {
                const { currentLanguage } = context

                const firstImage = partyImages[currentImage]
                const secondImage = partyImages[currentImage + 1]
                const firstImageAlt = currentLanguage === 'EN-US' ? firstImage.englishDescription : firstImage.portugueseDescription
                const secondImageAlt = currentLanguage === 'EN-US' ? secondImage.englishDescription : secondImage.portugueseDescription

                return (
                    <>
                        <div className="tour-body">
                            <div className="slide-container">
                                <FontAwesomeIcon onClick={() => handleSlide('back')} className="arrow left-arrow" icon={faChevronLeft} />

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
                                </div>

                                <FontAwesomeIcon onClick={() => handleSlide('forward')} className="arrow right-arrow" icon={faChevronRight} />
                            </div>

                            <div className="send-photos-container">
                                <h1>Tem fotos da festa? Mande pra gente</h1>
                                <div className="button-container">
                                    {   photos.length > 0 &&
                                        <>
                                            <p className="selected-photos-title">Fotos selecionadas</p>
                                            <div className="selected-photos-container">
                                                { photos.map((photo, index) => (
                                                    <p className="selected-photo">
                                                        {index + 1} - {photo.name}
                                                        <FontAwesomeIcon className="check-circle" icon={faCheckCircle} />
                                                    </p>
                                                ))}
                                            </div>
                                        </>
                                    }
                                    <input type="file" onChange={value => photos.length < 10 && setPhotos([...photos, value.target.files[0]])} />
                                    <button onClick={handleSubmit}>Enviar</button>
                                </div>
                            </div>
                            
                            <div className="images-catalog">
                                <h1>Veja mais fotos</h1>
                                {renderCatalogImages(currentLanguage)}
                            </div>
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