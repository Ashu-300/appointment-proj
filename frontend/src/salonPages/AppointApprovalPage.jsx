import React, { useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearBookingById } from '../redux/slices/BookingSlice';

export default function AppointApprovalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerDetail = JSON.parse(localStorage.getItem('customerInfo'));
  const bookings = useSelector((state)=> state.booking.booking);
  console.log(bookings);
  
  
  const location = useLocation();
  const { id , booking } = location.state || {};
  
  
  // Placeholder customer data (replace with fetched data in real implementation)
  const customer = {
    name: customerDetail.name,
    email: customerDetail.email,
    phone: customerDetail.phone,
    preferredSlots: booking.slots,
  };
 
  
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleConfirm = (booking) => {
    // Handle confirmation logic here
    booking.status = 'confirmed';
    booking.slot = selectedSlot ;
    alert(`Appointment confirmed for ${customer.name} at ${selectedSlot}`);
    const match = bookings.find(b => b.id === booking.id);
    if (match) {
      dispatch(clearBookingById(booking.id));
    }
    navigate('/salon/new-appointments', {
      state : {booking}
    });
  };

  const handleDecline = () => {
    // Handle decline logic here
    alert(`Appointment declined for ${customer.name}`);
    navigate('/salon/new-appointments');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 bg-white p-6 rounded shadow max-w-xl mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <h2 className="text-2xl text-center font-bold mb-4">Approve Appointment</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Select a preferred time slot:</p>
          {customer.preferredSlots.map((slot, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="preferredSlot"
                value={slot}
                checked={selectedSlot === slot}
                onChange={() => setSelectedSlot(slot)}
                className="mr-2"
              />
              {new Date(slot).toLocaleString()}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={()=>handleDecline(booking)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
          <button onClick={()=>handleConfirm(booking)} disabled={!selectedSlot} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50">Confirm Approval</button>
        </div>
      </div>
    </div>
  );
}
