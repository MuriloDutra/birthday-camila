import React from 'react'
import { withRouter } from 'react-router-dom'
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
                            <li>{footer.firstLink}</li>
                            <li>{footer.secondLink}</li>
                            <li>{footer.thridLink}</li>
                            <li onClick={() => props.history.push('/photos')}>{footer.fourthLink}</li>
                        </ul>
                    </div>
                )
            }}
       
        </Consumer>
    )
}


export default withRouter(Footer)