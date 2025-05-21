import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

const SalonDetail = ({salon}) => {

    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    const { customerInfo, isLoggedIn } = useSelector((state) => state.customer);

   
    

    
    useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('customerToken');
        const customer = JSON.parse(localStorage.getItem("customerInfo")) ;
        const response = await axios.get(`http://localhost:8080/customer/mybooking/${customerInfo?.email}`, 
             {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings.');
      }
    };

    if (salon?._id) fetchBookings();
  }, [salon ]);

   
  const handleBooking = async (service) => {
    const customer = JSON.parse(localStorage.getItem("customerInfo")) ;
    const token = localStorage.getItem('customerToken');
  try {
    const bookingDetail = {
      customerEmail: customer.email,
      salonEmail: salon.email,
      service: service.serviceName, // Just the service name as a string
      appointmentDate: "2025-05-20T08:48:59.248Z" // Replace with dynamic date later
    };

    

    const res = await axios.post(
      'http://localhost:8080/customer/newbooking',
      bookingDetail,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      } 
    );

    alert(`Booking successful for: ${service.serviceName}`);
    // setBookings([...,res])
  } catch (error) {
    console.error('Booking failed:', error.response?.data || error.message);
    alert('Failed to book the service. Please try again.');
  }
};
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">{salon.salonName}</h1>
        <p className="text-gray-600 mb-1"><strong>Owner:</strong> {salon.ownerName}</p>
        <p className="text-gray-600 mb-1"><strong>Phone:</strong> {salon.phone}</p>
        <p className="text-gray-600 mb-4"><strong>Address:</strong> {salon.address}</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Available Services</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {salon.services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md bg-gray-50">
              <h3 className="text-xl font-medium">{service.serviceName}</h3>
              <p className="text-gray-600">Price: ₹{service.price}</p>
              <p className="text-gray-600">Duration: {service.duration} min</p>
              <button
                onClick={() => handleBooking(service)}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Current Bookings</h2>
        {error && <p className="text-red-600">{error}</p>}
        {bookings.length === 0 ? (
            <p className="text-gray-500 italic">No bookings yet.</p>
            ) : (
            <ul className="divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                <li key={index} className="py-4">
                    <p className="text-gray-800 font-semibold">
                    <strong>Service:</strong> {booking.service}
                    </p>
                    <p className="text-gray-700">
                    <strong>Appointment:</strong> {new Date(booking.appointmentDate).toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                    <strong>Status:</strong> {booking.status}
                    </p>
                </li>
                ))}
            </ul>
        )}

      </div>
    </div>
  )
}

export default SalonDetail
