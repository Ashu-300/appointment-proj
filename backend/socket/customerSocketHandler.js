const { getCustomer } = require('../jwtMapping/CustomerMapping');
const Booking = require('../models/BookingModel');

function customerSocketHandler(socket, customers, salons, namespace) {
  console.log('Customer connected:', socket.id);

  socket.on('register', (customerId) => {
    customers[customerId] = socket.id;
  });

  socket.on('book', async (data) => {
    try {
      const token = data.token;
      if (!token) return console.log('No token provided.');

      const customer = getCustomer(token);

      const booking = await Booking.create({
        customer: customer._id,
        salon: data.salon,
        service: data.service,
        appointmentDate: data.date,
        status: 'pending',
      });

      const targetSocketId = salons[data.toUserId];
      if (targetSocketId) {
        namespace.to(targetSocketId).emit('receiveMessage', {
          from: socket.id,
          booking,
        });
      }
    } catch (err) {
      console.error('Booking error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    // Optional: Clean up from `customers` object
    const userId = Object.keys(customers).find(key => customers[key] === socket.id);
    if (userId) delete customers[userId];
    console.log('Customer disconnected:', socket.id);
  });
}

module.exports = {customerSocketHandler};
