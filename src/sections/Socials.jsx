import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Data ---
import { testimonials } from '../data/testimonialsData';

// --- Assets ---
import manLeftImage from '../assets/leftMan.png';
import manRightImage from '../assets/rightMan.png';
import reel1 from '../assets/reel1.mp4';
import reel2 from '../assets/reel2.mp4';
import reel3 from '../assets/reel3.mp4';

// Mock Data
const socialVideos = [
  { id: 1, src: reel1, caption: "Packed to Stay Fresh" },
  { id: 2, src: reel2, caption: "Traditional Sri Lankan Classics" },
  { id: 3, src: reel3, caption: "Fresh From the Oven" },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 } 
  }
};

// --- SUB-COMPONENT: SOCIAL VIDEO CARD ---
const VideoCard = ({ video, className = "" }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      variants={fadeInUp}
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group border-2 border-[#E8B54D]/30 hover:border-[#E8B54D] transition-all duration-500 ${className}`}
      onClick={togglePlay}
      style={{ aspectRatio: '9/16' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <video 
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loop
        playsInline
        muted
        autoPlay
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm shadow-2xl"
        >
          {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
        </motion.div>
      </div>
      
      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-white font-serif text-sm md:text-base">{video.caption}</p>
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENT: TESTIMONIAL CARD ---
const TestimonialCard = ({ data }) => (
  <div className="bg-[#FDF6E3] p-4 md:p-5 rounded-xl shadow-lg w-[260px] md:w-[300px] shrink-0 mx-3 flex flex-col justify-between h-full border-t-4 border-[#E8B54D] transition-colors duration-300 hover:font-bold ">
    <div>
      <p className="text-[#3D2817] text-xs md:text-sm font-serif leading-snug">"{data.text}"</p>
    </div>
    <div className="mt-3 border-t border-[#3D2817]/10 pt-2">
      <h4 className="text-[#3D2817] font-bold text-xs md:text-xs italic">{data.name}</h4>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const Socials = () => {
  const marqueeRef = useRef(null);

  const pauseMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'paused';
  };
  const resumeMarquee = () => {
    if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running';
  };

  return (
    <section id="socials" className="relative bg-[#3D2817] text-[#FDF6E3] pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden border-t-4 border-[#B8860B]">
      
      {/* DECORATIVE FIGURES - Replaced CSS animation with Motion */}
      <motion.img 
        initial={{ opacity: 30, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        src={manLeftImage} 
        alt="Traditional Guard Left"
        className="absolute bottom-0 -left-5 md:left-8 w-28 md:w-32 lg:w-44 z-100 hidden sm:block pointer-events-none drop-shadow-lg"
      />
      <motion.img 
        initial={{ opacity: 30, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        src={manRightImage} 
        alt="Traditional Guard Right"
        className="absolute bottom-0 -right-5 md:right-8 w-28 md:w-32 lg:w-44 z-100 hidden sm:block pointer-events-none drop-shadow-lg"
      />

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center px-4">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#E8B54D] text-xs uppercase tracking-[0.3em] font-bold block mb-2">Community</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#FDF6E3] mb-4 drop-shadow-md">
            Connect With Us
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }} // 24 * 4px = 96px
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[#E8B54D] mx-auto rounded-full"
          ></motion.div>
        </motion.div>

        {/* --- SOCIAL LINKS --- */}
        <div className="w-full mb-16 md:mb-20">
          
          {/* Mobile: Circular arrangement */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6 md:hidden max-w-sm mx-auto"
          >
            {[
              { label: "WhatsApp", href: "https://wa.me/94782099856", svg: "path_data_here" },
              { label: "Instagram", href: "https://www.instagram.com/ceylon_sweets?igsh=bnV1aXg3b2FiaDFy", svg: "path_data_here" },
              { label: "Facebook", href: "https://www.facebook.com/share/1FYyCuXajp/", svg: "path_data_here" },
              { label: "TikTok", href: "https://www.tiktok.com/@ceylon_sweets?_r=1&_t=ZS-91tDpXR4PGJ", svg: "path_data_here" },
              { label: "YouTube", href: "https://www.youtube.com/@CeylonSweets/shorts", svg: "path_data_here" },
            ].map((social, idx) => (
              <SocialLinkMobile key={idx} social={social} index={idx} />
            ))}
          </motion.div>

          {/* Desktop: Horizontal layout */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:flex flex-wrap justify-center gap-12 w-full max-w-5xl mx-auto"
          >
             {/* Note: I am reusing the map logic here but injecting the Motion wrappers */}
             {desktopSocialsData.map((social, idx) => (
               <SocialLinkDesktop key={idx} social={social} />
             ))}
          </motion.div>
        </div>

        {/* --- VIDEO GALLERY --- */}
        <div className="w-full mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-10 md:mb-12"
          >
            <div className="h-px w-12 bg-[#E8B54D]/30"></div>
            <h3 className="text-xl md:text-2xl font-serif text-[#E8B54D] italic">Our Kitchen Stories</h3>
            <div className="h-px w-12 bg-[#E8B54D]/30"></div>
          </motion.div>
          
          {/* Mobile: Horizontal scroll */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:hidden overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            <div className="flex gap-4 px-4">
              {socialVideos.map((video) => (
                <div key={video.id} className="snap-center shrink-0 w-[240px]">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop: Staggered grid */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
          >
            {/* Left video */}
            <div className="mt-12">
              <VideoCard video={socialVideos[0]} />
            </div>
            
            {/* Center video */}
            <div className="-mt-6 scale-105 z-10">
              <VideoCard video={socialVideos[1]} />
            </div>
            
            {/* Right video */}
            <div className="mt-12">
              <VideoCard video={socialVideos[2]} />
            </div>
          </motion.div>
        </div>

        {/* --- TESTIMONIALS MARQUEE --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w- md:w-280 relative pb-0 md:pb-4 pt-8 md:pt-12 border-t border-[#E8B54D]/10 bg-[radial-gradient(ellipse_at_center,#2A1B12_0%,transparent_70%)]"
        >
          <div className='pb-4'>
            <h3 className="text-center text-[#E8B54D] font-serif text-lg md:text-xl uppercase tracking-widest">
              Client Love
            </h3>
            <DecorativeDivider/>
          </div>
          
          <div className="flex overflow-hidden group mask-gradient">
            <div
              ref={marqueeRef}
              className="flex animate-scroll"
              onMouseEnter={pauseMarquee}
              onMouseLeave={resumeMarquee}
              onTouchStart={pauseMarquee}
              onTouchEnd={resumeMarquee}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={i} data={t} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- MINIMAL CONTACT FOOTER --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center w-full max-w-4xl border-t border-[#E8B54D]/20 pt-8 opacity-80"
        >
          <motion.div variants={fadeInUp} className="flex flex-col items-center group">
            <MapPin size={20} className="text-[#E8B54D] mb-2" />
            <p className="text-sm">Ruwanwella, Sri Lanka</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center group">
            <Phone size={20} className="text-[#E8B54D] mb-2" />
            <p className="text-sm">+94 78 209 9856</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col items-center group">
            <Mail size={20} className="text-[#E8B54D] mb-2" />
            <p className="text-sm">hello@ceylonsweets.lk</p>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 40s linear infinite; }
      `}</style>
    </section>
  );
};

// --- Helper Components & Data Restoration for Display ---

// Restoring the full SVG data logic within a clean map for the render above
const desktopSocialsData = [
    { label: "WhatsApp", href: "https://wa.me/94782099856", iconPath: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
    { label: "Instagram", href: "https://www.instagram.com/ceylon_sweets", iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { label: "Facebook", href: "https://www.facebook.com/share/1FYyCuXajp/", iconPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { label: "TikTok", href: "https://www.tiktok.com/@ceylon_sweets?_r=1&_t=ZS-91tDpXR4PGJ", iconPath: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" },
    { label: "YouTube", href: "https://www.youtube.com/@CeylonSweets/shorts", iconPath: "M22.058 6.945a2.625 2.625 0 0 0 -1.853 -1.853C18.57 4.65 12 4.65 12 4.65s-6.57 0 -8.205 0.443a2.625 2.625 0 0 0 -1.853 1.853A27 27 0 0 0 1.5 12a27 27 0 0 0 0.443 5.055 2.625 2.625 0 0 0 1.853 1.853c1.635 0.443 8.205 0.443 8.205 0.443s6.57 0 8.205 -0.443a2.625 2.625 0 0 0 1.853 -1.853A27 27 0 0 0 22.5 12a27 27 0 0 0 -0.443 -5.055M9.9 15.15v-6.3l5.452 3.15Z" }
];

const SocialLinkMobile = ({ social }) => (
  <motion.a 
    variants={popIn}
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center group"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className="w-16 h-16 rounded-full bg-[#E8B54D]/10 border-2 border-[#E8B54D]/30 flex items-center justify-center mb-2 text-[#E8B54D] group-hover:bg-[#E8B54D] group-hover:text-[#3D2817] transition-colors duration-300">
      <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d={social.iconPath || desktopSocialsData.find(d => d.label === social.label)?.iconPath} /></svg>
    </div>
    <span className="text-[#FDF6E3]/70 font-bold uppercase tracking-wider text-[9px] group-hover:text-[#E8B54D] transition-colors duration-300">
      {social.label}
    </span>
  </motion.a>
);

const SocialLinkDesktop = ({ social }) => (
  <motion.a 
    variants={fadeInUp}
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center p-2 group"
    whileHover={{ scale: 1.1, y: -5 }}
  >
    <div className="mb-2 text-[#E8B54D] group-hover:text-white transition-colors duration-300">
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d={social.iconPath} /></svg>
    </div>
    <span className="text-[#FDF6E3]/70 font-bold uppercase tracking-widest text-xs group-hover:text-[#E8B54D] transition-colors duration-300">
      {social.label}
    </span>
  </motion.a>
);

const DecorativeDivider = () => (
  <div className="flex items-center justify-center gap-4 mb-6 mt-6">
    <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-[#E8B54D]"></div>
    <div className="w-2 h-2 rotate-45 border border-[#E8B54D] bg-[#3D2817]"></div>
    <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-[#E8B54D]"></div>
  </div>
);

export default Socials;