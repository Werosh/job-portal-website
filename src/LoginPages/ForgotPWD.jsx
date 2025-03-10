import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    message: ''
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setSubmitStatus({
      submitted: true,
      message: `Password reset instructions sent to ${email}`
    });
  };

  const navigate = useNavigate();
  const loginNav = () => {
    navigate("/login");
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl">" No Worries,</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">We'll Help</h1>
          </div>
          <div className="text-5xl md:text-7xl lg:text-8xl mt-4 md:mt-6 lg:mt-10">
            <h1>Recover</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">Your Access "</h1>
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
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-6 text-center">Forgot Password</h2>
            
            {!submitStatus.submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="mb-6">
                  <p className="text-amber-100 text-lg mb-4">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-amber-100 mb-2 text-lg">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 
                  text-white font-bold py-3 px-4 rounded-lg mt-6 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="bg-emerald-600/30 border border-emerald-500 rounded-lg p-4 mb-6">
                  <p className="text-amber-100 text-lg">{submitStatus.message}</p>
                </div>
                <p className="text-amber-100 mb-6">
                  Please check your email and follow the instructions to reset your password.
                </p>
              </div>
            )}
            
            <div className="text-center mt-8">
              <p className="text-amber-100">
                Remember your password? <span><h1> </h1></span>
                <button onClick={loginNav}>
                  <a className="text-amber-300 hover:text-amber-100 underline font-medium">Back to Login</a>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;