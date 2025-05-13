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
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      setConfetti(true);
      const timer = setTimeout(() => setConfetti(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [status]);

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
      setEmail('');
    }, 1200);
  };

  return (

    <div className="modern-hero-bg">
      <main style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <section className="modern-card glass" aria-label="Join Waitlist">
          <div className="modern-branding">
            <span role="img" aria-label="logo" className="modern-logo">🚀</span>
            <span className="modern-title">Rundezvous</span>
          </div>
          <div className="modern-subtitle">Launching Soon</div>
          <div className="modern-desc">Be the first to know when we go live.</div>
          <div className="modern-desc">Join our exclusive waitlist and get early access.</div>
          <div className="modern-countdown-label">Countdown to launch:</div>
          <CountdownTimer targetDate={LAUNCH_DATE} />
          <form className="modern-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <span className="input-icon" aria-hidden="true">🛩️</span>
              <input
                type="email"
                id="waitlist-email"
                className="modern-input"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); setError(''); }}
                required
                disabled={status === 'loading' || status === 'success'}
                autoFocus
                placeholder="Enter your email"
                aria-label="Email address"
              />
            </div>
            <button type="submit" className="modern-btn" disabled={status === 'loading' || status === 'success'}>
              <span>{status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join the Waitlist'}</span>
            </button>
            {status === 'error' && <div className="modern-feedback" style={{color:'#ff4d6d', borderColor:'#ffb3c6'}}>{error}</div>}
            {status === 'success' && <div className={`modern-success${confetti ? ' confetti' : ''}`}>🎉 You’re in! We’ll notify you at launch.</div>}
          </form>
          <div className="modern-terms">
            By joining, you agree to our <a href="#" tabIndex="0">Terms</a> and <a href="#" tabIndex="0">Privacy Policy</a>.
          </div>
        </section>
      </main>
    </div>
  );
}

