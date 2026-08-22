import React from 'react';
import { CheckCircle2, FileCheck, ArrowRight, Share2, Compass } from 'lucide-react';
import { getConnectomics } from '../../data/gravitationData';

export default function ConnectomicsView({ onNavigateIntro }) {
  const data = getConnectomics();
  const hero = data.hero || {};
  const webPhysics = data.web_of_physics || {};
  const connections = webPhysics.connections || [];

  const prereqItems = [
    'Distance, displacement, speed & velocity',
    'Acceleration (uniform & non-uniform)',
    'Equations of motion (v = u + at, etc.)',
    'Scalar vs Vector quantities',
    'Resolution of vectors into components',
    'Concept of weight and mass (W = mg)',
    'Free body diagrams (basic)',
    "Newton's laws of motion (concept)"
  ];

  const realWorldSystems = [
    {
      title: 'Satellite Communication & Orbits',
      badge: 'IMPACT: ESSENTIAL',
      desc: 'Geostationary and polar satellites require exact orbital velocity calculations (v = √(GM/r)) to match Earth rotation and remain fixed over telecommunication ground stations.'
    },
    {
      title: 'Space Mission Trajectories & Escape Velocity',
      badge: 'IMPACT: HIGH',
      desc: 'Interplanetary probes like ISRO Chandrayaan & Mangalyaan utilize gravitational slingshot manoeuvres and exact escape speed calculations (11.2 km/s) to break free from Earth gravity.'
    },
    {
      title: 'Tidal Mechanics & Oceanography',
      badge: 'IMPACT: ENVIRONMENTAL',
      desc: 'Differential gravitational pull across Earth by the Moon and Sun creates lunar tidal bulges, generating renewable tidal hydro-energy and governing marine ecological rhythms.'
    }
  ];

  return (
    <div className="connectomics-container">
      {/* Hero Banner */}
      <div className="connectomics-hero">
        <h1>
          Gravitation <span>Connectomics</span>
        </h1>
        <p>{hero.title || 'Discover the hidden threads linking Gravitation to the entire world of science.'}</p>
      </div>

      {/* Checkpoint Card */}
      <div className="checkpoint-card">
        <div className="checkpoint-title" style={{ justifyContent: 'center', textAlign: 'center', color: '#0f172a', fontWeight: '800' }}>
          <FileCheck size={22} color="#0f172a" />
          <span style={{ color: '#0f172a', fontWeight: '800' }}>Connectomic Checkpoint</span>
        </div>
        <div className="checkpoint-sub" style={{ textAlign: 'center' }}>
          Every concept in this chapter rests on what you already know. Verify these before proceeding.
        </div>

        <div style={{ color: '#f59e0b', fontWeight: '700', fontSize: '13px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} color="#f59e0b" />
          <span>You must be comfortable with:</span>
        </div>

        <div className="prereq-grid">
          {prereqItems.map((item, idx) => (
            <div key={idx} className="prereq-item">
              <CheckCircle2 size={14} className="check-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Web of Physics Section */}
      <div style={{ margin: '36px 0 20px 0' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '6px' }}>
          The Web of Physics
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center' }}>
          See how Gravitation connects directly with major topics across Mechanics, Energy, and Modern Physics.
        </p>

        <div className="web-physics-grid">
          {connections.map((conn, idx) => {
            const colors = ['#f59e0b', '#10b981', '#6366f1'];
            const accentColor = colors[idx % colors.length];
            return (
              <div key={idx} className="web-card" style={{ borderLeft: `4px solid ${accentColor}` }}>
                <div className="web-card-header">
                  <span style={{ fontSize: '22px' }}>{conn.icon}</span>
                  <span className="web-card-tag">{conn.tag}</span>
                </div>
                <div className="web-card-relation">
                  {conn.from} → {conn.to}
                </div>
                <div className="web-card-desc">{conn.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real World Systems */}
      <div style={{ margin: '40px 0 20px 0' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '20px' }}>
          Real World Systems & Applications
        </h2>
        <div className="web-physics-grid">
          {realWorldSystems.map((sys, idx) => (
            <div key={idx} className="web-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #2563eb' }}>
              <span className="web-card-tag" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: '10px', display: 'inline-block' }}>
                {sys.badge}
              </span>
              <div className="web-card-relation" style={{ fontSize: '18px', color: '#1e3a8a' }}>{sys.title}</div>
              <div className="web-card-desc" style={{ color: '#334155' }}>{sys.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Redirect Callout */}
      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        padding: '24px 32px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '40px'
      }}>
        <div>
          <div style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: '800' }}>Infinite Connections</div>
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', marginTop: '4px' }}>
            Newton's Laws aren't just a chapter — they're the backbone of engineering, sports science, and space exploration. Every time a car brakes or a rocket launches, these laws are at work.
          </div>
        </div>
        <button
          onClick={onNavigateIntro}
          style={{
            background: '#2563eb',
            color: '#ffffff',
            padding: '10px 24px',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <span>Next Topic: Intro →</span>
        </button>
      </div>
    </div>
  );
}
