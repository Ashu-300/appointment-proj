const express = require('express') ;
const router = express.Router() ;
const {signup , loginpage , allBookings, handleCheckAuth } = require('../controllers/SalonController') ;

router.get('/' , allBookings) ;
router.post('/signup/submit' , signup) ;
router.post('/login/submit' , loginpage) ;
router.get('/checkAuth', handleCheckAuth);


module.exports = router ;