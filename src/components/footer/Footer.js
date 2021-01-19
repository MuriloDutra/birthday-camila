import React from 'react'
import Consumer from '../../context/ApplicationContext'
import './Footer.scss'


function Footer(props){
    return (
        <Consumer>
            {context => {
                const { footer } = context.language

                return (
                    <div className="links-container">
                        <ul className="links">
                            <li>{footer.firstLink}</li>
                            <li>{footer.secondLink}</li>
                            <li>{footer.thridLink}</li>
                            <li>{footer.fourthLink}</li>
                        </ul>
                    </div>
                )
            }}
       
        </Consumer>
    )
}


export default Footer