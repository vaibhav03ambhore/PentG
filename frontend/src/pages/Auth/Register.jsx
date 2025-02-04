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
    <div className="sm:mt-12 sm:mx-14 mt-5" >
      <section className="p-5">
        <div className="w-full  flex flex-col gap-0 md:gap-4 justify-center items-start">
          <h1 className="sm:text-xl md:text-2xl font-semibold w-full mb-2">Register</h1>
          <form onSubmit={submitHandler} className="w-full mx-2 px-2 sm:px-10 min-w-[18rem] max-w-[30rem] sm:w-[40rem]">
            <div className="my-[1rem] md:my-[2rem]">
              <label htmlFor="name" className="block text-sm sm:text-lg sm:font-normal font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full text-black text-sm sm:text-lg"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="my-[1rem] md:my-[2rem]">
              <label htmlFor="email" className="sm:font-normal sm:text-lg block text-sm font-medium text-white">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full text-black text-sm sm:text-lg"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-[1rem] md:my-[2rem]">
              <label htmlFor="password" className="sm:font-normal sm:text-lg block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full text-black text-sm sm:text-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className=" my-[1rem] md:my-[2rem]">
              <label htmlFor="confirmPassword" className="sm:font-normal sm:text-lg block text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full text-black text-sm sm:text-lg"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-blue-500 text-sm sm:text-lg"
            >
            {isLoading ? "Registering..." : "Register"}
              
            </button>
    
          </form>
          <div className="mt-1 text-sm sm:text-lg">
            <p className="text-white ">
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
