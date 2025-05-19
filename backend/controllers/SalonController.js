const Salon = require('../models/SalonModel') ;
const Booking = require('../models/BookingModel')
const {setSalon} = require('../jwtMapping/SalonMapping') ;
async function signup(req , res){
    const body = req.body ;
    Salon.create({
        salonName: body.salonName , 
        ownerName: body.ownerName,
        email: body.email,
        password: body.password,
        phone: body.phone,
        address: body.address,
        services: body.services,
        bookings: []
    })
    res.status(201).send('salon details are registered') ;
}
async function loginpage(req, res) {
  const { email, password } = req.body;

  try {
    const salon = await Salon.matchPassword(email, password);
    
    
    if (!salon) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = setSalon(salon); 

    res.status(200).json({
      message: "Login successful",
      token,
      user: { salonName: salon.salonName, email: salon.email , _id:salon._id }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function allBookings(req , res){
  try {
    const {salonId} = req.body
    const bookings = await Booking.find({salonId:salonId})
      
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    signup,
    loginpage,
    allBookings,

}