import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from '../components/Cart';
import logo from '../assets/logo.png';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartQuantity } = useCart();
  const lastScrollY = useRef(0);

  // --- Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Background transparency logic
      setIsScrolled(currentScrollY > 50);

      // 2. Hide/Show logic (Only if mobile menu is closed)
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling DOWN -> Hide
          setIsVisible(false);
        } else {
          // Scrolling UP -> Show
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // --- Prevent Background Scroll when Mobile Menu is Open ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Sweets', id: 'sweets' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      // Small timeout to allow menu to close animation to start/finish
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform 
        ${isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} 
        ${isScrolled || isMobileMenuOpen ? 'bg-[#2A1B12]/95 shadow-lg backdrop-blur-md' : 'bg-transparent'}
        py-3 md:py-5`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* 1. Logo */}
          <button onClick={() => scrollToSection('home')} className="shrink-0 z-50">
            <img src={logo} alt="Ceylon Sweets" className='w-10 h-10 md:w-12 md:h-12 object-contain'/>
          </button>

          {/* 2. Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-[#FDF6E3] hover:text-[#D4AF37] font-serif text-lg transition-colors tracking-wide"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 3. Right Side Actions (Cart & Mobile Toggle) */}
          <div className="flex items-center gap-5 z-50">
            {/* Cart Icon */}
            <button 
              onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
              className="relative text-[#D4AF37] hover:text-[#FDF6E3] transition-colors"
            >
              <ShoppingCart size={26} />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-black">
                  {cartQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle (Visible only on Mobile) */}
            <button 
              className="md:hidden text-[#FDF6E3] hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-[60px] bg-[#2A1B12] z-40 md:hidden overflow-hidden flex flex-col items-center justify-center border-t border-[#D4AF37]/20"
            >
              <div className="flex flex-col gap-8 items-center -mt-20">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-[#FDF6E3] hover:text-[#D4AF37] font-serif text-3xl font-medium tracking-wider transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                
                {/* Decorative Divider */}
                <motion.div 
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ delay: 0.5, duration: 0.5 }}
                   className="w-16 h-0.5 bg-[#D4AF37]/50 mt-4" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;