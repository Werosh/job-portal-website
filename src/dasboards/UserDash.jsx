import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService } from "../service/api";

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    bio: '',
    location: '',
    joinDate: '',
    phoneNumber: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [securitySettings, setSecuritySettings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'activity') {
      fetchUserActivity();
    } else if (activeTab === 'security') {
      fetchSecuritySettings();
    }
  }, [activeTab]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await userService.getUserProfile();
      if (response.success) {
        setUserData({
          fullName: response.data.fullName || '',
          email: response.data.email || '',
          bio: response.data.bio || '',
          location: response.data.location || '',
          joinDate: formatDate(response.data.createdAt) || '',
          phoneNumber: response.data.phoneNumber || ''
        });
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserActivity = async () => {
    setLoading(true);
    try {
      const response = await userService.getUserActivity();
      if (response.success) {
        setRecentActivities(response.activities);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load activity data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSecuritySettings = async () => {
    setLoading(true);
    try {
      const response = await userService.getSecuritySettings();
      if (response.success) {
        setSecuritySettings(response.settings);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load security settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      
      try {
        setLoading(true);
        const response = await userService.uploadProfileImage(file);
        if (response.success) {
          setSuccessMessage('Profile image updated successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setError(response.message);
          setTimeout(() => setError(''), 3000);
        }
      } catch (err) {
        setError('Failed to upload image');
        setTimeout(() => setError(''), 3000);
      } finally {
        setLoading(false);
      }
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
    if (isEditing) {
      // If we're canceling, revert changes
      fetchUserProfile();
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await userService.updateUserProfile(userData);
      if (response.success) {
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsEditing(false);
      } else {
        setError(response.message);
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSecuritySettingChange = async (settingId, enabled) => {
    try {
      setLoading(true);
      const response = await userService.updateSecuritySetting(settingId, enabled);
      if (response.success) {
        setSuccessMessage('Security setting updated');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Update the state to reflect the change
        setSecuritySettings(prevSettings => 
          prevSettings.map(setting => 
            setting.id === settingId ? { ...setting, enabled } : setting
          )
        );
      } else {
        setError(response.message);
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to update security setting');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Poppins'] w-full min-h-screen flex flex-col bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      {/* Header Section */}
      <div className="w-full p-4 bg-gradient-to-r from-[#093028] to-[#237A57] rounded-xl mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-100">My Dashboard</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <button 
              onClick={handleLogout} 
              className="bg-red-600/80 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/80 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-emerald-500/80 text-white p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}

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
                      {userData.fullName ? userData.fullName.split(' ').map(name => name[0]).join('') : currentUser?.fullName?.split(' ').map(name => name[0]).join('') || 'U'}
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
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold text-amber-100 mb-1">
                {userData.fullName || currentUser?.fullName || 'User'}
              </h2>
              <p className="text-amber-200/80 mb-4">
                {userData.email || currentUser?.email || ''}
              </p>
              <div className="w-full border-t border-emerald-600/30 pt-4 mt-2">
                <nav className="space-y-2">
                  <button 
                    onClick={() => handleTabChange('profile')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'profile' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                    disabled={loading}
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => handleTabChange('activity')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'activity' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                    disabled={loading}
                  >
                    Recent Activity
                  </button>
                  <button 
                    onClick={() => handleTabChange('security')} 
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'security' ? 'bg-emerald-600/30 text-amber-100' : 'text-amber-200 hover:bg-emerald-600/20'}`}
                    disabled={loading}
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
                      disabled={loading}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleEditToggle} 
                        className="bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveChanges} 
                        className="bg-emerald-600/80 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                        disabled={loading}
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
                          disabled={loading}
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
                          disabled={loading}
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
                          disabled={loading}
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
                          disabled={loading}
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
                        disabled={loading}
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
                  {recentActivities.length > 0 ? (
                    <ul className="divide-y divide-emerald-600/20">
                      {recentActivities.map(activity => (
                        <li key={activity.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <p className="text-amber-100">{activity.action}</p>
                            <p className="text-amber-300/70 text-sm mt-1 md:mt-0">{formatDate(activity.date)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-amber-200 text-center py-4">No recent activities found</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-amber-100 mb-6">Security Settings</h2>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
                  {securitySettings.length > 0 ? (
                    <ul className="divide-y divide-emerald-600/20">
                      {securitySettings.map(setting => (
                        <li key={setting.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <p className="text-amber-100">{setting.name}</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={setting.enabled}
                                onChange={() => handleSecuritySettingChange(setting.id, !setting.enabled)}
                                disabled={loading}
                              />
                              <div className="w-11 h-6 bg-emerald-900/70 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-amber-200 text-center py-4">No security settings found</p>
                  )}

                  <div className="mt-8 pt-6 border-t border-emerald-600/20">
                    <h3 className="text-xl font-semibold text-amber-100 mb-4">Password</h3>
                    <button 
                      className="bg-amber-500/80 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      onClick={() => navigate('/change-password')}
                      disabled={loading}
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