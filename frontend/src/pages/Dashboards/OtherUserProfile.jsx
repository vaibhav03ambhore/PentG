import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useGetOthersProfileQuery } from "../../redux/api/users";

const OtherUserProfile = ({ id }) => {
  const { data: userInfo, isLoading, error } = useGetOthersProfileQuery(id);
  if (error) {
    if (error.data.message === "UserNotFoundError") {
      return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-2">
          👤User not found!!
        </div>
      );
    }
  }
  if(isLoading){
    return<div>Loading...</div>
  }

  const {
    username,
    email,
    phoneNumber,
    location,
    bio,
    profilePicture,
    socialMediaLinks,
  } = userInfo;

  return (
    <>
      {isLoading ? (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-2">
          Loading...
        </div>
      ) : (
        <div className="bg-gray-800 flex flex-col gap-3 rounded-b-2xl">
          <div className="p-4 flex flex-row gap-2">
            <div className="flex justify-start ">
              <img
                src={
                  profilePicture ||
                  "https://th.bing.com/th?id=OIP.Aa3B6uwjU0BFoZrAQG7GzQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
                }
                alt="User Profile picture"
                className="w-20 h-20 md:w-28 md:h-28 rounded-full"
              />
            </div>
            <div className="mt-4 md:mt-5">
              <h2 className="text-xl md:text-3xl font-bold ">{username}</h2>
              <p className="text-gray-300 text-md md:text-xl">@{username}</p>
            </div>
          </div>
          <div className="bg-purple-900 p-5 border-none rounded-xl">
            <div className="flex flex-col sm:text-md text-sm px-1">
              <p className="mb-4 text-slate-300 ">
                {bio || "No bio available"}
              </p>
              <div className="mb-4">
                <p className="font-semibold ">
                  Email:{" "}
                  <span
                    className={
                      email
                        ? `font-normal italic underline text-yellow-500`
                        : `font-normal italic text-gray-400`
                    }
                  >
                    {email || "No email available"}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold ">
                  Phone Number:{" "}
                  <span
                    className={
                      phoneNumber
                        ? `font-normal italic text-yellow-500`
                        : `font-normal italic text-gray-400`
                    }
                  >
                    {phoneNumber || "No phone number available"}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold ">
                  Location:{" "}
                  <span
                    className={
                      location
                        ? `font-normal italic text-yellow-500`
                        : `font-normal italic text-gray-400`
                    }
                  >
                    {location || "No location available"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-2 ">
              <div className="text-pink-600 font-mono">
                {socialMediaLinks.instagram ||
                socialMediaLinks.facebook ||
                socialMediaLinks.twitter ? (
                  <h3 className="text-lg font-normal">Social Media Links</h3>
                ) : (
                  <h3 className="font-normal">
                    No Social Media Links available
                  </h3>
                )}
              </div>
              <div className={`flex flex-row gap-4`}>
                {socialMediaLinks.facebook && (
                  <a
                    href={socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook
                      size={35}
                      className="cursor-pointer hover:text-white hover:bg-blue-600 bg-white rounded-full p-1 text-blue-600"
                    />
                  </a>
                )}
                {socialMediaLinks.twitter && (
                  <a
                    href={socialMediaLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter
                      size={35}
                      className="cursor-pointer hover:text-white hover:bg-blue-500 bg-white rounded-full p-1 text-blue-500"
                    />
                  </a>
                )}
                {socialMediaLinks.instagram && (
                  <a
                    href={socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram
                      size={35}
                      className="cursor-pointer hover:text-white hover:bg-red-600 bg-white rounded-full p-1 text-red-500"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtherUserProfile;
