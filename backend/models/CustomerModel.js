const { default: mongoose } = require("mongoose");
const {createHmac , randomBytes} = require('crypto') ;

const CustomerSchema = new mongoose.Schema({
  name:  {type:String , required: true},
  email: { type: String, unique: true },
  password: {type:String , required: true},
  salt:{type:String},
  phone: String,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

CustomerSchema.pre('save' , function (next){
  const customer = this ;
  const salt = randomBytes(16).toString() ;
  const hashedPassword = createHmac('sha256' , salt).update(customer.password).digest('hex') ;
  this.salt = salt ;
  this.password = hashedPassword ;
  next()
})

CustomerSchema.static('matchPassword' , async function(email , password){
  const customer = await this.findOne({email}) ;
  
  
  if(!customer) throw new Error('customer does not found'); 
  const salt = customer.salt ;
  const hashedPassword = customer.password ;

  const customerProvidedPassword = createHmac('sha256' ,salt).update(password).digest('hex') ;

  if(hashedPassword !== customerProvidedPassword) throw new Error('password does not match');

   const customerObj = customer.toObject();
  delete customerObj.password;
  delete customerObj.salt;

  return customerObj;
})

const Customer = mongoose.model('CustomerModel' , CustomerSchema) ;

module.exports = Customer ;