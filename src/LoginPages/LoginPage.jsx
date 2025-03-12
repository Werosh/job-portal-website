import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Redirect to dashboard or home page
        navigate('/');
      } else {
        setError(authError || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signupnav = () => {
    navigate("/signup");
  }
  
  const pwdrecovery = () => {
    navigate("/pwdrec");
  }

  return (
    <div className="font-['Poppins'] w-full flex bg-gradient-to-r from-[#16222A] to-[#3A6073] py-8 px-4">
      <div className="w-full h-auto xl:h-[calc(100vh-150px)] lg:h-[calc(100vh-110px)] p-4 md:p-8 lg:p-10 
        bg-gradient-to-r from-[#093028] to-[#237A57] 
        rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] 
        rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] 
        rounded-[20px] md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-center justify-center">
        
        {/* Motivational Text Section */}
        <div className="w-full lg:w-[50%] py-8 lg:h-full flex flex-col items-center lg:items-start justify-center lg:pl-4 
          font-['Poppins'] font-bold text-amber-100 text-center lg:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">" Welcome</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">Back,</h1>
          </div>
          <div className="text-5xl md:text-7xl lg:text-8xl mt-4 md:mt-6 lg:mt-10">
            <h1>Continue</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">Your Journey "</h1>
          </div>
          
          {/* Decorative elements */}
          <div className="relative w-full max-w-md h-32 md:h-40 mt-8">
            <div className="absolute top-4 right-8 w-10 md:w-16 h-10 md:h-16 bg-lime-300 opacity-40 rotate-12 animate-pulse"></div>
            <div className="absolute top-1/4 left-4 w-8 md:w-12 h-8 md:h-12 bg-green-200 opacity-30 rotate-45"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 md:w-20 h-12 md:h-20 bg-emerald-300 opacity-30 -rotate-12"></div>
            <div className="absolute bottom-0 left-1/3 w-6 md:w-8 h-6 md:h-8 bg-teal-400 opacity-50 rotate-6 animate-bounce"></div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-[50%] p-6 md:p-8 lg:p-10">
          <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-[30px] shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6 text-center">Login</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/30 border border-red-500 rounded-lg text-amber-100">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block text-amber-100 mb-2 text-lg">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-amber-100 mb-2 text-lg">Password</label>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 bg-emerald-900/30 border border-emerald-600/50 rounded focus:ring-amber-200"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-amber-100">Remember me</label>
                </div>
                <button type="button" onClick={pwdrecovery} className="text-amber-300 hover:text-amber-100 text-sm font-medium">
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 
                text-white font-bold py-3 px-4 rounded-lg mt-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-amber-100">
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    onClick={signupnav} 
                    className="text-amber-300 hover:text-amber-100 underline font-medium"
                  >
                    Sign Up
                  </button> 
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;