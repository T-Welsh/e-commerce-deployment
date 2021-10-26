module.exports = async (req, res, next) => {
    const jwtToken = req.cookies.token;
    if(!jwtToken){
        //if user is not logged in
        res.redirect('auth/login');
    }else{
        next();
    }
}