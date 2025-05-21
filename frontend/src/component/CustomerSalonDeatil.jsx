// CustomerSalonDetails.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import SalonDetail from '../cutomerComponent/SalonDetail';

const CustomerSalonDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const { salon } = location.state || {};
 
  
 

  if (!salon) {
    return (
      <div className="p-6 text-red-600 text-center">
        <h2 className="text-xl font-semibold">No salon data found.</h2>
        <p>Try navigating from the homepage.</p>
      </div>
    );
  }

  return (
    <>
        <SalonDetail salon={salon}  />
    </>
  );
};

export default CustomerSalonDetails;
