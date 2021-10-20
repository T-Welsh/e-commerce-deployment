module.exports = (req, res, next) => {
    //destructure request body
    const { email, password, fname, lname, address1, address2, address3, county, postcode, telephone} = req.body;
    //VALIDATION FUNCTIONS
    //check email is valid
    function validEmail(userEmail) {
        if(!userEmail){
            return false;
        }
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
      }
    //check password is valid
    function validPassword(userPassword) {
        if(!userPassword){
            return false;
        }
        if(userPassword.length < 8){
            return false;
        }
        return true;
    }
    //check name is valid
    function validName (userFName, userLName) {
        if(![userFName, userLName].every(Boolean)){
            return false;
        }
        if(userFName.length < 1 || userLName.length < 1){
            return false;
        }
        return true;
    }
    //check address is valid
    function validAddress (userAdd1, userAdd2, userAdd3, userCounty, userPostcode){
        if(![userAdd1, userCounty, userPostcode].every(Boolean)){
            return false;
        }
        return true;
    }
    //check phone number is valid
    function validPhone (userPhone) {
        if(!userPhone){
            return false;
        }
        return /(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}/.test(userPhone);
    }

    //validate data for register route
    if(req.path === "/register") {
        if(!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
        if(!validPassword(password)){
            return res.status(401).json("Invalid Password");
        }
        if(!validName(fname, lname)){
            return res.status(401).json("Invalid Name");
        }
        if(!validAddress(address1, address2, address3, county, postcode)){
            return res.status(401).json("Invalid Address");
        }
        if(!validPhone(telephone)){
            return res.status(401).json("Invalid Phone Number");
        }
    }
    //validate data update
    if(req.path === "/user"){
        if(!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
        if(!validName(fname, lname)){
            return res.status(401).json("Invalid Name");
        }
        if(!validAddress(address1, address2, address3, county, postcode)){
            return res.status(401).json("Invalid Address");
        }
        if(!validPhone(telephone)){
            return res.status(401).json("Invalid Phone Number");
        }
    }
    //validate password update
    if(req.path === "/user/password"){
        if(!validPassword(password)){
            return res.status(401).json("Invalid Password");
        }
    }

    next();
}