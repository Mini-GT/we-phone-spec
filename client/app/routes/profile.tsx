import { useEffect, useState } from 'react';
import { Mail, Lock, AlertTriangle, Edit2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toReadableDate } from '~/utils/formatDate';
import { NavLink, redirect, useNavigate } from 'react-router';
import Profile from '~/components/profile';
import type { MenuNav, UserMenuProps } from '~/types/globals.type';
import LikeList from '~/routes/likeList';
import UserMenuNav from '~/components/userMenuNav';
import { useAuth } from '~/context/authContext';



export default function UserSettings() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<Omit<UserMenuProps, "userId">>({
    email: "",
    name: "",
    createdAt: "",
    profileImage: "",
  })
  const { user, isLoading, error } = useAuth()
  const [userMenu, setUserMenu] = useState<MenuNav>("profile");
  
  useEffect(() => {
    console.log(user)
    if (user) {
      setUserData({
        email: user.email || "",
        name: user.name || "",
        createdAt: user.createdAt || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await userService.updateUser(userData);
      // Show success message
    } catch (error) {
      // Handle error
      console.error("Failed to update profile:", error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">Error loading profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <UserMenuNav tab={"profile"} name={userData.name} />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              <span className="mr-3">👤</span>
              Edit Profile
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pr-0 md:pr-8">
              {/* Email */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={handleSubmit}
                  className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                />
              </div>

              {/* Verification Status */}
              <div className="mb-6 bg-gray-900 border border-gray-800 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
                  <div>
                    <p className="text-white">
                      Your account has not been verified. <span className="text-pink-400 cursor-pointer hover:underline">Click here</span> to
                      resend verification email.
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={handleSubmit}
                  className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                />
              </div>

              {/* Join Date */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                  Joined
                </label>
                <input
                  type="text"
                  value={toReadableDate(userData.createdAt)}
                  disabled
                  className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                />
              </div>

              {/* Change Password */}
              <div className="mb-6">
                <button className="text-gray-400 flex items-center hover:text-gray-300">
                  <Lock className="h-4 w-4 mr-2" />
                  Change password
                </button>
              </div>

              {/* Save Button */}
              <button className="w-full bg-pink-300 hover:bg-pink-400 text-gray-900 font-medium py-3 px-4 rounded transition-colors">
                Save
              </button>
            </div>

            {/* Profile Picture */}
            <div className="mt-8 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-purple-700 flex items-center justify-center overflow-hidden border-4 border-purple-600">
                  <img 
                    src={userData.profileImage || "/userIcon.svg"} 
                    alt="Profile" 
                    className="object-cover w-full"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
                  <Edit2 className="h-4 w-4 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}