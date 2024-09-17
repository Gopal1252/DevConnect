const express = require("express");

const app = express();

app.get("/user", (req,res) => {
    res.send({firstName : "Gopal", lastName : "Gupta"});
})

app.post("/user", (req,res) => {
    //saving data to database
    res.send("User Profile updated successfully");
})

app.delete("/user", (req,res) => {
    res.send("User deleted successfully");
})


app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});