import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Sweets', id: 'sweets' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#2A1B12]/95 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <img src={logo} alt="Ceylon Sweets" className='w-12 h-12'/>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
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

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden text-[#D4AF37]">
            ☰
        </div>
      </div>
    </nav>
  );
};