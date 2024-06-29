import Painting from '../models/painting.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const getSpecificPainting = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const secificPainting = await Painting.findById(id);
        
        res.json(secificPainting);

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const getAllPaintings= asyncHandler(async(req,res)=>{
    try{
        const paintings = await Painting.find({});

        res.json(paintings);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

const getAllSoldPaintingsByCreator= asyncHandler(async(req,res)=>{
    const {id:creatorId} = req.params;
    // console.log(creatorId);
    try{
        const paintings = await Painting.find({creator: creatorId, status:'Sold'});
        res.json(paintings);
    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message})
    }
})

const getAllForSalePaintingsByCreator= asyncHandler(async(req,res)=>{
    const {creatorId} = req.params;
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
        return res.status(400).json({ message: "Painting with this name already exists" });
    }
    
    // console.log(req.files);
    if(req?.files?.image){
        try{
            const file = req.files.image[0];
            const uploadedFile = await uploadOnCloudinary(file.path, "Paintings");

            paintingData.image = uploadedFile.secure_url;
        }catch(err){
            console.error("Error uploading painting image:", err);
            return res.status(500).json({ message: "Error uploading painting image" });
        }
    }else console.log("No painting image uploaded");

    try{
        const newPainting = await Painting.create(paintingData);

        res.json(newPainting);
    }catch(err){
        res.status(500).json("error in saving into db ",{error:err.message})
    }
})

const updatePainting = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedPainting = await Painting.findByIdAndUpdate(id,req.body,{new:true});

        if(!updatedPainting){
            res.status(404).json('Painting not found');
        }
        res.json(updatedPainting);

    }catch(err){
        res.status(500).json({error:err.message})
    }
})


const deletePainting = asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedPainting = await Painting.findByIdAndDelete(id);

        if(!deletedPainting){
            res.status(404).json('Painting not found');
        }
        res.json({message:'Painting deleted successfully!'});

    }catch(err){
        res.status(500).json({error:err.message})
    }
})


export {
    createPainting,
    getAllPaintings,
    getSpecificPainting,
    updatePainting,
    deletePainting,
    getAllSoldPaintingsByCreator,
    getAllForSalePaintingsByCreator,
    
}
