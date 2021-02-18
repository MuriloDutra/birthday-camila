import React, { useState } from 'react'
import './Admin.scss'


function Admin(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="admin-body">
            <div className="login-container">
                <label>E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="exemplo@exemplo.com"
                />

                <label>Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button>Entrar</button>
            </div>
        </div>
    )
}


export default Admin