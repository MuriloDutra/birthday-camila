import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import md5 from 'md5'
import './Login.scss'
import { login } from '../../services/request'
import { withRouter } from 'react-router-dom'
import Lottie from 'lottie-react-web'
import { TOKEN } from '../../constants/sessionStorageKeys'
import { findMessage, showRegularMessage, showToast } from 'helpers'


function Login(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
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

        setLoading(true)

        login(body)
            .then(data => {        
                sessionStorage.setItem(TOKEN, data.token)
                history.push('/dashboard')
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
            .finally(() => setLoading(false))
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

                            {   loading &&
                                <Lottie
                                    width="5%"
                                    height="100%"
                                    style={{margin: 0, marginBottom: 10}}
                                    options={{animationData: require('../../assets/animations/loading.json')}}
                                />
                            }

                            {   !loading &&
                                <button onClick={handleButton}>
                                    {loginPage.button}
                                </button>
                            }
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default withRouter(Login)