import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../cutomerComponent/Header';
import SalonList from '../cutomerComponent/SalonList';
import Footer from '../cutomerComponent/Footer';
import { Link, useNavigate } from 'react-router-dom';






const CustomerHome = () => {
  const navigate = useNavigate()
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
        
        const response = await axios.get('http://localhost:8080/customer', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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

 const opensalon = (salon) => {
  navigate(`/customer/${salon.salonName}`, { state: { salon } });
};

  if (authError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 text-yellow-800 p-6 text-center">
        <p className="text-lg font-semibold mb-4">You must be logged in to view salon listings.</p>
        <Link to="/customer/login" className="text-black underline  text-base">
          Go to Login Page
        </Link>

      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header customer={customer} />
      <main className=" h-full w-full flex flex-col p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-center ">Salons Near You</h2>
        <div className=' h-full flex gap-6 flex-wrap p-3 justify-start ml-20  ' >
          {salons.map((salon)=>(
          <div className=' mt-4 mb-3   ml-5' key={salon._id}>
            <button className=' h-[15rem] w-[25rem] ' 
            onClick={()=>opensalon(salon)}>
            <SalonList salon={salon} />
            </button>
          </div>
        ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHome;
