import React, { useState } from 'react'
import { userLogin } from '../Services/authServices'
import { NavLink, useNavigate } from 'react-router-dom'
import '../Css-components/login.css'
const Login = () => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        seterror('')

        if (!username || !password) {
            seterror('Username and password are required');
            return;
        }

        try {
            const response = await userLogin({ username, password })
            localStorage.setItem('accesstoken', response.accesstoken)
            localStorage.setItem('username', response.username)
            navigate('/dashboard')
            alert(response.message)
        } catch (error) {
            if (error.response) {
                seterror(error.response.data.message)
            } else {
                console.log(error)
                seterror('Error Occurred Please try again')
            }
        }



    }
    return (
        <div className='log-container'>
            <div className='login'>
                <h2>Login</h2>
                {error && <p className='log-p'>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className='input'>
                        <label htmlFor='username'></label>
                        <input className='log-input' type='text' placeholder='username' value={username} onChange={(e) => setusername(e.target.value)}
                        ></input>
                    </div>
                    <div className='input'>
                        <label htmlFor='password'></label>
                        <input className='log-input' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className='input'>
                        <button className='log-btn' type='submit'>Login</button>
                    </div>
                    <div className='log-span'>
                        <span className='log-span'>Create a Account?</span>
                        <NavLink to={'/'} className='navlink'>Register</NavLink>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login