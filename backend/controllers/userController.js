import User from "../models/User.js";
import bcrypt from "bcryptjs";

import asyncHandler from "../middleware/asyncHandler.js";
import createToken from "../utils/createToken.js";



const createUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    
    try{

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        });

        createToken(res,user._id);

        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            isAdmin:user.isAdmin,
            token:res.token
        
        })

    }catch(error){
        res.status(400);
        throw new Error("Invalid user data");
    }





})


const loginUser= asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User does not exist!");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(400);
        throw new Error("Invalid password!");
    }

    createToken(res,user._id);

    res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        isAdmin:user.isAdmin,
    })
})


const logoutUser= asyncHandler(async(req,res)=>{

    const token = req.cookies.jwt;
    if(!token){
        return res.status(200).json({message:"you are already logged out!"});
    }
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:"Logged out successfully!"})
})

const getAllUsers= asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.json(users);
})

const getCurrentUserProfile= asyncHandler(async(req,res)=>{
    const currentUser= await User.findById(req.user._id);
    if(currentUser){
        res.json({
            _id:currentUser._id,
            username:currentUser.username,
            email:currentUser.email
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    
    }
    

})

const updateCurrentUserProfile= asyncHandler(async(req,res)=>{
    const currentUser= await User.findById(req.user._id);

    if(currentUser){
        currentUser.username= req.body.username || currentUser.username;
        currentUser.email= req.body.email || currentUser.email;


        const updatedUser = await currentUser.save();
    
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email
        })

    }else{
        res.status(404);
        throw new Error("User not found");
    }

})




export {
    createUser,
    loginUser,
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUserProfile,
};