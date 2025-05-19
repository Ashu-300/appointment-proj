import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerLogIn = () => {
   const [credentials, setCredentials] = useState({
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    const customer = localStorage.getItem('customerInfo');

    if (token && customer) {
      navigate('/customer/dashboard'); // redirect if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:8080/customer/login/submit', credentials); // adjust endpoint if needed
      const { token, customer } = res.data;

      // ✅ Save token and customer info
      localStorage.setItem('customerToken', token);
      localStorage.setItem('customerInfo', JSON.stringify(customer));

      setSuccess('Login successful!');
      setCredentials({ phone: '', password: '' });

      // ✅ Redirect to dashboard
      navigate('/customer');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Customer Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={credentials.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogIn
