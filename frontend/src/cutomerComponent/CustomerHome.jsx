import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SalonList from './SalonList';
import Footer from './Footer';

const CustomerHome = () => {
  const [salons, setsalons] = useState([]);
  const [customer, setcustomer] = useState(null);
  const [authError, setauthError] = useState(false); // For unauthorized access

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customerInfo');
    if (storedCustomer) {
      setcustomer(JSON.parse(storedCustomer));
    }

    const fetchSalons = async () => {
      try {
        const token = (localStorage?.getItem('customerToken')) ;
        console.log(token);
        

        const response = await axios.get('http://localhost:8080/customer', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        
        setsalons(response.data);
      } catch (error) {
        console.error('Failed to fetch salons:', error.message);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setauthError(true);
        }
      }
    };

    fetchSalons();
  }, []);

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 text-yellow-800 p-6 text-center">
        <p className="text-lg font-semibold mb-4">You must be logged in to view salon listings.</p>
        <a href="customer/login" className="text-blue-600 underline text-base">Go to Login Page</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header customer={customer} />
      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Salons Near You</h2>
        <SalonList salons={salons} />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHome;
