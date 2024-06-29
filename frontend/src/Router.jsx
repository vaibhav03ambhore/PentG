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
import PrivateRoutes from "./my-components/PrivateRoutes.jsx";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/add-painting" element ={<PaintingForm/>} />
        <Route path="/paintings" element={<Body/>} />
        <Route path="/paintings/:id" element={<PaintingDetail />} />
        <Route path="/paintings/:id/checkout" element={ <CheckoutPage />} />
        <Route index={true} path="/" element={<Home />} />

        <Route path="" element={<PrivateRoutes/>}>
          <Route path="/:id/profile" element ={<UserDashboard/>} />
        </Route>
        
      </Route>
    )
  );
  

  export default router;