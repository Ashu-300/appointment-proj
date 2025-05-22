const express = require('express') ;
const router = express.Router() ;
const {signup , loginpage , allBookings } = require('../controllers/SalonController') ;

router.post('/' , allBookings) ;
router.post('/signup/submit' , signup) ;
router.post('/login/submit' , loginpage) ;


module.exports = router ;