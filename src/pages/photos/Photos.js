import React, { useEffect, useState, Fragment } from 'react'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Consumer from 'context/ApplicationContext'
import SendPhotosContainer from 'components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getHighlightPhotos } from 'services/request'
import Lottie from 'lottie-react-web'
import SimpleImageSlider from "react-simple-image-slider";
import './Photos.scss'
import { Helmet } from 'react-helmet'
import { Pagination } from '@mui/material'
import "assets/pagination.scss"

function Photos(props){
    //STATE
    const [overlayImage, setOverlayImage] = useState(null)
    const [highlightedImages, setHighlightedImages] = useState([])
    const [commonPhotos, setCommonPhotos] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    
    useEffect(() => {
        getHighlightPhotos()
            .then((images) => setHighlightedImages(images))
    }, [])

    useEffect(() => {
        loadPhotosData()
    }, [page])

    function loadPhotosData(){
        setLoading(true)

        getApprovedPhotos(page - 1)
            .then((data) => {
                setCommonPhotos(data?.results)
                setTotalPages(data?.totalPages)
            })
            .finally(() => setLoading(false))
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
                            <img
                                src={firstImage.url}
                                onClick={() => handleImageClick(firstImage)}
                                className="normal-image"
                                alt={firstImageDescription}
                                loading="lazy"
                            />
                            <p className="photo-description">{firstImageDescription}</p>
                        </div>
                    }

                    {   secondImage &&
                        <div className="container-second-image">
                            <img
                                src={secondImage.url}
                                onClick={() => handleImageClick(secondImage)}
                                className="normal-image"
                                alt={secondImageDescription}
                                loading="lazy"
                            />
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
        downloadLink.href = overlayImage.url
        downloadLink.download = `download.${overlayImage.type}`

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }
    
    function handlePagination(event, newPageNumber) {
        setPage(newPageNumber)
    }

    return (
        <Consumer>
            {   context => {
                const { currentLanguage } = context
                const { photosPage } = context.language

                return (
                <>
                    <div className="photos-body">
                        <Helmet>
                            <title>Photos from Camila Styles birthday</title>
                            <meta name="description" content="Photos from Camila Styles birthday party, here you can see the greatest moments of it." />
                        </Helmet>

                        {   highlightedImages.length > 0 &&
                            <div className="slider-container">
                                <SimpleImageSlider
                                    width={"70%"}
                                    height={604}
                                    images={highlightedImages}
                                    showBullets={true}
                                    showNavs={true}
                                />
                            </div>
                        }

                        <SendPhotosContainer />
                        
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
                        <div className="pagination-container">
                            <Pagination
                                count={totalPages}
                                page={page}
                                shape="rounded"
                                className="pagination"
                                onChange={handlePagination}
                            />
                        </div>
                    </div>
                
                    {   overlayImage &&
                        <Fragment>
                            <div className="overlay" onClick={() => setOverlayImage('')}>
                                <FontAwesomeIcon className="download-button" icon={faDownload} onClick={downloadPhoto} />
                            </div>
                            <img
                                alt={currentLanguage === 'EN-US' ? overlayImage.url.englishDescription : overlayImage.url.portugueseDescription}
                                src={overlayImage.url}
                                className="image-overlay"
                            />
                        </Fragment>
                    }
                </>
                )
            }}
        </Consumer>
    )
}

export default Photos
