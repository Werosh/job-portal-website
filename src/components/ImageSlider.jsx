import React, { useState, useEffect, useRef } from 'react';

const ImageMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  
  const images = [
    { id: 1, src: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp", alt: "Image 1" },
    { id: 2, src: "https://logos-world.net/wp-content/uploads/2020/03/Coca-Cola-Logo-1987-2009.png", alt: "Image 2" },
    { id: 3, src: "https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609347443412-BY6YPT4NB3RHTLCNZ7O7/image-asset.jpeg", alt: "Image 3" },
    { id: 4, src: "https://logo.com/image-cdn/images/kts928pd/production/f8887705dda657ff30b16984b2636e46ae4a1b55-683x410.jpg?w=1920&q=72&fm=webp", alt: "Image 4" },
    { id: 5, src: "https://www.logogenie.net/images/articles/letter-logo-designs/pinterest-logo.jpg", alt: "Image 5" },
    { id: 6, src: "https://logos-world.net/wp-content/uploads/2023/08/Chanel-Logo.png", alt: "Image 6" },
    { id: 7, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEzPwA7C6b6B8_BzevKIMgzU9SdNjmISddAg&s", alt: "Image 7" },
    { id: 8, src: "https://diginsights.com/wp-content/uploads/2024/03/fedex-square.png.webp", alt: "Image 8" },
    { id: 9, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6w0aTfoszM8OU_IBJjFOFl2exTDYyAIxpdQ&s", alt: "Image 9" },
    { id: 10, src: "https://logomak.com/blog/wp-content/uploads/2023/09/ConocoPhillips-Logo-500x313-min.png", alt: "Image 10" },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const container = containerRef.current;
    let animationId;
    let scrollAmount = 0;
    let scrollWidth = 0;
    
    // Function to check and reset scroll position
    const checkScrollPosition = () => {
      if (!scrollContainer) return;
      
      scrollWidth = scrollContainer.firstChild.offsetWidth / 2;
      
      if (scrollAmount >= scrollWidth) {
        // Reset to start of the second set of images
        scrollAmount = 0;
        scrollContainer.style.transform = `translateX(0px)`;
      }
    };
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollAmount += 0.5; // Adjust speed here
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        checkScrollPosition();
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="max-w-full mx-auto p-6 bg-amber-50">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* Marquee container */}
        <div 
          className="h-34 md:h-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
        >
          <div 
            className="flex"
            ref={scrollRef}
          >
            {/* First set of images */}
            {images.map((image) => (
              <div key={`${image.id}-1`} className="flex-shrink-0 w-72 mx-3 my-4 overflow-hidden rounded shadow">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="  object-fill w-auto h-auto  items-center transform transition-transform duration-300 hover:scale-110" 
                />
              </div>
            ))}
            
            {/* Duplicate set of images to create seamless loop */}
            {images.map((image) => (
              <div key={`${image.id}-2`} className="flex-shrink-0 w-72 mx-3 my-4 overflow-hidden rounded shadow">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-fill transform transition-transform duration-300 hover:scale-110" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageMarquee;