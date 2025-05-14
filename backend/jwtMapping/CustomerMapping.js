const jwt = require('jsonwebtoken') ;
const secret = "1234@" ;
function setCustomer(customer){
    return jwt.sign({
        _id: customer._id,
        email : customer.email
    } , secret ) ;
}
function getCustomer(token){
    if(!token) return null ;
   return jwt.verify(token , secret) ;
}


module.exports = {
    setCustomer,
    getCustomer,
    
}