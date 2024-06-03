import React from 'react';
import Profile from './Profile';
import i1 from '../../assets/p4.jpg';

const user = {
  profilePicture: i1,
  fullName: "John Doe",
  username: "johndoe",
  bio: "Artist based in New York, specializing in modern art.",
  email: "johndoe@example.com",
  phoneNumber: "123-456-7890",
  socialMediaLinks: [
    { platform: "Instagram", url: "https://instagram.com/johndoe" },
    { platform: "Twitter", url: "https://twitter.com/johndoe" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
  ],
  location: "New York, USA"
};

const UserProfile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">User Profile</h1>
      <div className="pb-1 p-5">
        <Profile user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
