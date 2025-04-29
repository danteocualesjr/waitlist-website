import React, { useState } from 'react';
import './App.css';
import { FaRunning } from 'react-icons/fa';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="App">
      <div className="container glass">
        <div className="branding">
          <FaRunning className="logo-icon" />
          <h1>Rundezvous</h1>
        </div>
        <h2>Run, Meet Cute</h2>
        <div className="waitlist-content">
          {!submitted ? (
            <>
              <p>The first dating app that matches runners based on pace, distance, and running goals.</p>
              <p className="subtitle">Find your perfect running partner and maybe something more ✨</p>
              <form onSubmit={handleSubmit} className="waitlist-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">
                  <span>Join the Waitlist</span>
                </button>
              </form>
              <p className="terms">By joining, you agree to our Terms and Privacy Policy</p>
            </>
          ) : (
            <div className="success-message animate-in">
              <h2>You're on the Starting Line! 🎉</h2>
              <p>We'll notify you when it's time to start your journey to finding your running soulmate.</p>
            </div>
          )}
        </div>
        <div className="signin-preview">
          <h3>Preview of our Sign In Experience</h3>
          <img src="/signin-screenshot.png" alt="Sign In Page Preview" className="signin-screenshot" />
        </div>
      </div>
    </div>
  );
}

export default App;
