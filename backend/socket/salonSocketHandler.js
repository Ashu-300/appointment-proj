const Booking = require('../models/BookingModel');

function salonSocketHandler(socket, customers, salons, namespace) {
  console.log('Salon Owner connected:', socket.id);

  socket.on('register', (salonId) => {
    salons[salonId] = socket.id;
  });

  socket.on('appointment', async (data) => {
    try {
      const booking = await Booking.findOne({ customer: data.customer });
      if (!booking) return console.log('Booking not found');

      booking.status = data.status;
      await booking.save();

      const targetSocketId = customers[data.toUserId];
      if (targetSocketId) {
        namespace.to(targetSocketId).emit('receiveMessage', {
          from: socket.id,
          appointmentConfirmation: data.status,
        });
      }
    } catch (err) {
      console.error('Appointment update error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(salons).find(key => salons[key] === socket.id);
    if (userId) delete salons[userId];
    console.log('Salon disconnected:', socket.id);
  });
}

module.exports = {salonSocketHandler};
