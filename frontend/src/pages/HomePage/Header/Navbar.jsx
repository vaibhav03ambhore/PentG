import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import { AiOutlineHome, AiOutlineShopping, AiOutlineUserAdd } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useGetCurrentUserProfileQuery } from '../../../redux/api/users';

const Navbar = () => {
  const {data:user}=useGetCurrentUserProfileQuery();
  const profilePic=user?.profilePicture||'https://th.bing.com/th?id=OIP.Aa3B6uwjU0BFoZrAQG7GzQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2'
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Mobile View Pages Links
  const Links = [
    { name: "Home", link: "/" },
    { name: "Collection", link: "/paintings" },
  ];

  const {userInfo} =useSelector(state => state.auth);
  const userId = userInfo?._id;

  return (
    <nav className='mx-4 bg-gray-800 px-5 py-4 rounded-xl'>
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-500 hover:text-blue-700">
            PentG
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-12 mr-11">
          {Links.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className={`text-blue-gray-700 hover:text-blue-500 ${location.pathname === link.link ? 'text-blue-500' : ''}`}
            >
              {link.name}
            </Link>
          ))}

          { !userInfo && (
            <Link
              to="/register"
              className={`text-blue-gray-700 hover:text-blue-500 ${location.pathname === '/register' ? 'text-blue-500' : ''}`}
            >
              <AiOutlineUserAdd size={26} />
            </Link>
          )}

          {userInfo && (
            <div className="relative ">
               <Link
                  to={`/${userId}/profile`}
                  className={`flex gap-2 text-blue-gray-700 hover:text-blue-500 ${location.pathname === `/${userId}/profile` ? 'text-blue-500' : ''}`}
                >
                  <img src={profilePic} alt="User Profile picture" className="w-6 h-6 rounded-full hover:border-blue-600 " />
                  <h1 className="hover:underline">{userInfo.username}</h1> 
                </Link>          
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-blue-gray-500 border-blue-gray-500 hover:border-gray-600 hover:bg-gray-700">
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-5`}>
        <ul>
          {Links.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className={`${location.pathname === link.link ? 'text-blue-500' : ''}`}
            >
              <li className='flex gap-2 py-3 pl-3 hover:text-blue-800 hover:bg-slate-200 transition-colors duration-500'>
                {link.name === 'Home' && <AiOutlineHome size={26} />}
                {link.name === 'Collection' && <AiOutlineShopping size={26} />}
                <span>{link.name}</span>
              </li>
            </Link>
          ))}

          {!userInfo && (
            <Link
              to='/register'
              className={`${location.pathname === '/register' ? 'text-blue-500' : ''}`}
            >
              <li className='flex gap-2 py-3 pl-3 hover:text-blue-800 hover:bg-slate-200 transition-colors duration-500'>
                <AiOutlineUserAdd size={26} />
                <span>Register</span>
              </li>
            </Link>
          )}

          {userInfo && (
            <div>
              <Link
                to={`/${userId}/profile`}
                className={`${location.pathname === `/${userId}/profile` ? 'text-blue-500' : ''}`}
              >
                <li className='flex gap-2 py-3 pl-3 hover:text-blue-800 hover:bg-slate-200 transition-colors duration-500'>
                  <img src={profilePic} alt="User Profile picture" className="w-6 h-6 rounded-full hover:border-blue-600 " />
                  <h1 className="hover:underline">{userInfo.username}</h1> 
                </li>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
