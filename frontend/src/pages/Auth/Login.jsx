import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../my-components/Loader";
import { useLoginMutation } from "@/redux/api/users";
import { setCredential } from "@/redux/features/auth/authSlice";

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
        <div className='mt-2'>
            <section className="px-8 md:pl-[10rem] flex flex-wrap">
                <div className="mr-[4rem] mt-[5rem]">
                    <h1 className="md:text-2xl font-semibold mb-4">Sign In</h1>
                    <form onSubmit={submitHandler} className="container w-[26rem] md:w-[40rem]">
                        <div className="my-[2rem]">
                            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
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
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-blue-500"
                        >{isLoading?"signing in...":"Sign In"}
                            
                        </button>
                        {isLoading && <Loader />}
                    </form>
                    <div className="mt-4">
                        <p className="text-white">
                            New Customer? 
                            <Link to={redirect?`/register?redirect=${redirect}`: "/register"} className="text-violet-400 hover:underline">
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
