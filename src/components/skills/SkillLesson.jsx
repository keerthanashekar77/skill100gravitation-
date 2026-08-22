import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Compass, Zap, Target, Trophy, ShieldAlert, Atom, AlertTriangle, Lightbulb, Play, Pause, RotateCcw, CheckCircle2, ChevronRight, HelpCircle, Orbit, Globe } from 'lucide-react';
import { getSkillsContent, normalizeTopicId } from '../../data/gravitationData';
import Footer from '../common/Footer';

export default function SkillLesson({ skillId, skillTitle, onBack, onStartPractice, onStartAssess }) {
  const skillsData = getSkillsContent();
  const allMainTopics = skillsData.topics || [];

  const targetId = normalizeTopicId(skillId);

  // STRICT UNIQUE TOPIC ID MATCHING FROM gravitation_skill_content_FINAL.json
  const currentMainTopic = allMainTopics.find((t) => t.id === skillId || t.id === targetId);
  const mainTopicIndex = currentMainTopic ? allMainTopics.indexOf(currentMainTopic) : -1;

  // Development Error if topic ID is not found in gravitation_skill_content_FINAL.json
  if (!currentMainTopic) {
    return (
      <div style={{ maxWidth: '960px', margin: '40px auto', padding: '36px', background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '16px', color: '#991b1b', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>Topic Mapping Error</h2>
        <p style={{ fontFamily: 'monospace', fontSize: '16px', background: '#ffffff', padding: '14px 20px', borderRadius: '10px', border: '1px solid #fecaca', display: 'inline-block' }}>
          Topic ID not found in gravitation_skill_content_FINAL.json: {skillId}
        </p>
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={onBack}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            ← Back to Skills Directory
          </button>
        </div>
      </div>
    );
  }

  const currentTopicId = currentMainTopic.id;

  // Extract tabs & content from current main topic safely
  const tabs = currentMainTopic.tabs || {};
  const introData = tabs.introduction || {};
  const coreData = tabs.core_concept || {};
  const formulaData = tabs.important_formula || {};
  const exampleData = tabs.worked_example || [];
  const keyPointsData = tabs.key_points || {};
  const visData = tabs.visualization || {};
  const subsections = coreData.subsections || [];
  const derivation = coreData.derivation || null;

  // Dynamically build Subtopics array for THIS Main Topic ONLY
  const buildSubtopics = () => {
    const list = [];

    // Subtopic 1: Overview
    list.push({
      id: 'overview',
      title: 'Overview & Summary',
      type: 'overview',
      icon: <BookOpen size={16} color="#2563eb" fill="#2563eb" />
    });

    // Subtopics from subsections if present (e.g. Kepler's Laws)
    if (Array.isArray(subsections) && subsections.length > 0) {
      subsections.forEach((sub, idx) => {
        const icons = [
          <Orbit size={16} color="#10b981" />,
          <Compass size={16} color="#f59e0b" />,
          <Zap size={16} color="#8b5cf6" />
        ];
        list.push({
          id: `sub_${idx}`,
          title: sub.title || `Subtopic ${idx + 1}`,
          type: 'subsection',
          data: sub,
          icon: icons[idx % icons.length]
        });
      });
    } else {
      list.push({
        id: 'core_concept',
        title: 'Core Concepts',
        type: 'core',
        icon: <Compass size={16} color="#10b981" fill="#10b981" />
      });

      if (derivation) {
        list.push({
          id: 'derivation',
          title: 'Mathematical Derivation',
          type: 'derivation',
          icon: <Atom size={16} color="#8b5cf6" fill="#8b5cf6" />
        });
      }
    }

    list.push({
      id: 'formulas_examples',
      title: 'Formulas & Worked Examples',
      type: 'formulas',
      icon: <Target size={16} color="#0284c7" fill="#0284c7" />
    });

    list.push({
      id: 'key_points',
      title: 'Key Facts & NEET Traps',
      type: 'key_points',
      icon: <Lightbulb size={16} color="#f59e0b" fill="#f59e0b" />
    });

    return list;
  };

  const subtopics = buildSubtopics();
  const [selectedSubIdx, setSelectedSubIdx] = useState(0);

  // Reset selected subtopic when main topic changes
  useEffect(() => {
    setSelectedSubIdx(0);
  }, [currentTopicId]);

  // Safety guard for selected subtopic
  const safeSubIdx = Math.min(Math.max(0, selectedSubIdx), subtopics.length - 1);
  const activeSubtopic = subtopics[safeSubIdx] || subtopics[0];

  // 3D Canvas Visualization Controls & Animation Loop
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userRotation, setUserRotation] = useState(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;
    setUserRotation((prev) => prev + deltaX * 0.01);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Render 3D Interactive HTML5 Canvas Visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;
    let angle = userRotation;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Dark futuristic background
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      if (isPlaying) {
        angle += 0.02;
      }

      const visComp = (visData.component || currentTopicId || '').toLowerCase();

      // Topic-Specific 3D Visualizations
      if (visComp.includes('kepler') || currentTopicId === 'kepler_laws') {
        const subTitle = (activeSubtopic.title || '').toLowerCase();
        
        if (subTitle.includes('first') || subTitle.includes('1st') || subTitle.includes('orbit')) {
          // KEPLER'S 1ST LAW: LAW OF ORBITS (Ellipse geometry, Foci F1 & F2, Perihelion & Aphelion)
          const a = 150;
          const b = 70;
          const e = 0.6;
          const sunX = cx - a * e;
          const f2X = cx + a * e;

          // Draw Ellipse
          ctx.beginPath();
          ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Axis lines
          ctx.beginPath();
          ctx.moveTo(cx - a, cy);
          ctx.lineTo(cx + a, cy);
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Focus 2 (empty focus)
          ctx.beginPath();
          ctx.arc(f2X, cy, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#64748b';
          ctx.fill();
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px sans-serif';
          ctx.fillText('Focus F₂', f2X - 20, cy + 18);

          // Focus 1 (Sun)
          ctx.beginPath();
          ctx.arc(sunX, cy, 18, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('Sun (Focus F₁)', sunX - 35, cy + 34);

          // Perihelion & Aphelion Labels
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('Perihelion (Closest)', cx - a - 10, cy - 12);
          ctx.fillText('Aphelion (Furthest)', cx + a - 80, cy - 12);

          // Orbiting Planet
          const planetAngle = angle % (Math.PI * 2);
          const px = cx + Math.cos(planetAngle) * a;
          const py = cy + Math.sin(planetAngle) * b;

          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText("Kepler's 1st Law (Law of Orbits): Planets move in ellipses with Sun at one focus", 16, 26);

        } else if (subTitle.includes('third') || subTitle.includes('3rd') || subTitle.includes('period')) {
          // KEPLER'S 3RD LAW: LAW OF PERIODS (T² ∝ a³, Comparing two planets)
          const sunX = cx;
          const sunY = cy;

          // Inner Orbit (a1 = 70)
          const a1 = 70;
          const b1 = 40;
          ctx.beginPath();
          ctx.ellipse(sunX, sunY, a1, b1, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Outer Orbit (a2 = 140)
          const a2 = 140;
          const b2 = 80;
          ctx.beginPath();
          ctx.ellipse(sunX, sunY, a2, b2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Central Sun
          ctx.beginPath();
          ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Planet 1 (Inner - fast)
          const p1Angle = angle * 2.5;
          const p1X = sunX + Math.cos(p1Angle) * a1;
          const p1Y = sunY + Math.sin(p1Angle) * b1;
          ctx.beginPath();
          ctx.arc(p1X, p1Y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#60a5fa';
          ctx.fill();

          // Planet 2 (Outer - slow)
          const p2Angle = angle * 0.8;
          const p2X = sunX + Math.cos(p2Angle) * a2;
          const p2Y = sunY + Math.sin(p2Angle) * b2;
          ctx.beginPath();
          ctx.arc(p2X, p2Y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText("Kepler's 3rd Law (Law of Periods): T² ∝ a³  ⇒  (T₁/T₂)² = (a₁/a₂)³", 16, 26);

        } else {
          // KEPLER'S 2ND LAW: LAW OF AREAS (Equal area swept in equal time, dA/dt = L/2m)
          const a = 150;
          const b = 70;
          const e = 0.55;
          const sunX = cx - a * e;
          const sunY = cy;

          // Draw Elliptical Orbit
          ctx.beginPath();
          ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Planet Position on Ellipse
          const planetAngle = angle % (Math.PI * 2);
          const px = cx + Math.cos(planetAngle) * a;
          const py = cy + Math.sin(planetAngle) * b;

          // Draw Shaded Swept Triangular Area
          const dtAngle = 0.35;
          const pPrevX = cx + Math.cos(planetAngle - dtAngle) * a;
          const pPrevY = cy + Math.sin(planetAngle - dtAngle) * b;

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(pPrevX, pPrevY);
          ctx.lineTo(px, py);
          ctx.closePath();
          ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Sun at Focus
          ctx.beginPath();
          ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 20;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('Sun (Focus)', sunX - 28, sunY + 34);

          // Vector line from Sun to Planet
          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Planet Circle
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText("Kepler's 2nd Law (Law of Areas): Equal Areas Swept (dA/dt = L / 2m = constant)", 16, 26);
        }
      } else if (visComp.includes('force') || visComp.includes('universal') || currentTopicId === 'universal_law' || currentTopicId === 'G') {
        // UNIVERSAL LAW OF GRAVITATION VISUALIZATION
        const m1X = cx - 110;
        const m2X = cx + 110;

        // Mass 1 (Earth/Large Mass)
        ctx.beginPath();
        ctx.arc(m1X, cy, 26, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('m₁', m1X - 6, cy + 4);

        // Mass 2 (Test Mass)
        ctx.beginPath();
        ctx.arc(m2X, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('m₂', m2X - 6, cy + 4);

        // Center line
        ctx.beginPath();
        ctx.moveTo(m1X, cy);
        ctx.lineTo(m2X, cy);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Force arrow 1
        const pulse = Math.sin(angle * 3) * 5;
        ctx.beginPath();
        ctx.moveTo(m1X + 28, cy);
        ctx.lineTo(m1X + 80 + pulse, cy);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Force arrow 2
        ctx.beginPath();
        ctx.moveTo(m2X - 20, cy);
        ctx.lineTo(m2X - 72 - pulse, cy);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Universal Inverse-Square Attraction: F = G (m₁ m₂)/r²', 16, 26);
      } else if (visComp.includes('g') || visComp.includes('variation') || currentTopicId === 'g' || currentTopicId === 'variation_g' || currentTopicId === 'mass_weight') {
        // ACCELERATION DUE TO GRAVITY & VARIATION VISUALIZATION
        ctx.beginPath();
        ctx.arc(cx, cy + 30, 80, 0, Math.PI * 2);
        ctx.fillStyle = '#1d4ed8';
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Falling body
        const fallY = cy - 70 + (Math.sin(angle * 2) + 1) * 35;
        ctx.beginPath();
        ctx.arc(cx, fallY, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        // Vector arrow downward g
        ctx.beginPath();
        ctx.moveTo(cx, fallY + 12);
        ctx.lineTo(cx, fallY + 36);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Acceleration Due to Gravity g = GM/R² (g_h = g(1-2h/R), g_d = g(1-d/R))', 16, 26);
      } else if (visComp.includes('escape') || currentTopicId === 'escape') {
        // ESCAPE VELOCITY VISUALIZATION
        ctx.beginPath();
        ctx.arc(cx, cy + 40, 60, 0, Math.PI * 2);
        ctx.fillStyle = '#1e3a8a';
        ctx.fill();

        // Rocket Trajectory Escaping to Infinity
        const launchX = cx + Math.cos(angle * 0.8) * (70 + (angle % 3) * 40);
        const launchY = cy + 40 - Math.sin(angle * 0.8) * (70 + (angle % 3) * 40);

        ctx.beginPath();
        ctx.arc(launchX, launchY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Escape Velocity: v_e = √(2GM/R) = 11.2 km/s', 16, 26);
      } else {
        // SATELLITE ORBITAL MOTION & GENERAL VISUALIZATION
        const rx = 130;
        const ry = 50;

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, userRotation, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.fillStyle = '#1d4ed8';
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        const satX = cx + Math.cos(angle) * rx;
        const satY = cy + Math.sin(angle) * ry;

        ctx.beginPath();
        ctx.arc(satX, satY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`3D Interactive Orbital Motion: ${visData.title || currentMainTopic.title}`, 16, 26);
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [currentTopicId, isPlaying, userRotation, visData]);

  // Previous Subtopic / Main Topic Navigation
  const handlePrev = () => {
    if (safeSubIdx > 0) {
      setSelectedSubIdx(safeSubIdx - 1);
    } else if (mainTopicIndex > 0) {
      const prevTopic = allMainTopics[mainTopicIndex - 1];
      if (prevTopic) {
        setSelectedSubIdx(0);
      }
    }
  };

  // Next Subtopic / Main Topic Navigation
  const handleNext = () => {
    if (safeSubIdx < subtopics.length - 1) {
      setSelectedSubIdx(safeSubIdx + 1);
    } else {
      onStartPractice();
    }
  };

  // Topic-specific Key Fact & NEET Trap extraction
  const neetTrapText = keyPointsData.common_mistakes?.[0] || keyPointsData.neet_tips?.[0] ||
    'NEET Trap: Universal gravitational constant G is a scalar universal constant, whereas acceleration due to gravity g varies with height, depth, and latitude!';

  const keyFactText = keyPointsData.key_points?.[0] ||
    'Key Fact: Gravitational potential and potential energy are always negative when zero is taken at infinity.';

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button className="btn-back-dashboard" onClick={onBack}>
          <ArrowLeft size={14} color="#2563eb" />
          <span>Back to Skills Directory</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-skill-action btn-practice" onClick={onStartPractice}>
            <span>Practice</span>
          </button>
          <button className="btn-skill-action btn-assess" onClick={onStartAssess}>
            <span>Assess</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Left Column Sidebar + Right Content Panel) */}
      <div className="skill-page-layout">
        {/* Left Column Sidebar */}
        <aside className="skill-sidebar" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '0 0 14px 0', borderBottom: '1px solid #f1f5f9', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#2563eb', letterSpacing: '0.05em', marginBottom: '4px' }}>
              MAIN TOPIC
            </div>
            <div style={{ fontFamily: 'Outfit', fontSize: '16px', fontWeight: '800', color: '#0f172a', lineHeight: '1.3' }}>
              {currentMainTopic.title || skillTitle || 'Gravitation'}
            </div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', padding: '4px 0', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Subtopics & Sections ({subtopics.length})
          </div>

          {subtopics.map((sub, idx) => {
            const isSelected = safeSubIdx === idx;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubIdx(idx)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isSelected ? '#2563eb' : 'transparent',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  fontWeight: isSelected ? '700' : '500',
                  fontSize: '13.5px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '4px'
                }}
              >
                {React.cloneElement(sub.icon, { color: isSelected ? '#ffffff' : sub.icon.props.color || '#2563eb' })}
                <span>{sub.title}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Content Panel */}
        <main className="skill-main-content" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px 32px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Header */}
          <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#2563eb', letterSpacing: '0.06em', marginBottom: '4px' }}>
              TOPIC {mainTopicIndex + 1} • SECTION {safeSubIdx + 1} OF {subtopics.length}
            </div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              {activeSubtopic.title}
            </h1>
          </div>

          {/* Render Subtopic Content based on activeSubtopic.type */}
          {activeSubtopic.type === 'overview' && (
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px' }}>
              {introData.summary && <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '500', color: '#1e293b' }}>{introData.summary}</p>}
              
              {Array.isArray(coreData.explanation) && coreData.explanation.map((para, i) => (
                typeof para === 'string' ? <p key={i} style={{ margin: '0 0 12px 0' }}>{para}</p> : null
              ))}

              {Array.isArray(introData.learning_objectives) && introData.learning_objectives.length > 0 && (
                <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe', padding: '16px 20px', marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    LEARNING OBJECTIVES
                  </div>
                  {introData.learning_objectives.map((obj, i) => (
                    <div key={i} style={{ fontSize: '13.5px', color: '#1d4ed8', display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubtopic.type === 'subsection' && (
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px' }}>
              {activeSubtopic.data?.content && (
                <p style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600', marginBottom: '16px' }}>
                  {activeSubtopic.data.content}
                </p>
              )}
              {Array.isArray(activeSubtopic.data?.points) && activeSubtopic.data.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeSubtopic.data.points.map((pt, i) => (
                    <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#334155' }}>
                      • {pt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubtopic.type === 'core' && (
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px' }}>
              {Array.isArray(coreData.explanation) ? (
                coreData.explanation.map((item, i) => {
                  if (typeof item === 'string') {
                    return <p key={i} style={{ margin: '0 0 12px 0' }}>{item}</p>;
                  } else if (typeof item === 'object' && item?.heading) {
                    return (
                      <div key={i} style={{ margin: '16px 0' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{item.heading}</h3>
                        {item.points?.map((pt, pIdx) => (
                          <div key={pIdx} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '6px', fontSize: '13.5px' }}>
                            • {pt}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p>{coreData.explanation || 'Core concepts for this topic.'}</p>
              )}
            </div>
          )}

          {activeSubtopic.type === 'derivation' && (
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Derivation Steps</h3>
                {Array.isArray(derivation) ? (
                  derivation.map((step, i) => (
                    <div key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>• {step}</div>
                  ))
                ) : (
                  <div>{typeof derivation === 'object' ? derivation?.text || JSON.stringify(derivation) : derivation}</div>
                )}
              </div>
            </div>
          )}

          {activeSubtopic.type === 'formulas' && (
            <div style={{ marginBottom: '24px' }}>
              {/* Formula Cards */}
              {Array.isArray(formulaData.formulae) && formulaData.formulae.length > 0 && (
                <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe', padding: '18px 20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    KEY FORMULAS
                  </div>
                  {formulaData.formulae.map((f, i) => (
                    <div key={i} style={{ marginBottom: '10px', background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: '600' }}>{f.label || f.description || 'Formula'}</span>
                      <code style={{ fontFamily: 'monospace', fontSize: '15px', fontWeight: '800', color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>{f.formula || f.expression}</code>
                    </div>
                  ))}
                </div>
              )}

              {/* Worked Examples */}
              {Array.isArray(exampleData) && exampleData.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    WORKED EXAMPLES ({exampleData.length})
                  </div>
                  {exampleData.map((ex, i) => (
                    <div key={i} style={{ marginBottom: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>{ex.problem || ex.title}</div>
                      <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', marginBottom: '6px' }}><strong>Solution: </strong>{ex.solution}</div>
                      {ex.answer && <div style={{ fontSize: '13px', color: '#2563eb', fontWeight: '700' }}>Answer: {ex.answer}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubtopic.type === 'key_points' && (
            <div style={{ marginBottom: '24px' }}>
              {Array.isArray(keyPointsData.key_points) && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', marginBottom: '10px' }}>Key Takeaways</div>
                  {keyPointsData.key_points.map((kp, i) => (
                    <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', marginBottom: '6px', fontSize: '13.5px', color: '#334155' }}>
                      • {kp}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REQUIREMENT 4: 3D Interactive Visualization Canvas (Shown only for main concept subtopics, hidden on text-only subtopics) */}
          {activeSubtopic.type !== 'formulas' && activeSubtopic.type !== 'key_points' && (
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '16px', marginBottom: '24px', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={15} color="#60a5fa" />
                  <span>3D Interactive Visualization: {visData.title || currentMainTopic.title}</span>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={220}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ width: '100%', height: '220px', borderRadius: '12px', background: '#0a0f1d', display: 'block', cursor: 'grab' }}
              />
            </div>
          )}

          {/* REQUIREMENT 15: Topic-Specific NEET TRAP Card */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #ef4444', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px' }}>
            <div style={{ color: '#991b1b', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <AlertTriangle size={16} color="#ef4444" />
              <span>NEET TRAP</span>
            </div>
            <div style={{ fontSize: '13.5px', color: '#7f1d1d', lineHeight: '1.5' }}>
              {neetTrapText}
            </div>
          </div>

          {/* REQUIREMENT 15: Topic-Specific KEY FACT Card */}
          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px' }}>
            <div style={{ color: '#92400e', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Lightbulb size={16} color="#f59e0b" />
              <span>KEY FACT</span>
            </div>
            <div style={{ fontSize: '13.5px', color: '#78350f', lineHeight: '1.5' }}>
              {keyFactText}
            </div>
          </div>

          {/* REQUIREMENT 7: Previous Topic & Next Topic Navigation (BLUE background + WHITE text for Next Topic) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <button
              onClick={handlePrev}
              disabled={safeSubIdx === 0 && mainTopicIndex === 0}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: '600',
                color: (safeSubIdx === 0 && mainTopicIndex === 0) ? '#94a3b8' : '#334155',
                cursor: (safeSubIdx === 0 && mainTopicIndex === 0) ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Topic
            </button>

            {/* NEXT TOPIC BUTTON WITH BLUE BACKGROUND AND WHITE TEXT */}
            <button
              onClick={handleNext}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              Next Topic →
            </button>
          </div>
        </main>
      </div>

      {/* REQUIREMENT 11: Footer */}
      <Footer />
    </div>
  );
}
