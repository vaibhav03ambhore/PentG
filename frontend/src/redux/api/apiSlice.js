import { fetchBaseQuery ,createApi} from "@reduxjs/toolkit/query";

import { BASE_URL } from "../constants";



const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,

    //creating endpoints in another file and injecting here.
    endpoints: ()=>({}),
});