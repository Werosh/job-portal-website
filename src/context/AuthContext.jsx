import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoginStatus = () => {
      // Get user info from localStorage
      const token = localStorage.getItem('userToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          setCurrentUser(JSON.parse(userData));
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('userData');
          localStorage.removeItem('userToken');
        }
      }
      
      setLoading(false);
    };
    
    checkLoginStatus();
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsLoggedIn(true);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // Update user profile
  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  // Context value
  const value = {
    currentUser,
    isLoggedIn,
    loading,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;