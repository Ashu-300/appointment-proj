const { getCustomer } = require('../jwtMapping/CustomerMapping');
const Booking = require('../models/BookingModel');
const {customerSocketHandler} = require('../socket/customerSocketHandler');
const {salonSocketHandler} = require('../socket/salonSocketHandler');

const customers = {};
const salons = {};

function registerSocketHandlers(io) {
  const customerNamespace = io.of('/customer');
  const salonNamespace = io.of('/salon');

  customerNamespace.on('connection', (socket) => {
    customerSocketHandler(socket, customers, salons, customerNamespace);
  });

  salonNamespace.on('connection', (socket) => {
    salonSocketHandler(socket, customers, salons, salonNamespace);
  });
}

module.exports = registerSocketHandlers;
