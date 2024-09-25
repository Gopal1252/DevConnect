const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res) => {
    //sending a connection request
    console.log("Sending a connection request!");

    res.send("Connection request sent!");
})

module.exports = requestRouter;