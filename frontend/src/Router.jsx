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

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element ={<UserDashboard/>} />
        <Route path="/add-painting" element ={<PaintingForm/>} />
        <Route path="/paintings" element={<Body/>} />
        <Route path="/paintings/:id" element={<PaintingDetail />} />
        <Route path="/paintings/:id/checkout" element={ <CheckoutPage />} />
        <Route index={true} path="/" element={<Home />} />
      </Route>
    )
  );
  

  export default router;