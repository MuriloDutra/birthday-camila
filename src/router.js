import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import ErrorPage from './pages/errorPage/ErrorPage'
import Home from './pages/home/Home'
import Tour from './pages/tour/Tour'


function Router(props){
    return (
        <>
            <Header />

            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/photos">
                        <Tour />
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