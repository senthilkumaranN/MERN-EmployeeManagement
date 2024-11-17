import axios from 'axios'

const API_URL = 'http://localhost:3000/api/employee';


const token = localStorage.getItem('accesstoken');
console.log('Token from localStorage:', token);


if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    console.warn('No token found in localStorage');
}

export const getEmployee = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

export const getEmployeeById = async (id) =>{
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
export const addEmployee = async (employeeData) => {
    const response = await axios.post(API_URL, employeeData)
    return response.data
}

export const updateEmployee = async (id, employeeData) => {
    const response = await axios.put(`${API_URL}/${id}`, employeeData)
    return response.data
}

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}