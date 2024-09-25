const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
    try{
        //validate the signup data
        validateSignUpData(req);

        //encrypt the password;
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password,10);


        // creating a new instance of the user model 
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
});

authRouter.post("/login", async (req,res) => {
    try{
        const { emailId , password } = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials!")
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            //create a JWT token
            const token = await user.getJWT();

            //add the token to the cookie and send the response back to the user
            res.cookie("token", token)

            res.send("Login Successfully!");
        }
        else{
            throw new Error("Invalid Credentials!")
        }

    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = authRouter;