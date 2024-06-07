import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength: [3, "Name must contain 3 character"],
    },
    email:{
        type:String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone:{
        type:Number,
        required: [true, "Please provide your phone no"],
    },
    password:{
        type:String,
        required: [true, "Please provide your password"],
        minLength: [8, "password must contain atleast 8 character"],
        select: false,
    },
    role:{
        type:String,
        required: [true, "Please provide your role"],
        enum:["Job Seeker", "Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now, 
    },
});

//hashing password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing password
userSchema.methods.comparePassword = async function(enterdPassword){
   return await bcrypt.compare(enterdPassword, this.password);
};

//generating jwt token
userSchema.methods.getJWTToken = function(){
   return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_EXPIRE,
   });
};

export const User = mongoose.model("User", userSchema);