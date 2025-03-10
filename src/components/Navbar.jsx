import React, { useState } from "react";
import { Menu, X, User, Briefcase, ChevronDown, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Make sure this path is correct - adjust if your file structure is different
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Add a fallback in case useAuth is undefined
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn || false;
  const currentUser = auth?.currentUser || null;
  const logout = auth?.logout || (() => console.warn('Logout function not available'));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const navigate = useNavigate();

  const signupnav = () => {
    navigate("/signup");
  };
  
  const loginnav = () => {
    navigate("/login");
  };

  const profileNav = () => {
    setShowProfileMenu(false); // Close the profile menu
    navigate("/userprofile");
  };

  const handleLogout = () => {
    setShowProfileMenu(false); // Close the profile menu
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#093028] to-[#237A57] text-amber-100 py-4 px-6 md:px-10 font-['Poppins'] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://img.freepik.com/premium-vector/job-finder-logo-template_7791-83.jpg"
              alt="Job Portal Logo"
              className="h-10 w-auto mr-2 rounded-full"
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-200">
              JobPortal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="/"
              className="font-medium hover:text-emerald-300 transition-colors duration-300"
            >
              Home
            </a>

            <a
              href="#findJob"
              className="font-medium hover:text-emerald-300 transition-colors duration-300"
            >
              Find Job
            </a>

            <a
              href="#company"
              className="font-medium hover:text-emerald-300 transition-colors duration-300"
            >
              Companies
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-amber-100/30">
            <Search className="h-5 w-5 text-amber-100 mr-2" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="bg-transparent focus:outline-none text-amber-100 placeholder-amber-100/50 w-40 lg:w-64"
            />
          </div>

          {/* Action Buttons - Conditional Rendering based on login status */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu} 
                  className="flex items-center bg-amber-100 text-[#093028] px-4 py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 font-medium"
                >
                  <User className="h-5 w-5 mr-2" />
                  {currentUser?.name || 'My Profile'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <button 
                        onClick={profileNav}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={loginnav} className="flex items-center bg-amber-100 text-[#093028] px-4 py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 font-medium">
                <User className="h-5 w-5 mr-2" />
                Sign In
              </button>
            )}
            <button className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 rounded-full hover:from-emerald-600 hover:to-teal-500 transition-all duration-300 font-medium">
              <Briefcase className="h-5 w-5 mr-2" />
              Post Job
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-amber-100 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 py-4 px-2 rounded-lg bg-gradient-to-br from-[#16222A] to-[#3A6073]">
            <div className="flex flex-col space-y-3">
              <a
                href="/"
                className="px-4 py-2 rounded-lg hover:bg-[#237A57]/20"
              >
                Home
              </a>
              <a
                href="#findJob"
                className="px-4 py-2 rounded-lg hover:bg-[#237A57]/20"
              >
                Find Job
              </a>

              <a
                href="#company"
                className="px-4 py-2 rounded-lg hover:bg-[#237A57]/20"
              >
                Companies
              </a>

              {/* Mobile Action Buttons - Conditional Rendering */}
              <div className="flex flex-col space-y-3 px-4 pt-2">
                {isLoggedIn ? (
                  <>
                    <button 
                      onClick={profileNav} 
                      className="flex items-center justify-center bg-amber-100 text-[#093028] px-4 py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 font-medium"
                    >
                      <User className="h-5 w-5 mr-2" />
                      My Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-center bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 transition-colors duration-300 font-medium"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={loginnav} 
                    className="flex items-center justify-center bg-amber-100 text-[#093028] px-4 py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 font-medium"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Sign In
                  </button>
                )}
                <button className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 rounded-full hover:from-emerald-600 hover:to-teal-500 transition-all duration-300 font-medium">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Post Job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;