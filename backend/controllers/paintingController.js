import Painting from '../models/painting.js';
import asyncHandler from '../middleware/asyncHandler.js';



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

const createPainting = asyncHandler(async(req,res)=>{


    try{
        const newPainting = await Painting.create(req.body);

        res.json(newPainting);
    }catch(err){
        res.status(500).json({error:err.message})
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

}
