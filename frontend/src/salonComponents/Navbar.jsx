import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex gap-6 text-lg font-semibold items-center">
      <Link to="/salon" className="text-2xl font-bold text-blue-500 mr-8">Salon Snap</Link>
      <Link to="/salon/dashboard">Dashboard</Link>
      <Link to="/salon/new-appointments">New Appointments</Link>
      <Link to="/salon/booked-appointments">Booked Appointments</Link>
    </nav>
  );
}
