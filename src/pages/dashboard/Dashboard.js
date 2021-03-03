import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import { getApprovedPhotos, getUnapprovedPhotos } from '../../services/request'
import './Dashboard.scss'


function Dashboard(props){
    const [photos, setPhotos] = useState([])
    const [selectedTab, setSelectedTab] = useState('approved')//approved, waitingEvaluation
    const {toggleFeedback } = props


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

    console.log(photos)
    return (
        <div className="dashboard-body">
            <SendPhotosContainer dashboardVersion toggleFeedback={toggleFeedback} />

            <div className="main-menu">
                <p onClick={() => setSelectedTab('approved')} className={selectedTab === 'approved' && 'selected-tab'}>
                    Aprovadas
                </p>
                
                <p onClick={() => setSelectedTab('waitingEvaluation')} className={selectedTab === 'waitingEvaluation' && 'selected-tab'}>
                    Esperando avaliação
                </p>
            </div>

            {   photos.length === 0 &&
                <p className="warning">Nenhuma foto foi encontrada.</p>
            }
        </div>
    )
}


export default withRouter(Dashboard)