import axios from 'axios';
import React, { useState } from 'react';

const SalonLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/salon/login/submit`,{
        email: email,
        password: password
      },
      {
        withCredentials: true,
      } 
    )

      if(response.status === 200){
        localStorage.setItem('salonToken', response.data.token);

        const salonData = response.data.user;
        salonData.password = '';
        salonData.phone = '';
        localStorage.setItem('salonData', JSON.stringify(salonData))

        setEmail('');
        setPassword('');
        
        console.log('user login successsful!');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div className='w-[50%] max-w-md rounded-lg border border-gray-400 p-6 shadow-lg flex flex-col gap-6 bg-white'>
        <h2 className='text-2xl font-bold text-center'>Salon Login</h2>

        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-medium'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalonLogin;
