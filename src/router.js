import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import Feedback from './components/feedback/Feedback'

import Login from './pages/login/Login'
import ErrorPage from './pages/errorPage/ErrorPage'
import Home from './pages/home/Home'
import Tour from './pages/tour/Tour'
import Dashboard from './pages/dashboard/Dashboard'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'


function Router(props){
    const [showMessage, setShowMessage] = useState(false)
    const [isErrorMessage, setIsErrorMessage] = useState(false)
    const [message, setMessage] = useState('')
    var timeout = null


    async function toggleFeedback(isNegativeMessage, text){
        if(showMessage){
            return
        }

        setIsErrorMessage(isNegativeMessage)//true === Negative message
        setMessage(text)
        setShowMessage(true)

        timeout = setTimeout(() => {
            setShowMessage(false)
            clearTimeout(timeout)
        }, 6000)
    }


    return (
        <>
            <Feedback showMessage={showMessage} isErrorMessage={isErrorMessage} message={message} />

            <BrowserRouter>
                <OnRouteChange />

                <Switch>
                    <Route exact path="/">
                        <Home toggleFeedback={toggleFeedback} />
                    </Route>

                    <Route exact path="/photos">
                        <Tour toggleFeedback={toggleFeedback} />
                    </Route>

                    <Route exact path="/login">
                        <Login toggleFeedback={toggleFeedback} />
                    </Route>

                    <Route exact path="/dashboard">
                        <Dashboard toggleFeedback={toggleFeedback} />
                    </Route>

                    <Route path="*">
                        <ErrorPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router

function OnRouteChange(){
    //STATE
    const [showLinkTree, setShowLinkTree] = useState(false)
    //OTHERS
    const location = useLocation()

    useEffect(() => {
        setShowLinkTree(location?.pathname !== "/")
    }, [location?.pathname])

    return (
        <Header showLinkTree={showLinkTree} />
    );
}
