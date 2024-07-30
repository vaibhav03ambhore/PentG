import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { useLoginMutation } from "../../redux/api/users";
import { setCredential } from "../../redux/features/auth/authSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get("redirect") || "/";

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }

    }, [navigate, redirect, userInfo]);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredential({ ...res }));
            navigate(redirect);
            toast.success("Login Successful");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };

    return (
        <div className='sm:mt-12 sm:mx-14 mt-5 mx-2'>
            <section className=" p-5">
                <div className="w-full  flex flex-col gap-0 md:gap-2 justify-center items-start">
                    <h1 className="sm:text-xl w-full md:text-2xl font-semibold">Sign In</h1>
                    <form onSubmit={submitHandler} className="w-full mx-2 px-2 sm:px-10  min-w-[18rem] max-w-[30rem] sm:w-[40rem]">
                        <div className="w-full my-[2rem]">
                            <label htmlFor="email" className="sm:text-lg block text-sm font-medium">Email Address</label>
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
                        <div className="mb-4">
                            <label htmlFor="password" className="sm:text-lg block text-sm font-medium">Password</label>
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
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-blue-500 text-sm sm:text-lg"
                        >{isLoading?"signing in...":"Sign In"}
                            
                        </button>
                        
                    </form>
                    <div className="mt-1 text-sm sm:text-lg">
                        <p className="text-white">
                            New Customer? 
                            <Link to={redirect?`/register?redirect=${redirect}`: "/register"} className="text-violet-400 hover:underline ">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
