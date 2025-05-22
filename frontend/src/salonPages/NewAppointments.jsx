import React, { useState } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useNavigate } from 'react-router-dom';

export default function NewAppointments() {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    { id: 1, customer: 'Charlie', service: 'Massage', date: '2025-05-22', approved: false },
    { id: 2, customer: 'Daisy', service: 'Haircut', date: '2025-05-23', approved: false },
  ]);

  const approveAppointment = (id) => {
   navigate('/salon/new-appointments/appointment-approval')
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>

      {/* New Appointments Section */}
      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">New Appointments (Pending Approval)</h2>
        <ul className="space-y-2">
          {appointments.filter(appt => !appt.approved).map((appt) => (
            <li
              key={appt.id}
              className="border p-2 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div><strong>{appt.customer}</strong> - {appt.service}</div>
                <div className="text-gray-500 text-sm">{appt.date}</div>
              </div>
              <button
                onClick={() => approveAppointment()}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
            </li>
          ))}
          {appointments.filter(appt => !appt.approved).length === 0 && (
            <li className="text-gray-500">No new appointments waiting for approval.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
