import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="relative bg-[#2A1B12] text-[#FDF6E3] py-24 px-6 overflow-hidden">
      
      {/* Background Decorative Element (Mandala-style opacity) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5 pointer-events-none transform rotate-45 translate-x-1/3 -translate-y-1/3"></div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* --- MAIN STORY --- */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-8">
            Our Story
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-px bg-[#D4AF37] mx-auto mb-8 opacity-50"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-[#E6DCC8] font-noto">
            Ceylon Sweets was born with a mission to revive Sri Lanka’s traditional flavors that are slowly disappearing. 
            From humble beginnings in <span className="text-[#D4AF37] font-noto italic">Imbulana, Ruwanwella</span>, we continue to celebrate the island’s culinary heritage 
            with authentic homemade sweets and cakes made with care and love.
          </motion.p>
        </div>

        {/* --- DETAILS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* COL 1: What We Do */}
          <motion.div variants={itemVariants} className="bg-[#3E2723]/30 p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors">
            <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">What We Do</h3>
            <p className="mb-6 text-sm text-[#E6DCC8] opacity-90">
              We craft handmade Sri Lankan sweets, snacks, and cakes, using only natural ingredients.
            </p>
            <ul className="space-y-3 text-sm text-[#FDF6E3]">
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✦</span> Freshly prepared upon request
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✦</span> Vacuum packed to preserve taste
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✦</span> Delivered island-wide (2–3 days)
              </li>
            </ul>
          </motion.div>

          {/* COL 2: Our Promise */}
          <motion.div variants={itemVariants} className="bg-[#3E2723]/30 p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors">
            <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">Our Promise</h3>
            <ul className="space-y-3 text-sm text-[#FDF6E3] mt-2">
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✓</span> No preservatives or artificial additives
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✓</span> Strict cleanliness & hygiene
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✓</span> Customizable recipes
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">✓</span> Small-batch quality assurance
              </li>
            </ul>
          </motion.div>

          {/* COL 3: Why Choose Us */}
          <motion.div variants={itemVariants} className="bg-[#3E2723]/30 p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors">
            <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">Why Choose Us</h3>
            <ul className="space-y-3 text-sm text-[#FDF6E3] mt-2">
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">★</span> Authentic recipes passed down generations
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">★</span> Made fresh, never pre-stocked
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">★</span> New oil daily, never reused
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37]">★</span> Trusted by customers across Sri Lanka
              </li>
            </ul>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default About;