const Customer = require('../models/CustomerModel') ;
const Salon = require('../models/SalonModel') ;
const Booking = require('../models/BookingModel')
const { setCustomer  } = require('../jwtMapping/CustomerMapping') ;
// const {matchPassword} = require('../models/CustomerModel')

async function signuppage(req , res){
    const body = req.body ;
   try{ Customer.create({
        name: body.name ,
        email: body.email ,
        password: body.password ,   
        phone: body.phone ,
        bookings:[]
    })
    res.status(201).send('user details are registered') ;
    }
    catch(err){
        res.status(300).send('something went wrong') ;
    }

}

async function loginpage(req, res) {
  const { email, password } = req.body;
 
  try {
    const customer = await Customer.matchPassword(email, password);
    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
   
    
    const token = setCustomer(customer); 
    
    

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: customer.name, email: customer.email , _id:customer._id }
    });
  } catch (err) {
    res.status(400).json({ message: "user error", error: err.message });
  }
}

async function getAllSalons(req , res){
 try {
    const salons = await Salon.find();
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

async function newBooking(req , res){
  
// Assume req.body has: customerEmail, salonEmail, service, appointmentDate
const { customerEmail, salonEmail, service, appointmentDate } = req.body;

const customer = await Customer.findOne({ email: customerEmail });
const salon = await Salon.findOne({ email: salonEmail });

if (!customer || !salon) {
  return res.status(404).json({ error: 'Customer or Salon not found' });
}

// Create booking
const anotherBooking = await Booking.create({
  customer: customer._id,
  salon: salon._id,
  service,
  appointmentDate
});

res.status(201).json(anotherBooking);
}

async function myBooking(req,res){
   try {
    const {customerId} = req.body
    const bookings = await Booking.find({customerId:customerId})
      
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    signuppage,
    loginpage,
    getAllSalons,
    newBooking,
    myBooking,
}