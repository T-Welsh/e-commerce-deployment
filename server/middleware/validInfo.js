module.exports = (req, res, next) => {
    //destructure request body
    const { email, password, fname, lname, address1, address2, address3, county, postcode, telephone } = req.body;
    //VALIDATION FUNCTIONS
    //check email is valid
    //check password is valid
    //check name is valid
    //check address is valid
    //check phone number is valid

    //validate data for register route
    //validate data for login

    console.log("VALIDATE INFO");
    next();
}