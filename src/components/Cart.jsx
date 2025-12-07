import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, X, ShoppingBag, Minus, Plus, ArrowLeft, CheckCircle, FileText, MapPin, User, Mail, Phone } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  // Reset checkout state when cart closes
  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => {
            setShowCheckout(false);
            setOrderPlaced(false);
            setTermsAccepted(false);
        }, 300);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all details.');
      return;
    }

    if (!termsAccepted) {
        alert('Please accept the Terms and Conditions to proceed.');
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

      // Simulating API call
      // const response = await fetch('/api/send-order', ...);
      
      // Simulate delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      setOrderPlaced(true);
      
      setTimeout(() => {
        clearCart();
        handleClose();
        setFormData({ name: '', email: '', phone: '', address: '' });
        setTermsAccepted(false);
      }, 3000);

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
      
      {/* 1. Header */}
      <div className="bg-[#2A1B12] text-[#FDF6E3] shadow-md z-20 flex-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Back Button Logic */}
            {showCheckout ? (
                <button 
                    onClick={handleBackToCart}
                    className="text-[#D4AF37] hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                </button>
            ) : (
                <button 
                    onClick={handleClose}
                    className="md:hidden text-[#D4AF37] hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
            )}

            <div className="flex items-center gap-2">
                {!showCheckout && <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />}
                <h2 className="text-lg md:text-xl font-serif font-bold tracking-wide">
                    {orderPlaced ? 'Order Status' : showCheckout ? 'Secure Checkout' : 'Your Cart'}
                </h2>
                {!showCheckout && cartItems.length > 0 && (
                    <span className="bg-[#D4AF37] text-[#2A1B12] text-xs font-bold px-2 py-0.5 rounded-full">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="hidden md:flex text-[#D4AF37] hover:text-[#FDF6E3] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        
        {orderPlaced ? (
             /* --- SUCCESS VIEW --- */
            <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-short shadow-lg">
                    <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#2A1B12] mb-2">Order Confirmed!</h3>
                <p className="text-[#8D6E63] max-w-md">Thank you for choosing Ceylon Sweets. We have received your order and will contact you shortly.</p>
            </div>
        ) : showCheckout ? (
            /* --- CHECKOUT SPLIT VIEW --- */
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
                    <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
                        
                        {/* LEFT: DELIVERY FORM */}
                        <div className="flex-1 animate-slide-up">
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#E6DCC8]">
                                <h3 className="text-xl font-serif font-bold text-[#2A1B12] mb-6 flex items-center gap-2">
                                    <MapPin className="text-[#D4AF37]" size={24}/> Delivery Details
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider ml-1">Full Name</label>
                                            <div className="relative">
                                                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="text" name="name"
                                                    value={formData.name} onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F1] border border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-[#2A1B12] text-sm"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider ml-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="tel" name="phone"
                                                    value={formData.phone} onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F1] border border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-[#2A1B12] text-sm"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="email" name="email"
                                                value={formData.email} onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F1] border border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-[#2A1B12] text-sm"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider ml-1">Delivery Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address} onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-[#FAF8F1] border border-[#E6DCC8] rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none text-[#2A1B12] text-sm min-h-[100px]"
                                            placeholder="Enter your full delivery address including city..."
                                        />
                                    </div>

                                    {/* TERMS AND CONDITIONS */}
                                    <div className="pt-4 border-t border-[#E6DCC8]">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={termsAccepted}
                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#8D6E63] bg-white checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-all"
                                                />
                                                <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
                                            </div>
                                            <div className="text-sm text-[#5D4037] select-none">
                                                I agree to the <a href=""><span className="text-[#D4AF37] font-bold underline decoration-dotted hover:text-[#B8860B]">Terms & Conditions</span></a> and <span className="text-[#D4AF37] font-bold underline decoration-dotted hover:text-[#B8860B]">Privacy Policy</span> of Ceylon Sweets.
                                            </div>
                                        </label>
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading || !termsAccepted}
                                        className="w-full mt-4 bg-[#D4AF37] hover:bg-[#C4941F] disabled:bg-gray-300 disabled:cursor-not-allowed text-[#2A1B12] font-bold py-4 rounded-xl transition-all active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 text-base"
                                    >
                                        {loading ? (
                                            <span className="animate-pulse">Processing Order...</span>
                                        ) : (
                                            <>Place Order <span className="text-sm opacity-80">(LKR {cartTotal.toLocaleString()})</span></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: ORDER SUMMARY */}
                        <div className="lg:w-[400px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-[#FAF8F1] p-6 rounded-2xl border border-[#E6DCC8] sticky top-6">
                                <h3 className="text-lg font-serif font-bold text-[#2A1B12] mb-4 flex items-center gap-2">
                                    <FileText className="text-[#D4AF37]" size={20}/> Order Summary
                                </h3>
                                
                                {/* Scrollable list for summary items */}
                                <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-3 mb-6">
                                    {cartItems.map((item, index) => (
                                        <div key={`${item.id}-${index}`} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-[#E6DCC8]/50">
                                            <div className="relative">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                                                <span className="absolute -top-2 -right-2 bg-[#2A1B12] text-[#D4AF37] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-[#2A1B12] text-sm truncate">{item.name}</p>
                                                {item.variant && <p className="text-[10px] text-[#8D6E63]">{item.variant}</p>}
                                            </div>
                                            <p className="font-bold text-[#5D4037] text-sm whitespace-nowrap">
                                                LKR {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-3 border-t border-[#E6DCC8] pt-4">
                                    <div className="flex justify-between text-sm text-[#8D6E63]">
                                        <span>Subtotal</span>
                                        <span>LKR {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-[#8D6E63]">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-bold">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-dashed border-[#E6DCC8] pt-3 mt-2">
                                        <span className="font-serif font-bold text-[#2A1B12] text-lg">Total</span>
                                        <span className="font-serif font-bold text-[#D4AF37] text-xl">LKR {cartTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        ) : (
            /* --- CART EDIT VIEW (Original) --- */
            <div className="flex-1 overflow-y-auto custom-scrollbar relative animate-fade-in">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#8D6E63] mt-10">
                            <div className="bg-[#E6DCC8] p-6 rounded-full mb-6 bg-opacity-30">
                                <ShoppingBag size={64} className="opacity-50" />
                            </div>
                            <p className="text-2xl md:text-3xl font-serif mb-2 text-[#2A1B12]">Your cart is empty</p>
                            <button 
                                onClick={handleClose}
                                className="mt-6 bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold px-8 py-3 rounded-xl transition-all shadow-lg"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 pb-24">
                            <div className="flex justify-end">
                                <button onClick={clearCart} className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm flex items-center gap-2 transition-colors">
                                    <Trash2 size={16} /> Clear Cart
                                </button>
                            </div>

                            {/* Desktop Table */}
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
                                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-[#E6DCC8]"/>
                                                        <div>
                                                            <p className="font-bold text-[#2A1B12]">{item.name}</p>
                                                            {item.variant && <p className="text-xs text-[#8D6E63]">{item.variant}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center text-[#5D4037]">LKR {item.price}</td>
                                                <td className="text-center">
                                                    <div className="flex items-center justify-center gap-2 bg-[#FDF6E3] w-max mx-auto px-2 py-1 rounded-lg border border-[#E6DCC8]">
                                                        <button onClick={() => decreaseCartQuantity(item.id, item.variant)} className="p-1 hover:text-[#D4AF37]"><Minus size={14} /></button>
                                                        <span className="font-bold text-[#2A1B12] w-6 text-center text-sm">{item.quantity}</span>
                                                        <button onClick={() => increaseCartQuantity(item.id, item.variant, item.price, item.name, item.image)} className="p-1 hover:text-[#D4AF37]"><Plus size={14} /></button>
                                                    </div>
                                                </td>
                                                <td className="text-right py-4 px-6 font-bold text-[#2A1B12]">LKR {(item.price * item.quantity).toLocaleString()}</td>
                                                <td className="px-4 text-center">
                                                    <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[#8D6E63] hover:text-red-600 p-2"><X size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-3">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="bg-white p-3 rounded-lg shadow-sm border border-[#E6DCC8] flex gap-3">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-[#E6DCC8]"/>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-[#2A1B12] text-sm leading-tight">{item.name}</h3>
                                                    {item.variant && <p className="text-[10px] text-[#8D6E63] mt-0.5">{item.variant}</p>}
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.variant)} className="text-[#8D6E63] -mt-1 -mr-1 p-1"><X size={18} /></button>
                                            </div>
                                            <div className="flex justify-between items-end mt-2">
                                                <div className="flex items-center gap-2 bg-[#FDF6E3] px-2 py-1 rounded border border-[#E6DCC8]">
                                                    <button onClick={() => decreaseCartQuantity(item.id, item.variant)}><Minus size={14} className="text-[#2A1B12]" /></button>
                                                    <span className="font-bold text-[#2A1B12] w-4 text-center text-sm">{item.quantity}</span>
                                                    <button onClick={() => increaseCartQuantity(item.id, item.variant, item.price, item.name, item.image)}><Plus size={14} className="text-[#2A1B12]" /></button>
                                                </div>
                                                <p className="font-bold text-[#2A1B12] text-sm">LKR {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>

      {/* 3. Footer (Only visible when NOT in checkout and cart has items) */}
      {!showCheckout && !orderPlaced && cartItems.length > 0 && (
        <div className="flex-none bg-white border-t border-[#E6DCC8] p-3 md:p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30 pb-safe">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-[#8D6E63] uppercase font-bold tracking-wider">Total Amount</span>
              <span className="text-xl md:text-2xl font-serif font-bold text-[#2A1B12]">
                LKR {cartTotal.toLocaleString()}
              </span>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="flex-1 max-w-xs bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold py-3 md:py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-base md:text-lg"
            >
              Checkout <span className="hidden sm:inline">Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;