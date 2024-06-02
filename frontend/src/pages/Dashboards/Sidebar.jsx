import React from 'react';

const Sidebar = ({ activeTab,setActiveTab }) => {
  
  return (
    <div className=" min-w-48  p-4">
      <nav>
        <button onClick={() => setActiveTab('profile')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'profile' ? 'bg-violet-700' : 'bg-violet-400 hover:bg-violet-700'
          }`}>
          Profile
        </button>
        <button onClick={() => setActiveTab('paintings')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'paintings' ? 'bg-violet-700' : 'bg-violet-400 hover:bg-violet-600'
          }`}>
          Paintings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
