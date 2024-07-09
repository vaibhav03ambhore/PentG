import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Painting",
        required: true,
    },
    shippingCharge: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingDetails: {
        fullName: {
            type: String,
            required: true,
            validate:{
                validator: function(v) {
                    return /^[a-zA-Z ]+$/.test(v);
                },
                message: props => `${props.value} is not a valid name!`,
            }
        },
        village: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
            validate:{
                validator: function(v) {
                    return /^[0-9]{6}$/.test(v);
                },
                message: props => `${props.value} is not a valid pincode!`,
            }
        },
        mobile: {
            type: Number,
            required: true,
            validate:{
                validator: function(v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid mobile number!`,
            }
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
