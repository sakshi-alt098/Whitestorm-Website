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
          <div className="logo-icon-wrap">
            <div className="logo-ring"></div>
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="nav-logo-svg">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          </div>
          <span>WHITESTORMM</span>
        </div>
        <div className="nav-links">
          <a href="#innovations">Products</a>
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
