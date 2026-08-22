import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Lightbulb, User, MapPin, Clock, Settings, Divide, TrendingUp, Compass } from 'lucide-react';
import { getIntroduction } from '../../data/gravitationData';
import Footer from '../common/Footer';

export default function IntroView({ onNavigateTerminology }) {
  const introData = getIntroduction();
  const prerequisites = introData.prerequisites || [];
  
  const [expandedCardId, setExpandedCardId] = useState(null);

  const defaultPrereqs = [
    {
      icon: <Divide size={28} color="#8b5cf6" />,
      title: 'Arithmetic & Algebra',
      description: 'Basic math skills for solving gravitational equations like F = G(m₁m₂)/r².'
    },
    {
      icon: <Compass size={28} color="#3b82f6" />,
      title: 'Vector Basics',
      description: 'Understanding that gravitational force has both magnitude and direction.'
    },
    {
      icon: <TrendingUp size={28} color="#f97316" />,
      title: 'Kinematics',
      description: 'Familiarity with position, velocity, acceleration due to gravity, and free fall.'
    }
  ];

  const prereqList = prerequisites.length > 0 ? prerequisites : defaultPrereqs;

  const bigQuestions = [
    {
      id: 'what',
      word: 'What',
      subText: 'is Gravitation?',
      color: '#3b82f6',
      icon: <HelpCircle size={18} color="#ffffff" />,
      question: 'What is Gravitation?',
      answer: 'Gravitation is the universal attractive force that acts between any two bodies with mass in the universe. It is one of the four fundamental interactions of nature.',
      fun_fact: 'Gravity is the weakest of all 4 fundamental forces, yet it shapes planets, stars, and galaxies!'
    },
    {
      id: 'why',
      word: 'Why',
      subText: 'do planets orbit?',
      color: '#10b981',
      icon: <Lightbulb size={18} color="#ffffff" />,
      question: 'Why do planets orbit the Sun?',
      answer: 'Planets move in closed elliptical orbits because the Sun exerts a central gravitational force supplying the exact centripetal force required for orbital curvature.',
      fun_fact: 'Without gravity, Earth would fly off in a straight path tangential to its orbit into cold interstellar space.'
    },
    {
      id: 'who',
      word: 'Who',
      subText: 'discovered it?',
      color: '#8b5cf6',
      icon: <User size={18} color="#ffffff" />,
      question: 'Who discovered Universal Gravitation?',
      answer: 'Sir Isaac Newton in 1687 published the Universal Law of Gravitation, unifying apple fall on Earth with celestial planetary motion observed by Kepler.',
      fun_fact: 'Newton invented calculus partly to solve planetary orbit differential equations!'
    },
    {
      id: 'where',
      word: 'Where',
      subText: 'is g maximum?',
      color: '#f59e0b',
      icon: <MapPin size={18} color="#ffffff" />,
      question: 'Where is acceleration due to gravity maximum?',
      answer: "Earth's acceleration due to gravity 'g' is maximum at the poles (9.83 m/s²) and minimum at the equator (9.78 m/s²) due to Earth bulge and rotation centrifugal force.",
      fun_fact: 'You actually weigh about 0.5% less at the equator than at the North Pole!'
    },
    {
      id: 'when',
      word: 'When',
      subText: 'does escape happen?',
      color: '#ef4444',
      icon: <Clock size={18} color="#ffffff" />,
      question: 'When can an object escape Earth gravity?',
      answer: 'An object escapes Earth gravitation permanently when launched with speed equal to or greater than Escape Velocity (ve = √(2gR) ≈ 11.2 km/s).',
      fun_fact: 'At 11.2 km/s, you could travel from Delhi to London in under 10 minutes!'
    },
    {
      id: 'how',
      word: 'How',
      subText: 'do satellites orbit?',
      color: '#ec4899',
      icon: <Settings size={18} color="#ffffff" />,
      question: 'How do artificial satellites stay in orbit?',
      answer: 'Satellites continuously fall toward Earth due to gravity, but their high horizontal orbital velocity (vo = √(GM/r) ≈ 7.9 km/s) makes Earth surface curve away beneath them at the exact same rate.',
      fun_fact: 'Astronauts inside the ISS are not in zero gravity; they are in continuous free-fall!'
    }
  ];

  const toggleAccordion = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="intro-container">
      {/* Prerequisites Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>
            Prerequisites
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Build a solid foundation before diving into advanced gravitational formulas.
          </p>
        </div>

        <div className="web-physics-grid">
          {prereqList.map((req, idx) => (
            <div key={idx} className="web-card" style={{ textAlign: 'center', padding: '24px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '14px' }}>
                {req.icon || <Divide size={28} color="#8b5cf6" />}
              </div>
              <div className="web-card-relation" style={{ textAlign: 'center', fontSize: '18px', marginBottom: '8px', color: '#0f172a' }}>
                {req.title}
              </div>
              <div className="web-card-desc" style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                {req.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Big Questions Section */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>
            6 Big Questions
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Click any question card to expand and reveal its core Gravitation explanation.
          </p>
        </div>

        <div className="big-questions-grid">
          {bigQuestions.map((bq) => {
            const isExpanded = expandedCardId === bq.id;
            return (
              <div
                key={bq.id}
                className="big-question-card-accordion"
                style={{ borderTop: `4px solid ${bq.color}`, padding: '16px 20px' }}
                onClick={() => toggleAccordion(bq.id)}
              >
                <div>
                  <div className="bq-card-top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: bq.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {bq.icon}
                      </div>
                      <div>
                        <div className="bq-word-title" style={{ color: bq.color, fontSize: '16px', fontWeight: '800', lineHeight: '1.2' }}>
                          {bq.word}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                          {bq.subText}
                        </div>
                      </div>
                    </div>
                    <div className={`bq-chevron-icon ${isExpanded ? 'rotated' : ''}`}>
                      <ChevronDown size={18} color="#94a3b8" />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bq-accordion-body" style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', marginBottom: '14px' }}>
                      {bq.answer}
                    </div>

                    {bq.fun_fact && (
                      <div className="bq-funfact">
                        <strong>⭐ Fun Fact: </strong>
                        {bq.fun_fact}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Redirect Banner */}
      <div style={{
        background: '#1e293b',
        borderRadius: '16px',
        padding: '24px 32px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: '800' }}>Ready to learn the language?</div>
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Next up: Key terms and theoretical definitions of motion.</div>
        </div>
        <button
          onClick={onNavigateTerminology}
          style={{
            background: '#ffffff',
            color: '#0f172a',
            padding: '10px 24px',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span>Terminology →</span>
        </button>
      </div>

      {/* REQUIREMENT 11: Dark Footer */}
      <Footer />
    </div>
  );
}

