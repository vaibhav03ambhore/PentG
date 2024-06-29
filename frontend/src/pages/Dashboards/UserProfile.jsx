import React from 'react';
import Profile from './Profile';
import OtherUserProfile from './OtherUserProfile';

import { useGetOthersProfileQuery } from '@/redux/api/users';
import { useParams } from 'react-router-dom';


const UserProfile = () => {
  
  const {id} = useParams();
 
  let isOwnProfile = false;
  const {data,isError,isLoading} = useGetOthersProfileQuery(id);
  if(isError || !data){
    isOwnProfile = true;
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-2">
      <div className="pb-1">
        {
          isOwnProfile?(<Profile />):(isLoading?(<p>Loading...</p>):<OtherUserProfile userInfo={data} />)
        }
        
        
      </div>
    </div>
  );
};

export default UserProfile;
