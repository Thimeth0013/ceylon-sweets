import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      // Call Vercel serverless function
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          setShowCheckout(false);
          setOrderPlaced(false);
          onClose();
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
    <div className="fixed inset-0 z-100 bg-[#FDF6E3]">
      {/* Header */}
      <div className="bg-[#2A1B12] text-[#FDF6E3] px-6 py-4 flex justify-between items-center shadow-lg">
        <h2 className="text-3xl font-serif font-bold">Your Cart</h2>
        <button 
          onClick={onClose}
          className="text-[#D4AF37] hover:text-[#FDF6E3] transition-colors text-4xl leading-none font-light"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-[#8D6E63]">
              <div className="text-8xl mb-6 opacity-30">🛒</div>
              <p className="text-2xl font-serif">Your cart is empty</p>
              <p className="text-lg mt-2">Add some delicious sweets to get started!</p>
              <button 
                onClick={onClose}
                className="mt-8 bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Clear Cart Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  <span>🗑️</span> Clear Cart
                </button>
              </div>

              {/* Cart Items - Compact Table View */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-[#2A1B12] text-[#FDF6E3]">
                    <tr>
                      <th className="text-left py-3 px-4 font-serif">Item</th>
                      <th className="text-center py-3 px-4 font-serif">Price</th>
                      <th className="text-center py-3 px-4 font-serif">Quantity</th>
                      <th className="text-right py-3 px-4 font-serif">Subtotal</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b border-[#E6DCC8] hover:bg-[#FAF8F1]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded border border-gray-200"
                            />
                            <div>
                              <p className="font-semibold text-[#2A1B12] text-sm">{item.name}</p>
                              {item.variant && (
                                <p className="text-xs text-[#8D6E63]">{item.variant}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4 text-sm text-[#2A1B12]">
                          LKR {item.price}
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => decreaseCartQuantity(item.id, item.variant)}
                              className="w-6 h-6 rounded bg-[#2A1B12] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2A1B12] flex items-center justify-center font-bold text-sm transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-bold text-[#2A1B12]">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => increaseCartQuantity(item.id, item.variant, item.price, item.name, item.image)}
                              className="w-6 h-6 rounded bg-[#2A1B12] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2A1B12] flex items-center justify-center font-bold text-sm transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-bold text-[#2A1B12]">
                          LKR {item.price * item.quantity}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => removeFromCart(item.id, item.variant)}
                            className="text-red-600 hover:text-red-700 text-xl transition-colors"
                            title="Remove item"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total and Checkout */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#D4AF37]">
                  <span className="text-2xl font-serif font-bold text-[#2A1B12]">Total:</span>
                  <span className="text-3xl font-bold text-[#D4AF37]">LKR {cartTotal}</span>
                </div>
                
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold py-4 rounded-lg transition-colors shadow-md text-lg"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !loading && setShowCheckout(false)}
          />
          
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            {orderPlaced ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-serif font-bold text-green-600 mb-2">Order Placed!</h3>
                <p className="text-[#5D4037]">Thank you for your order. We'll contact you soon!</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif font-bold text-[#2A1B12] mb-6">Delivery Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2A1B12] mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#E6DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2A1B12] mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#E6DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2A1B12] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#E6DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      placeholder="+94 77 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2A1B12] mb-1">Delivery Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#E6DCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                      rows="3"
                      placeholder="123 Main Street, Colombo 07"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCheckout(false)}
                    disabled={loading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#C4941F] text-[#2A1B12] font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Complete Order'}
                  </button>
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