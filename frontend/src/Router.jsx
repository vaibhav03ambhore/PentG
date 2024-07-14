import App from "./App.jsx";
import Home from "./pages/HomePage/Home.jsx";
import { Route, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import UserDashboard from "./pages/Dashboards/UserDashboard.jsx";
import Body from "./pages/HomePage/Body/Body.jsx";
import PaintingDetail from "./pages/Paintings/PaintingDetails/PaintingDetail.jsx";
import PaintingForm from "./pages/Paintings/UploadPainting/PaintingForm.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import Order from "./pages/Orders/Order.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import PrivateRoutes from "./my-components/PrivateRoutes.jsx";
import OrderList from "./pages/Dashboards/OrderList.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/paintings" element={<Body/>} />
        <Route path="/paintings/:id" element={<PaintingDetail />} />
        <Route index={true} path="/" element={<Home />} />

        <Route path="" element={<PrivateRoutes/>}>
          <Route path="/:id/profile" element ={<UserDashboard/>} />
          <Route path="/add-painting" element ={<PaintingForm/>} />
          <Route path="/paintings/:id/checkout" element={ <CheckoutPage />} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="/place-order/" element={<PlaceOrder/>} />
          <Route path="/my-orders/" element={<OrderList/>}/>
        </Route>
        
      </Route>
    )
  );
  

  export default router;