import React from 'react';
import Profile from './Profile';
import OtherUserProfile from './OtherUserProfile';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UserProfile = () => {
  
  const { id } = useParams();
  let isOwnProfile;
  const {userInfo} = useSelector(state => state.auth);
  const loggedInUserId = userInfo?userInfo._id:null;
  isOwnProfile = loggedInUserId === id;
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-2">
      <div className="pb-1">
        {
          isOwnProfile?(<Profile />):(<OtherUserProfile id={id} />)
        }  
        
      </div>
    </div>
  );
};

export default UserProfile;
