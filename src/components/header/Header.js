import React from 'react'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons'
import LanguageOptions from '../languageOptions/LanguageOptions'
import { Link } from 'react-router-dom'
import Linktree from 'components/linktree/Linktree'

function Header(props){
    const { showLinkTree } = {...props}

    return (
        <header className="header">
            <div className="title-container">
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
            </div>
            
            {   showLinkTree &&
                <div className="photo-linktree-container">
                    <Linktree />
                </div>
            }
        </header>
    )
}


export default Header