import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    orderInfo:localStorage.getItem("orderInfo")? JSON.parse(localStorage.getItem("orderInfo"))
     :{
        orderItem:"",
        shippingDetails:"",
        paymentMethod: "",
    }
}

const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrderInfo:(state,action)=>{
            localStorage.setItem("orderInfo", JSON.stringify(action.payload));
            state.orderInfo=action.payload;
        },
        clearOrderInfo:(state)=>{
            localStorage.removeItem("orderInfo");
            state.orderInfo=null;
        }
    }
})

export const { setOrderInfo, clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;