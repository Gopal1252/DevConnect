const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json());

app.post("/signup", async (req,res) => {
    try{
        //validate the signup data
        validateSignUpData(req);

        //encrypt the password;
        

        // creating a new instance of the user model 
        const user = new User(req.body);
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
        res.status(400).send("Something went wrong!");
    }
})

// update user data
app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl","age","gender","about","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=> 
            ALLOWED_UPDATES.includes(k)
        );
    
        if(!isUpdateAllowed){
            throw new Error("Update not allowed!");
        }

        if(data?.skills.length > 10){
            throw new Error("Cannot add more than 10 skills!")
        }

        await User.findByIdAndUpdate({_id : userId},data,{
            returnDocument : "after",
            runValidators : true 
        });
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Update failed: " + err.message);
    }
})

connectDB().then(() => {
    console.log("DB connected successfully!");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000");
    });
}).catch((err) => {
    console.log("DB could not be connected!");
})

