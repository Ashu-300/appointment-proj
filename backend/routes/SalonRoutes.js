const express = require('express') ;
const router = express.Router() ;
const {signup , loginpage , allBookings, handleCheckAuth , salonInfo , allCompletedBookings } = require('../controllers/SalonController') ;

router.get('/', salonInfo)
router.post(':email/allbooking' , allBookings) ;
router.post('/signup/submit' , signup) ;
router.post('/login/submit' , loginpage) ;
router.get('/checkAuth', handleCheckAuth);
router.get('/:email/completed' , allCompletedBookings)


module.exports = router ;