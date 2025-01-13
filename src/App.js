import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';

// List of valid invite codes
const VALID_INVITE_CODES = ['austin234', 'alvin145', 'karthik321'];

// Arrays to store names with valid and invalid invite codes
let inviteCodeList = [];
let noInviteCodeList = [];

function Home() {
  // State to store user name, invite code, and error messages
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate name input
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    let position;

    // Check if the invite code is valid
    if (VALID_INVITE_CODES.includes(inviteCode.trim().toLowerCase())) {
      inviteCodeList.push(name); // Add name to the list for valid invite codes
      position = inviteCodeList.length;
    } else {
      // If invite code is invalid, show error and add name to no invite code list
      if (inviteCode.trim()) {
        setError('Invalid invite code. You will be placed without priority.');
      }
      noInviteCodeList.push(name);
      position = inviteCodeList.length + noInviteCodeList.length; // Position based on total users
    }

    // Navigate to the position page with the calculated position
    navigate(`/position/${position}`);
  };

  return (
    <div className="hero">
      <div className="container">
        <h1>Welcome to the Exclusive Waiting List</h1>
        <p>Join now and secure your spot with or without an invite code.</p>
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
              placeholder="Enter your name"
            />
          </label>
          <label>
            Invite Code (Optional):
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="input-field"
              placeholder="Enter invite code if any"
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Join Now</button>
        </form>
      </div>
    </div>
  );
}

function Position({ position }) {
  // Estimate wait time based on position (1 day per position)
  const waitTime = position * 1;
  return (
    <div className="container">
      <h1>Your Waiting List Position</h1>
      <p>You are currently at position <strong>#{position}</strong>.</p>
      <p>Estimated wait time: <strong>{waitTime} day(s)</strong></p>
      <Link to="/" className="link-button">Back to Home</Link>
    </div>
  );
}

function PositionPage() {
  const navigate = useNavigate();
  // Extract position from the URL and check if it's valid
  const position = parseInt(window.location.pathname.split('/position/')[1]);
  if (isNaN(position)) navigate('/'); // Redirect to home if the position is not valid

  return <Position position={position} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the home page */}
        <Route path="/position/:position" element={<PositionPage />} /> {/* Route for the position page */}
      </Routes>
    </Router>
  );
}

export default App;
