const {getSalon } = require('../jwtMapping/SalonMapping'); 


async function restrictToLoggedInSalonOnly(req, res, next) {
    if (req.path === '/login') {
        return next();  // ✅ allow login page access without auth
    }
    if (req.path === '/login/submit') {
        return next();  // ✅ allow login page access without auth
    }
     if (req.path === '/signup') {
        return next();  // ✅ allow login page access without auth
    }
    if (req.path === '/signup/submit') {
        return next();  // ✅ allow login page access without auth
    }
    
    
    const userUid = req.headers['authorization'];
    
    if (!userUid) return res.redirect('salon/login')
    const token = userUid.split('Bearer ')[1] ;
    const user = await getSalon(token) ;
    // @ts-ignore
    if (!user) return res.redirect('/login');
    req.user = user;
    
    next(); 
}
module.exports = {
    restrictToLoggedInSalonOnly,
}
