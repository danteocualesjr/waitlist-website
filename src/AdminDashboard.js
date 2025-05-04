import React, { useState } from 'react';
import './App.css';

function AdminDashboard() {

  // For demo: use local state for waitlist users
  
  const [users, setUsers] = useState(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem('waitlistUsers');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  // For remembering admin credentials
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('adminEmail') || '');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('adminPassword') || '');
  const [showRegister, setShowRegister] = useState(false);

  // Register admin credentials
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
    setAdminEmail(email);
    setAdminPassword(password);
    setShowRegister(false);
    alert('Admin registered! You can now log in.');
  };

  // Login with saved credentials
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === (adminEmail || localStorage.getItem('adminEmail')) && password === (adminPassword || localStorage.getItem('adminPassword'))) {
      setAuthenticated(true);
    } else {
      alert('Incorrect email or password');
    }
  };

  const handleExport = () => {
    const csv = users.map(u => u.email).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waitlist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));

  if (!adminEmail || !adminPassword || showRegister) {
    return (
      <div className="admin-login">
        <h2>Admin Registration</h2>
        <form onSubmit={handleRegister} autoComplete="off">
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <button style={{marginTop: 8}} onClick={() => setShowRegister(true)}>Register new admin</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Waitlist Admin Dashboard</h2>
      <button onClick={handleExport}>Export CSV</button>
      <input
        type="text"
        placeholder="Search emails..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginLeft: 16 }}
      />
      <table className="waitlist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr><td colSpan="2">No users found.</td></tr>
          ) : (
            filteredUsers.map((u, i) => (
              <tr key={u.email}>
                <td>{i + 1}</td>
                <td>{u.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
