const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user", userAuth,(req,res) => {
    res.send("User data sent");
})


app.use("/admin/getAllData",(req, res) => {
    res.send("All data sent");
})

app.use("/admin/deleteUser",(req, res) => {
    res.send("User has been deleted");
})


app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000");
});