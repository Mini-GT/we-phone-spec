import { useState } from 'react';
import { Mail, Lock, AlertTriangle, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const [email, setEmail] = useState('danieltare07@gmail.com');
  const [name, setName] = useState('MiniGT');
  const [joinDate] = useState('2025-03-26');
  const [isVerified] = useState(false);

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-90 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-white text-3xl font-bold text-center mb-6">Hi, MiniGT</h1>
        
        {/* Navigation */}
        <div className="flex justify-center border-b border-gray-700 pb-1">
          <button className="flex items-center text-pink-300 mx-4 pb-2 border-b-2 border-pink-300">
            <span className="mr-2">👤</span>
            <span>Profile</span>
          </button>
          <button className="flex items-center text-gray-400 mx-4 pb-2">
            <span className="mr-2">🔄</span>
            <span>Continue Watching</span>
          </button>
          <button className="flex items-center text-gray-400 mx-4 pb-2">
            <span className="mr-2">❤️</span>
            <span>Watch List</span>
          </button>
          <button className="flex items-center text-gray-400 mx-4 pb-2">
            <span className="mr-2">🔔</span>
            <span>Notification</span>
          </button>
          <button className="flex items-center text-gray-400 mx-4 pb-2">
            <span className="mr-2">⚙️</span>
            <span>Settings</span>
          </button>
          <button className="flex items-center text-gray-400 mx-4 pb-2">
            <span className="mr-2">📝</span>
            <span>MAL</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={joinDate}
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
                    src="/api/placeholder/150/150" 
                    alt="Profile" 
                    className="object-cover"
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