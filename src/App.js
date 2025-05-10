import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
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
    let users = [];
    try {
      const stored = localStorage.getItem('waitlistUsers');
      users = stored ? JSON.parse(stored) : [];
    } catch (err) {
      users = [];
    }
    users.push({ email, date: new Date().toISOString() });
    localStorage.setItem('waitlistUsers', JSON.stringify(users));
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1200);
  };

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
      return <div className="countdown-timer minimal-countdown">We are live! </div>;
    }
    return (
      <div className="countdown-timer minimal-countdown">
        <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> : <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span> until launch
      </div>
    );
  }

  return (
    <div className="App modern-bg">
      <div className="modern-hero-bg">
        {/* Abstract SVG Shape for Hero */}
        <svg className="modern-hero-shape" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a7c7ff"/>
              <stop offset="1" stopColor="#fbc2eb"/>
            </linearGradient>
          </defs>
          <ellipse cx="400" cy="300" rx="340" ry="200" fill="url(#gradient1)" opacity="0.32"/>
        </svg>
      </div>
      <div className="modern-card glass">
        <div className="modern-branding">
          <span className="modern-logo">🏃‍♂️</span>
          <h1 className="modern-title">Rundezvous</h1>
        </div>
        <h2 className="modern-subtitle">Run, Meet, Connect</h2>
        <p className="modern-desc">The first dating app that matches runners based on pace, distance, and running goals. Find your perfect running partner—and maybe something more.</p>
        <CountdownTimer targetDate="2025-06-01T12:00:00" />
        <div className="modern-waitlist-content">
          {!submitted ? (
            <form className="modern-form" onSubmit={handleSubmit} autoComplete="off">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="modern-input"
              />
              <button type="submit" disabled={loading} className="modern-btn">
                {loading ? 'Joining...' : 'Join the Waitlist'}
              </button>
              {error && <div className="modern-feedback error">{error}</div>}
              <p className="modern-terms">By joining, you agree to our <a href="#" tabIndex="-1">Terms</a> and <a href="#" tabIndex="-1">Privacy Policy</a>.</p>
            </form>
          ) : (
            <div className="modern-success">
              <h2>You're on the Starting Line! 🎉</h2>
              <p>We'll notify you when it's time to start your journey to finding your running soulmate.</p>
              <div className="modern-feedback success">Thank you for joining the waitlist! Please check your email for confirmation.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
