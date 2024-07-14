import { apiSlice } from "./apiSlice";
import { PAINTINGS_URL } from "../constants";

const paintingApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllPaintingsToSell:builder.query({
            query:()=>`${PAINTINGS_URL}/all-paintings`
        }),

        createPainting:builder.mutation({
            query:(newPainting)=>({
                url:`${PAINTINGS_URL}/create-painting`,
                method:'POST',
                body:newPainting
            })
        }),

        getAllSoldPaintingsByCreator:builder.query({
            query:(id)=>`${PAINTINGS_URL}/all-sold-paintings/${id}`
        }),
        getAllForSalePaintingsByCreator:builder.query({
            query:(id)=>`${PAINTINGS_URL}/all-to-sale-paintings/${id}`
        }),

        getSpecificPainting:builder.query({
            query:(id)=>`${PAINTINGS_URL}/specific-painting/${id}`
        }),

        updatePainting:builder.mutation({
            query:({id,updatedPainting})=>({
                url:`${PAINTINGS_URL}/update-painting/${id}`,
                method:'PUT',
                body:updatedPainting
            })
        }),

        deletePainting:builder.mutation({
            query:(id)=>({
                url:`${PAINTINGS_URL}/delete-painting/${id}`,
                method:'DELETE'
            })
        }),



    })
})


export const {
    useGetAllPaintingsToSellQuery,
    useCreatePaintingMutation,
    useGetAllSoldPaintingsByCreatorQuery,
    useGetAllForSalePaintingsByCreatorQuery,
    useGetSpecificPaintingQuery,
    useUpdatePaintingMutation,
    useDeletePaintingMutation,

}=paintingApiSlice;