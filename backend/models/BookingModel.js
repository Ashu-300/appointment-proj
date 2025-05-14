const { default: mongoose } = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  salon: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
  service: String,
  appointmentDate: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const BookingModel = mongoose.model('BookingModel' , BookingSchema) ;

module.exports = BookingModel ;