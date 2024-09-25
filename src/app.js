const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req,res) => {
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

//login api
app.post("/login", async (req,res) => {
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

//get profile api
app.get("/profile", userAuth, async (req,res) => {
    try{
        const user = req.user;

        res.send("Reading Cookie")
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
})

//send connection request api
app.post("/sendConnectionRequest", userAuth, async (req,res) => {
    //sending a connection request
    console.log("Sending a connection request!");

    res.send("Connection request sent!");
})

connectDB().then(() => {
    console.log("DB connected successfully!");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000");
    });
}).catch((err) => {
    console.log("DB could not be connected!");
})

