import React from 'react';

export default function Navbar({ onNavigateHome }) {
  return (
    <header className="navbar">
      <div className="nav-brand" onClick={onNavigateHome}>
        <div className="brand-logo">s</div>
        <span>skill100.ai</span>
      </div>

      <nav className="nav-links">
        <span className="nav-link active" onClick={onNavigateHome}>Home</span>
        <span className="nav-link">Skill Discovery</span>
        <span className="nav-link">IOY 2026</span>
        <span className="nav-link">WYSD 2026</span>
        <span className="nav-link">WYSD Maths</span>
        <span className="nav-link">NEET</span>
        <span className="nav-link">Rapid Math</span>
      </nav>

      <button className="btn-logout">Logout</button>
    </header>
  );
}
