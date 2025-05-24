'use client';

import { useEffect } from 'react';
import '../../styles/privacy.css';
import '../../styles/home.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="privacy-content">
        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Expense Tracker. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <div className="info-list">
            <h3>2.1 Personal Information</h3>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Profile picture (optional)</li>
              <li>Financial transaction data</li>
              <li>Device and usage information</li>
            </ul>

            <h3>2.2 How We Collect Information</h3>
            <ul>
              <li>Direct interactions (when you register or use our services)</li>
              <li>Automated technologies (cookies and similar tracking technologies)</li>
              <li>Third-party sources (when permitted by law)</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
            used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to 
            those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>Under data protection laws, you have rights including:</p>
          <ul>
            <li>Your right of access</li>
            <li>Your right to rectification</li>
            <li>Your right to erasure</li>
            <li>Your right to restrict processing</li>
            <li>Your right to data portability</li>
            <li>Your right to object</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="contact-info">
            <p>Email: privacy@expensetracker.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: College of Science & Technology (CST), Bhutan</p>
          </div>
        </section>
      </div>
    </div>
  );
} 