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
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//approved, waitingEvaluation
    
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
                .then(data => setPhotos(data))
                .catch(error => {
                    if(error.response.data.error){
                        toggleFeedback(true, findMessage(error.response.data.error))
                    }else{
                        showRegularMessage(false)
                    }

                    setPhotos([])
                })
        }else{
            getApprovedPhotos()
                .then(data => setPhotos(data))
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

                        {   photos.length === 0 &&
                            <p className="warning">Nenhuma foto foi encontrada.</p>
                        }

                        <div className="images">
                            {   (selectedTab === 'waitingEvaluation') && (photos.length > 0) && photos.map(photo => {
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

                            {   (selectedTab === 'approved') && (photos.length > 0) && photos.map(photo => {
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