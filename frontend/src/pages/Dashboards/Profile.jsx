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
  const [isSocialMediaEditing, setIsSocialMediaEditing] = useState(false);

 
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
  const [updateProfile] = useProfileMutation();

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
    setIsSocialMediaEditing(false);
    handleProfileSave();
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSocialMediaEditToggle = () => {
    setIsSocialMediaEditing(!isSocialMediaEditing);
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
      <div className='p-4 flex gap-4'>
        <div className="relative">
          <img src={profilePicture} alt="User Profile picture" className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-yellow-500" />
          {isEditing && (
            <div className="absolute bottom-0 right-0 bg-gray-600 p-1 rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 "
                onChange={handleProfilePictureChange}
              />
              <FaPlusCircle className="text-green-300 " />
            </div>
          )}
        </div>
        <div className='mt-2 md:mt-5'>
          <h2 className="text-xl md:text-3xl font-bold ">{username}</h2>
          <p className="text-gray-300 text-md md:text-xl">@{username}</p>
        </div>
        {isEditing ? (
          <button onClick={handleSave} title='Save profile' className="ml-auto mt-8 mr-4 hover:bg-green-400 bg-green-500 rounded px-1 h-8">
            Save
          </button>
        ) : (
          <button onClick={handleEditToggle} title='Edit profile' className="ml-auto ">
            <FaEdit />
          </button>
        )}
      </div>

      <div className='bg-gray-700 p-5 border-none rounded-xl'>
        {isEditing ? (
          <div className='flex flex-col gap-4 mb-4'>
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
          <div>
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
          <div className='flex gap-2'>
            {socialMediaLinks && Object.keys(socialMediaLinks).length > 0 ? (
              <h3 className="text-lg font-normal">Social Media Links</h3>
            ) : (
              <h3 className="text-gray-300 font-normal">You have not yet set Social Media Links</h3>
            )}
            {isSocialMediaEditing ? (
              <button onClick={handleSave} title='Save social media links' className="ml-auto hover:bg-green-400 bg-green-500 rounded px-1">
                Save
              </button>
            ) : (
              <button onClick={handleSocialMediaEditToggle} title='Edit social media handles' className="ml-auto ">
                <FaEdit />
              </button>
            )}
          </div>
          <div className={isSocialMediaEditing ? `flex flex-col gap-4` : `flex gap-4`}>
            <div className="flex gap-2">
              <FaFacebook className="cursor-pointer bg-white w-8 h-8 rounded-full p-1 text-blue-600" />
              {isSocialMediaEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.facebook || ''}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  placeholder="Enter Facebook profile link"
                  className='px-2 rounded bg-gray-800 '
                />
              )}
            </div>
            <div className="flex gap-2">
              <FaTwitter className="cursor-pointer bg-white w-8 h-8 rounded-full p-1 text-blue-500" />
              {isSocialMediaEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.twitter || ''}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  placeholder="Enter Twitter profile link"
                  className='px-2 rounded bg-gray-800 '
                />
              )}
            </div>
            <div className="flex gap-2">
              <FaInstagram className="cursor-pointer bg-white w-8 h-8 rounded-full p-1 text-red-500" />
              {isSocialMediaEditing && (
                <input
                  type="url"
                  value={socialMediaLinks.instagram || ''}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  placeholder="Enter Instagram profile link"
                  className='px-2 rounded bg-gray-800 '
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
