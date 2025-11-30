import React from 'react';
import { motion } from 'framer-motion';
import bgVideo from '../assets/bgvideo.mp4';

const Home = () => {
  // Animation variants for staggering content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
      
      {/* 1. BACKGROUND VIDEO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          {/* Using a remote URL to ensure it works without local assets */}
          <source 
            src={bgVideo}
            type="video/mp4" 
          />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90 z-10"></div>
        {/* Subtle texture overlay for 'paper' feel (optional) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-10 mix-blend-overlay"></div>
      </motion.div>

      {/* 2. HERO CONTENT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
      >
        
        {/* Decorative Top Line */}
        <motion.div variants={itemVariants} className="w-24 h-px bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mb-6 opacity-70"></motion.div>

        {/* Main Title - Modernized Traditional Typography */}
        <motion.h1 
          variants={itemVariants}
          className="text-[#FDF6E3] font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-2xl tracking-wide relative"
        >
          <span className="bg-clip-text text-transparent bg-linear-to-b from-[#FFF] via-[#E6DCC8] to-[#998A70]">
            Ceylon Sweets
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-[#E6DCC8] font-sans text-lg md:text-2xl font-light tracking-widest opacity-90 drop-shadow-lg max-w-4xl leading-relaxed mb-10"
        >
          Authentic Sri Lankan sweets crafted with tradition and care.
        </motion.p>

        {/* 3. BUTTONS CONTAINER */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-8 items-center w-full justify-center"
        >
            
            {/* Primary Button: "The Gold Bar" */}
            <motion.a
                href="#sweets"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-linear-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#2A1B12] font-serif font-bold text-lg tracking-widest uppercase overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-[#F4C430]"
            >
                {/* Shine Effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-30 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center gap-2">
                    View Collection 
                    <span className="text-xl">→</span>
                </span>
            </motion.a>

            {/* Secondary Button: "Glass Outline" */}
            <motion.a
                href="#about"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/50 text-[#D4AF37] font-serif font-bold text-lg tracking-widest uppercase shadow-lg transition-all duration-300"
            >
                Our Story
            </motion.a>

        </motion.div>

      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-20 cursor-pointer flex flex-col items-center gap-2"
        onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase opacity-70">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-[#D4AF37] to-transparent"></div>
      </motion.div>

      {/* Custom Keyframe for Shine Animation */}
      <style>{`
        @keyframes shine {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
        }
        .animate-shine {
            animation: shine 2s infinite;
        }
      `}</style>

    </section>
  );
};

export default Home;