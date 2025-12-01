import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // 1. Initialize State from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("ceylonSweetsCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Sync with LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("ceylonSweetsCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Helper: Get quantity of a specific item (considering variants)
  function getItemQuantity(id, variantName = null) {
    return cartItems.find(item => item.id === id && item.variant === variantName)?.quantity || 0;
  }

  // 4. Add Item (Increase)
  function increaseCartQuantity(id, variantName, price, name, image) {
    setCartItems(currItems => {
      // Check if item already exists
      if (currItems.find(item => item.id === id && item.variant === variantName) == null) {
        return [...currItems, { id, variant: variantName, price, name, image, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id && item.variant === variantName) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // 5. Remove Item (Decrease)
  function decreaseCartQuantity(id, variantName) {
    setCartItems(currItems => {
      const existingItem = currItems.find(item => item.id === id && item.variant === variantName);
      if (existingItem?.quantity === 1) {
        // Remove completely if quantity becomes 0
        return currItems.filter(item => !(item.id === id && item.variant === variantName));
      } else {
        // Decrease count
        return currItems.map(item => {
          if (item.id === id && item.variant === variantName) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // 6. Remove Item Completely
  function removeFromCart(id, variantName) {
    setCartItems(currItems => 
      currItems.filter(item => !(item.id === id && item.variant === variantName))
    );
  }

  // 7. Clear Entire Cart
  function clearCart() {
    setCartItems([]);
  }

  // 8. Get Total Price
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // 9. Get Total Items Count
  const cartQuantity = cartItems.reduce((qty, item) => qty + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        cartItems,
        cartQuantity,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}