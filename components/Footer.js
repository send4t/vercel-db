
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import ThemeSwitch from '../components/darkMode'


const Footer = () => {
  const { theme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showButton, setShowButton] = useState(false); // Define showButton state

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 200) {
        // Show button when scrolled down more than 200px
        setShowButton(true);
      } else {
        // Hide button when scrolled up
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Run effect only once on component mount


    return(
<footer className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}>
<div className="border-t border-gray-600 pt-4 ">
  </div>
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/3 text-sm text-gray-500 text-sm font-semibold mb-4">
        Email: vonyitomi@gmail.com
     </div>
      <div className="w-full md:w-1/3 flex items-center justify-center text-sm font-semibold mb-4">
        <ThemeSwitch/>
      </div>
      <div className="w-full md:w-1/3 text-sm font-semibold text-gray-500 text-right">
         &copy; {new Date().getFullYear()} Tamás Vonyigás. All rights reserved.       
      </div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 bg-gray-500 text-white p-3 rounded-full shadow-md hover:bg-gray-600 focus:outline-none ${
          !showButton && 'hidden'
        }`}
      >
        UP
      </button>
    </div>
   </div>
   
</footer>

    )}

    export default Footer;