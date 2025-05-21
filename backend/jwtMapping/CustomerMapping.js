const jwt = require('jsonwebtoken') ;
require('dotenv').config()
function setCustomer(customer){
    return jwt.sign({
        _id: customer._id,
        email : customer.email
    } , process.env.Secret ) ;
}
function getCustomer(token){
    if(!token) return null ;
   return jwt.verify(token , secret) ;
}


module.exports = {
    setCustomer,
    getCustomer,
    
}