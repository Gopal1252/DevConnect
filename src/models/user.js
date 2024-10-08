const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({ 
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50
    },
    lastName : {
        type: String,
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong Password: " + value);
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        enum : {
            values : ["male","female","others"],
            message : `{VALUE} is not a valid gender type`
        },
        // validate(value) { 
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // }
    },
    photoUrl : {
        type : String,
        default : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    about : {
        type : String,
        default: "Hey there! I am a dev!"
    },
    skills : {
        type : [String],
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id},"dev@Connect$252",{expiresIn: "7d",});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;