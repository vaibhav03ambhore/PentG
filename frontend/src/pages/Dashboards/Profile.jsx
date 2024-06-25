// Profile.jsx
import React, { useState,useEffect } from 'react';
import { FaFacebook, FaTwitter, FaEdit, FaPlusCircle, FaInstagram } from 'react-icons/fa';
import { useProfileMutation } from '../../redux/api/users';
import { useSelector ,useDispatch} from 'react-redux';
import { setCredential } from '@/redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const Profile = () => {
  const {userInfo} = useSelector((state) => state.auth);
  
  const [username, setUsername] = useState(userInfo.username ||'');
  const [email, setEmail] = useState(userInfo.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || '');
  const [location, setLocation] = useState(userInfo.location || '');
  const [bio, setBio] = useState(userInfo.bio || '');
  const [profilePicture, setProfilePicture] = useState(userInfo.profilePicture || '');
  const [profilePictureFile,setProfilePictureFile]=useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState(userInfo.socialMediaLinks || {facebook:'',twitter:'',instagram:''});

  const [isEditing, setIsEditing] = useState(false);

 
  useEffect(()=>{
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);
    setLocation(userInfo.location);
    setBio(userInfo.bio);
    setProfilePicture(userInfo.profilePicture);
    setSocialMediaLinks(userInfo.socialMediaLinks||{});
  
  },[userInfo]);

  const dispatch=useDispatch();
  const [updateProfile,{isLoading}] = useProfileMutation();
  
  const handleProfileSave = async () => {
    
    
    try {
      const formData= new FormData();
      formData.append('_id',userInfo._id);
      formData.append('username',username);
      formData.append('email',email);
      formData.append('phoneNumber',phoneNumber);
      formData.append('location',location);
      formData.append('bio',bio);
      formData.append('profilePicture',profilePictureFile);
      formData.append('socialMediaLinks',JSON.stringify(socialMediaLinks));

      const res = await updateProfile(formData).unwrap();
      
      dispatch(setCredential({...res}));
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile:', err?.data?.message || err.error);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    handleProfileSave();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePictureFile(file);
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setSocialMediaLinks(prevLinks => ({
      ...prevLinks,
      [platform]: value,
    }));
  };

  return (
    <div className='bg-gray-800 rounded-b-2xl'>
      <div className='p-4 flex flex-col sm:flex-row gap-4 mb-2'>
        <div className="flex justify-start ">
          <img src={profilePicture ||' https://th.bing.com/th?id=OIP.Aa3B6uwjU0BFoZrAQG7GzQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2'} alt="User Profile picture" className="w-20 h-20 md:w-28 md:h-28 rounded-full" />
          {isEditing && (
            <div className="flex self-end -ml-8 md:mr-4 h-6 bg-gray-600 p-1 rounded-full">
              <input
                type="file"
                accept="image/*"
                className=" w-4 h-full inset-0 opacity-1 -mr-4"
                onChange={handleProfilePictureChange}
              />
              <FaPlusCircle className="text-yellow-500  cursor-pointer " />
              
            </div>
          )}
        </div>
        <div className='mt-2 md:mt-5'>
          <h2 className="text-xl md:text-3xl font-bold ">{username}</h2>
          <p className="text-gray-300 text-md md:text-xl">@{username}</p>
        </div>
        {isEditing ? (
          <button onClick={handleSave} title='update profile' className="ml-auto mt-4 md:mt-8 md:mr-4 hover:bg-green-400 bg-green-500 rounded px-1 h-8">
             Update
          </button>
        ) : (isLoading?(
          <button className="ml-auto mt-4 md:mt-8 md:mr-4 bg-green-500 rounded px-1 h-8">
            Updating...
          </button>
            ):(
              <button onClick={handleEditToggle} title='Edit profile' className="ml-auto mt-4 md:mt-8 md:mr-4">
                <FaEdit />
              </button>
            )
        )}
      </div>

      <div className='bg-gray-700 p-5 border-none rounded-xl'>
        {isEditing ? (
          <div className='sm:text-md text-sm flex flex-col gap-4 mb-4'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className='p-2 rounded bg-gray-800 '
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className='p-2 rounded bg-gray-800 '
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className='p-2 rounded bg-gray-800 '
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className='p-2 rounded bg-gray-800 '
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className='p-2 rounded bg-gray-800 '
            />
          </div>
        ) : (
          <div className='flex flex-col sm:text-md text-sm'>
            <p className="mb-4 text-slate-300 ">{bio?bio:'Edit profile to set bio'}</p>
            <div className="mb-4">
              <p className="font-semibold ">Email: <span className={email ? `font-normal italic underline text-yellow-500` : `font-normal italic text-gray-400`}>{email ? email : "edit profile to set email"}</span></p>
            </div>
            <div className="mb-4">
              <p className="font-semibold ">Phone Number: <span className={phoneNumber ? `font-normal italic text-yellow-500` : `font-normal italic text-gray-400`}>{phoneNumber ? phoneNumber : "edit profile to set phone number"}</span></p>
            </div>
            <div className='mb-4'>
              <p className="font-semibold ">Location: <span className={location ? `font-normal italic text-yellow-500` : `font-normal italic text-gray-400`}>{location ? location : "edit profile to set location"}</span></p>
            </div>
          </div>
        )}
        <div className='flex flex-col gap-4 bg-blue-600 p-2'>
          <div>
            {socialMediaLinks.instagram==" " && socialMediaLinks.facebook==" " && socialMediaLinks.twitter==" " ? (
              <h3 className="text-lg font-normal">Social Media Links</h3>
            ) : (
              <h3 className="text-gray-300 font-normal">You have not yet set Social Media Links</h3>
            )}
          </div>
          <div className={isEditing ? `flex flex-col gap-4 md:text-md text-sm` : `flex flex-row gap-4`}>
            <div className="flex flex-row  gap-2 ">
              <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={35} className="cursor-pointer bg-white rounded-full p-1 text-blue-600" />
              </a>
              {isEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.facebook || ''}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  placeholder="Enter Facebook profile link"
                  className='px-2 rounded w-full bg-gray-800 '
                />
              )}
            </div>
            <div className="flex flex-row gap-2">
              <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={35} className="cursor-pointer bg-white rounded-full p-1 text-blue-500" />
              </a>
              {isEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.twitter || ''}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  placeholder="Enter Twitter profile link"
                  className='px-2 rounded w-full bg-gray-800 '
                />
              )}
            </div>
            <div className="flex flex-row gap-2">
              <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={35} className="cursor-pointer bg-white rounded-full p-1 text-red-500" />
              </a>
              {isEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.instagram || ''}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  placeholder="Enter Instagram profile link"
                  className='px-2 rounded w-full bg-gray-800 '
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Profile;
