import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getDisapprovedPhotos } from '../../services/request'
import './Dashboard.scss'
import Consumer from '../../context/ApplicationContext'
import ImageContainer from '../../components/imageContainer/ImageContainer'
import { TOKEN } from '../../constants/sessionStorageKeys'
import { findMessage, showRegularMessage } from '../../helpers'


function Dashboard(props){
    const [filteredPhotos, setFilteredPhotos] = useState([])
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//approved, waitingEvaluation
    const [searchText, setSearchText] = useState('')
    const { toggleFeedback } = props


    useEffect(() => {
        if(!sessionStorage.getItem(TOKEN)){
            props.history.replace('/login')
            props.toggleFeedback(true, 'Permissão negada.')
        }
    }, [])


    useEffect(() => {
        if(selectedTab === 'waitingEvaluation'){
            getDisapprovedPhotos()
                .then(data => {
                    setPhotos(data)
                })
                .catch(error => {
                    if(error.response && error.response.data.error){
                        toggleFeedback(true, findMessage(error.response.data.error))
                    }else{
                        showRegularMessage(false)
                    }

                    setPhotos([])
                })
        }else{
            getApprovedPhotos()
                .then(data => {
                    setPhotos(data)
                })
                .catch(error => {
                    setPhotos([])
                    showRegularMessage(false)
                })
        }
    }, [selectedTab])


    function callback(){
        if(selectedTab === 'waitingEvaluation'){
            getDisapprovedPhotos().then(data => setPhotos(data))
        }else{
            getApprovedPhotos().then(data => setPhotos(data))
        }
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


    return (
        <Consumer>
            {   context => {
                const { dashBoardPage } = context.language

                return (
                    <div className="dashboard-body">
                        <SendPhotosContainer dashboardVersion toggleFeedback={toggleFeedback} callback={callback} />

                        <div className="main-menu">
                            <p onClick={() => setSelectedTab('approved')} className={selectedTab === 'approved' && 'selected-tab'}>
                                {dashBoardPage.approvedPhotos}
                            </p>
                            
                            <p onClick={() => setSelectedTab('waitingEvaluation')} className={selectedTab === 'waitingEvaluation' && 'selected-tab'}>
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
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default withRouter(Dashboard)