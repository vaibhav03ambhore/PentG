import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/Order.js"
import Painting from "../models/Painting.js";

const createOrder = asyncHandler(async(req,res)=>{
    const {orderItem,shippingDetails,paymentMethod} = req.body;
    const userId = req.user._id;
    try{
        if(!orderItem || !shippingDetails || !paymentMethod ){
            res.status(400);
            throw new Error("Please fill in all fields");
        }

        const itemFromDB = await Painting.findById(orderItem);

        if(!itemFromDB){
            res.status(400);
            throw new Error(`Painting ${orderItem} does not exist!`);
        }
        const itemPrice = itemFromDB.price;
        const shippingCharge=(itemPrice*10)/100;
        const totalPrice = itemPrice + shippingCharge;

        itemFromDB.status = "Ordered";
        await itemFromDB.save();
        const order= await Order.create({
            orderItem,
            shippingCharge,
            totalPrice,
            shippingDetails,
            paymentMethod,
            user:userId
        });
        res.status(201).json(order);
    }catch(error){
        res.status(500).json({error:error.message})
    }
});

const getOrderById = asyncHandler(async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id).populate('user').populate('orderItem');
        if(!order || !order.orderItem){
            res.status(404);
            throw new Error("Order not found");
        }
        res.json(order);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const getUserOrders = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    try{
        const orders = await Order.find({user:userId}).populate('user').populate({path:'orderItem',populate:{path:'creator'}});
        if(!orders || orders.length===0){
            res.status(404);
            throw new Error("No purchases/orders found");
        }
        res.json(orders);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const getUserSells= asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    try{
        const orders = await Order.find({
                orderItem:{
                    $in:await Painting.find({
                    creator:userId
                    }).select('_id')
                }
            }).populate('user')
            .populate({
                path:'orderItem',
                populate:{path:'creator'}
            });

        if(!orders || orders.length===0){
            res.status(404);
            throw new Error("No sells found");
        }
        res.json(orders);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const updateOrderToPaid = asyncHandler(async(req,res)=>{
    const orderId=req.params.id;
    try{
        const order = await Order.findById(orderId);
        if(!order){
            res.status(404);
            throw new Error("Order not found");
        }
        order.isPaid = true;
        const painting = await Painting.findById(order.orderItem);
        painting.status = "Sold";
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        await painting.save();
        res.json(updatedOrder);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    const orderId=req.params.id;
    try{
        const order = await Order.findById(orderId);
        if(!order){
            res.status(404);
            throw new Error("Order not found");
        }
        if(!order.isPaid){
            res.status(400);
            throw new Error("Order not paid yet");
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

export {
    createOrder,
    getOrderById,
    getUserOrders,
    getUserSells,
    updateOrderToPaid,
    updateOrderToDelivered
}
