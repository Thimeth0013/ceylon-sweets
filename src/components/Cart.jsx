import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, X, ShoppingBag, Minus, Plus, ArrowLeft } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer: formData,
        items: cartItems,
        total: cartTotal,
        date: new Date().toLocaleString()
      };

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          setShowCheckout(false);
          setOrderPlaced(false);
          handleClose();
          setFormData({ name: '', email: '', phone: '', address: '' });
        }, 3000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main Container: Fixed Full Screen
    <div className={`fixed inset-0 z-100 bg-[#FDF6E3] transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      
      {/* 1. Header - Compact */}
      <div className="bg-[#2A1B12] text-[#FDF6E3] shadow-md z-20 flex-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
                onClick={handleClose}
                className="md:hidden text-[#D4AF37] hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                <h2 className="text-lg md:text-xl font-serif font-bold tracking-wide">Your Cart</h2>
                <span className="bg-[#D4AF37] text-[#2A1B12] text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:text-[#FDF6E3] px-3 py-1.5 rounded-lg transition-colors group"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Content Area - Scrollable (Flex 1) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="max-w-6xl mx-auto px-4 py-6">
          
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#8D6E63] animate-fade-in-up mt-10">
              <div className="bg-[#E6DCC8] p-6 rounded-full mb-6 bg-opacity-30">
                <ShoppingBag size={64} className="opacity-50" />
              </div>
              <p className="text-2xl md:text-3xl font-serif mb-2 text-[#2A1B12]">Your cart is empty</p>
              <p className="text-sm md:text-base font-noto mb-8 opacity-80">Add some delicious sweets to get started!</p>
              <button 
                onClick={handleClose}
                className="bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold px-8 py-3 rounded-xl transition-all active:scale-95 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {/* Clear Cart Row */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={16} /> Clear Cart
                </button>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm border border-[#E6DCC8] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#FAF8F1] text-[#2A1B12] border-b border-[#E6DCC8]">
                    <tr>
                      <th className="text-left py-4 px-6 font-serif">Item</th>
                      <th className="text-center py-4 px-4 font-serif">Price</th>
                      <th className="text-center py-4 px-4 font-serif">Qty</th>
                      <th className="text-right py-4 px-6 font-serif">Total</th>
                      <th className="py-4 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6DCC8]">
                    {cartItems.map((item, index) => (
                      <tr key={`${item.id}-${index}`} className="hover:bg-[#FAF8F1] transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-14 h-14 object-cover rounded-lg border border-[#E6DCC8]"
                            />
                            <div>
                              <p className="font-bold text-[#2A1B12]">{item.name}</p>
                              {item.variant && <p className="text-xs text-[#8D6E63]">{item.variant}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-[#5D4037]">LKR {item.price}</td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2 bg-[#FDF6E3] w-max mx-auto px-2 py-1 rounded-lg border border-[#E6DCC8]">
                            <button onClick={() => decreaseCartQuantity(item.id, item.variant)} className="p-1 hover:text-[#D4AF37]">
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-[#2A1B12] w-6 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => increaseCartQuantity(item.id, item.variant, item.price, item.name, item.image)} className="p-1 hover:text-[#D4AF37]">
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="text-right py-4 px-6 font-bold text-[#2A1B12]">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-4 text-center">
                          <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[#8D6E63] hover:text-red-600 p-2">
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white p-3 rounded-lg shadow-sm border border-[#E6DCC8] flex gap-3 animate-fade-in">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg border border-[#E6DCC8]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#2A1B12] text-sm leading-tight">{item.name}</h3>
                          {item.variant && <p className="text-[10px] text-[#8D6E63] mt-0.5">{item.variant}</p>}
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[#8D6E63] -mt-1 -mr-1 p-1">
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-2 bg-[#FDF6E3] px-2 py-1 rounded border border-[#E6DCC8]">
                          <button onClick={() => decreaseCartQuantity(item.id, item.variant)} className="active:scale-90">
                            <Minus size={14} className="text-[#2A1B12]" />
                          </button>
                          <span className="font-bold text-[#2A1B12] w-4 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => increaseCartQuantity(item.id, item.variant, item.price, item.name, item.image)} className="active:scale-90">
                            <Plus size={14} className="text-[#2A1B12]" />
                          </button>
                        </div>
                        <p className="font-bold text-[#2A1B12] text-sm">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer / Summary - Unified & Compact (Fixed Bottom) */}
      {cartItems.length > 0 && (
        <div className="flex-none bg-white border-t border-[#E6DCC8] p-3 md:p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 pb-safe">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left Side: Total Info */}
            <div className="flex flex-col">
              <span className="text-xs text-[#8D6E63] uppercase font-bold tracking-wider">Total Amount</span>
              <span className="text-xl md:text-2xl font-serif font-bold text-[#2A1B12]">
                LKR {cartTotal.toLocaleString()}
              </span>
            </div>

            {/* Right Side: Checkout Button */}
            <button 
              onClick={() => setShowCheckout(true)}
              className="flex-1 max-w-xs bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold py-3 md:py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-base md:text-lg"
            >
              Checkout <span className="hidden sm:inline">Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-110 flex items-end md:items-center justify-center p-0 md:p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
            onClick={() => !loading && setShowCheckout(false)}
          />
          
          <div className="relative bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up md:animate-scale-in max-h-[90vh] flex flex-col">
            
            {orderPlaced ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
                  <div className="w-10 h-10 border-r-4 border-b-4 border-green-600 rotate-45 mb-2 mr-2"></div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2A1B12] mb-2">Order Placed!</h3>
                <p className="text-[#8D6E63]">We'll contact you soon.</p>
              </div>
            ) : (
              <>
                <div className="bg-[#FAF8F1] px-5 py-3 border-b border-[#E6DCC8] flex justify-between items-center sticky top-0 z-10">
                  <h3 className="text-lg font-serif font-bold text-[#2A1B12]">Delivery Details</h3>
                  <button onClick={() => setShowCheckout(false)} className="text-[#8D6E63] hover:bg-gray-200 p-2 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-5 overflow-y-auto custom-scrollbar">
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                      { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
                      { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+94 77 123 4567' }
                    ].map((field) => (
                      <div key={field.name} className="group">
                        <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider mb-1 ml-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-[#FDF6E3] border-2 border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors text-[#2A1B12] text-sm placeholder-gray-400"
                          placeholder={field.placeholder}
                          required
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider mb-1 ml-1">
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-[#FDF6E3] border-2 border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors resize-none text-[#2A1B12] text-sm placeholder-gray-400"
                        rows="3"
                        placeholder="123 Main Street..."
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-[#E6DCC8] sticky bottom-0 z-10">
                   <div className="flex gap-3">
                    <button
                        onClick={() => setShowCheckout(false)}
                        disabled={loading}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#5D4037] font-bold py-3 rounded-lg transition-colors disabled:opacity-50 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-2 bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold py-3 rounded-lg transition-all active:scale-[0.98] shadow-md disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
                    >
                        {loading ? 'Processing...' : 'Complete Order'}
                    </button>
                    </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;