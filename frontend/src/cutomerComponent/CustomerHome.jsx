import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './Header';
import SalonList from './SalonList'
import Footer from './Footer';

const CustomerHome = () => {
  const [salons, setSalons] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer');
        console.log(response.data) // Replace with your actual backend route
        setSalons(response.data); // assuming data is an array of salon objects
      } catch (error) {
        console.error('Failed to fetch salons:', error.message);
      }
    };

    const storedCustomer = localStorage.getItem('customerInfo');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }

    fetchSalons();
  }, []);

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
}

export default CustomerHome
