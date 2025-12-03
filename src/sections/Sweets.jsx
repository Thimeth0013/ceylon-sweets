import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ZoomIn, X } from 'lucide-react';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';

// --- 1. LIGHTBOX COMPONENT (Pop-out Image) ---
const ImageLightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-150 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative max-w-lg w-full bg-[#FFFDF5] p-2 rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-[#D4AF37] text-[#2A1B12] rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
          >
            <X size={20} />
          </button>
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-auto rounded-lg object-cover max-h-[70vh]" 
          />
          <div className="p-4 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2A1B12]">{image.alt}</h3>
            <p className="text-[#8D6E63] text-sm mt-1">Tap outside to close</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- 2. ADD TO CART CONTROL (With Max Limit 10) ---
const AddToCartControl = ({ id, variantName = null, price, name, image }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useCart();
  const quantity = getItemQuantity(id, variantName);
  const isMaxLimit = quantity >= 10;

  if (quantity === 0) {
      return (
          <button 
              onClick={(e) => {
                  e.stopPropagation();
                  increaseCartQuantity(id, variantName, price, name, image);
              }}
              className="w-9 h-9 rounded-full bg-[#2A1B12] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-colors font-bold text-lg shadow-md border border-[#D4AF37]/20 active:scale-95"
              aria-label="Add to cart"
          >
              +
          </button>
      );
  } else {
      return (
          <div 
              className="flex items-center bg-[#2A1B12] rounded-full px-1 py-1 shadow-md h-9 border border-[#D4AF37]/20"
              onClick={(e) => e.stopPropagation()} 
          >
              <button 
                  onClick={() => decreaseCartQuantity(id, variantName)}
                  className="w-7 h-7 rounded-full bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/20 flex items-center justify-center font-bold text-lg transition-colors pb-0.5 active:scale-90"
                  aria-label="Decrease quantity"
              >
                  −
              </button>
              
              <span className="w-8 text-center text-[#FDF6E3] font-bold text-sm select-none">
                  {quantity}
              </span>

              <button 
                  onClick={() => !isMaxLimit && increaseCartQuantity(id, variantName, price, name, image)}
                  disabled={isMaxLimit}
                  className={`w-7 h-7 rounded-full bg-transparent flex items-center justify-center font-bold text-lg transition-colors pb-0.5 ${
                    isMaxLimit 
                      ? 'text-gray-500 cursor-not-allowed opacity-50' 
                      : 'text-[#D4AF37] hover:bg-[#D4AF37]/20 active:scale-90'
                  }`}
                  aria-label="Increase quantity"
                  title={isMaxLimit ? "Maximum limit reached" : ""}
              >
                  +
              </button>
          </div>
      );
  }
};

// --- 3. ITEM CARD COMPONENT ---
const ItemCard = ({ item, expandedItem, toggleItem, setPreviewImage }) => {
  const isMultiVariant = item.hasVariants && item.variants.length > 1;
  const singleData = (!isMultiVariant && item.hasVariants && item.variants.length === 1) 
      ? item.variants[0] 
      : item;
  const displayPrice = isMultiVariant ? null : (singleData.price || item.price);
  const isExpanded = expandedItem === item.id;

  return (
      <div 
          className={`
              bg-[#FFFDF5] 
              rounded-xl 
              shadow-[0_2px_10px_-5px_rgba(42,27,18,0.05)] 
              border 
              overflow-hidden 
              transition-colors
              duration-200
              ${isExpanded 
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30' 
                  : 'border-[#E6DCC8]/60 hover:border-[#D4AF37]/40'
              }
          `}
      >
          {/* PARENT ROW */}
          <div 
              className={`flex items-center p-4 ${isMultiVariant ? 'cursor-pointer hover:bg-[#FAF8F1]' : ''}`}
              onClick={() => isMultiVariant && toggleItem(item.id)}
          >
              {/* Image Thumbnail */}
              <div className="relative group mr-4 shrink-0">
                  <div 
                    className="w-20 h-20 rounded-lg overflow-hidden border border-[#E6DCC8] cursor-zoom-in relative bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage({ src: item.image, alt: item.name });
                    }}
                  >
                      <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={16} />
                      </div>
                  </div>
              </div>
              
              <div className="grow pr-2">
                  <h3 className="font-serif text-lg font-bold text-[#2A1B12] leading-tight">{item.name}</h3>
                  {item.desc && <p className="text-xs text-[#8D6E63] mt-1.5 leading-relaxed font-medium">{item.desc}</p>}
                  {item.tag && (
                      <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-[#C62828] bg-[#FFEBEE] px-2 py-0.5 rounded-full border border-[#FFCDD2]">
                          {item.tag}
                      </span>
                  )}
              </div>

              <div className="flex flex-col items-end gap-3 min-w-[85px]">
                  {isMultiVariant ? (
                      <>
                          <span className="text-xs font-bold bg-[#EFEBE9] px-2 py-1 rounded text-[#5D4037] border border-[#D7CCC8] whitespace-nowrap">
                              {item.variants.length} Options
                          </span>
                          <span className={`text-[#D4AF37] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                              ▼
                          </span>
                      </>
                  ) : (
                      <>
                          <span className="font-serif font-bold text-[#2A1B12] text-lg">LKR {displayPrice}</span>
                          <AddToCartControl 
                              id={item.id} 
                              variantName={item.hasVariants ? singleData.name : null} 
                              price={displayPrice}
                              name={item.name}
                              image={item.image}
                          />
                      </>
                  )}
              </div>
          </div>

          {/* VARIANTS ACCORDION */}
          <div 
            className={`
              bg-[#FAF8F1] border-t border-[#E6DCC8]/50 overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
              {isMultiVariant && item.variants.map((variant, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 pl-24 pr-4 border-b border-[#E6DCC8]/50 last:border-0 hover:bg-[#F5F0E1]/50 transition-colors">
                      <span className="text-sm text-[#5D4037] font-bold">{variant.name}</span>
                      <div className="flex items-center gap-4">
                          <span className="text-sm font-serif font-bold text-[#2A1B12]">LKR {variant.price}</span>
                          <AddToCartControl 
                              id={item.id} 
                              variantName={variant.name} 
                              price={variant.price}
                              name={`${item.name} - ${variant.name}`}
                              image={item.image}
                          />
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

// --- 4. MAIN SWEETS COMPONENT ---
const Sweets = () => {
  const [activeTab, setActiveTab] = useState('Traditional');
  const [expandedItem, setExpandedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const { cartItems, cartTotal } = useCart();

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const activeData = menuItems[activeTab];
  const isCategorized = activeData.length > 0 && activeData[0].category;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <section id="sweets" className="min-h-screen bg-[#FDF6E3] text-[#2A1B12] pt-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2A1B12] mb-2">Our Collection</h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex bg-[#E6DCC8]/30 p-1.5 rounded-xl border border-[#D4AF37]/20">
              {Object.keys(menuItems).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setExpandedItem(null); }}
                  className={`text-sm md:text-base font-serif px-6 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab 
                    ? 'bg-[#2A1B12] text-[#FDF6E3] font-bold shadow-md' 
                    : 'text-[#5D4037] hover:text-[#2A1B12] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* LIST ITEMS */}
          <div className="flex flex-col gap-6 pb-32 animate-fade-in">
              {activeData.length === 0 && (
                  <div className="text-center py-20 text-[#8D6E63] bg-[#FFFDF5] rounded-xl border border-dashed border-[#D4AF37]/30">
                    <p className="font-serif text-xl">Coming Soon...</p>
                  </div>
              )}

              {isCategorized ? (
                  activeData.map((categoryGroup, index) => (
                      <div key={index} className="mb-2">
                          <h3 className="text-2xl font-serif text-[#2A1B12] mb-4 flex items-center gap-3">
                             <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                             {categoryGroup.category}
                          </h3>
                          <div className="flex flex-col gap-4">
                              {categoryGroup.items.map((item) => (
                                  <ItemCard 
                                    key={item.id} 
                                    item={item} 
                                    expandedItem={expandedItem}
                                    toggleItem={toggleItem}
                                    setPreviewImage={setPreviewImage}
                                  />
                              ))}
                          </div>
                      </div>
                  ))
              ) : (
                  <div className="flex flex-col gap-4">
                      {activeData.map((item) => (
                          <ItemCard 
                            key={item.id} 
                            item={item} 
                            expandedItem={expandedItem}
                            toggleItem={toggleItem}
                            setPreviewImage={setPreviewImage}
                          />
                      ))}
                  </div>
              )}
          </div>
        </div>
      </section>

      {/* Floating View Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#2A1B12]/90 backdrop-blur-sm text-[#D4AF37] border-2 border-[#D4AF37] px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 hover:bg-[#2A1B12] transition-all hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2A1B12] text-[10px] border border-[#2A1B12]/90 w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wider font-bold text-[#FDF6E3]">View Cart</span>
                <span className="text-sm font-bold">LKR {cartTotal.toLocaleString()}</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ImageLightbox image={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
};

export default Sweets;