'use client';
import { useState } from 'react';
import '../../styles/settings.css';
import '../../styles/home.css';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Dorji',
    email: 'Dorji@example.com',
    phone: '+975 17669952',
    avatar: '/default-avatar.png'
  });
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    currency: 'USD'
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Add profile update logic here
    alert('Profile updated successfully!');
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    // Add settings update logic here
    alert('Settings updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav">
          <div className="nav-section">
            <h3>Account</h3>
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile Information
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Preferences
            </button>
          </div>

          <div className="nav-section">
            <h3>Security</h3>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Security Settings
            </button>
          </div>

          <div className="nav-section">
            <button 
              className="nav-item logout"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </div>
        </nav>

        <main className="settings-content">
          {activeTab === 'profile' && (
            <section className="settings-section">
              <div className="section-header">
                <h2>Profile Information</h2>
                <p>Update your personal information</p>
              </div>

              <form onSubmit={handleProfileUpdate} className="settings-form">
                <div className="avatar-container">
                  <div className="avatar-wrapper">
                    <Image 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="avatar"
                      width={150}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="avatar-overlay">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                  </div>
                  <button type="button" className="change-avatar-btn">Change Photo</button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">Save Changes</button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'preferences' && (
            <section className="settings-section">
              <div className="section-header">
                <h2>Preferences</h2>
                <p>Customize your application experience</p>
              </div>

              <form onSubmit={handleSettingsUpdate} className="settings-form">
                <div className="preferences-grid">
                  <div className="preference-item">
                    <div className="preference-header">
                      <h3>Notifications</h3>
                      <p>Receive updates about your account</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="preference-item">
                    <div className="preference-header">
                      <h3>Dark Mode</h3>
                      <p>Switch between light and dark themes</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="preference-item">
                    <div className="preference-header">
                      <h3>Language</h3>
                      <p>Select your preferred language</p>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="select-input"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="preference-item">
                    <div className="preference-header">
                      <h3>Currency</h3>
                      <p>Set your preferred currency</p>
                    </div>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="select-input"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">Save Preferences</button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'security' && (
            <section className="settings-section">
              <div className="section-header">
                <h2>Security Settings</h2>
                <p>Manage your account security</p>
              </div>

              <div className="security-content">
                <form className="settings-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        id="currentPassword"
                        placeholder="Enter your current password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter your new password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Update Password</button>
                  </div>
                </form>

                <div className="security-features">
                  <div className="security-feature">
                    <div className="feature-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>

                  <div className="security-feature">
                    <div className="feature-info">
                      <h3>Login History</h3>
                      <p>View your recent login activity</p>
                    </div>
                    <button className="btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
} 