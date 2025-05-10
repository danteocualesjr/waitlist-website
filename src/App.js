import React, { useState, useEffect } from 'react';
import './App.css';

const LAUNCH_DATE = new Date('2025-06-01T12:00:00+08:00');

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  if (timeLeft.total <= 0) return <span className="countdown-finished">🚀 We have launched!</span>;
  return (
    <div className="countdown-animated">
      <span>{timeLeft.days}<span>d</span></span>
      <span>{timeLeft.hours}<span>h</span></span>
      <span>{timeLeft.minutes}<span>m</span></span>
      <span>{timeLeft.seconds}<span>s</span></span>
    </div>
  );
}

function getTimeLeft(target) {
  const total = Math.max(0, Math.floor((target - new Date()) / 1000));
  const days = Math.floor(total / (3600 * 24));
  const hours = Math.floor((total % (3600 * 24)) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { total, days, hours, minutes, seconds };
}

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setError('Please enter a valid email.');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
  return (
    <div className="waitlist-bg">
      <div className="waitlist-bg-img"></div>
      <div className="waitlist-bg-overlay"></div>
      <main className="waitlist-center">
        <div className="waitlist-glass-card">
          <div className="waitlist-logo">
            <span role="img" aria-label="logo" className="waitlist-logo-icon">🏃‍♂️</span>
          </div>
          <h1 className="waitlist-headline">Rundezvous Launches Soon</h1>
          <CountdownTimer targetDate={LAUNCH_DATE} />
          <form className={`waitlist-form${status === 'loading' ? ' loading' : ''}`} onSubmit={handleSubmit} autoComplete="off">
            <div className="waitlist-floating-label-group">
              <input
                type="email"
                id="waitlist-email"
                className="waitlist-input"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); setError(''); }}
                required
                disabled={status === 'loading' || status === 'success'}
                autoFocus
              />
              <label htmlFor="waitlist-email" className={email ? 'floating' : ''}>Enter your email</label>
            </div>
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <div className="modern-bg">
      <div className="modern-card glass">
        <div className="modern-logo" aria-label="Logo" role="img" style={{fontSize: '2.8rem', marginBottom: '0.7rem'}}>🏃‍♂️</div>
        <h1 className="modern-title">Rundezvous</h1>
        <div className="modern-subtitle">Run, Meet, Connect</div>
        <div className="modern-desc">
          The first dating app that matches runners based on pace, distance, and running goals. Find your perfect running partner—and maybe something more.
        </div>
        <CountdownTimer targetDate={LAUNCH_DATE} />
        {status === 'success' ? (
          <div className="modern-success">
            <h2>You're on the Starting Line! 🎉</h2>
            <p>We'll notify you when it's time to start your journey to finding your running soulmate.</p>
          </div>
        ) : (
          <form className="modern-form" onSubmit={handleSubmit} autoComplete="off">
            <input
              className="modern-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); setError(''); }}
              disabled={status === 'loading'}
              required
              aria-label="Email address"
            />
            <button className="modern-btn" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
            </button>
            {status === 'error' && <div className="modern-feedback error">{error}</div>}
          </form>
        )}
        <div className="modern-terms">
          By joining, you agree to our <a href="#" tabIndex="0">Terms</a> and <a href="#" tabIndex="0">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
