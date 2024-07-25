import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { useRegisterMutation } from "../../redux/api/users";
import { setCredential } from "../../redux/features/auth/authSlice";


const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const {userInfo} = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
       
        dispatch(setCredential({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="ml-10" >
      <section className="px-10 md:pl-[8rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[4rem]">
          <h1 className="md:text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={submitHandler} className="container w-[26rem] md:w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-blue-500"
            >
            {isLoading ? "Registering..." : "Register"}
              
            </button>
    
          </form>
          <div className="mt-4">
            <p className="text-white">
              Already have an account?
              <Link to={redirect?`/login?redirect=${redirect}`: "/login"} className="text-violet-400 hover:underline"> Login</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
