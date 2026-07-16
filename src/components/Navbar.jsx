import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`ws-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span>WHITESTORMM</span>
        </div>
        <div className="nav-links">
          <a href="#">Products</a>
          <a href="#">Philosophy</a>
          <a href="#">Company</a>
          <a href="#">Careers</a>
        </div>
        <div className="nav-actions">
          <button className="btn-nav">Contact Us</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
