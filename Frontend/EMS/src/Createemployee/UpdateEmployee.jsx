import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  getEmployeeById, updateEmployee } from '../Services/apiService';
import '../Createemployee/updateemp.css'
const UpdateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        MobileNo: '',
        designation: '',
        Gender: '',
        course: [],
        image: null,
    });
    const [error, setError] = useState({});
    const { id } = useParams(); 
    console.log(id)
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const data = await getEmployeeById(id);
                console.log(data)
                setFormData({
                    name: data.name ||'',
                    email: data.email || '',
                    MobileNo: data.MobileNo || '',
                    designation: data.designation || '',
                    Gender: data.Gender || '',
                    course: data.course || [],
                    image: data.image || null,  
                });
            } catch (error) {
                console.error("Error fetching employee details:", error);
                alert("Failed to fetch employee details.");
            }
        };

        fetchEmployeeDetails();
    }, [id]);
   

    const handleinput = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevState) => {
                const updatedCourses = checked
                    ? [...prevState.course, value]
                    : prevState.course.filter((course) => course !== value);

                return { ...prevState, course: updatedCourses };
            });
        } else if (type === 'radio') {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        } else if (type === 'file') {
            setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
            
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.name) validationErrors.name = "Name is required";
        if (!formData.email) validationErrors.email = "Email is required";
        if (!formData.MobileNo) validationErrors.MobileNo = "Mobile No is required";
        if (!formData.designation) validationErrors.designation = "Designation is required";
        if (!formData.Gender) validationErrors.Gender = "Gender is required";
        if (formData.course.length === 0) validationErrors.course = "At least one course is required";

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        const updatedEmployee = new FormData();
        updatedEmployee.append('name', formData.name);
        updatedEmployee.append('email', formData.email);
        updatedEmployee.append('MobileNo', formData.MobileNo);
        updatedEmployee.append('designation', formData.designation);
        updatedEmployee.append('Gender', formData.Gender);
        updatedEmployee.append('course', formData.course);
        if (formData.image) {
            updatedEmployee.append('image', formData.image);  // Append the new image
        }

        try {
            await updateEmployee(id, updatedEmployee);
            alert("Employee updated successfully");
            navigate('/dashboard');  // Redirect back to dashboard after update
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee. Please try again.");
        }
    };

    return (
        <div className="update-container">
            <h1 className="update-h1">Update Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="update-input">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter the name"
                        name="name"
                        value={formData.name}
                        onChange={handleinput}
                    />
                    {error.name && <p style={{ color: "red" }}>{error.name}</p>}
                </div>
                <div className="update-input">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter the email"
                        name="email"
                        value={formData.email}
                        onChange={handleinput}
                    />
                    {error.email && <p style={{ color: "red" }}>{error.email}</p>}
                </div>
                <div className="update-input">
                    <label>MobileNo:</label>
                    <input
                        type="text"
                        placeholder="Enter the MobileNo"
                        name="MobileNo"
                        value={formData.MobileNo}
                        onChange={handleinput}
                    />
                    {error.MobileNo && <p style={{ color: "red" }}>{error.MobileNo}</p>}
                </div>
                <div className="update-input">
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleinput}
                    >
                        <option value="">Select Designation</option>
                        <option value="hr">HR</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                    </select>
                    {error.designation && <p style={{ color: "red" }}>{error.designation}</p>}
                </div>
                <div className="update-input">
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="Gender"
                            value="Male"
                            onChange={handleinput}
                            checked={formData.Gender === "Male"}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="Gender"
                            value="Female"
                            onChange={handleinput}
                            checked={formData.Gender === "Female"}
                        />
                        Female
                    </label>
                    {error.Gender && <p style={{ color: "red" }}>{error.Gender}</p>}
                </div>
                <div className="update-input">
                    <label>Course:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            onChange={handleinput}
                            checked={formData.course.includes("MCA")}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            onChange={handleinput}
                            checked={formData.course.includes("BCA")}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            onChange={handleinput}
                            checked={formData.course.includes("BSC")}
                        />
                        BSC
                    </label>
                    {error.course && <p style={{ color: "red" }}>{error.course}</p>}
                </div>
                <div className="update-input">
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleinput}
                    />
                    {error.image && <p style={{ color: "red" }}>{error.image}</p>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
