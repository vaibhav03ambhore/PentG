import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className='bg-gray-800 rounded-b-2xl'>
      <div className='p-4 flex gap-4'>
        <img src={user.profilePicture} alt="User Photo" className="w-20 h-20 md:w-32 md:h-32 rounded-full" />
        <div className='mt-2 md:mt-5'>
          <h2 className="text-xl md:text-3xl font-bold text-white">{user.fullName}</h2>
          <p className="text-gray-300 text-md md:text-xl">@{user.username}</p>
        </div>
      </div>

      <div className='bg-gray-700 p-5 border-none rounded-xl'>
        <p className="mb-4 text-white">{user.bio}</p>
        <div className="mb-4">
          <p className="font-semibold text-white">Email: <span className='font-normal italic'>{user.email}</span></p>
        </div>
        {user.phoneNumber && (
          <div className="mb-4">
            <p className="font-semibold text-white">Phone Number: <span className='font-normal italic'>{user.phoneNumber}</span></p>
          </div>
        )}

        {user.location && (
          <div className='mb-4'>
            <p className="font-semibold text-white">Location: <span className='font-normal italic'>{user.location}</span></p>
          </div>
        )}

        {user.socialMediaLinks && (
          <div className="flex gap-4">
            {user.socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:text-blue-300">{link.platform}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
