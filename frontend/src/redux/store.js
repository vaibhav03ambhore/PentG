import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';


const store = configureStore({

  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
  
  devTools: true

});


setupListeners(store.dispatch);
export default store;
