
import axios from 'axios'

//Backend url
const API_URL = 'http://localhost:3000/api'

export const userRegister = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData)
    return response.data
}

export const userLogin = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData)
    return response.data
}