import React, { useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

export default function AppointApprovalPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  // Placeholder customer data (replace with fetched data in real implementation)
  const customer = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    preferredSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
  };

  const [selectedSlot, setSelectedSlot] = useState('');

  const handleConfirm = () => {
    // Handle confirmation logic here
    alert(`Appointment confirmed for ${customer.name} at ${selectedSlot}`);
    navigate('/salon/new-appointments');
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
              {slot}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handleDecline} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
          <button onClick={handleConfirm} disabled={!selectedSlot} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50">Confirm Approval</button>
        </div>
      </div>
    </div>
  );
}
