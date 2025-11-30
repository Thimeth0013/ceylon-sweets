import React, { useState } from 'react';
import { menuItems } from '../data/menuData';

const Sweets = () => {
  const [activeTab, setActiveTab] = useState('Traditional');
  const [expandedItem, setExpandedItem] = useState(null);

  // Toggle accordion function
  const toggleItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null); // Close if already open
    } else {
      setExpandedItem(id); // Open new item
    }
  };

  return (
    <section id="sweets" className="min-h-screen bg-[#FDF6E3] text-[#2A1B12] py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* SECTION TITLE */}
        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1B12] text-center mb-2">Our Collection</h2>
        <p className="text-center text-[#5D4037] mb-10 italic">Select your favorites to build your hamper</p>

        {/* 1. CATEGORY TABS */}
        <div className="flex justify-center gap-4 mb-8 border-b-2 border-[#D4AF37]/30 pb-4">
          {Object.keys(menuItems).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-serif px-4 py-2 transition-all duration-300 ${
                activeTab === tab 
                ? 'text-[#2A1B12] border-b-2 border-[#D4AF37] font-bold' 
                : 'text-[#8D6E63] hover:text-[#D4AF37]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2. ITEM LIST */}
        <div className="flex flex-col gap-4">
            
            {/* Empty State */}
            {menuItems[activeTab].length === 0 && (
                <div className="text-center py-10 text-[#8D6E63]">Coming Soon...</div>
            )}

            {menuItems[activeTab].map((item) => (
            <div 
                key={item.id} 
                className={`bg-white rounded-lg shadow-sm border border-[#E6DCC8] overflow-hidden transition-all duration-300 ${
                    expandedItem === item.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50' : ''
                }`}
            >
                
                {/* PARENT ROW (Clickable if variants exist) */}
                <div 
                    className="flex items-center p-4 cursor-pointer hover:bg-[#FAF8F1] transition-colors"
                    onClick={() => item.hasVariants && toggleItem(item.id)}
                >
                    {/* Thumbnail */}
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200 mr-4" />
                    
                    {/* Info */}
                    <div className="grow">
                        <h3 className="font-serif text-lg font-bold text-[#2A1B12]">{item.name}</h3>
                        <p className="text-sm text-[#5D4037]">{item.desc}</p>
                        {item.tag && (
                            <span className="inline-block mt-1 text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                                {item.tag}
                            </span>
                        )}
                    </div>

                    {/* Action / Price Area */}
                    <div className="flex flex-col items-end gap-2 min-w-20">
                        {item.hasVariants ? (
                            <>
                                <span className="text-xs font-bold bg-[#FDF6E3] px-2 py-1 rounded text-[#8D6E63] border border-[#E6DCC8]">
                                    {item.variants.length} Types
                                </span>
                                <span className={`text-[#D4AF37] transition-transform duration-300 ${expandedItem === item.id ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-[#2A1B12]">LKR {item.price}</span>
                                <button className="w-8 h-8 rounded-full bg-[#2A1B12] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-colors font-bold text-lg">
                                    +
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* VARIANTS ACCORDION (Hidden by default) */}
                {item.hasVariants && (
                    <div className={`bg-[#fafafa] border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${expandedItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        {item.variants.map((variant, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 pl-24 pr-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <span className="text-sm text-[#3E2723] font-medium">{variant.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-[#2A1B12]">LKR {variant.price}</span>
                                    <button className="w-7 h-7 rounded-full bg-[#2A1B12] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-colors text-sm font-bold">
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Sweets;