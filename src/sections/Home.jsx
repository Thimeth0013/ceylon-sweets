import React from 'react';
import bgVideo from '../assets/bgvideo.mp4';

export const Home = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-noto mb-8 text-[#E1AA3E] drop-shadow-black/60 drop-shadow-lg">
          Ceylon Sweets
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-xl lg:text-2xl font-noto text-[#FAF8F3] mb-8 font-regular drop-shadow-black/60 drop-shadow-lg">
          Authentic Sri Lankan sweets crafted with tradition and care.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#sweets" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200 shadow-lg w-full sm:w-auto"
          >
            View Collection
          </a>
          <a 
            href="#about" 
            className="bg-transparent border-2 border-amber-600 hover:bg-amber-600/10 text-amber-100 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200 w-full sm:w-auto"
          >
            Our Story
          </a>
        </div>

        {/* Decorative element */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-600 to-transparent"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-amber-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};