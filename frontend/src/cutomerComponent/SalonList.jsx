import React from 'react';

const SalonList = ({ salons }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {salons.map((salon) => (
        <div key={salon._id} className="bg-white p-4 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-2">{salon.salonName}</h3>
          <p className="text-gray-600">{salon.address}</p>
          <p className="text-gray-700 mt-1">Phone: {salon.phone}</p>

          <div className="mt-3">
            <h4 className="font-semibold">Services:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {salon.services.map((service, index) => (
                <li key={index}>
                  {service.serviceName} - ₹{service.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalonList;
