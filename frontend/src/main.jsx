import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store";
import {RouterProvider} from "react-router";
import router from './Router';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PayPalScriptProvider> */}
      <RouterProvider router={router} />
    {/* </PayPalScriptProvider> */}
  </Provider>
);