const {getCustomer } = require('../jwtMapping/CustomerMapping'); 


async function restrictToLoggedInUserOnly(req, res, next) {
    if (req.path === 'customer/login') {
        return next();  // ✅ allow login page access without auth
    }
    if (req.path === 'customer/login/submit') {
        return next();  // ✅ allow login page access without auth
    }
    console.log(req.headers);
    
    const userUid = req.headers['authorization'];
    
    if (!userUid) return res.redirect('customer/login')
    const token = userUid.split('Bearer ')[1] ;
    const user = await getCustomer(token) ;
    // @ts-ignore
    if (!user) return res.redirect('/login');
    req.user = user;
    
    next(); 
}
module.exports = {
    restrictToLoggedInUserOnly,
}
