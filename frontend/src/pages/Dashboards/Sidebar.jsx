import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  
  return (
    <div className="min-w-48 p-4">
      <nav>
        <button onClick={() => setActiveTab('profile')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-blue-400 hover:bg-blue-600'
          }`}>
          Profile
        </button>
        <button onClick={() => setActiveTab('paintings')} className={`block w-full text-left mb-2 p-2 rounded-xl ${
            activeTab === 'paintings' ? 'bg-purple-600 text-white' : 'bg-purple-400 hover:bg-purple-600'
          }`}>
          Paintings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
