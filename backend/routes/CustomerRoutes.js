const express = require('express') ;
const router = express.Router() ;
const {signuppage , loginpage , getAllSalons  } = require('../controllers/CustomerController')

router.get('/' , getAllSalons) ;
router.post('/signup/submit' , signuppage) ;
router.post('/login/submit' , loginpage) ;

module.exports = router ;
