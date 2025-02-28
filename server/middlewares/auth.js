import { User } from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from './error.js';
import jwt from "jsonwebtoken";

export const isAuthentication = catchAsyncError(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});