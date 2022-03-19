import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from 'components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getDisapprovedPhotos, getPhotoById } from 'services/request'
import './Dashboard.scss'
import Consumer from 'context/ApplicationContext'
import ImageContainer from 'components/imageContainer/ImageContainer'
import { TOKEN } from 'constants/sessionStorageKeys'
import { findMessage, showRegularMessage, showToast } from 'helpers'
import Lottie from 'lottie-react-web'
import { Pagination } from '@mui/material'
import "assets/pagination.scss"

function Dashboard(props) {
    //PROPS
    const { history } = { ...props }
    //STATE
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//Possible values: approved, waitingEvaluation
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        if (!sessionStorage.getItem(TOKEN)) {
            history.replace('/login')
            showToast('Permissão negada.', "error")
        }
    }, [])

    useEffect(() => {
        loadPhotosData()
    }, [selectedTab, page])

    async function loadPhotosData() {
        try {
            setLoading(true)
            let data = []

            if (selectedTab === 'waitingEvaluation')
                data = await getDisapprovedPhotos(page - 1)
            else if (selectedTab === 'approved')
                data = await getApprovedPhotos(page - 1, "ALL_IMAGES")

            setTotalPages(data?.totalPages)
            setPhotos(data?.results)
        } catch (error) {
            handleError(error)
            setPhotos([])
        }

        setLoading(false)
    }

    function handleError(error) {
        if (error?.response?.data?.error) {
            showToast(findMessage(error.response.data.error), "error")
        } else {
            showToast(showRegularMessage(false), "error")
        }
    }

    function callback() {
        setPhotos([])
        setPage(0)
    }

    function defaultCallback(indexPhoto) {
        let newPhotosArray = [...photos]
        newPhotosArray.splice(indexPhoto, 1)
        setPhotos(newPhotosArray)
    }

    async function handlePhotoUpdate(photoId, indexPhoto) {
        let newPhotosArray = [...photos]
        const photo = await getPhotoById(photoId)
        newPhotosArray[indexPhoto] = photo
        setPhotos(newPhotosArray)
    }

    function handleOnChangeText(text) {
        const { value } = text.target
        setSearchText(value)

        if (value.length === 0) {
            setPhotos(photos)
            //setFilteredPhotos([])
            return
        }

        var results = photos.filter((item) => {
            if (item.imageName && text) {
                let match = item.imageName.toLowerCase().indexOf(value.toLowerCase()) >= 0
                return match
            }
        });

        if (results.length === 0 && searchText.length > 0) {
            showToast(findMessage('error_photo_not_found'), "error")
        }

        //setFilteredPhotos(results)
    }

    function handleOnClickTab(tab) {
        setPhotos([])
        setPage(1)
        setSelectedTab(tab)
    }

    function handlePagination(event, newPageNumber) {
        setPage(newPageNumber)
    }

    return (
        <Consumer>
            {context => {
                const { dashBoardPage } = context.language

                return (
                    <div className="dashboard-body">
                        <SendPhotosContainer
                            dashboardVersion
                            callback={() => { callback(); }}
                        />

                        <div className="main-menu">
                            <p onClick={() => handleOnClickTab('approved')} className={selectedTab === 'approved' && 'selected-tab'}>
                                {dashBoardPage.approvedPhotos}
                            </p>

                            <p onClick={() => handleOnClickTab('waitingEvaluation')} className={selectedTab === 'waitingEvaluation' && 'selected-tab'}>
                                {dashBoardPage.disapprovedPhotos}
                            </p>
                        </div>

                        <div className="images">
                            <p className="filter-title">{dashBoardPage.filterTitle}</p>

                            <input type="search" className="filter-input" value={searchText} onChange={handleOnChangeText} />

                            {photos.length === 0 && <p className="warning">Nenhuma foto foi encontrada.</p>}
                            {photos?.map((photo, index) => {
                                return (
                                    <ImageContainer
                                        approvedPhotos={(selectedTab === 'approved')}
                                        disapprovedPhotos={(selectedTab === 'waitingEvaluation')}
                                        photo={photo}
                                        defaultCallback={() => defaultCallback(index)}
                                        handlePhotoUpdate={() => handlePhotoUpdate(photo.id, index)}
                                    />
                                )
                            })}
                            {photos?.length > 0 &&
                                <div className="pagination-container">
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        shape="rounded"
                                        className="pagination"
                                        onChange={handlePagination}
                                    />
                                </div>
                            }

                            {loading &&
                                <div className="animation-container">
                                    <Lottie width="8%" height="100%" options={{ animationData: require('../../assets/animations/loading.json') }} />
                                </div>
                            }
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}

export default withRouter(Dashboard)
