const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {
    // creating a new instance of the user model 
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
});

//get user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail});
        if(users.length === 0){
            res.status(404).send("User with given email address not found!");
        }
        else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong!")
    }
})

//get all users (feed) from the database
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users);

    }catch(err){
        res.status(400).send("Something went wrong!")
    }
});

//delete a user by id
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        // const user = await User.findByIdAndDelete({id: userId});//this also works acc to docs
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!")

    }catch(err) {
        res.status(400).send("Something went wrong!")
    }
})

//

connectDB().then(() => {
    console.log("DB connected successfully!");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000");
    });
}).catch((err) => {
    console.log("DB could not be connected!");
})

