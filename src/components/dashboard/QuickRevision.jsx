import React, { useState } from 'react';
import {
  ClipboardList,
  Zap,
  Rocket,
  Globe,
  RotateCw,
  AlertTriangle
} from 'lucide-react';
import RevisionFlashcard from './RevisionFlashcard';

export default function QuickRevision() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      id: 'kepler',
      icon: <ClipboardList size={22} color="#2563eb" />,
      title: "Kepler's Laws Key Principles",
      bullets: [
        '1st Law: Planets move in ellipses with Sun at one focus.',
        '2nd Law: Equal areas swept in equal times (dA/dt = L/(2m) = constant).',
        '3rd Law: T² ∝ a³ (Square of orbital period ∝ cube of semi-major axis).'
      ],
      backDetails: (
        <>
          <p><strong>Key Formula:</strong> T² = (4π² / GM) · a³</p>
          <p><strong>Conservation Law:</strong> 2nd law (Equal areas in equal times) is a direct consequence of Conservation of Angular Momentum (L = constant) under central gravitational force.</p>
          <p><strong>NEET Trap:</strong> T² ∝ a³ holds for semi-major axis 'a'. For circular orbits, a equals radius r. Do not confuse period with linear velocity (v ∝ 1/√r).</p>
        </>
      )
    },
    {
      id: 'field-shell',
      icon: <Zap size={22} color="#2563eb" />,
      title: 'Gravitational Field & Shell Theorem',
      bullets: [
        'Outside sphere (r ≥ R): Field acts as if all mass M is concentrated at center.',
        'Inside uniform hollow shell: Gravitational field intensity E = 0 everywhere.',
        'Inside solid sphere (r < R): Field intensity E = -GMr/R³ (linearly proportional to r).'
      ],
      backDetails: (
        <>
          <p><strong>Field Intensity Formulas:</strong> E_outside = -GM/r², E_surface = -GM/R², E_inside_hollow = 0.</p>
          <p><strong>Potential inside Hollow Shell:</strong> V = -GM/R (constant throughout interior, equal to surface potential).</p>
          <p><strong>NEET Trap:</strong> While Gravitational Field E inside a uniform hollow sphere is ZERO, Gravitational Potential V is NOT zero!</p>
        </>
      )
    },
    {
      id: 'satellite-energy',
      icon: <Rocket size={22} color="#2563eb" />,
      title: 'Satellite Energy Relationships',
      bullets: [
        'Kinetic Energy: K = + GMm / (2r)',
        'Potential Energy: U = - GMm / r',
        'Total Energy: E = - GMm / (2r) [Note: E = -K = U/2]',
        'Binding Energy: B = + GMm / (2r) [Energy required to remove satellite to ∞]'
      ],
      backDetails: (
        <>
          <p><strong>Energy Proportions:</strong> K : U : E = 1 : -2 : -1</p>
          <p><strong>Atmospheric Drag Effect:</strong> If a satellite loses energy due to friction, total energy E decreases (becomes more negative), orbital radius r shrinks, and paradoxically speed v INCREASES!</p>
          <p><strong>NEET Trap:</strong> Total orbital energy E is ALWAYS negative for bound orbits. If E ≥ 0, the trajectory becomes parabolic or hyperbolic (unbound).</p>
        </>
      )
    },
    {
      id: 'variation-g',
      icon: <Globe size={22} color="#2563eb" />,
      title: 'Variation of Acceleration due to Gravity',
      bullets: [
        'Poles vs Equator: g_pole (9.83 m/s²) > g_equator (9.78 m/s²) due to rotation & Earth bulge.',
        'At Height h: g_h decreases as 1/(R+h)².',
        'At Earth Center: d = R ⇒ g = 0 (weightlessness at center of Earth).'
      ],
      backDetails: (
        <>
          <p><strong>Approximation Formula:</strong> g_h = g(1 - 2h/R) [ONLY valid when height h &lt;&lt; R].</p>
          <p><strong>Depth Formula:</strong> g_d = g(1 - d/R) [Exact linear decrease with depth d below Earth surface].</p>
          <p><strong>Latitude Rotation Effect:</strong> g_λ = g - ω² R cos²λ (g decreases maximum at equator λ=0° where g_eq = g - ω²R).</p>
        </>
      )
    },
    {
      id: 'escape-velocity',
      icon: <RotateCw size={22} color="#2563eb" />,
      title: 'Escape Velocity Characteristics',
      bullets: [
        've = √2 · vo (Escape speed is √2 times orbital speed near surface).',
        'Independent of projectile mass: A 1 kg rock and a 10,000 kg rocket need the same 11.2 km/s.',
        'Independent of launch angle: Any direction clears Earth gravity provided air resistance is neglected.'
      ],
      backDetails: (
        <>
          <p><strong>Key Formula:</strong> v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s for Earth.</p>
          <p><strong>Planet Proportions:</strong> v_e ∝ √(M/R) or v_e ∝ R √ρ (if mean density ρ is constant).</p>
          <p><strong>NEET Trap:</strong> Launch angle θ relative to ground does NOT change escape speed magnitude! However, launching east uses Earth rotation advantage (+0.46 km/s).</p>
        </>
      )
    },
    {
      id: 'neet-traps',
      icon: <AlertTriangle size={22} color="#2563eb" />,
      title: 'Critical NEET Traps & Reminders',
      bullets: [
        'Gravitation constant G is a universal SCALAR (6.674 × 10⁻¹¹ N·m²/kg²).',
        'Gravitational field E is a VECTOR pointing INWARD.',
        'Total orbital energy is ALWAYS NEGATIVE for bound orbits.',
        'Weight in free-fall / orbiting satellite is ZERO (apparent weightlessness).'
      ],
      backDetails: (
        <>
          <p><strong>Apparent Weightlessness:</strong> Acceleration of satellite = acceleration of astronaut = g_orbital. Normal contact force N = 0.</p>
          <p><strong>Kepler's 2nd Law:</strong> Areal velocity dA/dt = L / (2m) is constant. Radial velocity changes, but areal velocity stays constant.</p>
          <p><strong>Reference Potential:</strong> Gravitational Potential Energy U at infinity (r = ∞) is taken as ZERO reference point.</p>
        </>
      )
    }
  ];

  const handlePrev = () => {
    setCurrentCard((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentCard((prev) => Math.min(cards.length - 1, prev + 1));
  };

  return (
    <div className="quick-revision-wrapper">
      <div className="quick-revision-header">
        <h2 className="quick-revision-title">
          <span>⚡ Quick Revision Module</span>
        </h2>
        <p className="quick-revision-subtitle">
          Everything you need for last-minute revision. One card at a time.
        </p>
      </div>

      <RevisionFlashcard
        card={cards[currentCard]}
        currentIndex={currentCard}
        totalCards={cards.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
