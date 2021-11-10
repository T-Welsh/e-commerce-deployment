module.exports = async (req, res, next) => {
    const jwtToken = req.headers.token;
    if(jwtToken === 'no_token'){
        //if user is not logged in
        res.redirect('auth/login');
    }else{
        next();
    }
}