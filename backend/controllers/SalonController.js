const Salon = require('../models/SalonModel') ;
const Booking = require('../models/BookingModel')
const {setSalon} = require('../jwtMapping/SalonMapping') ;

async function signup(req , res){
    const body = req.body ;
    const salon = await Salon.create({
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
      salon: salon
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function allBookings(req , res){
  try {
    const {salonEmail} = req.body
    const salon = await Salon.findOne({email:salonEmail})
    const bookings = await Booking.find({_id:salon.bookings})

      
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleCheckAuth(req, res) {
  try {
    const user = req.user;

    const salon = await Salon.findById(user._id);

    if(!salon){
      return res.status(404).json({
        msg: 'no salon found'
      })
    }

    return res.status(200).json({
      msg: 'user is authorized'
    })

  } catch (error) {
    res.status(400).json({
      error: error
    })
  }
}

async function salonInfo(req, res) {
  try {
    // Assuming a middleware attaches `req.user` after verifying the token
    const email = req.user?.email; // or req.user.id if you store user ID in token

    if (!email) {
      return res.status(400).json({ message: 'Invalid token or missing email' });
    }

    const salon = await Salon.findOne({ email });

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    
   const salonObj = salon.toObject();
  delete salonObj.password;
  delete salonObj.salt;

    res.status(200).json(salonObj);
  } catch (error) {
    console.error('Error fetching salon info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function allCompletedBookings(req , res) {
  const salon = await Salon.findOne({email : req.params.email}) ;
  const bookings = await Booking.find({_id : salon._id}) ;
  const completedBooking = bookings.filter(booking=> booking.status === completed) ;
  res.status(200).json(completedBooking) ;
}

module.exports = {
    signup,
    loginpage,
    allBookings,
    handleCheckAuth,
    salonInfo,
    allCompletedBookings
}