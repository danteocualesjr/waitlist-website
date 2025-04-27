import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Join Our Waitlist</h1>
        <p>Be the first to know when we launch!</p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Thank you for joining!</h2>
            <p>We'll notify you when we launch.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
