import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import AboutPage from './pages/AboutPage';
import './App.css';

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <nav className="navbar" data-testid="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">YourBank</span>
        </Link>
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu" 
          data-testid="menu-toggle"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/careers" 
              className={location.pathname === '/careers' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Careers
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link to="/security" onClick={() => setMenuOpen(false)}>Security</Link>
          </li>
        </ul>
        <div className="nav-actions">
          <button className="btn-signin" data-testid="signup-btn">Sign Up</button>
          <button className="btn-open-account" data-testid="login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div className="footer-logo" data-testid="footer-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">YourBank</span>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/about">About</Link>
          <Link to="/security">Security</Link>
        </div>
        <div className="footer-divider" />
        <div className="footer-contact" data-testid="footer-contact">
          <span>📧 hello@skillbirdge.com</span>
          <span>📞 +91 91813 23 2309</span>
          <span>📍 Somewhere in the World</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-social" data-testid="footer-social">
            <button className="social-btn" aria-label="Facebook">f</button>
            <button className="social-btn" aria-label="Twitter">𝕏</button>
            <button className="social-btn" aria-label="LinkedIn">in</button>
          </div>
          <p className="footer-copyright">YourBank All Rights Reserved</p>
          <div className="footer-legal">
            <button>Privacy Policy</button>
            <span>|</span>
            <button>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────────
function Layout({ children }) {
  return (
    <div className="App" data-testid="app">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/security" element={<div className="section"><h1>Security Page - Coming Soon</h1></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
