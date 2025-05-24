'use client';
import '../../styles/help.css';
import '../../styles/home.css';
export default function HelpPage() {
  return (
    <div className="helpContainer">
      <div className="helpHeader">
        <h1>Help Center</h1>
        <p>Find answers to common questions and learn how to use our expense tracker effectively</p>
      </div>

      <div className="helpContent">
        <div className="searchSection">
          <div className="searchBox">
            <input type="text" placeholder="Search for help..." />
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="quickLinks">
          <h2>Quick Links</h2>
          <div className="linksGrid">
            <a href="#getting-started" className="quickLinkCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <span>Getting Started</span>
            </a>
            <a href="#account" className="quickLinkCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Account Settings</span>
            </a>
            <a href="#home" className="quickLinkCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              <span>Managing Expenses</span>
            </a>
            <a href="#report" className="quickLinkCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21H3"></path>
                <path d="M3 10h18"></path>
                <path d="M3 7l9-4 9 4"></path>
              </svg>
              <span>Reports & Analytics</span>
            </a>
          </div>
        </div>

        <div className="faqSection">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faqList">
            <div className="faqItem">
              <h3>How do I add a new expense?</h3>
              <p>To add a new expense, click the "Add Expense" button in the dashboard. Fill in the required details such as amount, category, date, and description. Click "Save" to record the expense.</p>
            </div>

            <div className="faqItem">
              <h3>Can I export my expense data?</h3>
              <p>Yes, you can export your expense data in various formats including CSV, Excel, and PDF. Go to the Reports section and click on the "Export" button to choose your preferred format.</p>
            </div>

            <div className="faqItem">
              <h3>How do I set up budget categories?</h3>
              <p>Navigate to Settings {'>'} Budget Categories. Here you can create, edit, or delete budget categories. You can also set spending limits for each category.</p>
            </div>

            <div className="faqItem">
              <h3>Is my data secure?</h3>
              <p>Yes, we take data security seriously. All your data is encrypted using industry-standard protocols. We use secure servers and regular backups to ensure your information is safe.</p>
            </div>

            <div className="faqItem">
              <h3>How do I reset my password?</h3>
              <p>Click on "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your email to reset your password.</p>
            </div>
          </div>
        </div>

        <div className="supportSection">
          <h2>Need More Help?</h2>
          <div className="supportOptions">
            <div className="supportCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <h3>Email Support</h3>
              <p>Get in touch with our support team</p>
              <a href="mailto:support@expensetracker.com">support@expensetracker.com</a>
            </div>

            <div className="supportCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <h3>Phone Support</h3>
              <p>Call us during business hours</p>
              <a href="tel:+18001234567">+1 (800) 123-4567</a>
            </div>

            <div className="supportCard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <button className="chatButton">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 