import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getUnapprovedPhotos, approvePhotoById } from '../../services/request'
import './Dashboard.scss'
import Consumer from '../../context/ApplicationContext'
import ImageContainer from '../../components/imageContainer/ImageContainer'


function Dashboard(props){
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//approved, waitingEvaluation
    
    const { toggleFeedback } = props

    useEffect(() => {
        if(!sessionStorage.getItem('token')){
            props.history.replace('/login')
            props.toggleFeedback(true, 'Permissão negada.')
        }
    }, [])


    useEffect(() => {
        if(selectedTab === 'waitingEvaluation'){
            getUnapprovedPhotos().then(data => setPhotos(data))
        }else{
            getApprovedPhotos().then(data => setPhotos(data))
        }
    }, [selectedTab])


    return (
        <Consumer>
            {   context => {
                const { dashBoardPage } = context.language

                return (
                    <div className="dashboard-body">
                        <SendPhotosContainer dashboardVersion toggleFeedback={toggleFeedback} />

                        <div className="main-menu">
                            <p onClick={() => setSelectedTab('approved')} className={selectedTab === 'approved' && 'selected-tab'}>
                                {dashBoardPage.approvedPhotos}
                            </p>
                            
                            <p onClick={() => setSelectedTab('waitingEvaluation')} className={selectedTab === 'waitingEvaluation' && 'selected-tab'}>
                                {dashBoardPage.unapprovedPhotos}
                            </p>
                        </div>

                        {   photos.length === 0 &&
                            <p className="warning">Nenhuma foto foi encontrada.</p>
                        }

                        <div className="images">
                            {   (selectedTab === 'waitingEvaluation') && (photos.length > 0) && photos.map(photo => {
                                    return (
                                        <ImageContainer
                                            unapprovedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={() => getUnapprovedPhotos().then(data => setPhotos(data))}
                                        />
                                    )
                                })
                            }

                            {   (selectedTab === 'approved') && (photos.length > 0) && photos.map(photo => {
                                    return (
                                        <ImageContainer
                                            approvedPhotos
                                            toggleFeedback={toggleFeedback}
                                            photo={photo}
                                            callback={() => getApprovedPhotos().then(data => setPhotos(data))}
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