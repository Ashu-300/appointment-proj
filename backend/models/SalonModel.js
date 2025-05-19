const mongoose = require('mongoose');
const {createHmac , randomBytes} = require('crypto') ;


const SalonSchema = new mongoose.Schema({
  salonName:  {type:String , required: true},
  ownerName:  {type:String , required: true},
  email: { type: String },
  password:{type:String , required: true},
  salt:{type:String},
  phone: { type: String, unique: true },
  address:  {type:String , required: true},

  // Services offered by the salon
  services: [
    {
      serviceName: {type:String , required: true},       // e.g., "Haircut"
      price: {type:String , required: true},                // e.g., 299
      duration: {type:Number , required: true},             // in minutes, e.g., 30
    }
  ],

  bookings: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Booking' }]
});
SalonSchema.pre('save' , function (next){
  const salon = this ;
  const salt = randomBytes(16).toString() ;
  const hashedPassword = createHmac('sha256' , salt).update(salon.password).digest('hex') ;
  this.salt = salt ;
  this.password = hashedPassword ;
  next()
})

SalonSchema.static('matchPassword' , async function(email , password){
  const salon = await this.findOne({email}) ;
  if(!salon) throw new Error('salon not found'); 
  const salt = salon.salt ;
  const hashedPassword = salon.password ;

  const salonProvidedPassword = createHmac('sha256' ,salt).update(password).digest('hex') ;
   if(hashedPassword !== salonProvidedPassword) throw new Error('password does not match');

   const salonObj = salon.toObject();
  delete salonObj.password;
  delete salonObj.salt;
  return salonObj;
})
const Salon = mongoose.model( 'SalonModel' , SalonSchema) ;

module.exports = Salon;
