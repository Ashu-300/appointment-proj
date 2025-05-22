import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './landingComponent/LandingPage'
import CustomerHome from './component/CustomerHome'
import CustomerSignUp from './component/CustomerSignUp'
import CustomerLogIn from './component/CustomerLogIn'
import SalonHome from './salonPages/SalonHome'
import SalonSignUp from './salonPages/SalonSignUp'
import SalonLogIn from './salonPages/SalonLogIn'
import CustomerSalonDeatil from './component/CustomerSalonDeatil'
import SalonAuthWrapper from './AuthWrappers/SalonAuthWrapper'
import NewAppointments from './salonPages/NewAppointments'
import BookedAppointments from './salonPages/BookedAppointments'
import SalonDashboardPage from './salonPages/SalonDashboard'
import AppointApprovalPage from './salonPages/AppointapprovalPage'
import ViewBookedAppointment from './salonPages/ViewBookedAppointment'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/customer' element={<CustomerHome/>} />
      <Route path='/customer/:name' element={<CustomerSalonDeatil/>} />
      <Route path='/customer/signup' element={<CustomerSignUp/>} />
      <Route path='/customer/login' element={<CustomerLogIn/>} />
      <Route path='/salon' element={
        <SalonAuthWrapper>
          <SalonHome/>
        </SalonAuthWrapper>
        }/>
      <Route path='/salon/dashboard' element={<SalonDashboardPage/>} />
      <Route path='/salon/new-appointments' element={<NewAppointments/>} />
      <Route path='/salon/new-appointments/appointment-approval' element={<AppointApprovalPage/>} />
      <Route path='/salon/booked-appointments' element={<BookedAppointments/>} />
      <Route path='/salon/booked-appointments/view-appointment' element={<ViewBookedAppointment/>} />
      <Route path='/salon/signup' element={<SalonSignUp/>} />
      <Route path='/salon/login' element={<SalonLogIn/>} />  
    </Routes>  
    </>
  )
}

export default App
