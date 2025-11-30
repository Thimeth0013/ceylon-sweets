import React, { useState } from 'react';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';

const Sweets = () => {
  const [activeTab, setActiveTab] = useState('Traditional');
  const [expandedItem, setExpandedItem] = useState(null);
  
  // Get cart functions from our context
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useCart();

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // --- COMPONENT: The Add/Remove Button Logic ---
  const AddToCartControl = ({ id, variantName = null, price, name, image }) => {
    const quantity = getItemQuantity(id, variantName);

    if (quantity === 0) {
        // State 1: Show simple "+" button
        return (
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent opening accordion when clicking add
                    increaseCartQuantity(id, variantName, price, name, image);
                }}
                className="w-8 h-8 rounded-full bg-[#2A1B12] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#2A1B12] transition-colors font-bold text-lg shadow-md"
            >
                +
            </button>
        );
    } else {
        // State 2: Show "- QTY +" controls
        return (
            <div 
                className="flex items-center bg-[#2A1B12] rounded-full px-1 py-1 shadow-md h-8"
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    onClick={() => decreaseCartQuantity(id, variantName)}
                    className="w-6 h-6 rounded-full bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/20 flex items-center justify-center font-bold text-sm transition-colors"
                >
                    −
                </button>
                
                <span className="w-6 text-center text-[#FDF6E3] font-bold text-sm select-none">
                    {quantity}
                </span>

                <button 
                    onClick={() => increaseCartQuantity(id, variantName, price, name, image)}
                    className="w-6 h-6 rounded-full bg-transparent text-[#D4AF37] hover:bg-[#D4AF37]/20 flex items-center justify-center font-bold text-sm transition-colors"
                >
                    +
                </button>
            </div>
        );
    }
  };

  const ItemCard = ({ item }) => {
    const isMultiVariant = item.hasVariants && item.variants.length > 1;
    
    // For single-variant items (like 'Butter Cake' 1kg), we treat it as a direct item
    // If it pretends to be multi but has only 1, grab that variant's data
    const singleData = (!isMultiVariant && item.hasVariants && item.variants.length === 1) 
        ? item.variants[0] 
        : item;

    // Determine pricing for display
    const displayPrice = isMultiVariant ? null : (singleData.price || item.price);

    return (
        <div 
            key={item.id} 
            className={`bg-white rounded-lg shadow-sm border border-[#E6DCC8] overflow-hidden transition-all duration-300 ${
                expandedItem === item.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50' : ''
            }`}
        >
            {/* PARENT ROW */}
            <div 
                className={`flex items-center p-4 transition-colors ${isMultiVariant ? 'cursor-pointer hover:bg-[#FAF8F1]' : ''}`}
                onClick={() => isMultiVariant && toggleItem(item.id)}
            >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200 mr-4" />
                
                <div className="grow pr-2">
                    <h3 className="font-serif text-lg font-bold text-[#2A1B12] leading-tight">{item.name}</h3>
                    {item.desc && <p className="text-xs text-[#5D4037] mt-1">{item.desc}</p>}
                    {item.tag && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                            {item.tag}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[85px]">
                    {isMultiVariant ? (
                        /* MULTI-VARIANT UI */
                        <>
                            <span className="text-xs font-bold bg-[#FDF6E3] px-2 py-1 rounded text-[#8D6E63] border border-[#E6DCC8] whitespace-nowrap">
                                {item.variants.length} Types
                            </span>
                            <span className={`text-[#D4AF37] transition-transform duration-300 ${expandedItem === item.id ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </>
                    ) : (
                        /* SINGLE ITEM UI */
                        <>
                            <span className="font-bold text-[#2A1B12]">LKR {displayPrice}</span>
                            
                            {/* The Magic Button */}
                            <AddToCartControl 
                                id={item.id} 
                                // If it's a hidden single variant, use that name, else null
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
            {isMultiVariant && (
                <div className={`bg-[#fafafa] border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${expandedItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.variants.map((variant, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 pl-20 pr-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            <span className="text-sm text-[#3E2723] font-medium">{variant.name}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-[#2A1B12]">LKR {variant.price}</span>
                                
                                {/* Magic Button for Variants */}
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
            )}
        </div>
    );
  };

  const activeData = menuItems[activeTab];
  const isCategorized = activeData.length > 0 && activeData[0].category;

  return (
    <section id="sweets" className="min-h-screen bg-[#FDF6E3] text-[#2A1B12] py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-[#2A1B12] text-center mb-2">Our Collection</h2>
        <p className="text-center text-[#5D4037] mb-10 italic">Select your favorites to build your hamper</p>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-8 border-b-2 border-[#D4AF37]/30 pb-4 overflow-x-auto">
          {Object.keys(menuItems).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpandedItem(null); }}
              className={`text-lg font-serif px-4 py-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                ? 'text-[#2A1B12] border-b-2 border-[#D4AF37] font-bold' 
                : 'text-[#8D6E63] hover:text-[#D4AF37]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-6">
            {activeData.length === 0 && (
                <div className="text-center py-10 text-[#8D6E63]">Coming Soon...</div>
            )}

            {isCategorized ? (
                activeData.map((categoryGroup, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-2xl font-serif text-[#D4AF37] mb-4 border-l-4 border-[#D4AF37] pl-3">
                            {categoryGroup.category}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {categoryGroup.items.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col gap-4">
                    {activeData.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Sweets;