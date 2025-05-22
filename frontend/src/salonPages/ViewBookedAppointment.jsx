import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../salonComponents/Navbar';

export default function ViewBookedAppointment() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  // Placeholder appointment data (replace with real data)
  const appointment = {
    customerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    time: '3:00 PM, 25th May 2025',
    service: 'Haircut and Styling',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 max-w-xl mx-auto bg-white p-6 rounded shadow relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Appointment Details</h2>

        <div className="space-y-3">
          <p><strong>Customer Name:</strong> {appointment.customerName}</p>
          <p><strong>Email:</strong> {appointment.email}</p>
          <p><strong>Phone:</strong> {appointment.phone}</p>
          <p><strong>Appointment Time:</strong> {appointment.time}</p>
          <p><strong>Service:</strong> {appointment.service}</p>
        </div>
      </div>
    </div>
  );
}
