import React from 'react';

const SalonList = ({ salon }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      {
        <div key={salon._id} className="bg-gray-300 p-4 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold mb-2">{salon.salonName}</h3>
          <p className="text-gray-600">{salon.address}</p>
          <p className="text-gray-700 mt-1">Phone: {salon.phone}</p>

          <div className="mt-3 flex flex-col justify-center items-start">
            <h4 className="font-semibold">Services:</h4>
            <ul className="list-disc list-inside  text-sm text-gray-600 ">
              {salon.services.map((service, index) => (
                <li className=' text-start' key={index}>
                  {service.serviceName} - ₹{service.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default SalonList;
