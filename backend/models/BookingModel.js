const { default: mongoose } = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
  services: [],
  appointmentDate: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const BookingModel = mongoose.model('BookingModel' , BookingSchema) ;

module.exports = BookingModel ;  