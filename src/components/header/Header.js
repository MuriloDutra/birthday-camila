import React from 'react'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import LanguageOptions from '../languageOptions/LanguageOptions'


function Header(props){
    return (
        <div className="header">
            <h1 onClick={() => window.location.pathname = '/'}>CAMILA STYLES</h1>
            <div className="icon-container">
                <FontAwesomeIcon onClick={() => window.open('https://twitter.com/Ca_araujop?s=08')} className="icon" icon={faTwitter} />
                <FontAwesomeIcon onClick={() => window.open('https://www.instagram.com/camilis_araujo/')} className="icon" icon={faInstagram} />
            </div>
            <LanguageOptions />
        </div>
    )
}


export default Header