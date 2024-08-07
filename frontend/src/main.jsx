import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {store} from "./redux/store.js";
import {RouterProvider} from "react-router";
import router from './Router';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);