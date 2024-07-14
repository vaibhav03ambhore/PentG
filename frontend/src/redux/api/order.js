import { apiSlice } from "./apiSlice";
import { ORDER_URL,PAYPAL_URL } from "../constants";

const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
          query:(data)=>({
              url:`${ORDER_URL}/`,
              method:'POST',
              body:data
          })
        }),  
        getOrderById:builder.query({
            query:(id)=>({
                url:`${ORDER_URL}/${id}`,
                method:'GET'
            })
        }),
        getUserOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}`,
                method:'GET'
            })
        }),
        getUserSells:builder.query({
            query:()=>({
                url:`${ORDER_URL}/sells`,
                method:'GET'
            })
        }),
        updateOrderToPaid:builder.mutation({
            query: ({ orderId, details }) => ({
              url: `${ORDER_URL}/${orderId}/pay`,
              method: "PUT",
              body: details,
            }),
        }),
        updateOrderToDelivered:builder.mutation({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}/deliver`,
                method:'PUT',
            })
        }),
        getPayPalClientId:builder.query({
            query:()=>({
                url:`${PAYPAL_URL}`,
                method:'GET'
            })
        
        })
    })
})


export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetUserOrdersQuery,
    useGetUserSellsQuery,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation,
    useGetPayPalClientIdQuery
}=orderApiSlice;
