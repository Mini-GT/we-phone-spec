import { useEffect, useState } from 'react';
import { Mail, Lock, AlertTriangle, Edit2, UserCheck, UserRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toReadableDate } from '~/utils/formatDate';
import { NavLink, redirect, useNavigate, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import type { MenuNav, UserMenuProps } from '~/types/globals.type';
import UserMenuNav from '~/components/userMenuNav';
import { useAuth } from '~/context/authContext';
import { AnimatePresence, motion } from "motion/react"
import EmailService from '../../services/email.service';
import { requireAuthCookie } from '~/utils/auth';
import authService from '~/services/auth.service';
import { Spinner } from '~/components/spinner';

export function meta({}: MetaFunction) {
  return [
    { title: "Profile - WePhoneSpec" },
    { name: "description", content: "View and manage your profile." },
  ];
}

export async function loader({request}: LoaderFunctionArgs) {
  const userId = await requireAuthCookie(request);
}

export default function Profile() {
  // const [userData, setUserData] = useState<Omit<UserMenuProps, "userId">>({
  //   email: "",
  //   name: "",
  //   createdAt: "",
  //   profileImage: "",
  //   isVerified: false,
  //   role: "USER",
  // })
  const { user, isLoading, error } = useAuth()
  const [showFields, setShowFields] = useState(false);
  
  // useEffect(() => {
  //   if (user) {
  //     setUserData({
  //       email: user.email || "",
  //       name: user.name || "",
  //       createdAt: user.createdAt || "",
  //       profileImage: user.profileImage || "",
  //       isVerified: user.isVerified || false,
  //       role: user.role || "USER",
  //     });
  //   }
  // }, [user]);
  
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

  const sendEmailVerification = async () => {
    try {
      const res = await EmailService.sendEmailVerification()
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }
  
  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">Error loading profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <UserMenuNav tab={"profile"} name={user.name} />

      <div className="w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="text-3xl font-bold text-white flex items-center">
              {/* <span className="mr-3">👤</span> */}
              {/* <UserRound className="mr-3 h-6 w-6" /> */}
              <UserRound fill="#8e44ad" strokeWidth={0} className="mr-3 h-7 w-7" />
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
                  value={user.email}
                  onChange={handleSubmit}
                  className="w-full bg-gray-800 rounded px-4 py-3 text-white focus:outline-none"
                  readOnly
                />
              </div>

              {/* Verification Status */}
              {user.isVerified ? 
              // verified
              <div className="mb-6 inline-flex items-center gap-2 border border-pink-300 text-pink-300 px-4 py-2 rounded-full text-md font-medium">
                <UserCheck className="w-6 h-6" />
                <span>Verified</span>
              </div> :
              // not verified
              <div className="mb-6 bg-gray-900 border border-gray-800 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
                  <div>
                    <p className="text-white">
                      Your account has not been verified.
                      <button 
                        className="ml-1 text-pink-400 cursor-pointer hover:underline"
                        onClick={sendEmailVerification}
                      >
                        Click here
                      </button> to
                      resend verification email.
                    </p>
                  </div>
                </div>
              </div>
              }

              {/* Name */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user.name}
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
                  value={toReadableDate(user.createdAt)}
                  disabled
                  className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                  readOnly
                />
              </div>

              {/* Change Password */}
              <div className="mb-6">
                <button 
                  className="text-gray-400 text-lg flex items-center hover:text-gray-300 cursor-pointer mb-6"
                  onClick={() => setShowFields(!showFields)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change password
                </button>
                <AnimatePresence initial={false}>
                  {showFields && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="space-y-3">
                        <div className="mb-6">
                          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                            CURRENT PASSWORD
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                            NEW PASSWORD
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
                            CONFIRM PASSWORD
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 rounded px-4 py-3 text-white"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Save Button */}
              <button className="w-full bg-pink-300 hover:bg-pink-400 text-gray-900 font-medium py-3 px-4 rounded transition-colors cursor-pointer">
                Save
              </button>
            </div>

            {/* Profile Picture */}
            <div className="mt-8 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="relative">
                  <div className="relative overflow-hidden z-0 w-32 h-32 rounded-full bg-purple-700 flex items-center justify-center border-4 border-purple-600">
                    <img 
                      src={user.profileImage || "/userIcon.svg"} 
                      alt="Profile" 
                      className="object-cover w-full"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:opacity-90">
                    <Edit2 className="h-4 w-4 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}