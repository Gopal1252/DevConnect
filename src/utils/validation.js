const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName){
        throw new Error("firstName is a required field!")
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("firstName must be between 4 and 50 characters")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough!");
    }
}

module.exports = {
    validateSignUpData,
}