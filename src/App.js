import React, { useState } from 'react';
import './App.css';
import { FaRunning, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function App() {
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1200);
  };

  return (
    <div className="App">
      <div className="container glass">
        <div className="branding">
          <FaRunning className="logo-icon" />
          <h1>Rundezvous</h1>
        </div>
        {/* Social Media Buttons */}
        <div className="social-buttons">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
        <h2>Run, Meet Cute</h2>
        <div className="waitlist-content">
          {!submitted ? (
            <>
              <p>The first dating app that matches runners based on pace, distance, and running goals.</p>
              <p className="subtitle">Find your perfect running partner and maybe something more ✨</p>
              <form className="waitlist-form" onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <button type="submit" disabled={loading}>
                  <span>{loading ? 'Joining...' : 'Join the Waitlist'}</span>
                </button>
                {error && <div className="feedback error">{error}</div>}
              </form>
              <p className="terms">By joining, you agree to our Terms and Privacy Policy</p>
            </>
          ) : (
            <div className="success-message animate-in">
              <h2>You're on the Starting Line! 🎉</h2>
              <p>We'll notify you when it's time to start your journey to finding your running soulmate.</p>
              <div className="feedback success">Thank you for joining the waitlist! Please check your email for confirmation.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
