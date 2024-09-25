const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");


const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try{
        const user = req.user;

        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request!");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile was updated successfuly`,
            data : loggedInUser
        });

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req,res) => {
    try{
        const { oldPassword , newPassword } = req.body;
        const user = req.user;

        //validate old password
        const isPasswordValid = await user.validatePassword(oldPassword);

        if(!isPasswordValid){
            throw new Error("Old Password Incorrect!");
        }

        //check if the new password is strong enough or not
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("New Password is not strong enough!");
        }

        const newPasswordHash = await bcrypt.hash(newPassword,10);

        user.password = newPasswordHash;
        await user.save();
        res.send("Password updated successfully!");

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;