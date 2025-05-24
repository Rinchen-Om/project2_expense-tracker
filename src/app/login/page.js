"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import '../styles/login.css';
import { Line, Pie } from 'react-chartjs-2';

export default function LoginPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [darkMode, setDarkMode] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const modeToggleRef = useRef();
  const [activeTab, setActiveTab] = useState('table');

  // Load theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // Update body class on darkMode change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handlers
  const handleModeToggle = () => setDarkMode((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Store user data in localStorage (excluding sensitive info)
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = "/home";
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Sign up successful! Now you can log in.");
        setActiveForm("login");
      } else {
        alert(data.message || "Sign up failed.");
      }
    } catch (err) {
      alert("Sign up failed. Please try again.");
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${forgotEmail} (simulation).`);
    setActiveForm("login");
  };

  return (
    <>
      <Head>
        <title>Login | Expense Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <button
        className="mode-toggle"
        id="modeToggle"
        onClick={handleModeToggle}
        ref={modeToggleRef}
        aria-label="Toggle dark mode"
      >
        <i className={`fas fa-${darkMode ? "sun" : "moon"}`}></i>
      </button>

      {/* Login Form */}
      <div className={`login-container${activeForm === "login" ? " active" : ""}`} id="loginContainer">
        <div className="login-header">
          <h1>
            <i className="fas fa-wallet"></i> ExpenseTracker
          </h1>
          <p>Track your finances with ease</p>
        </div>
        <form id="loginForm" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={e => { e.preventDefault(); setActiveForm("signup"); }}>Sign up</a>
          </p>
          <p>
            <a href="#" onClick={e => { e.preventDefault(); setActiveForm("forgot"); }}>Forgot password?</a>
          </p>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className={`login-container${activeForm === "signup" ? " active" : ""}`} id="signupContainer">
        <div className="login-header">
          <h1>
            <i className="fas fa-user-plus"></i> Sign Up
          </h1>
          <p>Create a new account</p>
        </div>
        <form id="signupForm" onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label" htmlFor="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
              className="form-control"
              placeholder="Enter your email"
              required
              value={signupData.email}
              onChange={e => setSignupData({ ...signupData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              className="form-control"
              placeholder="Create a password"
              required
              value={signupData.password}
              onChange={e => setSignupData({ ...signupData, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-user-plus"></i> Sign Up
            </button>
          </div>
          <div className="login-footer">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); setActiveForm("login"); }}>Login</a>
            </p>
          </div>
        </form>
      </div>

      {/* Forgot Password Form */}
      <div className={`login-container${activeForm === "forgot" ? " active" : ""}`} id="forgotContainer">
        <div className="login-header">
          <h1>
            <i className="fas fa-unlock-alt"></i> Reset Password
          </h1>
          <p>Enter your email to reset password</p>
        </div>
        <form id="forgotForm" onSubmit={handleForgot}>
          <div className="form-group">
            <label className="form-label" htmlFor="forgotEmail">Email</label>
            <input
              type="email"
              id="forgotEmail"
              className="form-control"
              placeholder="Enter your email"
              required
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i> Send Reset Link
            </button>
          </div>
          <div className="login-footer">
            <p>
              Remembered your password?{' '}
              <a href="#" onClick={e => { e.preventDefault(); setActiveForm("login"); }}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
} 