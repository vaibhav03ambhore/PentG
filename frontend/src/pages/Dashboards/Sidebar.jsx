import React from 'react';

const Sidebar = ({ setActiveTab }) => {
  
  return (
    <div className=" min-w-48  p-4">
      <nav>
        <button onClick={() => setActiveTab('profile')} className="block w-full text-left mb-2 hover:bg-pink-600 bg-pink-400 rounded-xl p-2">
          Profile
        </button>
        <button onClick={() => setActiveTab('paintings')} className="block w-full text-left mb-2  hover:bg-pink-600 bg-pink-400 rounded-xl p-2">
          Paintings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
