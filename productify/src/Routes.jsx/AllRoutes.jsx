import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Authentication from '../Components/Authentication'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {


return (
    <Routes>
    <Route path="/" element={<PrivateRoute> <Home/></PrivateRoute>}></Route>
      <Route path="/signup" element={<Authentication/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  )
}

export default AllRoutes
