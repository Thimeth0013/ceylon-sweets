import React from 'react';
import { motion } from 'framer-motion';
import manLeftImage from '../assets/leftMan.png';
import manRightImage from '../assets/rightMan.png';
import brickWallBg from '../assets/brickWall.png'; 

const Contact = () => {
  return (
    <section id="contact" className="relative bg-[#3D2817] text-[#FDF6E3] py-10 px-6 overflow-hidden border-t-4 border-[#B8860B]">
      
      {/* 1. BACKGROUNDS */}
      {/* Brick Wall Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
            backgroundImage: `url(${brickWallBg})`,
            backgroundSize: 'auto',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
        }}
      ></div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-[#3D2817]/50 via-transparent to-[#3D2817]/80 z-0"></div>

      {/* 2. DECORATIVE FIGURES */}
      {/* Left Figure */}
      <motion.img 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={manLeftImage} 
        alt="Traditional Guard Left"
        className="absolute bottom-0 left-10 w-24 md:w-32 lg:w-40 opacity-60 z-10 hidden sm:block"
      />

      {/* Right Figure */}
      <motion.img 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={manRightImage} 
        alt="Traditional Guard Right"
        className="absolute bottom-0 right-10 w-24 md:w-32 lg:w-40 opacity-60 z-10 hidden sm:block"
      />


      {/* 3. MAIN CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[40vh]">
        
        {/* Decorative Top Border */}
        <DecorativeDivider />

        {/* Title */}
        <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-[#E8B54D] mb-6 drop-shadow-lg tracking-wide"
        >
          Ayubowan
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[#FDF6E3] text-lg md:text-xl mb-10 font-serif opacity-80"
        >
          Connect with Ceylon Sweets
        </motion.p>

        {/* Contact Information Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-[#B8860B]/20 backdrop-blur-sm border-2 border-[#B8860B]/50 rounded-lg px-8 py-6 mb-10 shadow-xl"
        >
          <div className="text-[#FDF6E3] font-serif text-base md:text-lg space-y-3 font-medium">
            <p className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8B54D]">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              123 Temple Road, Ruwanwella, Sri Lanka
            </p>
            <p className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8B54D]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              +94 77 123 4567
            </p>
            <p className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E8B54D]">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              hello@ceylonsweets.lk
            </p>
          </div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex gap-6 justify-center items-center mt-6"
        >
            {/* WhatsApp */}
            <SocialIcon delay={0.8} ariaLabel="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </SocialIcon>

            {/* Instagram */}
            <SocialIcon delay={0.9} ariaLabel="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
            </SocialIcon>

            {/* Facebook */}
            <SocialIcon delay={1.0} ariaLabel="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            </SocialIcon>
            
            {/* TikTok */}
            <SocialIcon delay={1.1} ariaLabel="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
            </SocialIcon>
        </motion.div>
      </div>

    </section>
  );
};

const DecorativeDivider = () => (
    <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="flex items-center gap-4 mb-6 mt-6"
    >
        <div className="h-px w-12 md:w-24 bg-linear-to-r from-transparent to-[#D4AF37]"></div>
        <div className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#2A1B12]"></div>
        <div className="h-px w-12 md:w-24 bg-linear-to-l from-transparent to-[#D4AF37]"></div>
    </motion.div>
);

// Helper for consistency with animation
const SocialIcon = ({ children, delay = 0, ariaLabel }) => (
    <motion.a 
      href="#" 
      aria-label={ariaLabel}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, y: -5 }}
      className="w-12 h-12 border-2 border-[#E8B54D] rounded-full flex items-center justify-center text-[#E8B54D] hover:bg-[#E8B54D] hover:text-[#3D2817] transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
        {children}
    </motion.a>
);

export default Contact;