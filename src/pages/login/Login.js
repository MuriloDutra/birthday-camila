import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import md5 from 'md5'
import './Login.scss'
import { login } from '../../services/request'
import { withRouter } from 'react-router-dom'


function Login(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const { history } = props


    function handleButton(){
        if(email === ''){
            setErrorMessage('E-mail parace ser inválido.')
            setTimeout(() => setErrorMessage(null), 5000)
            return
        }else if(password === ''){
            setErrorMessage('Senha parace ser inválida.')
            setTimeout(() => setErrorMessage(null), 5000)
            return
        }

        let body = {"email": email, "password": md5(password)}

        login(body)
            .then(data => {        
                sessionStorage.setItem('token', data.token)
                history.push('/dashboard')
            })
            .catch(error => console.log('Error: ', error))
    }


    return (
        <Consumer>
            {   context => {
                const { loginPage } = context.language
                
                return (
                    <div className="login-body">
                        <div className="login-container">
                            <label>E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder={loginPage.emailPlaceholder}
                            />

                            <label>{loginPage.passWord}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            {   errorMessage && 
                                <p className="error-message">{errorMessage}</p>
                            }
                            <button onClick={handleButton}>{loginPage.button}</button>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default withRouter(Login)