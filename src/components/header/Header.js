import React from 'react'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import LanguageOptions from '../languageOptions/LanguageOptions'
import { Link } from 'react-router-dom'

function Header(props){
    return (
        <header className="header">
            <Link to="/" className="title no-text-decoration">
                CAMILA STYLES
            </Link>

            <div className="icon-container">
                <a
                    href="https://twitter.com/Ca_araujop?s=08"
                    target="_blank"
                    className="no-text-decoration"
                >
                    <FontAwesomeIcon
                        className="icon"
                        icon={faTwitter}
                    />
                </a>

                <a
                    href="https://www.instagram.com/camilis_araujo/"
                    target="_blank"
                    className="no-text-decoration"
                >
                    <FontAwesomeIcon
                        className="icon"
                        icon={faInstagram}
                    />
                </a>
            </div>
            <LanguageOptions />
        </header>
    )
}


export default Header