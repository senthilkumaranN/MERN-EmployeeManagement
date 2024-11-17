import React, { useState } from 'react'
import { addEmployee } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';
import '../Createemployee/Createemp.css'

const CreateEmployee = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    MobileNo: "",
    designation: "",
    Gender: "",
    course: [],
    image: null,
  });
  const [error, seterror] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Mobile number validation
    if (!formData.MobileNo.trim()) {
      newErrors.MobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.MobileNo)) {
      newErrors.MobileNo = "Mobile number must be 10 digits";
    }

    // Designation validation
    if (!formData.designation) newErrors.designation = "Designation is required";

    // Gender validation
    if (!formData.Gender) newErrors.Gender = "Gender is required";

    // Courses validation
    if (formData.course.length === 0) newErrors.courses = "Select at least one course";

    // Image validation
    if (!formData.image) newErrors.image = "Image upload is required";

    seterror(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleinput = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setformData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setformData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setformData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) { 
        try {
            // Call the addEmployee API with formData
            const response = await addEmployee(formData);

            if (response && response.success) {
                // Reset form data to initial state
                setformData({
                    name: '',
                    email: '',
                    MobileNo: '',
                    designation: '',
                    Gender: '',
                    course: '',
                    image: null, 
                });

                // Navigate to dashboard after successful submission
                navigate('/dashboard');
            } else {
                console.error('Error adding employee:', response.message);
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    }
};

  return (
    <div className='add-container'>
      <h1 className='add-h1'>CreateEmployee</h1>
      <form onSubmit={handleSubmit}>
        <div className='add-input'>
          <label>Name:</label>
          <input type='text' placeholder='Enter the name'
            name='name'
            value={formData.name}
            onChange={handleinput}></input>
          {error.name && <p style={{ color: "red" }}>{error.name}</p>}
        </div>
        <div className='add-input'>
          <label>Email:</label>
          <input type='email' placeholder='Enter the email'
            name='email'
            value={formData.email}
            onChange={handleinput}></input>
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}
        </div>
        <div className='add-input'>
          <label>MobileNo:</label>
          <input type='text' placeholder='Enter the MobileNo'
            name='MobileNo'
            value={formData.MobileNo}
            onChange={handleinput}></input>
          {error.MobileNo && <p style={{ color: "red" }}>{error.MobileNo}</p>}
        </div>
        <div className='add-input'>
          <label>Designation:</label>
          <select
            name='designation'
            value={formData.designation}
            onChange={handleinput}>
            <option value=''>Select Designation</option>
            <option value='hr'>HR</option>
            <option value='manager'>Manager</option>
            <option value='sales'>sales</option>
          </select>
          {error.designation && (
            <p style={{ color: "red" }}>{error.designation}</p>
          )}
        </div>
        <div className='add-input'>
          <label>Gender:</label>
          <label>
            <input type='radio'
              name='Gender'
              value='Male'
              onChange={handleinput}
              checked={formData.Gender === "Male"}>
            </input>
            Male
          </label>
          <label>
            <input type='radio'
              name='Gender'
              value='Female'
              onChange={handleinput}
              checked={formData.Gender === "Female"}>
            </input>
            Female
          </label>
          {error.Gender && <p style={{ color: "red" }}>{error.Gender}</p>}
        </div>
        <div className='add-input'>
          <label>Course:</label>
          <label>
            <input type='checkbox'
              name="course"
              value="MCA"
              onChange={handleinput}
              checked={formData.course.includes("MCA")}>
            </input>
            MCA
          </label>
          <label>
            <input type='checkbox'
              name="course"
              value="BCA"
              onChange={handleinput}
              checked={formData.course.includes("BCA")}>
            </input>
            BCA
          </label>
          <label>
            <input type='checkbox'
              name="course"
              value="BSC"
              onChange={handleinput}
              checked={formData.course.includes("BSC")}>
            </input>
            BSC
          </label>
          {error.course && <p style={{ color: "red" }}>{error.course}</p>}
        </div>
        <div className='add-input'>
          <label>Image:</label>
          <input type='file'
            name="image" onChange={handleinput} >

          </input>
          {error.image && <p style={{ color: "red" }}>{error.image}</p>}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateEmployee