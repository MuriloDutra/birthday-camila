import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getDisapprovedPhotos } from '../../services/request'
import './Dashboard.scss'
import Consumer from '../../context/ApplicationContext'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import { TOKEN } from '../../constants/sessionStorageKeys'
import { findMessage, showRegularMessage } from '../../helpers'
import Lottie from 'lottie-react-web'


function Dashboard(props){
    const [filteredPhotos, setFilteredPhotos] = useState([])
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//approved, waitingEvaluation
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [loadedAllPhotos, setLoadedAllPhotos] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toggleFeedback } = props


    window.onscroll = function() {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            if(loadedAllPhotos){
                return
            }

            loadPhotosData()
        }
    };


    useEffect(() => {
        if(!sessionStorage.getItem(TOKEN)){
            props.history.replace('/login')
            props.toggleFeedback(true, 'Permissão negada.')
        }

        loadPhotosData()
    }, [])


    useEffect(() => {
        loadPhotosData()
    }, [selectedTab])


    async function loadPhotosData(){
        try {
            setLoading(true)
            let results = []

            if(selectedTab === 'waitingEvaluation'){
                results = await getDisapprovedPhotos(page + 1)
            }else{
                results = await getApprovedPhotos(page + 1)
            }

            setPhotos([...photos, ...results])
            setPage(page + 1)
            
            if(results.length < 15){
                setLoadedAllPhotos(true)
            }
        }catch(error){
            handleError(error)
            setPhotos([])
        }

        setLoading(false)
    }


    function handleError(error){
        if(error.response && error.response.data.error){
            toggleFeedback(true, findMessage(error.response.data.error))
        }else{
            toggleFeedback(true, showRegularMessage(false))
        }
    }


    function callback(){
        setPhotos([])
        setPage(0)
        setLoadedAllPhotos(false)
        loadPhotosData()
    }


    function handleOnChangeText(text){
        const { value } = text.target
        setSearchText(value)

        if(value.length === 0){
            setPhotos(photos)
            setFilteredPhotos([])
            return
        }

        var results = photos.filter((item) => {
            if(item.imageName && text){
                let match = item.imageName.toLowerCase().indexOf(value.toLowerCase()) >= 0
                return match
            }
        });

        if(results.length === 0 && searchText.length > 0){
            toggleFeedback(true, findMessage('photo_not_found'))
        }

        setFilteredPhotos(results)
    }


    function handleOnClickTab(tab){
        setPhotos([])
        setPage(0)
        setLoadedAllPhotos(false)
        setSelectedTab(tab)
    }


    return (
        <Consumer>
            {   context => {
                const { dashBoardPage } = context.language

                return (
                    <div className="dashboard-body">
                        <SendPhotosContainer dashboardVersion toggleFeedback={toggleFeedback} callback={callback} />

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

                            <input  type="search" className="filter-input" value={searchText} onChange={handleOnChangeText} />

                            { photos.length === 0 && <p className="warning">Nenhuma foto foi encontrada.</p> }

                            {/*REGULAR PHOTOS*/}
                            {   (selectedTab === 'waitingEvaluation') && (filteredPhotos.length === 0) && (photos.length > 0) && photos.map(photo => {
                                    return (
                                        <ImageContainer
                                            disapprovedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={callback}
                                        />
                                    )
                                })
                            }

                            {   (selectedTab === 'approved') && (filteredPhotos.length === 0) && (photos.length > 0) && photos.map(photo => {
                                    return (
                                        <ImageContainer
                                            approvedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={callback}
                                        />
                                    )
                                })
                            }

                            {/*FILTERED PHOTOS*/}
                            {   (selectedTab === 'waitingEvaluation') && (filteredPhotos.length > 0) && filteredPhotos.map(photo => {
                                    return (
                                        <ImageContainer
                                            approvedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={callback}
                                        />
                                    )
                                })
                            }

                            {/*FILTERED PHOTOS*/}
                            {   (selectedTab === 'approved') && (filteredPhotos.length > 0) && filteredPhotos.map(photo => {
                                    return (
                                        <ImageContainer
                                            approvedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={callback}
                                        />
                                    )
                                })
                            }

                            {   loading &&
                                <div className="animation-container">
                                    <Lottie width="8%" height="100%" options={{animationData: require('../../assets/animations/loading.json')}} />
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