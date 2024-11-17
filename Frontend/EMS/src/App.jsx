import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/dashboard'
import {  Routes, Route } from 'react-router-dom'
import CreateEmployee from './Createemployee/index'
import UpdateEmployee from './Createemployee/UpdateEmployee'



const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createemployee' element={<CreateEmployee/>}/>
        <Route path="/updateemployee/:id" element={<UpdateEmployee/>}/>
      </Routes>

    </div>
  )
}

export default App