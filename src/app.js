const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res) => {
    //creating a new instance of the user model 
    const user = new User({
        firstName : "Gopal",
        lastName : "Gupta",
        email : "gopal252@gmail.com",
        password : "gopal@252"
    });
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch{(err) => {
        res.status(400).send("Error saving the user" + err.message);
    }}
})

connectDB().then(() => {
    console.log("DB connected successfully!");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000");
    });
}).catch((err) => {
    console.log("DB could not be connected!");
})

