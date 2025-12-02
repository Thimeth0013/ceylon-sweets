import React from 'react';
import { motion } from 'framer-motion';
import { Star, Leaf, Clock, MapPin, Award, Heart } from 'lucide-react';
import ABOUT_IMAGE from '../assets/about.jpg';

// --- Animation Variants ---
// Simple fade up animation used repeatedly for a consistent feel
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom ease for a premium feel
  }
};

// Container to control staggered timing of children
const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const About = () => {
  return (
    <section id="about" className="relative bg-[#2A1B12] text-[#FDF6E3] py-20 overflow-hidden">
      
      {/* --- Background Pattern --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- SECTION 1: The Story (Editorial Split Layout) --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          
          {/* Left: Image Composition */}
          {/* Using fadeUpVariants here makes it slide up gently on mobile instead of in from the side */}
          <motion.div 
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 relative group"
          >
            {/* Decorative Frame - subtle parallax on hover (desktop) */}
            <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 rounded-tl-[3rem] rounded-br-[3rem] translate-x-2 translate-y-2 md:group-hover:translate-x-1 md:group-hover:translate-y-1 transition-transform duration-500"></div>
            
            <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] shadow-2xl">
              <div className="absolute inset-0 bg-[#2A1B12]/20 md:group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <motion.img 
                whileHover={{ scale: 1.03 }} // Subtle zoom only on desktop hover
                transition={{ duration: 0.7 }}
                src={ABOUT_IMAGE} 
                alt="Traditional Sri Lankan Sweets" 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* Floating Badge (Hidden on mobile to save space) */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-8 -right-8 bg-[#D4AF37] text-[#2A1B12] p-6 rounded-full shadow-lg hidden md:flex flex-col items-center justify-center w-32 h-32 border-4 border-[#2A1B12]"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Est.</span>
              <span className="text-3xl font-serif font-black">2024</span>
              <span className="text-xs font-bold uppercase tracking-widest">Ceylon</span>
            </motion.div>
          </motion.div>

          {/* Right: Text Content - Staggered Animation */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={fadeUpVariants} className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-[#D4AF37]"></span>
              <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-semibold">Our Heritage</span>
            </motion.div>

            <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-6xl font-serif text-[#FDF6E3] mb-8 leading-tight">
              Reviving the <span className="text-[#D4AF37] italic">Lost Flavors</span> of Ceylon.
            </motion.h2>

            <motion.p variants={fadeUpVariants} className="text-lg text-[#E6DCC8]/80 leading-relaxed mb-6 font-light">
              Ceylon Sweets began with a simple yet profound mission: to rescue Sri Lanka’s culinary heritage from the shelves of supermarkets and return it to the warmth of the home kitchen.
            </motion.p>

            <motion.p variants={fadeUpVariants} className="text-lg text-[#E6DCC8]/80 leading-relaxed mb-8 font-light">
              From our humble beginnings in <span className="text-[#D4AF37] font-medium">Imbulana, Ruwanwella</span>, we don't just sell sweets; we craft nostalgia. Every Kokis, every Kavum is a tribute to the recipes passed down by our grandmothers.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-3 border border-[#D4AF37]/30 px-5 py-3 rounded-full bg-[#D4AF37]/5 cursor-default">
                <MapPin size={18} className="text-[#D4AF37]" />
                <span className="text-sm tracking-wide">Imbulana, Ruwanwella</span>
              </div>
              <div className="flex items-center gap-3 border border-[#D4AF37]/30 px-5 py-3 rounded-full bg-[#D4AF37]/5 cursor-default">
                <Heart size={18} className="text-[#D4AF37]" />
                <span className="text-sm tracking-wide">Family Owned</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- SECTION 2: The Three Pillars (Cards) --- */}
        {/* Stagger wrapper for the cards */}
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            icon={<Leaf size={32} />}
            title="Pure & Natural"
            description="We strictly say no to artificial preservatives. Our sweets are made with 100% natural ingredients, just like homemade."
          />
          <FeatureCard 
            icon={<Clock size={32} />}
            title="Made to Order"
            description="We don't stock shelves. Every order is prepared fresh upon request to ensure you taste the crispness and authentic flavor."
          />
          <FeatureCard 
            icon={<Award size={32} />}
            title="Premium Hygiene"
            description="We use new oil for every batch—never reused. Vacuum packed for freshness and delivered within 2-3 days island-wide."
          />
        </motion.div>

      </div>
    </section>
  );
};

// Sub-component with motion applied via the parent stagger
const FeatureCard = ({ icon, title, description, highlight }) => (
  <motion.div 
    variants={fadeUpVariants} // Uses the same fade up as text
    className={`p-8 rounded-2xl border transition-all duration-300 group
      ${highlight 
        ? 'bg-[#3E2723] border-[#D4AF37] shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]' 
        : 'bg-[#2A1B12] border-[#3E2723] md:hover:border-[#D4AF37]/50'
      }`}
  >
    <div className={`mb-6 inline-flex p-4 rounded-xl shadow-md ${highlight ? 'bg-[#D4AF37] text-[#2A1B12]' : 'bg-[#3E2723] text-[#D4AF37] md:group-hover:bg-[#D4AF37] md:group-hover:text-[#2A1B12] transition-colors'}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-serif text-[#FDF6E3] mb-4">{title}</h3>
    <p className="text-[#E6DCC8]/70 leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default About;