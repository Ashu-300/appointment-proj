import React from 'react';
import Navbar from '../salonComponents/Navbar';

export default function SalonHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar/>

      {/* Home Content */}
      <div className="mt-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Glamour Salon</h1>
          <p className="text-gray-600">Your beauty and comfort is our priority. Explore our services and manage appointments easily from here.</p>
        </div>

        {/* Services Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Haircut', 'Facial', 'Massage'].map((service, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-semibold mb-2">{service}</h3>
              <p className="text-gray-500">Professional {service.toLowerCase()} services to make you feel amazing.</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-100 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Need an Appointment?</h2>
          <p className="text-gray-700 mb-4">Schedule your session with us today and let us take care of the rest!</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Book Now</button>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic">"Absolutely loved the haircut! Very professional and friendly staff."</p>
              <p className="text-sm text-right mt-2 text-gray-500">- Priya</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic">"I feel so refreshed after the facial. Highly recommend this place!"</p>
              <p className="text-sm text-right mt-2 text-gray-500">- Rahul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
