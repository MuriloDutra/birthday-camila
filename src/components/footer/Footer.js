import React from 'react'
import { Link } from 'react-router-dom'
import Consumer from '../../context/ApplicationContext'
import './Footer.scss'

function Footer(props){
    return (
        <Consumer>
            {context => {
                const { footer } = context.language.homePage

                return (
                    <div className="links-container">
                        <ul className="links">
                            <Link
                                className="footer-link no-text-decoration"
                                to="/"
                            >
                                {footer.firstLink}
                            </Link>
                            <Link
                                className="footer-link no-text-decoration"
                                to="/"
                            >
                                {footer.secondLink}
                            </Link>
                            <Link
                                className="footer-link no-text-decoration"
                                to="/"
                            >
                                {footer.thridLink}
                            </Link>
                            <Link
                                className="footer-link no-text-decoration"
                                to="/photos"
                            >
                                {footer.fourthLink}
                            </Link>
                        </ul>
                    </div>
                )
            }}
       
        </Consumer>
    )
}


export default Footer
