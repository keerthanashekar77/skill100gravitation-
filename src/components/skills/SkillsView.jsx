import React, { useState } from 'react';
import { Target, BookOpen, Edit3, Trophy, Compass, Orbit, Zap, ShieldAlert, Atom, Globe } from 'lucide-react';
import SkillLesson from './SkillLesson';
import SkillPractice from './SkillPractice';
import SkillAssess from './SkillAssess';
import Footer from '../common/Footer';
import { getSkillsContent } from '../../data/gravitationData';

export default function SkillsView({ onUpdateMastery }) {
  const [activeMode, setActiveMode] = useState('list'); // list | learn | practice | assess
  const [activeSkillId, setActiveSkillId] = useState('kepler_laws');
  const [activeSkillTitle, setActiveSkillTitle] = useState("Kepler's Laws of Planetary Motion");

  const skillsData = getSkillsContent();
  const jsonTopics = skillsData.topics || [];

  // Icon and color map for all 15 topics
  const topicMetaMap = {
    'intro': { icon: <Zap size={22} color="#eab308" />, color: '#eab308', desc: 'Gravitation as a universal attractive force, terrestrial vs celestial gravity, key concepts.' },
    'kepler_laws': { icon: <Compass size={22} color="#10b981" />, color: '#10b981', desc: 'Law of Ellipses, Law of Areas (angular momentum conservation), and Law of Periods (T² ∝ a³).' },
    'universal_law': { icon: <Orbit size={22} color="#2563eb" />, color: '#2563eb', desc: 'Master inverse-square attraction, gravitational force between point & spherical masses, vector force equations.' },
    'G': { icon: <Target size={22} color="#0284c7" />, color: '#0284c7', desc: 'Universal gravitational constant G = 6.674 × 10⁻¹¹ N·m²/kg², Cavendish experiment, dimensions.' },
    'g': { icon: <Zap size={22} color="#8b5cf6" />, color: '#8b5cf6', desc: 'Derivation of g = GM/R², mass vs weight, gravitational acceleration near Earth surface.' },
    'mass_weight': { icon: <Atom size={22} color="#ec4899" />, color: '#ec4899', desc: 'Distinction between scalar mass (kg) and gravitational force weight (N), g on different planets.' },
    'variation_g': { icon: <ShieldAlert size={22} color="#f59e0b" />, color: '#f59e0b', desc: 'Formulas for variation of g at height h (g_h = g(1-2h/R)) and depth d (g_d = g(1-d/R)), effect of Earth rotation.' },
    'field': { icon: <Compass size={22} color="#6366f1" />, color: '#6366f1', desc: 'Gravitational field intensity E = F/m = -GM/r² r̂, field due to point masses and spherical shells.' },
    'potential_energy': { icon: <Atom size={22} color="#ec4899" />, color: '#ec4899', desc: 'Negative potential energy (U = -GMm/r), gravitational potential (V = -GM/r), potential inside uniform shell.' },
    'potential': { icon: <Orbit size={22} color="#0284c7" />, color: '#0284c7', desc: 'Gravitational potential V = -GM/r, potential difference, potential inside solid sphere and shell.' },
    'escape': { icon: <Target size={22} color="#ef4444" />, color: '#ef4444', desc: 'Derivation of ve = √(2GM/R) = 11.2 km/s, independence of projection mass and angle, atmospheric escape.' },
    'satellite': { icon: <Trophy size={22} color="#6366f1" />, color: '#6366f1', desc: 'Orbital velocity vo = √(GM/r), geostationary & polar orbits, total mechanical energy and binding energy.' },
    'geostationary': { icon: <Globe size={22} color="#10b981" />, color: '#10b981', desc: 'Geostationary satellites, height h ≈ 35,800 km, time period T = 24 hours, polar satellites.' },
    'satellite_energy': { icon: <Zap size={22} color="#2563eb" />, color: '#2563eb', desc: 'Kinetic energy K = GMm/2r, potential energy U = -GMm/r, total energy E = -GMm/2r, binding energy.' },
    'spherical_bodies': { icon: <Compass size={22} color="#8b5cf6" />, color: '#8b5cf6', desc: 'Gravitational attraction of thin spherical shell and solid sphere inside and outside.' }
  };

  // Build complete list of 15 skill modules from JSON
  const skillModules = jsonTopics.map((t) => {
    const meta = topicMetaMap[t.id] || {
      icon: <Orbit size={22} color="#2563eb" />,
      color: '#2563eb',
      desc: t.tabs?.introduction?.summary || 'Gravitation concept mastery.'
    };
    return {
      id: t.id,
      title: t.title,
      desc: meta.desc,
      icon: meta.icon,
      assessColor: meta.color
    };
  });

  const handleSelectSkill = (skill) => {
    setActiveSkillId(skill.id);
    setActiveSkillTitle(skill.title);
  };

  const handleStartLearn = (skill) => {
    setActiveSkillId(skill.id);
    setActiveSkillTitle(skill.title);
    setActiveMode('learn');
  };

  const handleStartPractice = (skill) => {
    setActiveSkillId(skill.id);
    setActiveSkillTitle(skill.title);
    setActiveMode('practice');
  };

  const handleStartAssess = (skill) => {
    setActiveSkillId(skill.id);
    setActiveSkillTitle(skill.title);
    setActiveMode('assess');
  };

  const handleAssessmentComplete = (scorePercentage) => {
    if (onUpdateMastery) {
      onUpdateMastery(scorePercentage);
    }
  };

  if (activeMode === 'learn') {
    return (
      <SkillLesson
        skillId={activeSkillId}
        skillTitle={activeSkillTitle}
        onBack={() => setActiveMode('list')}
        onStartPractice={() => setActiveMode('practice')}
        onStartAssess={() => setActiveMode('assess')}
      />
    );
  }

  if (activeMode === 'practice') {
    return (
      <SkillPractice
        skillId={activeSkillId}
        skillTitle={activeSkillTitle}
        onExit={() => setActiveMode('list')}
        onCompletePractice={() => setActiveMode('list')}
      />
    );
  }

  if (activeMode === 'assess') {
    return (
      <SkillAssess
        skillId={activeSkillId}
        skillTitle={activeSkillTitle}
        onBack={() => setActiveMode('list')}
        onCompleteAssessment={handleAssessmentComplete}
      />
    );
  }

  return (
    <div className="skills-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Directory Title — Centered matching Screenshot 1 */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0' }}>
          <span style={{ color: '#0f172a' }}>Core </span>
          <span style={{ color: '#2563eb' }}>Skills</span>
        </h1>
        <p style={{ fontSize: '14.5px', color: '#64748b', maxWidth: '640px', margin: '0 auto', lineHeight: '1.5' }}>
          Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!
        </p>
      </div>

      {/* List of Skill Cards (Matching Screenshot 1 Layout with BLUE OUTLINE on active card) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {skillModules.map((skill) => {
          const isActive = activeSkillId === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => handleSelectSkill(skill)}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: isActive ? '2px solid #374151' : '1px solid #e2e8f0',
                outline: isActive ? '2px solid #374151' : 'none',
                boxShadow: isActive ? '0 0 0 3px rgba(55, 65, 81, 0.12)' : 'var(--shadow-sm)',
                padding: '24px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Left Content */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: isActive ? '#f1f5f9' : '#f8fafc',
                  border: isActive ? '1px solid #374151' : '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {skill.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: '800', color: isActive ? '#0f172a' : '#0f172a', marginBottom: '4px' }}>
                    {skill.title}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5', maxWidth: '540px' }}>
                    {skill.desc}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="topic-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartLearn(skill);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '9999px',
                      padding: '6px 18px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <BookOpen size={13} color="#2563eb" />
                    <span>Learn</span>
                  </button>

                  <button
                    className="topic-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartPractice(skill);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '9999px',
                      padding: '6px 18px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit3 size={13} color="#f59e0b" />
                    <span>Practice</span>
                  </button>
                </div>

                {/* Assess Pill Button */}
                <button
                  className="topic-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartAssess(skill);
                  }}
                  style={{
                    background: skill.assessColor,
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '8px 48px',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    width: '100%',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <Trophy size={14} color="#ffffff" />
                  <span>Assess</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* REQUIREMENT 11: Dark Footer */}
      <Footer />
    </div>
  );
}

