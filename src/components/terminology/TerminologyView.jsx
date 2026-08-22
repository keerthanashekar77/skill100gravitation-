import React, { useState } from 'react';
import { BookOpen, ShieldCheck, HelpCircle, Lightbulb, CheckCircle2, XCircle, Zap, Orbit, Compass, Target, ShieldAlert, Atom, RotateCcw, ArrowRight } from 'lucide-react';
import { getTerminology } from '../../data/gravitationData';
import Footer from '../common/Footer';

export default function TerminologyView({ onNavigateSkills }) {
  const [subTab, setSubTab] = useState('keyTerms'); // keyTerms | goldenRules | quiz
  const terminologyData = getTerminology();
  const definitions = terminologyData.definitions || [];
  const goldenRules = terminologyData.golden_rules || [];
  const quizQuestions = terminologyData.quiz_time?.questions || [];

  const [selectedTermId, setSelectedTermId] = useState(definitions[0]?.id || 'gravitation');
  const selectedTerm = definitions.find((d) => d.id === selectedTermId) || definitions[0] || {};

  const [selectedRuleId, setSelectedRuleId] = useState(goldenRules[0]?.id || 1);
  const selectedRule = goldenRules.find((r) => r.id === selectedRuleId) || goldenRules[0] || {};

  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizUserAnswers, setQuizUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuizIdx] || {};

  // Palette for icons
  const colors = ['#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316'];
  const getIcon = (idx, isSelected) => {
    const color = colors[idx % colors.length];
    const iconColor = isSelected ? '#ffffff' : color;
    const icons = [
      <Compass size={18} color={iconColor} />,
      <Zap size={18} color={iconColor} />,
      <Target size={18} color={iconColor} />,
      <Orbit size={18} color={iconColor} />,
      <ShieldCheck size={18} color={iconColor} />,
      <Atom size={18} color={iconColor} />,
      <BookOpen size={18} color={iconColor} />,
      <ShieldAlert size={18} color={iconColor} />
    ];
    return icons[idx % icons.length];
  };

  const handleSelectQuizOption = (optIdx) => {
    if (quizCompleted) return;
    setQuizUserAnswers({ ...quizUserAnswers, [currentQuizIdx]: optIdx });
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizUserAnswers[idx] === q.correctOption) score++;
    });
    return score;
  };

  const handleRestartQuiz = () => {
    setQuizUserAnswers({});
    setCurrentQuizIdx(0);
    setQuizCompleted(false);
  };

  return (
    <div className="terminology-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* 1. PHYSICS LEXICON HEADER — Centered Horizontally */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '36px', fontWeight: '800', margin: '0 0 6px 0' }}>
          <span style={{ color: '#0f172a' }}>Physics </span>
          <span style={{ color: '#2563eb' }}>Lexicon</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
          {subTab === 'keyTerms' && `Explore the foundations with ${definitions.length} key terms.`}
          {subTab === 'goldenRules' && `Explore the foundations with ${goldenRules.length} golden rules.`}
          {subTab === 'quiz' && (terminologyData.quiz_time?.description || "Test your vocabulary and laws knowledge!")}
        </p>
      </div>

      {/* Sub-tabs Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', justifyContent: 'center' }}>
        <button
          className={`btn-skill-action ${subTab === 'keyTerms' ? 'btn-assess' : 'btn-learn'}`}
          onClick={() => setSubTab('keyTerms')}
          style={{ padding: '8px 20px', borderRadius: '9999px' }}
        >
          <BookOpen size={16} />
          <span>Key Terms</span>
        </button>
        <button
          className={`btn-skill-action ${subTab === 'goldenRules' ? 'btn-assess' : 'btn-learn'}`}
          onClick={() => setSubTab('goldenRules')}
          style={{ padding: '8px 20px', borderRadius: '9999px' }}
        >
          <ShieldCheck size={16} />
          <span>{goldenRules.length} Golden Rules</span>
        </button>
        <button
          className={`btn-skill-action ${subTab === 'quiz' ? 'btn-assess' : 'btn-learn'}`}
          onClick={() => setSubTab('quiz')}
          style={{ padding: '8px 20px', borderRadius: '9999px' }}
        >
          <HelpCircle size={16} />
          <span>Quiz Time</span>
        </button>
      </div>

      {/* SUBTAB 1: KEY TERMS */}
      {subTab === 'keyTerms' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* 3. LEFT COLUMN — TERM LIST */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '12px', boxShadow: 'var(--shadow-sm)', maxHeight: '600px', overflowY: 'auto' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', padding: '8px 12px', letterSpacing: '0.05em' }}>
              NCERT Lexicon ({definitions.length})
            </div>
            {definitions.map((def, idx) => {
              const isSelected = selectedTermId === def.id;
              return (
                <button
                  key={def.id}
                  onClick={() => setSelectedTermId(def.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSelected ? '#2563eb' : 'transparent',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    fontWeight: isSelected ? '700' : '600',
                    fontSize: '13.5px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '4px'
                  }}
                >
                  {getIcon(idx, isSelected)}
                  <span>{def.term}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT TERM DETAIL PANEL */}
          {selectedTerm && (
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(definitions.findIndex(d => d.id === selectedTerm.id), false)}
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '26px', fontWeight: '800', color: '#2563eb', margin: 0 }}>
                  {selectedTerm.term}
                </h2>
              </div>

              {/* Definition */}
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', marginBottom: '24px' }}>
                {selectedTerm.definition}
              </p>

              {/* Formula & Properties Box */}
              {(selectedTerm.formula || selectedTerm.value || selectedTerm.value_near_earth || selectedTerm.earth_value || selectedTerm.unit || selectedTerm.dimensions) && (
                <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px 20px', marginBottom: '24px' }}>
                  {selectedTerm.formula && (
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FORMULA: </span>
                      <code style={{ fontFamily: 'monospace', fontWeight: '700', color: '#2563eb', fontSize: '15px' }}>{selectedTerm.formula}</code>
                    </div>
                  )}
                  {(selectedTerm.value || selectedTerm.value_near_earth || selectedTerm.earth_value) && (
                    <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>
                      <strong>Value: </strong>{selectedTerm.value || selectedTerm.value_near_earth || selectedTerm.earth_value}
                    </div>
                  )}
                  {selectedTerm.unit && (
                    <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>
                      <strong>SI Unit: </strong>{selectedTerm.unit}
                    </div>
                  )}
                  {selectedTerm.dimensions && (
                    <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>
                      <strong>Dimensions: </strong>{selectedTerm.dimensions}
                    </div>
                  )}
                </div>
              )}

              {/* 4 & 5. EXAMPLES & GREY FACT BLOCK */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Examples Card */}
                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    {selectedTerm.conditions ? 'CONDITIONS / CHARACTERISTICS' : 'EXAMPLES / KEY ASPECTS'}
                  </div>

                  {selectedTerm.examples?.map((ex, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#334155', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', lineHeight: '1.5' }}>
                      {ex}
                    </div>
                  ))}

                  {selectedTerm.conditions?.map((cond, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#334155', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', lineHeight: '1.5' }}>
                      {cond}
                    </div>
                  ))}

                  {!selectedTerm.examples && !selectedTerm.conditions && selectedTerm.keywords && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {selectedTerm.keywords.map((kw, i) => (
                        <span key={i} style={{ fontSize: '12px', background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 5. Grey Fact Block */}
                  <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b', fontStyle: 'italic', background: '#f1f5f9', borderRadius: '8px', padding: '10px 12px', border: '1px solid #e2e8f0', lineHeight: '1.4' }}>
                    {selectedTerm.formula ? `Key Relation: ${selectedTerm.formula}` : selectedTerm.category ? `Category: ${selectedTerm.category}` : 'NCERT Core Terminology Concept'}
                  </div>
                </div>

                {/* Quick Memory Box */}
                <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '16px', border: '1px solid #dbeafe' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#1d4ed8', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    QUICK MEMORY / PRO-HINT
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e40af', lineHeight: '1.6', background: '#ffffff', borderRadius: '8px', padding: '14px', border: '1px solid #bfdbfe' }}>
                    💡 <strong>Pro-Hint: </strong>
                    {selectedTerm.pro_hint || (selectedTerm.keywords ? `Key aspects: ${selectedTerm.keywords.join(', ')}` : selectedTerm.definition)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. SUBTAB 2: RULES SECTION REDESIGN */}
      {subTab === 'goldenRules' && (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left Column Rules List */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', padding: '8px 12px', letterSpacing: '0.05em' }}>
              Golden Rules ({goldenRules.length})
            </div>
            {goldenRules.map((gr, idx) => {
              const isSelected = selectedRuleId === gr.id;
              return (
                <button
                  key={gr.id || idx}
                  onClick={() => setSelectedRuleId(gr.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSelected ? '#2563eb' : 'transparent',
                    color: isSelected ? '#ffffff' : '#0f172a',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(idx, isSelected)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '14px', lineHeight: '1.2' }}>Rule {gr.id || idx + 1}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Rule Detail Panel */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getIcon(goldenRules.findIndex(r => r.id === selectedRule.id), false)}
              </div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '800', color: '#2563eb', margin: 0 }}>
                Rule {selectedRule.id}: {selectedRule.title}
              </h2>
            </div>

            {/* Main Rule Statement Box (Light Blue Highlighted Box) */}
            <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', color: '#1e40af', fontWeight: '600', fontSize: '15.5px', lineHeight: '1.6', marginBottom: '20px' }}>
              "{selectedRule.rule || selectedRule.desc}"
            </div>

            {selectedRule.formula && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>FORMULA RELATION: </span>
                <code style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#2563eb', fontWeight: '700', fontSize: '14px' }}>
                  {selectedRule.formula}
                </code>
              </div>
            )}

            {/* 7. SURVIVAL TIP BOX */}
            {selectedRule.survival_tip && (
              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '18px', border: '1px solid #dcfce7', marginTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#166534', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  STUDENT / SURVIVAL TIP
                </div>
                <div style={{ fontSize: '14px', color: '#15803d', background: '#ffffff', borderRadius: '8px', padding: '14px', border: '1px solid #bbf7d0', lineHeight: '1.5', fontWeight: '600' }}>
                  💡 <strong>Survival Tip: </strong>{selectedRule.survival_tip}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. SUBTAB 3: QUIZ TIME / ASSESSMENT */}
      {subTab === 'quiz' && (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {!quizCompleted ? (
            <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
              {/* Top Quiz Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em' }}>
                    QUESTION {currentQuizIdx + 1} OF {quizQuestions.length}
                  </div>
                  <div style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
                    Quiz Mode
                  </div>
                </div>

                {/* Circle Badge */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '2px solid #2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: '#2563eb',
                  fontSize: '16px'
                }}>
                  {currentQuizIdx + 1}
                </div>
              </div>

              {/* Question Text from User's Data */}
              <div style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', lineHeight: '1.4' }}>
                {currentQuestion.question}
              </div>

              {/* 2x2 Options Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {currentQuestion.options?.map((opt, oIdx) => {
                  const optionNum = oIdx + 1;
                  const isSelected = quizUserAnswers[currentQuizIdx] === optionNum;
                  const isCorrect = optionNum === currentQuestion.correctOption;

                  let btnBg = '#ffffff';
                  let btnBorder = '#e2e8f0';
                  let btnColor = '#0f172a';

                  if (isSelected) {
                    if (isCorrect) {
                      btnBg = '#ecfdf5';
                      btnBorder = '#10b981';
                      btnColor = '#065f46';
                    } else {
                      btnBg = '#fef2f2';
                      btnBorder = '#ef4444';
                      btnColor = '#991b1b';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectQuizOption(optionNum)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: `1px solid ${btnBorder}`,
                        background: btnBg,
                        color: btnColor,
                        fontWeight: '700',
                        fontSize: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {quizUserAnswers[currentQuizIdx] !== undefined && (
                <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', padding: '14px 18px', fontSize: '13.5px', color: '#1e40af', lineHeight: '1.5', marginBottom: '24px' }}>
                  <strong>Explanation: </strong>{currentQuestion.explanation}
                </div>
              )}

              {/* Next Question Button */}
              {quizUserAnswers[currentQuizIdx] !== undefined && (
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleNextQuizQuestion}
                    style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      padding: '12px 32px',
                      borderRadius: '9999px',
                      fontWeight: '700',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {currentQuizIdx < quizQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Result Screen (Screenshot 4) */
            <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '48px 36px', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💪</div>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Great effort!
              </h2>
              <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '28px' }}>
                You scored <strong>{calculateScore()} / {quizQuestions.length}</strong>
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <button
                  onClick={handleRestartQuiz}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
                {onNavigateSkills && (
                  <button
                    onClick={onNavigateSkills}
                    style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      padding: '10px 24px',
                      borderRadius: '9999px',
                      fontWeight: '700',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Practical Skills →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Centered Next Topic Navigation Button at Bottom */}
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <button
          onClick={onNavigateSkills}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '9999px',
            padding: '8px 24px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#334155',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          Next Topic: Skills →
        </button>
      </div>

      {/* REQUIREMENT 11: Dark Footer */}
      <Footer />
    </div>
  );
}
