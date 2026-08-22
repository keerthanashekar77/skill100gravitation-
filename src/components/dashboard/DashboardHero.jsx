import React from 'react';
import { getDashboardStats } from '../../data/gravitationData';

export default function DashboardHero({ userMastery = 0 }) {
  const stats = getDashboardStats();

  return (
    <div className="dashboard-hero">
      <div className="hero-content">
        <span className="hero-grade-badge">~ Grade 11 Physics</span>
        <h1 className="hero-title">
          Master<br />
          Gravitation
        </h1>
        <p className="hero-subtitle">
          Unlock the foundations of mechanics. From planetary orbits to satellite motion, master everything you need to know about Gravitation.
        </p>
      </div>

      <div className="hero-stats-grid">
        <div className="hero-stat-card">
          <div className="hero-stat-val">{stats.totalConcepts}</div>
          <div className="hero-stat-lbl">Core Topics</div>
        </div>
        <div className="hero-stat-card">
          <div className="hero-stat-val">{stats.totalQuestions}+</div>
          <div className="hero-stat-lbl">Practice Problems</div>
        </div>
        <div className="hero-stat-card">
          <div className="hero-stat-val">{stats.totalNCERTLiners}</div>
          <div className="hero-stat-lbl">NCERT Liners</div>
        </div>
        <div className="hero-stat-card">
          <div className="hero-stat-val">{userMastery}%</div>
          <div className="hero-stat-lbl">Mastery</div>
        </div>
      </div>
    </div>
  );
}
