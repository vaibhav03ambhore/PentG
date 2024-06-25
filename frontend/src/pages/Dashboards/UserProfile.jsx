import React, { useEffect, useState } from 'react';
import Profile from './Profile';

const UserProfile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-2">
      <div className="pb-1">
        <Profile />
      </div>
    </div>
  );
};

export default UserProfile;
