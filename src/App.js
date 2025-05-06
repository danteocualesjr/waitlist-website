import React, { useState, useEffect } from 'react';
import './App.css';
import { FaRunning, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaMoon, FaSun } from 'react-icons/fa';

function App() {
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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
    // Save email to localStorage for admin dashboard
    let users = [];
    try {
      const stored = localStorage.getItem('waitlistUsers');
      users = stored ? JSON.parse(stored) : [];
    } catch (err) {
      users = [];
    }
    users.push({ email, date: new Date().toISOString() });
    localStorage.setItem('waitlistUsers', JSON.stringify(users));
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1200);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Move calculateTimeLeft outside the component to avoid useEffect dependency warning
  function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  function CountdownTimer({ targetDate }) {
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);
    if (Object.keys(timeLeft).length === 0) {
      return <div className="countdown-timer">🎉 We are live! 🎉</div>;
    }
    return (
      <div className="countdown-timer">
        <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> : <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span> until launch
      </div>
    );
  }

  return (
    <div className={`App${darkMode ? ' dark-mode' : ''}`}>
      <div className={`container glass landing-modern`}>
        <div className="branding">
          <FaRunning className="logo-icon logo-animate" />
          <h1>Rundezvous</h1>
        </div>
        {/* Dark Mode Toggle */}
        <button className="darkmode-toggle" onClick={handleToggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        {/* Social Media Buttons */}
        <div className="social-buttons modern-social">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
        <h2 className="modern-tagline">Run, Meet Cute</h2>
        {/* Countdown Timer */}
        <CountdownTimer targetDate="2025-06-01T12:00:00" />
        <div className="waitlist-content">
          {!submitted ? (
            <>
              <p className="modern-desc">The first dating app that matches runners based on pace, distance, and running goals.</p>
              <p className="subtitle modern-sub">Find your perfect running partner and maybe something more ✨</p>
              <form className="waitlist-form modern-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="modern-input"
                  />
                  <span className="input-icon">@</span>
                </div>
                <button type="submit" disabled={loading} className="modern-btn">
                  <span>{loading ? 'Joining...' : 'Join the Waitlist'}</span>
                </button>
                {error && <div className="feedback error modern-feedback">{error}</div>}
              </form>
              <p className="terms modern-terms">By joining, you agree to our Terms and Privacy Policy</p>
            </>
          ) : (
            <div className="success-message animate-in modern-success">
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
