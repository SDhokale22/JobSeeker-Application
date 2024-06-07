import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";

//register controller
export const register = catchAsyncError(async(req, res, next) => {
    const {name, email, phone, role, password} = req.body;

    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill all fields"));
    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email alreay exists"));
    }
    const user = await User.create({
        name, 
        email, 
        phone, 
        role, 
        password,
    });

    sendToken(user, 200, res, "User registered successfully");
   
});

//login controller
export const login = catchAsyncError(async(req, res, next) => {
    const {email, role, password} = req.body;
    if(!email || !role || !password){
        return next(new ErrorHandler("Please Provide all fields", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return new next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return  new next(new ErrorHandler("Invalid Email or Password", 400));
    }
    if(user.role !== role){
        return new next(new ErrorHandler("User with this role is not found", 400));
    }
    sendToken(user, 200, res, "User Login successfully");
});

//logout
export const logout = catchAsyncError(async(req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logout successfully"
    });
});

//get user
export const getUser = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});