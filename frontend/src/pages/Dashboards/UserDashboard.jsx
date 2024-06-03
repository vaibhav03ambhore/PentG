import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Paintings from './Paintings';
import UserProfile from './UserProfile';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-slate-800  sm:flex flex-row h-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full min-h-full bg-gray-900 pt-4 pl-2 border-none rounded-r-xl">
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'paintings' && <Paintings />}
      </div>
    </div>
  );
};

export default UserDashboard;
