import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Toast from './components/Toast';
import NavBar from './sections/NavBar';
import Home from './sections/Home';
import Sweets from './sections/Sweets';
import About from './sections/About';
import Socials from './sections/Socials';
import Footer from './sections/Footer';
import './App.css';

function AppContent() {
  const { toast, hideToast } = useCart();

  return (
    <>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={hideToast}
        type={toast.type}
      />
      <NavBar />
      <Home />
      <Sweets />
      <About />
      <Socials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;