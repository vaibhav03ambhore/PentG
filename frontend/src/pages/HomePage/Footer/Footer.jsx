import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrGithub } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-cyan-950 rounded-t-md text-gray-100 py-10 px-2 flex flex-col items-center justify-center">
      <h2 className="text-lg sm:text-2xl font-extrabold mb-5 text-slate-300">Visit Me On</h2>
      <div className="flex gap-8 mb-4 text-2xl">
        <a href="https://www.instagram.com/pentg_/" target="_blank" rel="noreferrer">
           <FaLinkedin />
        </a>
        <a href="https://twitter.com/TechBhav" target="_blank" rel="noreferrer">
          <FaSquareXTwitter />
        </a>
        <a href="https://github.com/vaibhav03ambhore/" target="_blank" rel="noreferrer">
          <GrGithub ></GrGithub>
        </a>
      </div>
      <h1 className="text-2xl font-bold mt-4">PentG</h1>
      <div className=' flex flex-col sm:flex-row items-center justify-center gap-2 '>
        <p className="text-sm mt-2 bg-inherit">Developed by <span className="font-bold underline text-blue-500"><a href='sldkf' target='blank'>CodeBro</a></span></p>
    
        <p className="text-sm mt-2 bg-inherit"><span className='hidden sm:inline'>|| </span>Source code is on <a href='https://github.com/vaibhav03ambhore/PentinG' target='blank' className='text-purple-500 underline'>Github</a></p>
      </div>
    </footer>
  );
};

export default Footer;
