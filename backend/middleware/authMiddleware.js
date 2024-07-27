import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";


//authenticate middleware
const authenticate= asyncHandler(async(req,res,next)=>{
    let token;

    token = req?.cookies?.jwt;
    console.log(token);
    console.log(req?.cookies);

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({message:"Not authorized, token failed"});
        }
    }else{
        res.status(401).json({message:"Not authorized, no token"});
    }
})


//check admin

const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).json({message:"Not authorized as an admin"});
    }
}

export {authenticate,authorizeAdmin};