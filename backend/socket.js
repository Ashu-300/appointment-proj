const { Server } = require("socket.io");
const Customer = require("./models/CustomerModel");
// const cors = require('cors');

let io;

async function initializeSocketIO(httpServer) {
    const io = new Server(httpServer, { 
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
     });

     const salonOwners = {};
     const customer = {};

    io.on("connection", (socket) => {
       socket.on('customer_joined', (customerId) => {
        console.log('Customer joined', customerId, socket.id);
        customer[customerId] = socket.id;
        });

       
        socket.on('salon_owner_join', (salonId) => {
            salonOwners[salonId] = socket.id;
            console.log(`Salon owner ${salonId} joined: ${socket.id}`);
        });

        socket.on('customerBookingRequest', async ({ services , slots , salonId , customerEmail }) => {
         const customer = await Customer.findOne({customerEmail}) ;
         
         
            const salonSocketId = salonOwners[salonId];
            if (salonSocketId) {
            io.to(salonSocketId).emit('new_booking_notification', {
                customerName : customer?.name,
                customerId: customer?._id,
                services,
                slots,
                date : Date.now().toLocaleString()
            });
            } else {
                socket.emit('booking_status', {
                    status: false,
                    message: 'The salon is currently not online. Your booking has been saved and will be sent once the salon is back.'
                });
            }
        });
       socket.on('booking_confirmed', ({ customerId, booking }) => {
        const customerSocketId = customer[customerId]; // ✅ Lookup by customerId
        if (customerSocketId) {
            io.to(customerSocketId).emit('booking_confirmed', { booking });
        }
        });

 
        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
        })
    });   
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
    initializeSocketIO,
    getIO
}