import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import NavBar from './sections/NavBar';
import Home from './sections/Home';
import Sweets from './sections/Sweets';
import About from './sections/About';
import Contact from './sections/Contact';
import "./index.css";

const App = () => {

  return (
    <CartProvider>
      <div>
          <NavBar/>
          <Home/>
          <Sweets/>
          <About/>
          <Contact/>
      </div> 
    </CartProvider>
  )
}

export default App