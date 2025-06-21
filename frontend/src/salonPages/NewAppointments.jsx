import React, { useEffect } from 'react';
import Navbar from '../salonComponents/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../redux/slices/BookingSlice';
import { io } from 'socket.io-client';

// 👇 Place socket outside to prevent re-connecting on every render
const socket = io('http://localhost:8080');

export default function NewAppointments() {
  const salon = useSelector((state) => state.salon.salon)?.salon;
  const bookings = useSelector((state) => state.booking.booking);
  const customerDetail = JSON.parse(localStorage.getItem('customerInfo')) ;
  

  // const [newBooking, setnewBooking] = useState([]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {booking} = location?.state || {} ;
  

  useEffect(() => {
    if (!salon?._id) return;

    // Salon joins as online
    socket.emit('salon_owner_join', salon._id);

    // Listen for new booking notification
    socket.on('new_booking_notification', ({ customerName , customerId, services, slots }) => {
       const bookingData = {
        id: Date.now(), // temporary unique ID
        customerName,
        customerId,
        services,
        slots,
        status:'pending',
      };
      // setnewBooking(prev=> [...prev , bookingData]);
      dispatch(addBooking(bookingData));
      

      alert('📢 New booking received!');
    });
    if (booking?.status === 'confirmed') {
      socket.emit('booking_confirmed', {
        customerId: booking.customerId, // ✅ Correct
        booking
      });
    }

    // Clean up socket listener
    return () => {
      socket.off('new_booking_notification');
    };
  }, [salon?._id ]);
 



  const approveAppointment = (id , booking) => {
    navigate('/salon/new-appointments/appointment-approval', {
      state:  {id , booking} ,
    });
     
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <div className="mt-6 bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">New Appointments (Pending Approval)</h2>
        <ul className="space-y-2">
          {bookings?.filter((booking) => booking.status === 'pending').map((booking) => (
            <li
              key={booking.id}
              className="border p-2 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <div>
                  <p>{booking.customerName} {booking.date} </p> 
                </div>
                <div className="text-gray-500 text-sm">{booking.date}</div>
              </div>
              <button
                onClick={() => approveAppointment(booking.id , booking)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
            </li>
          ))}

          {bookings?.filter((appt) => !appt.approved).length === 0 && (
            <li className="text-gray-500">No new appointments waiting for approval.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
