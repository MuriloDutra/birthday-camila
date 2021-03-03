import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import SendPhotosContainer from '../../components/sendPhotosContainer/SendPhotosContainer'
import './Dashboard.scss'


function Dashboard(props){
    const [selectedTab, setSelectedTab] = useState('approved')//approved, disapproved, waitingEvaluation


    useEffect(() => {
        if(!sessionStorage.getItem('token')){
            props.history.replace('/login')
            props.toggleFeedback(true, 'Permissão negada.')
        }
    }, [])


    useEffect(() => {
        console.log('selectedTab: ', selectedTab)
    }, [selectedTab])


    return (
        <div className="dashboard-body">
            <SendPhotosContainer dashboardVersion/>

            <div className="main-menu">
                <p onClick={() => setSelectedTab('approved')} className={selectedTab === 'approved' && 'selected-tab'}>Aprovadas</p>
                <p onClick={() => setSelectedTab('disapproved')} className={selectedTab === 'disapproved' && 'selected-tab'}>Desaprovadas</p>
                <p onClick={() => setSelectedTab('waitingEvaluation')} className={selectedTab === 'waitingEvaluation' && 'selected-tab'}>Esperando avaliação</p>
            </div>
        </div>
    )
}


export default withRouter(Dashboard)