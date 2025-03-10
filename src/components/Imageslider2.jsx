import React, { useState, useEffect, useRef } from 'react';

const EmployerShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  
  // Sample employer data - replace with your actual employers
  const employers = [
    { id: 1, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReGezSd64Ec7xshfyIl855quZ6emH_XA4ZNw&s", alt: "Google", name: "Google", jobCount: 24, industry: "Technology" },
    { id: 2, src: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-2000.png", alt: "Amazon", name: "Amazon", jobCount: 37, industry: "E-commerce" },
    { id: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LnDYBaUFCBj2hvQqKZkCwjCZZFXalvd3OA&s", alt: "Microsoft", name: "Microsoft", jobCount: 18, industry: "Software" },
    { id: 4, src: "https://w7.pngwing.com/pngs/186/863/png-transparent-apple-logo-apple-logo-computer-wallpaper-silhouette.png", alt: "Apple", name: "Apple", jobCount: 12, industry: "Technology" },
    { id: 5, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vtQgn3oFgGDCRhpdTbl0rmyF6g-AGYeCMw&s", alt: "Meta", name: "Meta", jobCount: 15, industry: "Social Media" },
    { id: 6, src: "https://static.vecteezy.com/system/resources/previews/020/336/484/non_2x/tesla-logo-tesla-icon-transparent-png-free-vector.jpg", alt: "Tesla", name: "Tesla", jobCount: 9, industry: "Automotive" },
    { id: 7, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdxKnJO2RiFqIswvyfEQ0U3XKkpLKD4Xfkw&s", alt: "IBM", name: "IBM", jobCount: 22, industry: "Technology" },
    { id: 8, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLaNcwwKN08MsuptBrT4bxJJ2KgrJxgTS-DA&s", alt: "Netflix", name: "Netflix", jobCount: 7, industry: "Entertainment" },
    { id: 9, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png", alt: "Salesforce", name: "Salesforce", jobCount: 14, industry: "CRM" },
    { id: 10, src: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24760594/Adobe_wordmark.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100", alt: "Adobe", name: "Adobe", jobCount: 11, industry: "Software" },
  ];

  useEffect(() => {
    const scrollContainer = marqueeRef.current;
    let animationId;
    let scrollAmount = 0;
    let scrollWidth = 0;
    
    const checkScrollPosition = () => {
      if (!scrollContainer) return;
      
      scrollWidth = scrollContainer.firstChild.offsetWidth / 2;
      
      if (scrollAmount >= scrollWidth) {
        scrollAmount = 0;
        scrollContainer.style.transform = `translateX(0px)`;
      }
    };
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollAmount += 0.7; // Moderate scroll speed
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        checkScrollPosition();
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
    setIsPaused(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-8 px-4">
      
      <div className="relative overflow-hidden rounded-xl shadow-md  mx-auto">
        {/* Gradient overlays for fading effect */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-blue-50 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-indigo-50 to-transparent z-10"></div>
        
        {/* Marquee container */}
        <div 
          className="overflow-hidden py-4 px-2 bg-white"
          ref={containerRef}
        >
          <div 
            className="flex"
            ref={marqueeRef}
          >
            {/* First set of employers */}
            {employers.map((employer, index) => (
              <div 
                key={`${employer.id}-1`} 
                className="flex-shrink-0 w-64 mx-4 my-2 group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`bg-white border border-gray-100 rounded-lg transition-all duration-300 
                  ${activeIndex === index ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'}`}>
                  <div className="h-28 overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center p-4">
                    <img 
                      src={employer.src} 
                      alt={employer.alt} 
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{employer.name}</h3>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-blue-600">{employer.jobCount} open positions</span>
                      <span className="text-gray-500">{employer.industry}</span>
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {employers.map((employer, index) => (
              <div 
                key={`${employer.id}-2`} 
                className="flex-shrink-0 w-64 mx-4 my-2 group"
                onMouseEnter={() => handleMouseEnter(index + employers.length)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`bg-white border border-gray-100 rounded-lg transition-all duration-300 
                  ${activeIndex === index + employers.length ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'}`}>
                  <div className="h-28 overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center p-4">
                    <img 
                      src={employer.src} 
                      alt={employer.alt} 
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{employer.name}</h3>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-blue-600">{employer.jobCount} open positions</span>
                      <span className="text-gray-500">{employer.industry}</span>
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default EmployerShowcase;