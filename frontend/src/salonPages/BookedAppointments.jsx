import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../salonComponents/Navbar';

export default function BookedAppointments() {
  const navigate = useNavigate();
  const [appointments] = useState([
    { id: 1, customer: 'Charlie', service: 'Massage', date: '2025-05-22', approved: true },
    { id: 2, customer: 'Daisy', service: 'Haircut', date: '2025-05-23', approved: true },
  ]);

  const viewAppointment = () => {
    navigate('/salon/booked-appointments/view-appointment');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>
      {/* Booked Appointments Section */}
      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Booked Appointments</h2>
        <ul className="space-y-2">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-2 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div><strong>{appt.customer}</strong> - {appt.service}</div>
                <div className="text-gray-500 text-sm">{appt.date}</div>
              </div>
              <button
                onClick={() => viewAppointment()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
