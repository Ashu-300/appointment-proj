import React from 'react';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/slices/CustomerSlice'
import { useNavigate } from 'react-router-dom';

const Header = ({ customer }) => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOut = ()=>{

    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerInfo');

    navigate('login');

    dispatch(logout())
  }

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Salons</h1>
      {customer && (
       <div className='flex gap-4'>
         <button className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold">
          {customer.name}
        </button>
        <button onClick={logOut}  className="bg-white text-blue-600 px-4 py-1 rounded-lg font-semibold">
          log out
        </button>
       </div>
      )}
    </header>
  );
};

export default Header;
