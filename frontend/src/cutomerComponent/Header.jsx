import React from 'react';

const Header = ({ customer }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Salons</h1>
      {customer && (
        <button className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold">
          {customer.name}
        </button>
      )}
    </header>
  );
};

export default Header;
