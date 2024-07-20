import Painting from "../models/Painting.js";
import asyncHandler from '../middleware/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/User.js';

const getSpecificPainting = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const secificPainting = await Painting.findById(id).populate('creator');
        res.json(secificPainting);

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const getAllPaintingsToSell= asyncHandler(async(req,res)=>{
    try{
        const paintings = await Painting.find({status:'For Sale'}).populate(
            'creator'   //populate creator field with actual user document
        );
        if(!paintings || paintings.length===0){
            res.status(404);
            throw new Error("No paintings found");
        }
        res.json(paintings);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

const getAllSoldPaintingsByCreator= asyncHandler(async(req,res)=>{
    const {id:creatorId} = req.params;
    
    try{
        const paintings = await Painting.find({creator: creatorId, status:'Sold'});
        const user= await User.findById({_id:creatorId});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }else if(!paintings){
            return res.status(404).json({message:"No sold paintings found"});
        }
        else res.json(paintings);

    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message})
    }
})

const getAllForSalePaintingsByCreator= asyncHandler(async(req,res)=>{
    const {id:creatorId} = req.params;
    try{
        const paintings = await Painting.find({creator: creatorId, status: "For Sale"});
        res.json(paintings);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


const createPainting = asyncHandler(async(req,res)=>{

    const paintingData= req.body;
    paintingData.creator = req.user._id;

    const existingPainting = await Painting.findOne({name: paintingData.name});
    if(existingPainting){
        res.status(400)
        throw new Error("Painting with this name already exists");
    }
    if(req?.files?.image){
        try{
            const file = req.files.image[0];
            const uploadedFile = await uploadOnCloudinary(file.path, "Paintings");

            paintingData.image = uploadedFile.secure_url;
        }catch(err){
            console.error("Error uploading painting image:", err);
            res.status(500).json({message:err.message+"Error uploading painting image"});
        }
    }else console.log("No painting image uploaded");

    try{
        const newPainting = await Painting.create(paintingData);
        res.json(newPainting);
    }catch(err){
        res.status(500).json({message:err.message+"Error saving painting into db"});
    }
})

const updatePainting = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPainting = await Painting.findByIdAndUpdate(id, req.body,
        {
            new: true,
            runValidators: true
        }
      );
  
      if (!updatedPainting) {
        res.status(404);
        throw new Error("Painting not found");
      }
  
      res.json(updatedPainting);
    } catch (error) {
      console.error("Error updating painting:", error.message);
      res.status(500).json(error.message);
    }
});
  
  

const deletePainting = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedPainting = await Painting.findByIdAndDelete(id);

        if(!deletedPainting){
            res.status(404);
            throw new Error("Painting not found");
        }
        res.json({message:'Painting deleted successfully!'});

    }catch(err){
        res.status(500).json({error:err.message})
    }
})


export {
    createPainting,
    getAllPaintingsToSell,
    getSpecificPainting,
    updatePainting,
    deletePainting,
    getAllSoldPaintingsByCreator,
    getAllForSalePaintingsByCreator,
    
}
