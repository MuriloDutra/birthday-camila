import React, { useState } from 'react'
import './LanguageOptions.scss'
import BrazilFlag from '../../assets/BrazilFlag.jpg'
import EUAFlag from '../../assets/EUAFlag.jpg'
import Consumer from '../../context/ApplicationContext'


function LanguageOptions(props){
    const [showLanguageOptions, setShowLanguageOptions] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState('EN-US')


    function handleOnClick(language, callback){
        if(currentLanguage !== language){
            setCurrentLanguage(language)
            callback(language)
        }
    }


    return (
        <Consumer>
            { context => (
                <div className="languages-container" onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
                <p className="selected-language">
                    {`${currentLanguage} `}
                    <img alt="selected flag" className="flag-image" src={currentLanguage === 'PT-BR' ? BrazilFlag : EUAFlag} />
                </p>

                {   showLanguageOptions &&
                    <div className="options">
                        <p onClick={() => handleOnClick('PT-BR', context.changeLanguage)}>
                            PT-BR <img alt="brazil flag" className="flag-image" src={BrazilFlag} />
                        </p>
                        <p onClick={() => handleOnClick('EN-US', context.changeLanguage)}>
                            EN-US <img alt="US flag" className="flag-image" src={EUAFlag} />
                        </p>
                    </div>
                }
            </div>
            )}
        </Consumer>
    )
}


export default LanguageOptions