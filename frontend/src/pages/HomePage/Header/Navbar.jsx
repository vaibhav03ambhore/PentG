import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

  //Mobile View Pages Links
  const Links = [
    { name: "Home", link: "/" },
    { name: "Collection", link: "/collections" },
    { name: "Login", link: "/login" }
];
 return (
    <nav className='mx-4 bg-gray-800 px-5 py-4 rounded-xl '>
      
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-500 hover:text-blue-700">
              PentG
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-12 mr-11">
            <Link to="/" className="text-blue-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link to="/collections" className="text-blue-gray-700 hover:text-blue-500">
              Collections
            </Link>
            <Link to="/login" className="text-blue-gray-700 hover:text-blue-500">
              Login
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-blue-gray-500 border-blue-gray-500 hover:text-blue-gray-700 hover:border-blue-gray-700">
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto w-full `}>
          <ul className={`md:hidden mt-5`}>
             {
               Links.map((Link) => (
                 <li key={Link.name} className='py-3 pl-3 hover:text-blue-800 hover:bg-slate-200 transition-colors duration-500'>
                   <a href={Link.link} className=''>{Link.name}</a>
                 </li>
               ))
             }
          </ul>
        </div>

      
    </nav>
 );
};

export default Navbar;
