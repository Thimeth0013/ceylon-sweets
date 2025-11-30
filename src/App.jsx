import { useState } from 'react';
import { NavBar } from './sections/NavBar';
import { Home } from './sections/Home';
import { Sweets } from './sections/Sweets';
import { About } from './sections/About';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import "./index.css";

const App = () => {

  return (
    <>
      <div>
          <NavBar/>
          <Home/>
          <Sweets/>
          <About/>
          <FAQ />
          <Contact/>
      </div> 
    </>
  )
}

export default App
