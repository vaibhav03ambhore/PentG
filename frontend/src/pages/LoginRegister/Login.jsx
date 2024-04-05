import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        //   const res = await login({ email, password }).unwrap();
          console.log(res);
        //   setCredentials({ ...res });
      // navigate(redirect);
          toast.success("Login Successful");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    };

  return (
    <div className=' mt-20'>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full text-black"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>

            <button
              // disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {/* {isLoading ? "Signing In..." : "Sign In"} */}
              Sign In
            </button>

    
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?
              <Link
                // to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default Login






 

 
  

  

  



  

  
    