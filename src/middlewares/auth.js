const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid Token!");
        }

        const decodedObj = await jwt.verify(token,"dev@Connect$252");
        const {_id} = decodedObj;

        const user = await User.findById({_id});
        if(!user){
            throw new Error("User not found!");
        }

        //add user to the req object so that it may be used in the next middleware/route handler
        req.user = user;

        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth,
};