// CustomerSalonDetails.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


const CustomerSalonDetails = () => {
  
const {register , handleSubmit , reset , watch , formState:{errors}   } = useForm()


  const { name } = useParams();
  const location = useLocation();
  const { salon } = location.state || {};

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceError, setServiceError] = useState('');
  const [selectedSlots, setselectedSlots] = useState([]);
  


  const { customerInfo, isLoggedIn } = useSelector((state) => state.customer);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('customerToken');
        const response = await axios.get(
          `http://localhost:8080/customer/mybooking/${customerInfo?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings.');
      }
    };

    if (salon?._id) fetchBookings();
  }, [salon]);

  
  // booking handler
  const handleBooking = async () => {
    const customer = JSON.parse(localStorage.getItem('customerInfo'));
    const token = localStorage.getItem('customerToken');
    
    if (selectedServices.length === 0) {
    setServiceError('Please select at least one service.');
    return;
  } else {
    setServiceError('');
  }

    try {
     
      const bookingDetail = {
        customerEmail: customer.email,
        salonEmail: salon.email,
        services: selectedServices,
        appointmentDate: selectedSlots  , 
      };
      console.log(bookingDetail);
      // setBookings((prev) => [...prev, data]);
      alert('Booking Request Send');
      setSelectedServices([]);
      reset()
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      alert('Failed to book the service. Please try again.');
    }
  };

  // adding services by customer
  const handleService = (serv) => {
    setSelectedServices((prev) => [...prev, serv]);
  };

  // deleting services selected by customer
  const handleDeleteService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.filter((s) => s.serviceName !== serviceName)
    );
  };

  if (!salon) {
    return (
      <div className="p-6 text-red-600 text-center">
        <h2 className="text-xl font-semibold">No salon data found.</h2>
        <p>Try navigating from the homepage.</p>
      </div>
    );
  }

  // generating slots for customer
  const generateTimeSlotsFromNow = (count = 10, intervalMinutes = 15) => {
    const now = new Date();
    const slots = [];

    for (let i = 0; i < count; i++) {
      const slot = new Date(now.getTime() + i * intervalMinutes * 60000);
      const label = slot.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      slots.push({ label, value: slot.toISOString() });
    }

    return slots;
  };

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            {salon.salonName}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Owner:</strong> {salon.ownerName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Phone:</strong> {salon.phone}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Address:</strong> {salon.address}
          </p>

          {/* Services */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Available Services
          </h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {salon.services.map((serv, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-md bg-gray-50"
              >
                <h3 className="text-xl font-medium">{serv.serviceName}</h3>
                <p className="text-gray-600">Price: ₹{serv.price}</p>
                <button
                  onClick={() => handleService(serv)}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  ADD SERVICE
                </button>
              </div>
            ))}
          </div>

          {/* Make Booking */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
              Make Booking
            </h2>

            {selectedServices.length === 0 ? (
              <p className="text-gray-500 italic">No Services yet.</p>
            ) : (
              selectedServices.map((service, index) => (
                <div key={index} className="flex flex-col w-[50%]">
                  <li className="flex justify-between px-4 mb-2">
                    <div>
                      <strong>Service:</strong> {service.serviceName}
                    </div>
                    <div
                      role="button"
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteService(service.serviceName)}
                    >
                      <i className="ri-close-large-line text-xl"></i>
                    </div>
                  </li>
                </div>
              ))
            )}
            {serviceError && (
              <p className="text-red-600 text-sm mt-2">{serviceError}</p>
            )}

            {/* slect slot and make booking */}
            <form className='flex flex-col justify-center gap-2' onSubmit={handleSubmit(handleBooking)}>
              <div className="flex flex-col md:flex-row items-center  gap-4 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center  gap-3 w-full md:w-auto">
              <label htmlFor="slots" className="text-gray-700 font-medium">
                Select Multiple Time Slot
              </label>
              <select
                {...register('slots', { required: 'Please select a slot' })}
                id="slots"
                className="w-full md:w-auto px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                <option value="">Choose a slot</option>
                  {generateTimeSlotsFromNow().map((slot, idx) => (
                    <option key={idx} value={slot.value}>
                    {slot.label}
                    </option>
                  ))}                  
              </select>
              <button
              type='button'
              
              onClick={() => {
                const currentSlot = watch('slots');
                if (currentSlot) {
                  setselectedSlots(prev => [...prev, currentSlot]);
                } else {
                  alert('Please select a slot first.');
                }
              }}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"

              >Add Slot</button>
              {/* 👇 Show error if no slot selected */}
                {errors.slots && (
                  <p className="text-red-600 text-sm">{errors.slots.message}</p>
                )}
            </div>
               
                
            </div>
            <div>
              <h3>Selected Slots:</h3>
              <p>{selectedSlots !== 0 && (
                <>
                {selectedSlots.map((slot , index)=>(
                  
                  <li key={index}>
                    {new Date(slot).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </li>
                ))}
                </>
              )}</p>
            </div>
             <button
                  type='submit'
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Book
                </button>
            </form>
          </div>

          {/* Bookings List */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            Your Bookings
          </h2>
          {error && <p className="text-red-600">{error}</p>}
          {bookings.length === 0 ? (
            <p className="text-gray-500 italic">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <li key={index} className="py-4">
                  <div className="text-gray-800 font-semibold">
                    <strong>Service:</strong>{' '}
                    {booking.services.map((serv, idx) => (
                      <strong key={idx}>{serv.serviceName}, </strong>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    <strong>Appointment:</strong>{' '}
                    {new Date(booking.appointmentDate).toLocaleString()}
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
    </>
  );
};

export default CustomerSalonDetails;
