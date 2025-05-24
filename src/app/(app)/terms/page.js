'use client';

import { useEffect } from 'react';
import '../../styles/terms.css';
import '../../styles/home.css';

export default function TermsAndConditions() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using Expense Tracker, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of these terms, you may not access the service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use Expense Tracker for personal, non-commercial purposes. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained in Expense Tracker</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. User Account</h2>
          <p>
            To use certain features of the service, you must register for an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Service Usage</h2>
          <p>
            You agree to use Expense Tracker only for lawful purposes and in accordance with these Terms. 
            You agree not to use the service:
          </p>
          <ul>
            <li>In any way that violates any applicable law or regulation</li>
            <li>To transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
            <li>To impersonate or attempt to impersonate the company or any other person or entity</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are owned by Expense Tracker 
            and are protected by international copyright, trademark, patent, trade secret, and other 
            intellectual property or proprietary rights laws.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Expense Tracker, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days&apos; notice prior to any new terms taking effect.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="contact-info">
            <p>Email: terms@expensetracker.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: College of Science & Technology (CST), Bhutan</p>
          </div>
        </section>
      </div>
    </div>
  );
} 