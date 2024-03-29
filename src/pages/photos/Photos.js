import React, { useEffect, useState, Fragment } from 'react'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SendPhotosContainer from 'components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getHighlightPhotos } from 'services/request'
import Lottie from 'lottie-react-web'
import SimpleImageSlider from "react-simple-image-slider";
import './Photos.scss'
import { Helmet } from 'react-helmet'
import { Pagination } from '@mui/material'
import { useHistory } from "react-router-dom"
import "assets/pagination.scss"
import { getParameterFromURL } from 'helpers'
import { useTranslation } from 'react-i18next'

function Photos(props) {
    //NAVIGATION
    const history = useHistory()
    const pageInURL = getParameterFromURL(history?.location?.search, "page")
    //STATE
    const [overlayImage, setOverlayImage] = useState(null)
    const [highlightedImages, setHighlightedImages] = useState([])
    const [commonPhotos, setCommonPhotos] = useState([])
    const [page, setPage] = useState(findPage())
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    //OTHERS
    const { t, i18n } = useTranslation()
    const { language } = { ...i18n }
    const isEnglish = (language === 'en')

    useEffect(() => {
        getHighlightPhotos()
            .then((images) => setHighlightedImages(images))
    }, [])

    useEffect(() => {
        loadPhotosData()
    }, [page])

    function findPage() {
        if (pageInURL)
            return parseInt(pageInURL)
        else
            return 1
    }

    function loadPhotosData() {
        setLoading(true)

        getApprovedPhotos(page - 1)
            .then((data) => {
                const invalidPageInURL = (data?.page >= data?.totalPages)
                if (invalidPageInURL)
                    setPage(1)
                else {
                    setCommonPhotos(data?.results)
                    setTotalPages(data?.totalPages)
                }

                history.push(buildURL())
            })
            .finally(() => setLoading(false))
    }

    function buildURL() {
        if (page > 1)
            return `/photos?page=${page}`
        else
            return '/photos'
    }

    function renderCatalogImages() {
        let arrayOfContainer = []
        let imageContainer = {}

        commonPhotos.forEach((image, index) => {
            if (index % 2 === 0) {
                imageContainer.firstImage = image

                if (!commonPhotos[index + 1])
                    arrayOfContainer.push(imageContainer)
            } else {
                imageContainer.secondImage = image
                arrayOfContainer.push(imageContainer)
                imageContainer = {}
            }
        })

        return arrayOfContainer.map((obj, index) => {
            const { firstImage, secondImage } = obj
            const firstImageDescription = firstImage
                ? isEnglish ? firstImage.englishDescription : firstImage.portugueseDescription
                : ''

            const secondImageDescription = secondImage
                ? isEnglish ? secondImage.englishDescription : secondImage.portugueseDescription
                : ''

            return (
                <div className="image-row" key={firstImage ? firstImage.id : index}>
                    {firstImage &&
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

                    {secondImage &&
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

    function handleImageClick(selectedImage) {
        setOverlayImage(selectedImage)
    }

    function downloadPhoto() {
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
        <Fragment>
            <div className="photos-body">
                <Helmet>
                    <title>Photos from Camila Styles birthday</title>
                    <meta name="description" content="Photos from Camila Styles birthday party, here you can see the greatest moments of it." />
                </Helmet>

                {highlightedImages.length > 0 &&
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

                {commonPhotos.length > 0 &&
                    <div className="images-catalog">
                        <h1>{t("photosPage.photosTitle")}</h1>
                        {renderCatalogImages()}

                        {loading &&
                            <div className="animation-container">
                                <Lottie width="8%" height="100%" options={{ animationData: require('../../assets/animations/loading.json') }} />
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

            {overlayImage &&
                <Fragment>
                    <div className="overlay" onClick={() => setOverlayImage('')}>
                        <FontAwesomeIcon className="download-button" icon={faDownload} onClick={downloadPhoto} />
                    </div>
                    <img
                        alt={isEnglish ? overlayImage.url.englishDescription : overlayImage.url.portugueseDescription}
                        src={overlayImage.url}
                        className="image-overlay"
                    />
                </Fragment>
            }
        </Fragment>
    )
}

export default Photos
