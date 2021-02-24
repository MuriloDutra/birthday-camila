import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Dashboard.scss'


function Dashboard(props){
    useEffect(() => {
        if(!sessionStorage.getItem('token')){
            props.history.replace('/login')
            props.toggleFeedback(true, 'Permissão negada.')
        }
    }, [])


    return (
        <div className="dashboard-body">
            <p>de</p>
        </div>
    )
}


export default withRouter(Dashboard)