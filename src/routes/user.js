const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "gender", "age", "about", "skills"];

//Get all the pending(stauts = "interested") requests received for the loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;

        //just get the requests where the toUserId = loggedInUser and status = interested
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId",USER_SAFE_DATA);

        res.json({
            message : "Data fetched successfully!",
            connectionRequests
        })

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})


//Get all the pending(status = "interested") requests sent by the loggedInUser 
userRouter.get("/user/requests/sent", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;

        //just get the requests where the fromUserId = loggedInUser and status = interested
        const connectionRequests = await ConnectionRequest.find({
            fromUserId : loggedInUser._id,
            status : "interested",
        }).populate("toUserId",USER_SAFE_DATA);

        res.json({
            message : "Data fetched successfully!",
            connectionRequests
        })

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

//get all the connections of the user
userRouter.get("/user/connections", userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"}
            ],
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            else{
                return row.fromUserId;
            }
        });

        res.json({
            data : connectionRequests,
        })


    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = userRouter;

