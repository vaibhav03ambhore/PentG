import React, { useState } from 'react';

import Sidebar from './Sidebar';
import Paintings from './Paintings';
import UserProfile from './UserProfile';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="sm:flex flex-row h-full ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className=" w-full min-h-full bg-slate-800 border-none rounded-r-xl">
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'paintings' && <Paintings />}
      </div>
    </div>
  );
};

export default UserDashboard;

