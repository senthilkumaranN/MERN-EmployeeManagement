import React, { useState } from 'react'
import { userRegister } from '../Services/authServices'
import { NavLink, useNavigate } from 'react-router-dom'
import '../Css-components/Register.css'

const Register = () => {
    const [formData, setformData] = useState({ username: '', password: '' })
    const [error, seterror] = useState('')
    const navigate = useNavigate();


    function handleinput(e) {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        seterror('')

        if (!formData.username || !formData.password) {
            seterror('Username and password are required');
            return;
        }
        try {
            await userRegister(formData)
            navigate('/login');

        } catch (error) {
            console.log(error)
            seterror("user id is already exist")

        }
    }
    return (
        <div className='reg-container'>
            <div className='register'>
                <form onSubmit={handlesubmit}>
                    <h2 className='error-h2'>Register</h2>
                    {error && <p className='error'>{error}</p>}
                    <div className='input-register'>
                        <label htmlFor='username'></label>
                        <input className="reg-input" type='text' placeholder='username' name='username' value={formData.username} onChange={handleinput}
                            required></input>
                    </div>
                    <div className='input-register'>
                        <label htmlFor='password'></label>
                        <input className='reg-input' type='password' placeholder='password' name='password' value={formData.password} onChange={handleinput}
                            required></input>
                    </div>
                    <div>
                        <button className="reg-btn" type='submit'>Resgister</button>
                    </div>
                    <div className='register-p'>
                        <span>Already have a account?</span>
                        <NavLink to={'/login'}>Login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register