import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './landingComponent/LandingPage'
import CustomerHome from './cutomerComponent/CustomerHome'
import CustomerSignUp from './cutomerComponent/CustomerSignUp'
import CustomerLogIn from './cutomerComponent/CustomerLogIn'
import SalonHome from './salonComponent/SalonHome'
import SalonSignUp from './salonComponent/SalonSignUp'
import SalonLogIn from './salonComponent/SalonLogIn'






const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/customer' element={<CustomerHome/>} />
      <Route path='/customer/signup' element={<CustomerSignUp/>} />
      <Route path='/customer/login' element={<CustomerLogIn/>} />
      <Route path='/salon' element={<SalonHome/>} />
      <Route path='/salon/signup' element={<SalonSignUp/>} />
      <Route path='/salon/login' element={<SalonLogIn/>} />
    
      
    </Routes>
      
    </>
  )
}

export default App
