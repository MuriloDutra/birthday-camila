import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Footer.scss'

function Footer(props) {
    const { t } = useTranslation()

    return (
        <div className="links-container">
            <ul className="links">
                <Link
                    className="footer-link no-text-decoration"
                    to="/"
                >
                    {t("homePage.footer.firstLink")}
                </Link>
                <Link
                    className="footer-link no-text-decoration"
                    to="/"
                >
                    {t("homePage.footer.secondLink")}
                </Link>
                <Link
                    className="footer-link no-text-decoration"
                    to="/"
                >
                    {t("homePage.footer.thridLink")}
                </Link>
                <Link
                    className="footer-link no-text-decoration"
                    to="/photos"
                >
                    {t("homePage.footer.fourthLink")}
                </Link>
            </ul>
        </div>
    )
}


export default Footer
