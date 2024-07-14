import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import orderReducer from './features/orderInfo/orderSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';


export const store = configureStore({

  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    order: orderReducer
  },

  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
  
  devTools: true

});


setupListeners(store.dispatch);

