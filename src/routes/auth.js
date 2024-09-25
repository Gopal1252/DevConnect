const express = require("express");
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
            const token = await user.getJWT();//create jwt
            res.cookie("token", token)//add jwt to cookie
            res.send("Login Successfully!");
        }
        else{
            throw new Error("Invalid Credentials!")
        }

    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    });
    res.send("User successfully Logged Out!")
})

module.exports = authRouter;