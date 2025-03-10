import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend developer passionate about creating beautiful UI experiences.',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    phoneNumber: '(555) 123-4567'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const logoutNav = () => {
    navigate("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you would typically send updated data to your backend
    console.log('Saving user data:', userData);
    console.log('Profile image:', profileImage);
    setIsEditing(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // These would be populated from your backend in a real application
  const recentActivities = [
    { id: 1, action: 'Changed profile picture', date: 'March 5, 2025' },
    { id: 2, action: 'Updated bio information', date: 'March 3, 2025' },
    { id: 3, action: 'Logged in from new device', date: 'February 28, 2025' },
    { id: 4, action: 'Password changed', date: 'February 15, 2025' }
  ];

  const securitySettings = [
    { id: 1, name: 'Two-factor authentication', enabled: false },
    { id: 2, name: 'Login notifications', enabled: true },
    { id: 3, name: 'Remember devices', enabled: true }
  ];

  return (
    <div className="font-['Poppins'] w-full min-h-screen flex flex-col bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      {/* Header Section */}
      <div className="w-full p-4 bg-gradient-to-r from-[#093028] to-[#237A57] rounded-xl mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-100">My Dashboard</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <button 
              onClick={logoutNav} 
              className="bg-red-600/80 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-gradient-to-r from-[#093028] to-[#237A57] rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-emerald-500/50 shadow-lg">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-emerald-800 flex items-center justify-center text-amber-100 text-4xl font-bold">
                      {userData.fullName.split(' ').map(name => name[0]).join('')}
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload}
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold text-amber-100 mb-1">{userData.fullName}</h2>
              <p className="text-amber-200/80 mb-4">{userData.email}</p>
              <div className="w-full border-t border-emerald-600/30 pt-4 mt-2">
                <nav className="space-y-2">
                  <button 
                    onClick={() => handleTabChange('profile')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'profile' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => handleTabChange('activity')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'activity' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                  >
                    Recent Activity
                  </button>
                  <button 
                    onClick={() => handleTabChange('security')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'security' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                  >
                    Security
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="w-full lg:w-3/4">
          <div className="bg-gradient-to-r from-[#093028] to-[#237A57] rounded-xl shadow-lg p-6 h-full">
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-amber-100">Profile Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={handleEditToggle} 
                      className="bg-amber-500/80 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleEditToggle} 
                        className="bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveChanges} 
                        className="bg-emerald-600/80 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-amber-100 mb-2">Full Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="fullName" 
                          value={userData.fullName} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        />
                      ) : (
                        <p className="text-amber-200 bg-emerald-900/20 p-3 rounded-lg">{userData.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-amber-100 mb-2">Email Address</label>
                      {isEditing ? (
                        <input 
                          type="email" 
                          name="email" 
                          value={userData.email} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        />
                      ) : (
                        <p className="text-amber-200 bg-emerald-900/20 p-3 rounded-lg">{userData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-amber-100 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="phoneNumber" 
                          value={userData.phoneNumber} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        />
                      ) : (
                        <p className="text-amber-200 bg-emerald-900/20 p-3 rounded-lg">{userData.phoneNumber}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-amber-100 mb-2">Location</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="location" 
                          value={userData.location} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                        />
                      ) : (
                        <p className="text-amber-200 bg-emerald-900/20 p-3 rounded-lg">{userData.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-amber-100 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea 
                        name="bio" 
                        value={userData.bio} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200 min-h-24"
                      />
                    ) : (
                      <p className="text-amber-200 bg-emerald-900/20 p-3 rounded-lg">{userData.bio}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="text-amber-300">Member since: {userData.joinDate}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h2 className="text-2xl font-bold text-amber-100 mb-6">Recent Activity</h2>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                  <ul className="divide-y divide-emerald-600/20">
                    {recentActivities.map(activity => (
                      <li key={activity.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="text-amber-100">{activity.action}</p>
                          <p className="text-amber-300/70 text-sm mt-1 md:mt-0">{activity.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-amber-100 mb-6">Security Settings</h2>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                  <ul className="divide-y divide-emerald-600/20">
                    {securitySettings.map(setting => (
                      <li key={setting.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p className="text-amber-100">{setting.name}</p>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                            <div className="w-11 h-6 bg-emerald-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-emerald-600/20">
                    <h3 className="text-xl font-semibold text-amber-100 mb-4">Password</h3>
                    <button 
                      className="bg-amber-500/80 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;