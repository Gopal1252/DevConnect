const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Invalid status types: " + status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).send("User not found!");
        }

        //if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId,toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });

        if(existingConnectionRequest){
            throw new Error("Connection request Already Exists!")
        }


        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message : "Connection Request Sent Successfully!",
            data
        });

    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = requestRouter;