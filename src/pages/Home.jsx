import React from "react";
import girlIMg from "../assets/images/girl.png"

const Home = () => {
  return (
    <div className=" font-['Poppins'] w-full min-h-screen flex  bg-gradient-to-r from-[#16222A] to-[#3A6073]  py-8 px-4">


      <div className="text-center flex flex-col lg:flex-row bg-gradient-to-r from-[#093028] to-[#237A57] w-full  h-auto 
      xl:h-[calc(100vh-110px)] lg:h-[calc(100vh-110px)] p-4 md:p-8 lg:p-10 rounded-br-[50px] md:rounded-br-[100px] lg:rounded-br-[150px] rounded-tl-[50px] md:rounded-tl-[100px] lg:rounded-tl-[150px] rounded-[20px]  md:mt-4 lg:mt-0  justify-center items-center gap-3">
        {/* Text section */}
        <div className="w-full lg:w-[50%] py-8 lg:h-full flex flex-col items-center lg:items-start justify-center lg:pl-4 rounded-tl-[30px] lg:rounded-tl-[50px] font-['Poppins'] font-bold text-amber-100 text-4xl md:text-5xl lg:text-7xl text-center lg:text-left">
          <div>
            <h1>" Unlock Your</h1>
          </div>
          <div>
            <h1> Potential ,</h1>
          </div>
          <div className="text-5xl md:text-7xl lg:text-8xl mt-4 md:mt-6 lg:mt-10">
            <h1>Discover</h1>
          </div>
          <div>
            <h1 className="lg:text-6xl">New Opportunities "</h1>
          </div>
        </div>

        {/* Image section */}
        <div className="w-full lg:w-[50%] h-[300px] md:h-[400px] lg:h-full relative overflow-hidden rounded-[50px] md:rounded-[100px] lg:rounded-[150px] group mt-6 lg:mt-0">
          {/* Green gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-500 to-teal-400 animate-gradient-x">
            {/* Geometric square elements in green tones */}
            <div className="absolute top-4 right-8 w-10 md:w-16 h-10 md:h-16 bg-lime-300 opacity-40 rotate-12 animate-pulse"></div>
            <div className="absolute top-1/4 left-4 w-8 md:w-12 h-8 md:h-12 bg-green-200 opacity-30 rotate-45"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 md:w-20 h-12 md:h-20 bg-emerald-300 opacity-30 -rotate-12"></div>
            <div className="absolute bottom-8 left-1/3 w-6 md:w-8 h-6 md:h-8 bg-teal-400 opacity-50 rotate-6 animate-bounce"></div>
            
            {/* Grid of squares in background with green hues */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 md:gap-4 opacity-20">
              <div className="w-full h-full bg-lime-100 opacity-40 transform rotate-6"></div>
              <div className="w-full h-full bg-emerald-100 opacity-30 transform -rotate-6"></div>
              <div className="w-full h-full bg-green-100 opacity-50 transform rotate-12"></div>
              <div className="w-full h-full bg-teal-100 opacity-20 transform -rotate-12"></div>
            </div>
            
            {/* Nature-inspired leaf-like square patterns */}
            <div className="absolute top-6 left-6 right-6 bottom-6 border-2 md:border-4 border-green-200 opacity-15 rotate-3"></div>
            <div className="absolute top-12 left-12 right-12 bottom-12 border border-emerald-200 opacity-20 -rotate-2"></div>
          </div>
          
          {/* Animated square particles in green tones */}
          <div className="absolute w-3 md:w-4 h-3 md:h-4 top-1/4 left-1/3 bg-lime-200 opacity-60 animate-spin"></div>
          <div className="absolute w-4 md:w-6 h-4 md:h-6 top-2/3 left-1/5 bg-green-200 opacity-30 rotate-45 animate-pulse"></div>
          <div className="absolute w-2 md:w-3 h-2 md:h-3 bottom-1/3 right-1/4 bg-teal-200 opacity-40 -rotate-12 animate-bounce"></div>
          
          {/* Corner square decorations in green */}
          <div className="absolute top-0 left-0 w-10 md:w-16 h-10 md:h-16 bg-gradient-to-br from-green-300 to-transparent opacity-60"></div>
          <div className="absolute top-0 right-0 w-12 md:w-20 h-12 md:h-20 bg-gradient-to-bl from-emerald-300 to-transparent opacity-50 rotate-6"></div>
          <div className="absolute bottom-8 left-8 w-8 md:w-12 h-8 md:h-12 bg-gradient-to-tr from-lime-300 to-transparent opacity-70 rotate-12"></div>
          
          {/* Image with enhanced hover effect */}
          <img 
            src={girlIMg} 
            alt="girl with laptop image" 
            className="w-full h-full object-cover relative z-10 transition-all duration-700 group-hover:scale-105 group-hover:brightness-105" 
          />
          
          {/* Green-tinted overlay for potential content */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-emerald-900/60 to-transparent z-20">
            <div className="absolute bottom-6 left-6 w-8 md:w-12 h-8 md:h-12 border-2 border-green-200 opacity-60 rotate-12"></div>
          </div>
          
          {/* Interactive corner highlight with green theme */}
          <div className="absolute bottom-0 right-0 w-12 md:w-20 h-12 md:h-20 bg-gradient-to-tl from-lime-400 to-transparent opacity-60 z-10 transition-all duration-500 group-hover:w-20 md:group-hover:w-32 group-hover:h-20 md:group-hover:h-32 group-hover:rotate-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;