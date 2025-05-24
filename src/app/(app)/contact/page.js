'use client';
import '../../styles/contact.css';
import '../../styles/home.css';

export default function ContactPage() {
  return (
    <div className="contactContainer">
      <div className="contactHeader">
        <h1>Contact Our Expense Tracker Team</h1>
        <p>
          Have questions about our expense tracking solution? Need support with your account? 
          Reach out to our team and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className="contactContent">
        <div className="contactForm">
          <h2>Send Us a Message</h2>
          <form>
            <div className="formGroup">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>

            <div className="formGroup">
              <label htmlFor="subject">Subject</label>
              <select id="subject" required>
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Inquiry</option>
                <option value="feature">Feature Request</option>
                <option value="business">Business Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" placeholder="How can we help you?" required></textarea>
            </div>

            <button type="submit" className="submitBtn">Send Message</button>
          </form>
        </div>

        <div className="contactInfo">
          <h2>Contact Information</h2>
          
          <div className="infoItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <h3>Our Office</h3>
              <p>123 Finance Street, Suite 456<br />San Francisco, CA 94107</p>
            </div>
          </div>

          <div className="infoItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div>
              <h3>Phone</h3>
              <p>+1 (800) 123-4567<br />Mon-Fri, 9am-5pm PST</p>
            </div>
          </div>

          <div className="infoItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <div>
              <h3>Email</h3>
              <p>support@expensetracker.com<br />help@expensetracker.com</p>
            </div>
          </div>

          <div className="businessHours">
            <h3>Business Hours</h3>
            <table className="hoursTable">
              <tbody>
                <tr>
                  <td>Monday - Friday</td>
                  <td>9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>10:00 AM - 4:00 PM</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mapContainer">
            [Interactive Map Would Appear Here]
          </div>
        </div>
      </div>
    </div>
  );
}