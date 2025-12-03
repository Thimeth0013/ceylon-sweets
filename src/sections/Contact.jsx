import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

// --- Backgrounds & Figures ---
import manLeftImage from '../assets/leftMan.png';
import manRightImage from '../assets/rightMan.png';
import brickWallBg from '../assets/brickWall.png'; 

const Contact = () => {
  return (
    <section id="contact" className="relative bg-[#3D2817] text-[#FDF6E3] pt-10 pb-12 px-6 overflow-hidden border-t-4 border-[#B8860B]">
      
      {/* 1. BACKGROUNDS */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
            backgroundImage: `url(${brickWallBg})`,
            backgroundSize: 'auto',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#3D2817]/50 via-transparent to-[#3D2817]/90 z-0"></div>

      {/* 2. DECORATIVE FIGURES */}
      <motion.img 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        src={manLeftImage} 
        alt="Traditional Guard Left"
        className="absolute bottom-0 left-4 md:left-10 w-24 md:w-32 lg:w-40 opacity-60 z-10 hidden sm:block pointer-events-none"
      />

      <motion.img 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        src={manRightImage} 
        alt="Traditional Guard Right"
        className="absolute bottom-0 right-4 md:right-10 w-24 md:w-32 lg:w-40 opacity-60 z-10 hidden sm:block pointer-events-none"
      />

      {/* 3. MAIN CONTENT */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[40vh]">
        
        {/* Header */}
        <DecorativeDivider />
        
        <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-[#E8B54D] mb-4 drop-shadow-lg tracking-wide text-center"
        >
          Ayubowan
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#FDF6E3] text-lg md:text-xl mb-16 font-serif opacity-80 text-center"
        >
          Connect with Ceylon Sweets
        </motion.p>

        {/* Contact Information - Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl mb-16 px-4">
          
          {/* Location */}
          <ContactItem 
            icon={<MapPin size={24} />}
            heading="Visit Us"
            text="123 Temple Road, Ruwanwella, Sri Lanka"
            delay={0.3}
          />

          {/* Phone */}
          <ContactItem 
            icon={<Phone size={24} />}
            heading="Call Us"
            text="+94 77 123 4567"
            delay={0.4}
          />

          {/* Email */}
          <ContactItem 
            icon={<Mail size={24} />}
            heading="Email Us"
            text="hello@ceylonsweets.lk"
            delay={0.5}
          />
        </div>

        {/* Social Media Icons - UPDATED to use Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
            <span className="text-[#E8B54D] text-xs uppercase tracking-[0.2em] font-bold opacity-70">
                Follow Us
            </span>
            
            <div className="flex gap-6">
                <a href="https://wa.me/94782099856" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#E8B54D] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150 hover:scale-105 active:scale-95">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/ceylon_sweets?igsh=bnV1aXg3b2FiaDFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#E8B54D] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150 hover:scale-105 active:scale-95">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1FYyCuXajp/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#E8B54D] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150 hover:scale-105 active:scale-95">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@ceylon_sweets?_r=1&_t=ZS-91tDpXR4PGJ" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#E8B54D] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150 hover:scale-105 active:scale-95">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@ceylonsweets?si=UtrvzxwLAVizpjQt" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#E8B54D] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150 hover:scale-105 active:scale-95">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.058 6.945a2.625 2.625 0 0 0 -1.853 -1.853C18.57 4.65 12 4.65 12 4.65s-6.57 0 -8.205 0.443a2.625 2.625 0 0 0 -1.853 1.853A27 27 0 0 0 1.5 12a27 27 0 0 0 0.443 5.055 2.625 2.625 0 0 0 1.853 1.853c1.635 0.443 8.205 0.443 8.205 0.443s6.57 0 8.205 -0.443a2.625 2.625 0 0 0 1.853 -1.853A27 27 0 0 0 22.5 12a27 27 0 0 0 -0.443 -5.055M9.9 15.15v-6.3l5.452 3.15Z"/>
                  </svg>
                </a>
              </div>
        </motion.div>

      </div>
    </section>
  );
};


// --- Helper Components ---
const DecorativeDivider = () => (
    <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center gap-4 mb-6 mt-6"
    >
        <div className="h-px w-12 md:w-24 bg-linear-to-r from-transparent to-[#E8B54D]"></div>
        <div className="w-2 h-2 rotate-45 border border-[#E8B54D] bg-[#3D2817]"></div>
        <div className="h-px w-12 md:w-24 bg-linear-to-l from-transparent to-[#E8B54D]"></div>
    </motion.div>
);

const ContactItem = ({ icon, heading, text, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="flex flex-col items-center text-center group cursor-default"
    >
        <div className="hidden md:block mb-3 text-[#E8B54D] p-3 rounded-full border border-[#E8B54D]/20 group-hover:border-[#E8B54D] group-hover:bg-[#E8B54D] group-hover:text-[#3D2817] transition-all duration-300">
            {icon}
        </div>
        <h4 className="text-[#E8B54D] font-bold uppercase tracking-wider text-sm mb-2">
            {heading}
        </h4>
        <p className="text-[#FDF6E3] font-serif text-lg leading-relaxed">
            {text}
        </p>
    </motion.div>
);

// Updated Social Icon Component for PNGs
const SocialIcon = ({ href, imgSrc, alt }) => (
    <motion.a 
        href={href}
        aria-label={alt}
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full border border-[#E8B54D] flex items-center justify-center bg-[#3D2817] hover:shadow-[0_0_15px_rgba(232,181,77,0.4)] transition-all duration-300 overflow-hidden"
    >
        <img 
            src={imgSrc} 
            alt={alt} 
            className="w-6 h-6 object-contain" 
        />
    </motion.a>
);

export default Contact;