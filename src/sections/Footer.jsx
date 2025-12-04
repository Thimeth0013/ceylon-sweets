import React, { useState } from 'react';
import { MapPin, Phone, Mail, X, ArrowLeft } from 'lucide-react';
import Privacy from '../components/PrivacyPolicy';
import Terms from '../components/TermsOfService';
import Returns from '../components/ReturnPolicy';

// Reusable Modal Component for Policies
const PolicyModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#2A1B12] w-full md:max-w-3xl h-[90vh] md:h-[85vh] md:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col animate-slide-up md:animate-scale-in overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2A1B12] text-[#FDF6E3] px-8 py-4 flex justify-between items-center shadow-md z-10 flex-none">
          <div className="flex items-center gap-3">
             <button 
                onClick={onClose}
                className="md:hidden text-[#D4AF37] hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-serif font-bold">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:text-[#FDF6E3] px-3 py-1.5 rounded-lg transition-colors group"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area with Custom Themed Scrollbar */}
        <div className="flex-1 overflow-y-auto text-[#2A1B12] px-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-[#141414]
          [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-[#B89225]
        ">
          <div className="max-w-3xl mx-auto">
             {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState(null); // 'privacy', 'terms', 'returns', or null

  const handleClose = () => setActivePolicy(null);

  // Helper to render the correct component content
  const renderPolicyContent = () => {
    switch (activePolicy) {
      case 'privacy': return <Privacy />;
      case 'terms': return <Terms />;
      case 'returns': return <Returns />;
      default: return null;
    }
  };

  // Helper to get title
  const getPolicyTitle = () => {
    switch (activePolicy) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'returns': return 'Return & Refund Policy';
      default: return '';
    }
  };

  return (
    <>
      <footer className="bg-[#2A1B12] text-[#E6DCC8] border-t-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-4">Ceylon Sweets</h2>
              <p className="text-sm leading-relaxed opacity-80 mb-6 font-serif">
                Crafting authentic Sri Lankan sweets with traditional recipes and premium ingredients since 2024.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                <a href="https://wa.me/94782099856" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2C22] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/ceylon_sweets?igsh=bnV1aXg3b2FiaDFy" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2C22] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1FYyCuXajp/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2C22] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@ceylon_sweets?_r=1&_t=ZS-91tDpXR4PGJ" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2C22] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@CeylonSweets/shorts" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2C22] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-all duration-150">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.058 6.945a2.625 2.625 0 0 0 -1.853 -1.853C18.57 4.65 12 4.65 12 4.65s-6.57 0 -8.205 0.443a2.625 2.625 0 0 0 -1.853 1.853A27 27 0 0 0 1.5 12a27 27 0 0 0 0.443 5.055 2.625 2.625 0 0 0 1.853 1.853c1.635 0.443 8.205 0.443 8.205 0.443s6.57 0 8.205 -0.443a2.625 2.625 0 0 0 1.853 -1.853A27 27 0 0 0 22.5 12a27 27 0 0 0 -0.443 -5.055M9.9 15.15v-6.3l5.452 3.15Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2 text-sm font-noto">
                <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
                <li><a href="#sweets" className="hover:text-[#D4AF37] transition-colors">Our Collection</a></li>
                <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                <li><a href="#socials" className="hover:text-[#D4AF37] transition-colors">Socials</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-4 uppercase tracking-wider">Support</h3>
              <ul className="space-y-2 text-sm font-noto">
                <li>
                  <button 
                    onClick={() => setActivePolicy('returns')}
                    className="hover:text-[#D4AF37] transition-colors text-left focus:outline-none"
                  >
                    Returns & Refunds
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePolicy('privacy')}
                    className="hover:text-[#D4AF37] transition-colors text-left focus:outline-none"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePolicy('terms')}
                    className="hover:text-[#D4AF37] transition-colors text-left focus:outline-none"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-4 uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-3 text-sm font-noto">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>123 Temple Road,<br/>Ruwanwella, Sri Lanka</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>+94 77 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>hello@ceylonsweets.lk</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#3E2C22] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 font-serif">
            <p>&copy; {currentYear} Ceylon Sweets. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Crafted with tradition, delivered with care.</p>
          </div>
        </div>
      </footer>

      {/* Render Policy Modal */}
      <PolicyModal 
        isOpen={!!activePolicy} 
        onClose={handleClose} 
        title={getPolicyTitle()}
      >
        {renderPolicyContent()}
      </PolicyModal>
    </>
  );
};

export default Footer;