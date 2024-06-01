import App from "./App.jsx";
import Home from "./pages/HomePage/Home.jsx";
import { Route, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginRegister/Login.jsx";
import Register from "./pages/LoginRegister/Register.jsx";
import UserDashboard from "./pages/Dashboards/UserDashboard.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element ={<UserDashboard/>} />
        <Route index={true} path="/" element={<Home />} />
      </Route>
    )
  );
  

  export default router;