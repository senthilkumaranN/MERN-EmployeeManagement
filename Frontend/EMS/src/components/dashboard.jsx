import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css-components/Dashboard.css'
import { deleteEmployee, getEmployee, updateEmployee } from '../Services/apiService';

const Dashboard = () => {
    const [employee, setemployee] = useState([])
    const [Username, setUsername] = useState('');
    const [searchQuery, setsearchQuery] = useState('');
    const [filter, setfilter] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        // Get the username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // If no username in localStorage, redirect to login page
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchEmployee();
    }, [])

    const fetchEmployee = async () => {
        try {
            const data = await getEmployee();
            setemployee(data);
            setfilter(data)
        } catch (error) {
            console.log("Api fetching error", error)
        }
    }


    const handleLogout = () => {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('username');
        navigate('/');
    };
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setsearchQuery(query)

        const filtered = employee.filter(
            (emp) =>
                emp.name.toLowerCase().includes(query) ||
                emp.email.toLowerCase().includes(query));
        setfilter(filtered)

    }
    function handleaddEmployee() {
        navigate('/createemployee')
    }
    const handledelete = async(id) =>{
        await deleteEmployee(id)
        fetchEmployee()
        alert("Deleted successfully")
    }
    const handleupdate = (id) =>{
        navigate(`/updateemployee/${id}`)
    }
    
    return (
        <>
            <nav className='nav-bar'>
                <h3 className='home-h2'>Home</h3>
                <h3 className='home-h2'>Employee List</h3>
                <p className='nav-user'>welcome<span className='nav-name'>{Username}</span></p>
                <h3 onClick={handleaddEmployee}>Create Employee</h3>
                <button className='nav-logout' onClick={handleLogout}>Logout</button>
            </nav>
            <div className='container'>
                <div className='search'>
                    <input className='search-input' type='text' placeholder='Search by name or Email'
                        value={searchQuery} onChange={handleSearch}></input>
                </div>
                <div className='filter-emp'>
                    <ul className="filter-table heading-row">
                        <li>Name</li>
                        <li>Image</li>
                        <li>Email</li>
                        <li>Mobile No</li>
                        <li>Designation</li>
                        <li>Gender</li>
                        <li>Course</li>
                        <li>Update</li>
                        <li>Delete</li>

                    </ul>
                    {
                        filter && filter.length > 0 ?
                            filter.map((emp) => (
                                <ul className='filter-table' key={emp._id}>
                                    <li>{emp.name}</li>
                                    <img className="image" src={`${import.meta.env.VITE_API_URL}/${emp.image}`} alt={emp.name} />
                                    <li>{emp.email}</li>
                                    <li>{emp.MobileNo}</li>
                                    <li>{emp.designation}</li>
                                    <li>{emp.Gender}</li>
                                    <li>{emp.course}</li>
                                    <button className='btn-update' onClick={()=>handleupdate(emp._id)}>Update</button>
                                    <button className='btn-del' onClick={()=>handledelete(emp._id)}>Delete</button>


                                </ul>
                            )) : <p>No Employee Found</p>
                    }
                </div>
            </div>

        </>
    )
}


export default Dashboard