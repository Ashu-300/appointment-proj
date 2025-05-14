const jwt = require('jsonwebtoken') ;
const secret = "1234@" ;
function setSalon(salon){
    return jwt.sign({
        _id: salon._id,
        email : salon.email
    } , secret ) ;
}
function getSalon(token){
    if(!token) return null ;
   return jwt.verify(token , secret) ;
}


module.exports = {
    setSalon,
    getSalon,
    
}