import React from 'react'
import './LanguageOptionsContainer.scss'
import BrazilFlag from 'assets/BrazilFlag.jpg'
import EUAFlag from 'assets/EUAFlag.jpg'
import { useTranslation } from 'react-i18next'
import { languages } from "languages/i18n"

function LanguageOptionsContainer(props) {
    const { t, i18n } = useTranslation();

    function onLanguageChange(lng) {
        i18n.changeLanguage(lng)
    }

    return (
        <div className="languages-container">
            {Object.keys(languages).map((lng) => (
                <button
                    key={lng}
                    className={i18n.resolvedLanguage === lng ? "selected-language" : ""}
                    type="submit"
                    onClick={() => onLanguageChange(lng)}
                >
                    <p>{languages[lng].label}</p>
                    <img
                        alt="selected flag"
                        className="flag-image"
                        src={languages[lng].label === 'PT-BR' ? BrazilFlag : EUAFlag}
                    />
                </button>
            ))}
        </div>
    )
}

export default LanguageOptionsContainer
