import React from 'react';
// Import icons from a popular icon library
// You can use any of these libraries:
// For react-icons:
import { FaTwitter, FaLinkedinIn, FaInstagram, FaArrowRight } from 'react-icons/fa';
// Or for lucide-react:
// import { Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full font-['Poppins'] bg-gradient-to-r from-[#16222A] to-[#3A6073] pt-12 pb-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 right-8 w-10 md:w-16 h-10 md:h-16 bg-lime-300 opacity-20 rotate-12 animate-pulse"></div>
      <div className="absolute top-1/4 left-4 w-8 md:w-12 h-8 md:h-12 bg-green-200 opacity-15 rotate-45"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 md:w-20 h-12 md:h-20 bg-emerald-300 opacity-15 -rotate-12"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="bg-gradient-to-r from-[#093028] to-[#237A57] 
          rounded-tl-[50px] md:rounded-tl-[100px] 
          rounded-br-[50px] md:rounded-br-[100px] 
          rounded-[20px] p-8 relative">
          
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-lime-400/10 to-transparent"></div>
          
          <div className="grid md:grid-cols-4 gap-8 text-amber-100">
            {/* Column 1: Logo & About */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">JobConnect</h3>
              <div className="w-12 h-1 bg-green-400/70 rounded-full"></div>
              <p className="text-green-200">Connecting talented individuals with their dream careers. Discover opportunities that match your skills and aspirations.</p>
              
              <div className="flex space-x-4 mt-6">
                {/* Social Media Icons using imported icons */}
                <a href="#" className="w-10 h-10 rounded-full bg-emerald-800/60 flex items-center justify-center hover:bg-emerald-700/80 transition-colors duration-300 group">
                  <FaTwitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-emerald-800/60 flex items-center justify-center hover:bg-emerald-700/80 transition-colors duration-300 group">
                  <FaLinkedinIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-emerald-800/60 flex items-center justify-center hover:bg-emerald-700/80 transition-colors duration-300 group">
                  <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <div className="w-12 h-1 bg-green-400/70 rounded-full"></div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#findJob" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Find Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Post Job
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Job Categories */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Job Categories</h3>
              <div className="w-12 h-1 bg-green-400/70 rounded-full"></div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-300 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-emerald-400/60 mr-2 group-hover:bg-green-300 transition-colors duration-300"></span>
                    Marketing
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Stay Updated</h3>
              <div className="w-12 h-1 bg-green-400/70 rounded-full"></div>
              <p className="text-green-200">Subscribe to our newsletter for the latest job opportunities.</p>
              
              <form className="mt-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-emerald-800/40 text-amber-100 p-3 pr-12 rounded-xl border border-emerald-600/30 
                      focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300
                      placeholder:text-amber-100/50"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 
                      bg-gradient-to-r from-emerald-600 to-green-500 rounded-full 
                      flex items-center justify-center hover:from-emerald-500 hover:to-green-400 
                      transition-all duration-300 group-hover:shadow-emerald-900/30"
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-emerald-400/20 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 rounded-br-xl"></div>
                </div>
              </form>
              
              <div className="mt-6">
                <p className="text-amber-100/80 text-sm">
                  By subscribing, you agree to our <a href="#" className="text-green-300 hover:underline">Privacy Policy</a> and <a href="#" className="text-green-300 hover:underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Copyright bar */}
          <div className="mt-10 pt-6 border-t border-emerald-600/20 flex flex-col md:flex-row justify-between items-center text-amber-100/70 text-sm">
            <p>© {currentYear} JobConnect. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-300 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-green-300 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-green-300 transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated bottom decorative elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-32 h-2 bg-gradient-to-r from-green-400/30 via-emerald-500/50 to-green-400/30 rounded-full"></div>
          <div className="absolute -top-6 left-1/3 w-4 h-4 bg-lime-300/40 rotate-12 animate-pulse"></div>
          <div className="absolute -bottom-6 right-1/3 w-3 h-3 bg-emerald-300/40 -rotate-12 animate-bounce"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;