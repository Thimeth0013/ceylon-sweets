import React from 'react';
import { motion } from 'framer-motion';
import bgVideo from '../assets/bgvideo.webm';
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
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
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

        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="font-serif font-bold mb-4 drop-shadow-2xl tracking-wide relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
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
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full sm:w-auto px-4 sm:px-0 mb-20 md:mb-0"
        >
            
            {/* Primary Button - Liquid Gold Effect */}
            <motion.a
                href="#sweets"
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 overflow-hidden shadow-lg border border-[#F4C430] flex justify-center items-center text-[#2A1B12] font-serif font-bold text-base md:text-lg tracking-widest uppercase transition-all duration-500 ease-out bg-[linear-gradient(45deg,#B8860B,#D4AF37,#FDF6E3,#D4AF37,#B8860B)] bg-[length:300%_300%] bg-left hover:bg-right"
            >
                <div className="absolute top-0 -left-full w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-30 animate-shine opacity-50" />
                
                <span className="relative z-10 flex items-center gap-2">
                    View Collection 
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                      <ArrowDownRight size={20} />
                    </span>
                </span>
            </motion.a>

            {/* Secondary Button - Premium Sweep Fill Effect */}
            <motion.a
                href="#about"
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 bg-transparent backdrop-blur-xs hover:backdrop-blur-sm border border-[#D4AF37]/50 text-[#D4AF37]/80 font-serif font-bold text-base md:text-lg tracking-widest uppercase shadow-lg overflow-hidden flex justify-center items-center transition-colors duration-300 ease-out hover:text-[#D4AF37] hover:border-[#D4AF37]
                before:absolute before:inset-0 before:bg-[#D4AF37]/10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-x-100 before:-z-10"
            >
                <span className="relative z-10">Our Story</span>
            </motion.a>

        </motion.div>

      </motion.div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-20 md:bottom-10 z-20 cursor-pointer flex flex-col items-center gap-2"
        onClick={() => document.getElementById('sweets')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase opacity-70">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-linear-to-b from-[#D4AF37] to-transparent"></div>
      </motion.div>

      {/* Keep the shine animation for the subtle background layer of primary button */}
      <style>{`
        @keyframes shine {
            0% { transform: translateX(0%); }
            100% { transform: translateX(50%); }
        }
        .animate-shine {
            animation: shine 3s linear infinite;
        }
      `}</style>

    </section>
  );
};

export default Home;