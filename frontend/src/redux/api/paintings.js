import { apiSlice } from "./apiSlice";
import { PAINTINGS_URL } from "../constants";

const paintingApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllPaintings:builder.query({
            query:()=>`${PAINTINGS_URL}/all-paintings`
        }),

        createPainting:builder.mutation({
            query:(newPainting)=>({
                url:`${PAINTINGS_URL}/create-painting`,
                method:'POST',
                body:newPainting
            })
        }),

        getSpecificPainting:builder.query({
            query:(id)=>`${PAINTINGS_URL}/specific-painting/${id}`
        }),

        updatePainting:builder.mutation({
            query:(id,updatedPainting)=>({
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
    useGetAllPaintingsQuery,
    useCreatePaintingMutation,
    useGetSpecificPaintingQuery,
    useUpdatePaintingMutation,
    useDeletePaintingMutation
}=paintingApiSlice;