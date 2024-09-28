const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

//send the request (show interest or just ignore)
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

//review the received requests (accept and reject)
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;
        const {requestId, status} = req.params;

        //check if the status of the request is valid
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Status not allowed!"});
        }

        //get the connection request
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser,
            status : "interested",
        });
        if(!connectionRequest){
            return res.status(404).json({message : "Connection request not found!"});
        }

        //accept/reject the request
        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({message : "Connection Request " + status, data});

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = requestRouter;