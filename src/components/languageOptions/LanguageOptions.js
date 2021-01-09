import React, { useState } from 'react'
import './LanguageOptions.scss'
import BrazilFlag from '../../Assets/BrazilFlag.jpg'
import EUAFlag from '../../Assets/EUAFlag.jpg'

function LanguageOptions(props){
    const [showLanguageOptions, setShowLanguageOptions] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState('PT-BR')


    function handleOnClick(language){
        if(currentLanguage !== language){
            setCurrentLanguage(language)
        }
    }


    return (
        <div className="languages-container" onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
            <p className="selected-language">
                {`${currentLanguage} `}
                <img className="flag-image" src={currentLanguage === 'PT-BR' ? BrazilFlag : EUAFlag} />
            </p>

            {   showLanguageOptions &&
                <div className="options">
                    <p onClick={() => handleOnClick('PT-BR')}>
                        PT-BR <img className="flag-image" src={BrazilFlag} />
                    </p>
                    <p onClick={() => handleOnClick('EN-US')}>
                        EN-US <img className="flag-image" src={EUAFlag} />
                    </p>
                </div>
            }
        </div>
    )
}


export default LanguageOptions