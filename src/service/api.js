// src/service/api.js

// You already seem to have an authService, so let's extend the file with userService

// Base API URL - adjust this to match your backend
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = 'http://localhost:5000';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Auth service functions
export const authService = {
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          message: data.message || 'Login failed' 
        };
      }
      
      return { 
        success: true, 
        user: data.user, 
        token: data.token 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  },
  
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          message: data.message || 'Registration failed' 
        };
      }
      
      return { 
        success: true, 
        user: data.user, 
        token: data.token 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  }
};

// User service functions
// Update the userService in src/service/api.js

// Helper function to get auth header and current user email
const getCurrentUserEmail = () => {
    // In a real app with JWT, you'd decode the token
    // For now, we'll get it from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || '';
  };
  
  // User service functions
  export const userService = {
    async getUserProfile() {
      try {
        const email = getCurrentUserEmail();
        if (!email) {
          return { 
            success: false, 
            message: 'User email not found. Please log in again.' 
          };
        }
        
        const response = await fetch(`${API_URL}/user/profile?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to fetch user profile' 
          };
        }
        
        return { 
          success: true, 
          data: data 
        };
      } catch (error) {
        console.error('Get profile error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    async updateUserProfile(userData) {
      try {
        const email = getCurrentUserEmail();
        if (!email) {
          return { 
            success: false, 
            message: 'User email not found. Please log in again.' 
          };
        }
        
        // Ensure email is included in userData
        const updatedUserData = {
          ...userData,
          email
        };
        
        const response = await fetch(`${API_URL}/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify(updatedUserData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to update user profile' 
          };
        }
        
        return { 
          success: true, 
          data: data 
        };
      } catch (error) {
        console.error('Update profile error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    async uploadProfileImage(imageFile) {
      try {
        const email = getCurrentUserEmail();
        if (!email) {
          return { 
            success: false, 
            message: 'User email not found. Please log in again.' 
          };
        }
        
        const formData = new FormData();
        formData.append('profileImage', imageFile);
        
        const response = await fetch(`${API_URL}/user/profile/image?email=${encodeURIComponent(email)}`, {
          method: 'POST',
          headers: {
            ...getAuthHeader()
            // Note: Don't set Content-Type here as it will be set automatically for FormData
          },
          body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to upload profile image' 
          };
        }
        
        return { 
          success: true, 
          imageUrl: data.imageUrl 
        };
      } catch (error) {
        console.error('Image upload error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    // The other methods remain mostly the same, just using simpler endpoints
    // since our backend creates mock data
    
    async getUserActivity() {
      try {
        const response = await fetch(`${API_URL}/user/activity`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to fetch user activity' 
          };
        }
        
        return { 
          success: true, 
          activities: data 
        };
      } catch (error) {
        console.error('Get activity error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    async getSecuritySettings() {
      try {
        const response = await fetch(`${API_URL}/user/security`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to fetch security settings' 
          };
        }
        
        return { 
          success: true, 
          settings: data 
        };
      } catch (error) {
        console.error('Get security settings error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    async updateSecuritySetting(settingId, enabled) {
      try {
        const response = await fetch(`${API_URL}/user/security/${settingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify({ enabled })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: data.message || 'Failed to update security setting' 
          };
        }
        
        return { 
          success: true 
        };
      } catch (error) {
        console.error('Update security setting error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    },
    
    async changePassword(passwordData) {
      try {
        const email = getCurrentUserEmail();
        if (!email) {
          return { 
            success: false, 
            message: 'User email not found. Please log in again.' 
          };
        }
        
        const data = {
          ...passwordData,
          email
        };
        
        const response = await fetch(`${API_URL}/user/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify(data)
        });
        
        const responseData = await response.json();
        
        if (!response.ok) {
          return { 
            success: false, 
            message: responseData.message || 'Failed to change password' 
          };
        }
        
        return { 
          success: true 
        };
      } catch (error) {
        console.error('Change password error:', error);
        return { 
          success: false, 
          message: 'Network error. Please try again.' 
        };
      }
    }
  };