'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export default function CommonLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
  };

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" />
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
      </div>

      {/* Quick Add Button */}
      <Link href="/expense" className="quick-add-btn">
        <i className="fas fa-plus"></i>
      </Link>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <i className="fas fa-wallet"></i>
            <span>ExpenseTracker</span>
          </div>
          
          <div className="navbar-links">
            <ul className="main-nav">
              <li><Link href="/" className="active"><i className="fas fa-home"></i> Home</Link></li>
              <li><Link href="/dashboard"><i className="fas fa-chart-line"></i> Dashboard</Link></li>
              <li className="dropdown">
                <Link href="#"><i className="fas fa-exchange-alt"></i> Transactions <i className="fas fa-chevron-down"></i></Link>
                <ul className="dropdown-menu">
                  <li><Link href="/income"><i className="fas fa-money-bill-wave"></i> Income</Link></li>
                  <li><Link href="/expense"><i className="fas fa-shopping-cart"></i> Expense</Link></li>
                </ul>
              </li>
              <li><Link href="/balance"><i className="fas fa-piggy-bank"></i> Balance</Link></li>
              <li><Link href="/budget"><i className="fas fa-chart-pie"></i> Budget</Link></li>
              <li><Link href="/settings"><i className="fas fa-cog"></i> Settings</Link></li>
            </ul>
            
           
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <div className="footer-logo">
              <i className="fas fa-wallet"></i>
              <span>ExpenseTracker</span>
            </div>
            <p>Take control of your finances with our powerful yet simple expense tracking tool.</p>
            <div className="footer-social">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
              <li><Link href="/dashboard"><i className="fas fa-chart-line"></i> Dashboard</Link></li>
              <li><Link href="/income"><i className="fas fa-money-bill-wave"></i> Income</Link></li>
              <li><Link href="/expense"><i className="fas fa-shopping-cart"></i> Expense</Link></li>
              <li><Link href="/budget"><i className="fas fa-chart-pie"></i> Budget</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link href="/help"><i className="fas fa-question-circle"></i> Help Center</Link></li>
              <li><Link href="/privacy"><i className="fas fa-file-alt"></i> Privacy Policy</Link></li>
              <li><Link href="/terms"><i className="fas fa-file-contract"></i> Terms of Service</Link></li>
              <li><Link href="/contact"><i className="fas fa-envelope"></i> Contact Us</Link></li>
              <li><Link href="/report-bug"><i className="fas fa-bug"></i> Report a Bug</Link></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3 className="footer-title">Newsletter</h3>
            <p>Subscribe to our newsletter for financial tips and updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
              <input type="email" placeholder="Your email address" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
} 