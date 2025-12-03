import React from 'react';
import { motion } from 'framer-motion';
import bgVideo from '../assets/bgvideo.mp4';
import { ArrowDownRight } from 'lucide-react';

const Home = () => {
  // Animation variants
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
    // Changed h-screen to h-[100dvh] for better mobile browser support (address bar issues)
    <section id="home" className="relative w-full h-dvh flex flex-col justify-center items-center overflow-hidden bg-black">
      
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
          playsInline // Essential for iOS
        >
          <source 
            src={bgVideo}
            type="video/mp4" 
          />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90 z-10"></div>
      </motion.div>

      {/* 2. HERO CONTENT */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center w-full"
      >
        
        {/* Decorative Top Line */}
        <motion.div variants={itemVariants} className="w-16 md:w-24 h-px bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mb-6 opacity-70"></motion.div>

        {/* Main Title - Responsive Text Sizes */}
        <motion.h1 
          variants={itemVariants}
          className="font-serif font-bold mb-4 drop-shadow-2xl tracking-wide relative
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight" // Smoother scaling
        >
          <span className="bg-clip-text text-transparent bg-linear-to-b from-[#FFF] via-[#E6DCC8] to-[#998A70]">
            Ceylon Sweets
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-[#E6DCC8] font-noto tracking-widest opacity-90 drop-shadow-lg max-w-4xl leading-relaxed mb-10 md:mb-12 text-base sm:text-lg md:text-2xl px-2"
        >
          Authentic Sri Lankan sweets crafted with tradition and care.
        </motion.p>

        {/* 3. BUTTONS CONTAINER */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center w-full sm:w-auto px-4 sm:px-0 mb-20 md:mb-0"
        >
            
            {/* Primary Button */}
            <motion.a
                href="#sweets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 bg-linear-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#2A1B12] font-serif font-bold text-base md:text-lg tracking-widest uppercase overflow-hidden shadow-lg border border-[#F4C430] flex justify-center items-center"
            >
                {/* Shine Effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-30 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center gap-2">
                    View Collection 
                    <span className="text-lg"><ArrowDownRight size={20} /></span>
                </span>
            </motion.a>

            {/* Secondary Button */}
            <motion.a
                href="#about"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/50 text-[#D4AF37] font-serif font-bold text-base md:text-lg tracking-widest uppercase shadow-lg transition-all duration-300 flex justify-center items-center"
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
        className="absolute bottom-20 md:bottom-10 z-20 cursor-pointer flex flex-col items-center gap-2" // Raised on mobile to avoid browser nav bars
        onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase opacity-70">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-linear-to-b from-[#D4AF37] to-transparent"></div>
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