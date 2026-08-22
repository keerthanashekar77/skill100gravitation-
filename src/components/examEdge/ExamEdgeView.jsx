import React, { useState } from 'react';
import { Trophy, FileText, Zap, CheckCircle2, XCircle, ChevronDown, ChevronUp, ClipboardList, Rocket, Globe, RotateCw, AlertTriangle, BookOpen } from 'lucide-react';
import { getPYQs, getNcertQuestions } from '../../data/gravitationData';
import Footer from '../common/Footer';
import QuickRevision from '../dashboard/QuickRevision';

export default function ExamEdgeView() {
  const [subTab, setSubTab] = useState('pyqs'); // pyqs | ncertLiners | cheatSheet
  const pyqs = getPYQs();
  const ncertSections = getNcertQuestions();

  const [userPYQAnswers, setUserPYQAnswers] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});

  const filteredPYQs = pyqs;

  const handleSelectPYQOption = (qId, selectedOptIndex) => {
    if (userPYQAnswers[qId] !== undefined) return;
    setUserPYQAnswers({ ...userPYQAnswers, [qId]: selectedOptIndex });
  };

  const toggleSolution = (id) => {
    setExpandedSolutions({ ...expandedSolutions, [id]: !expandedSolutions[id] });
  };

  const formulaTableRows = [
    { quantity: 'Universal Gravitational Force', formula: 'F = G · m₁ · m₂ / r²', unit: 'Newton (N)' },
    { quantity: 'Universal Gravitational Constant (G)', formula: 'G = 6.674 × 10⁻¹¹', unit: 'N·m²/kg²' },
    { quantity: 'Acceleration due to Gravity (g)', formula: 'g = G · M / R²', unit: 'm/s²' },
    { quantity: 'Variation of g at Height (h << R)', formula: 'g_h = g · (1 - 2h/R)', unit: 'm/s²' },
    { quantity: 'Variation of g at Depth d', formula: 'g_d = g · (1 - d/R)', unit: 'm/s²' },
    { quantity: 'Gravitational Field Intensity (E)', formula: 'E = F/m = - (G · M / r²) r̂', unit: 'N/kg or m/s²' },
    { quantity: 'Gravitational Potential (V)', formula: 'V = - G · M / r', unit: 'J/kg' },
    { quantity: 'Gravitational Potential Energy (U)', formula: 'U = - G · M · m / r', unit: 'Joule (J)' },
    { quantity: 'Escape Speed (ve)', formula: 'v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s', unit: 'km/s or m/s' },
    { quantity: 'Orbital Speed of Satellite (vo)', formula: 'v_o = √(GM/r) = √(gR) ≈ 7.92 km/s', unit: 'km/s or m/s' },
    { quantity: "Kepler's 3rd Law Period Equation", formula: 'T² = (4π²/GM) · a³  ⇒  T² ∝ a³', unit: 's²' },
    { quantity: 'Total Orbital Mechanical Energy (E)', formula: 'E = - G · M · m / (2r)', unit: 'Joule (J)' }
  ];

  const quickRevisionCards = [
    {
      icon: <ClipboardList size={18} color="#e11d48" />,
      title: "Kepler's Laws Key Principles",
      bullets: [
        '1st Law: Planets move in ellipses with Sun at one focus.',
        '2nd Law: Equal areas swept in equal times (dA/dt = L/(2m) = constant).',
        '3rd Law: T² ∝ a³ (Square of orbital period ∝ cube of semi-major axis).'
      ]
    },
    {
      icon: <Zap size={18} color="#d97706" />,
      title: 'Gravitational Field & Shell Theorem',
      bullets: [
        'Outside sphere (r ≥ R): Field acts as if all mass M is concentrated at center.',
        'Inside uniform hollow shell: Gravitational field intensity E = 0 everywhere.',
        'Inside solid sphere (r < R): Field intensity E = -GMr/R³ (linearly proportional to r).'
      ]
    },
    {
      icon: <Rocket size={18} color="#9333ea" />,
      title: 'Satellite Energy Relationships',
      bullets: [
        'Kinetic Energy: K = + GMm / (2r)',
        'Potential Energy: U = - GMm / r',
        'Total Energy: E = - GMm / (2r)  [Note: E = -K = U/2]',
        'Binding Energy: B = + GMm / (2r)  [Energy required to remove satellite to ∞]'
      ]
    },
    {
      icon: <Globe size={18} color="#2563eb" />,
      title: 'Variation of Acceleration due to Gravity',
      bullets: [
        'Poles vs Equator: g_pole (9.83 m/s²) > g_equator (9.78 m/s²) due to rotation & Earth bulge.',
        'At Height h: g_h decreases as 1/(R+h)².',
        'At Earth Center: d = R ⇒ g = 0 (weightlessness at center of Earth).'
      ]
    },
    {
      icon: <RotateCw size={18} color="#0284c7" />,
      title: 'Escape Velocity Characteristics',
      bullets: [
        've = √2 · vo (Escape speed is √2 times orbital speed near surface).',
        'Independent of projectile mass: A 1 kg rock and a 10,000 kg rocket need the same 11.2 km/s.',
        'Independent of launch angle: Any direction clears Earth gravity provided air resistance is neglected.'
      ]
    },
    {
      icon: <AlertTriangle size={18} color="#d97706" />,
      title: 'Critical NEET Traps & Reminders',
      bullets: [
        'Gravitation constant G is a universal SCALAR (6.674 × 10⁻¹¹ N·m²/kg²).',
        'Gravitational field E is a VECTOR pointing INWARD.',
        'Total orbital energy is ALWAYS NEGATIVE for bound orbits.',
        'Weight in free-fall / orbiting satellite is ZERO (apparent weightlessness).'
      ]
    }
  ];

  return (
    <div className="exam-edge-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* REQUIREMENT 1: "Prepare for the Edge" section with lighter dark border */}
      <div style={{
        background: '#1e1b4b',
        borderRadius: '20px',
        border: '1px solid #334155',
        padding: '40px 32px',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>
          Prepare for the <span style={{ color: '#60a5fa' }}>Edge</span>
        </h1>
        <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: '0 auto', maxWidth: '640px', lineHeight: '1.5' }}>
          See how Gravitation concepts are tested across major competitive exams and clear your conceptual hurdles.
        </p>
      </div>

      {/* Sub-tabs bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSubTab('pyqs')}
          style={{
            background: subTab === 'pyqs' ? '#10b981' : '#ffffff',
            color: subTab === 'pyqs' ? '#ffffff' : '#334155',
            border: subTab === 'pyqs' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: subTab === 'pyqs' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <Trophy size={16} color={subTab === 'pyqs' ? '#ffffff' : '#10b981'} />
          <span>NEET PYQ</span>
        </button>

        <button
          onClick={() => setSubTab('ncertLiners')}
          style={{
            background: subTab === 'ncertLiners' ? '#10b981' : '#ffffff',
            color: subTab === 'ncertLiners' ? '#ffffff' : '#334155',
            border: subTab === 'ncertLiners' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: subTab === 'ncertLiners' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <FileText size={16} color={subTab === 'ncertLiners' ? '#ffffff' : '#10b981'} />
          <span>High Yield NCERT</span>
        </button>

        <button
          onClick={() => setSubTab('formulaSheet')}
          style={{
            background: subTab === 'formulaSheet' || subTab === 'cheatSheet' ? '#10b981' : '#ffffff',
            color: subTab === 'formulaSheet' || subTab === 'cheatSheet' ? '#ffffff' : '#334155',
            border: subTab === 'formulaSheet' || subTab === 'cheatSheet' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: subTab === 'formulaSheet' || subTab === 'cheatSheet' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <BookOpen size={16} color={subTab === 'formulaSheet' || subTab === 'cheatSheet' ? '#ffffff' : '#10b981'} />
          <span>Formula Sheet</span>
        </button>

        <button
          onClick={() => setSubTab('quickRevision')}
          style={{
            background: subTab === 'quickRevision' ? '#10b981' : '#ffffff',
            color: subTab === 'quickRevision' ? '#ffffff' : '#334155',
            border: subTab === 'quickRevision' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: subTab === 'quickRevision' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <Zap size={16} color={subTab === 'quickRevision' ? '#ffffff' : '#f59e0b'} />
          <span>Quick Revision</span>
        </button>
      </div>

      {/* SUB-TAB 1: NEET PYQs (All Questions rendered from file) */}
      {subTab === 'pyqs' && (
        <div>
          {/* PYQs Card List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredPYQs.map((q, idx) => {
              const qId = q.id || `pyq_${idx}`;
              const userSelOptIdx = userPYQAnswers[qId];
              const hasAnswered = userSelOptIdx !== undefined;

              const qText = q.question || q.question_summary || 'Question details from NEET PYQ source.';

              let correctOptIdx = -1;
              if (q.correct_option !== undefined && q.correct_option !== null) {
                correctOptIdx = q.correct_option - 1;
              } else if (q.correctOption !== undefined && q.correctOption !== null) {
                correctOptIdx = q.correctOption - 1;
              } else if (q.correct_answer && q.options && q.options.length > 0) {
                const foundIdx = q.options.findIndex(opt => opt.toString().trim() === q.correct_answer.toString().trim());
                if (foundIdx !== -1) correctOptIdx = foundIdx;
              }

              const isUserCorrect = hasAnswered && userSelOptIdx === correctOptIdx;
              const hasOptions = Array.isArray(q.options) && q.options.length > 0;

              return (
                <div key={qId} className="pyq-card" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="pyq-card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="year-badge" style={{ fontSize: '11px', fontWeight: '800', background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px' }}>
                      {q.exam || `NEET ${q.year || 'PYQ'}`}
                    </span>
                    {q.topic && (
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
                        Topic: {q.topic}
                      </span>
                    )}
                  </div>

                  <div className="question-text" style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', lineHeight: '1.4' }}>
                    {qText}
                  </div>

                  {/* Options Grid or Key Text */}
                  {hasOptions ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                      {q.options.map((optText, optIdx) => {
                        let optionStyleClass = 'option-box';
                        if (hasAnswered) {
                          if (optIdx === correctOptIdx) {
                            optionStyleClass += ' correct';
                          } else if (optIdx === userSelOptIdx) {
                            optionStyleClass += ' incorrect';
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            className={optionStyleClass}
                            onClick={() => handleSelectPYQOption(qId, optIdx)}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '10px',
                              border: '1px solid #e2e8f0',
                              cursor: 'pointer',
                              fontSize: '13.5px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              opacity: hasAnswered && optIdx !== userSelOptIdx && optIdx !== correctOptIdx ? 0.6 : 1
                            }}
                          >
                            <div style={{ fontWeight: '800', color: '#2563eb' }}>{String.fromCharCode(65 + optIdx)}</div>
                            <span>{optText}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ fontSize: '13.5px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#0f172a', fontWeight: '600', marginBottom: '14px' }}>
                      <strong>Answer / Source Key: </strong>{q.correct_answer || (q.correct_option ? `Option ${q.correct_option}` : 'Verified in NEET PYQ database')}
                    </div>
                  )}

                  {/* Feedback Banner */}
                  {hasAnswered && (
                    <div className={`feedback-card ${isUserCorrect ? 'correct' : 'incorrect'}`} style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '14px', background: isUserCorrect ? '#ecfdf5' : '#fef2f2', border: `1px solid ${isUserCorrect ? '#a7f3d0' : '#fecaca'}` }}>
                      <div className="feedback-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: isUserCorrect ? '#047857' : '#b91c1c', marginBottom: '4px' }}>
                        {isUserCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{isUserCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: isUserCorrect ? '#065f46' : '#991b1b' }}>
                        {isUserCorrect
                          ? 'Great job! You selected the correct option.'
                          : `The correct answer is ${correctOptIdx >= 0 ? `Option ${String.fromCharCode(65 + correctOptIdx)} (${hasOptions ? q.options[correctOptIdx] : q.correct_answer})` : q.correct_answer}.`}
                      </div>
                    </div>
                  )}

                  {/* Solution Outline Toggle */}
                  <button
                    className="solution-toggle-btn"
                    onClick={() => toggleSolution(qId)}
                    style={{ background: 'transparent', border: 'none', color: '#2563eb', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                  >
                    <span>{expandedSolutions[qId] ? 'Hide Solution Outline' : 'Show Solution Outline'}</span>
                    {expandedSolutions[qId] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {/* Solution Outline */}
                  {expandedSolutions[qId] && (
                    <div className="solution-box" style={{ marginTop: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '14px', fontSize: '13px', color: '#1e40af', lineHeight: '1.5' }}>
                      <div style={{ fontWeight: '800', marginBottom: '6px' }}>
                        SOLUTION OUTLINE {correctOptIdx >= 0 ? `(Correct Answer: Option ${String.fromCharCode(65 + correctOptIdx)})` : ''}
                      </div>
                      {typeof q.explanation === 'object' ? (
                        <div>
                          {q.explanation.concept && <div><strong>Concept:</strong> {q.explanation.concept}</div>}
                          {q.explanation.steps && (
                            <div>
                              <strong>Steps:</strong>
                              <ul style={{ paddingLeft: '18px', margin: '4px 0' }}>
                                {q.explanation.steps.map((st, sidx) => (
                                  <li key={sidx}>{st}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {q.explanation.final && <div><strong>Final:</strong> {q.explanation.final}</div>}
                          {q.explanation.status && <div><strong>Status:</strong> {q.explanation.status}</div>}
                          {q.explanation.message && <div>{q.explanation.message}</div>}
                        </div>
                      ) : (
                        <div>{q.explanation || 'Solution step-by-step derivation follows gravitation standard principle.'}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: High-Yield NCERT (Including Assertion & Reasoning questions) */}
      {subTab === 'ncertLiners' && (
        <div className="quiz-container">
          <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '20px', color: '#0f172a' }}>
            High-Yield NCERT Questions
          </h2>
          {ncertSections.map((sec, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: '700', color: '#10b981', marginBottom: '14px' }}>
                {sec.section}
              </h3>
              {sec.questions?.map((q, qIdx) => (
                <div key={qIdx} className="quiz-question-card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '12px' }}>
                  {q.assertion ? (
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', lineHeight: '1.5' }}>
                        <div style={{ marginBottom: '6px' }}>
                          <strong style={{ color: '#2563eb' }}>Assertion (A): </strong>{q.assertion}
                        </div>
                        <div>
                          <strong style={{ color: '#2563eb' }}>Reason (R): </strong>{q.reason}
                        </div>
                      </div>

                      {q.options && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} style={{ fontSize: '13.5px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ fontSize: '13px', color: '#065f46', background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', fontWeight: '600', border: '1px solid #a7f3d0' }}>
                        <div><strong>Answer: </strong>{q.correctAnswer || (q.correctOption ? `Option ${q.correctOption}` : '')}</div>
                        {q.optionExplanations?.find(o => o.option === q.correctOption)?.explanation && (
                          <div style={{ marginTop: '4px', fontWeight: '500', color: '#047857' }}>
                            {q.optionExplanations.find(o => o.option === q.correctOption).explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="question-text" style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
                        {q.id ? `${q.id}. ` : ''}{q.question}
                      </div>
                      <div style={{ fontSize: '13px', color: '#065f46', background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', fontWeight: '600', border: '1px solid #a7f3d0' }}>
                        Answer: {q.correctAnswer} {q.explanation ? `— ${q.explanation}` : ''}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: Formula Sheet */}
      {(subTab === 'formulaSheet' || subTab === 'cheatSheet') && (
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
            Gravitation Formula Sheet
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Essential formulas, physical relationships, and SI units for Class 11 Physics & NEET.
          </p>

          <div className="formula-table-container" style={{ marginTop: '24px' }}>
            <table className="formula-table">
              <thead>
                <tr>
                  <th>QUANTITY</th>
                  <th>FORMULA</th>
                  <th>UNIT</th>
                </tr>
              </thead>
              <tbody>
                {formulaTableRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="quantity-col">{row.quantity}</td>
                    <td className="formula-col"><code>{row.formula}</code></td>
                    <td className="unit-col">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Quick Revision Flashcards */}
      {subTab === 'quickRevision' && (
        <div style={{ marginBottom: '40px' }}>
          <QuickRevision />
        </div>
      )}

      {/* REQUIREMENT 5: Bottom Section "Final Exam Strategy" & "✓ Finish Topic" */}
      <div style={{
        background: '#0f172a',
        borderRadius: '20px',
        padding: '28px 32px',
        color: '#ffffff',
        marginTop: '40px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color="#f59e0b" />
          <span>FINAL EXAM STRATEGY</span>
        </div>
        <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
          In Gravitation, ~80% questions are conceptual — about Kepler's laws, variation of g, escape speed, orbital motion and energy. Spend time mastering these rather than complex numericals. For numericals: always write down formulas, identify givens, then apply formula. With clean FBD & formula, most problems become straightforward.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          style={{
            background: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 36px',
            fontSize: '15px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
          }}
        >
          <span>Finish Topic</span>
          <CheckCircle2 size={18} color="#ffffff" />
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
