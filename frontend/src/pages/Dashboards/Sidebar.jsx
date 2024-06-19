import React from 'react';
import { useNavigate } from 'react-router';

import { useLogoutMutation } from '../../redux/api/users';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';


const Sidebar = ({ activeTab, setActiveTab }) => {
  
  
  const [logoutApiCall] = useLogoutMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler =async () => {

    try{

      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');

    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="min-w-48 p-4">
      <nav>
        <button onClick={() => setActiveTab('profile')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'profile' ? 'bg-blue-600 ' : 'bg-purple-400 hover:bg-blue-600'
          }`}>
          Profile
        </button>
        <button onClick={() => setActiveTab('paintings')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'paintings' ? 'bg-blue-600 ' : 'bg-purple-400 hover:bg-blue-600'
          }`}>
          Paintings
        </button>
        <button onClick={
          () =>{
            setActiveTab('logout');
            logoutHandler();
          } 
        } className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'logout' ? 'bg-blue-600 ' : 'bg-purple-400 hover:bg-blue-600'
          }`}>
          Log out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
