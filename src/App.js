import React, { useState, useEffect } from 'react';
import './App.css';
import { FaRunning } from 'react-icons/fa';

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
    <div className="App minimal">
      <div className="container minimal-container">
        <div className="branding minimal-branding">
          <FaRunning className="logo-icon minimal-logo" />
          <h1>Rundezvous</h1>
        </div>
        <h2 className="minimal-tagline">Run, Meet Cute</h2>
        <CountdownTimer targetDate="2025-06-01T12:00:00" />
        <div className="waitlist-content minimal-waitlist">
          {!submitted ? (
            <>
              <p className="minimal-desc">The first dating app that matches runners based on pace, distance, and running goals.</p>
              <form className="waitlist-form minimal-form" onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="minimal-input"
                />
                <button type="submit" disabled={loading} className="minimal-btn">
                  {loading ? 'Joining...' : 'Join the Waitlist'}
                </button>
                {error && <div className="feedback error minimal-feedback">{error}</div>}
              </form>
              <p className="minimal-terms">By joining, you agree to our Terms and Privacy Policy</p>
            </>
          ) : (
            <div className="success-message minimal-success">
              <h2>You're on the Starting Line! </h2>
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
