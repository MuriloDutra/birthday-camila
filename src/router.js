import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Photos from './pages/photos/Photos'
import Dashboard from './pages/dashboard/Dashboard'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { showToast } from 'helpers'

function Router(props){
    return (
        <>
            <BrowserRouter>
                <OnRouteChange />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/photos">
                        <Photos />
                    </Route>

                    <Route exact path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>

                    <Route path="*">
                        <CustomRedirect to={"/"} />
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

function CustomRedirect(){
    useEffect(() => {
        showToast("Página não encontrada.", "error")
    }, [])

    return (
        <Redirect to={"/"}/>
    )
}
