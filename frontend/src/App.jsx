import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './landingComponent/LandingPage'
import CustomerHome from './customerPages/CustomerHome'
import CustomerSalonDeatil from './customerPages/CustomerSalonDeatil'
import CustomerLogin from './customerPages/CustomerLogIn'
import CustomerSignUp from './customerPages/CustomerSignUp'
import SalonHome from './salonPages/SalonHome'
import SalonSignUp from './salonPages/SalonSignUp'
import SalonLogIn from './salonPages/SalonLogIn'






const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/customer' element={<CustomerHome/>} />
       <Route path='/customer/:name' element={<CustomerSalonDeatil/>} />
      <Route path='/customer/signup' element={<CustomerSignUp/>} />
      <Route path='/customer/login' element={<CustomerLogin/>} />
      <Route path='/salon' element={<SalonHome/>} />
      <Route path='/salon/signup' element={<SalonSignUp/>} />
      <Route path='/salon/login' element={<SalonLogIn/>} />  
    </Routes>  
    </>
  )
}

export default App
