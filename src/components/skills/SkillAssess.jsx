import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Bookmark, Award, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { getAssessmentQuestions } from '../../data/gravitationData';
import Footer from '../common/Footer';

export default function SkillAssess({ skillId, skillTitle, onBack, onCompleteAssessment }) {
  const assessQuestions = getAssessmentQuestions(skillId || skillTitle);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Timer useEffect
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = assessQuestions[currentIndex] || {
    question: 'If the net external force on a body is zero, which of the following is ALWAYS true?',
    options: [
      'Acceleration is constant and non-zero',
      'Pseudo forces must be applied',
      'The body is always at rest',
      'Newton\'s first law is valid'
    ],
    answer: 'D',
    explanation: 'In an inertial frame of reference, Newton\'s first law of motion holds true.'
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleOptionSelect = (letter) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentIndex]: letter });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview({ ...markedForReview, [currentIndex]: !markedForReview[currentIndex] });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let score = 0;
    assessQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === (q.answer || 'A')) {
        score++;
      }
    });
    const percentage = Math.round((score / assessQuestions.length) * 100);
    if (onCompleteAssessment) {
      onCompleteAssessment(percentage);
    }
  };

  const toggleSolution = (idx) => {
    setExpandedSolutions({ ...expandedSolutions, [idx]: !expandedSolutions[idx] });
  };

  // Calculate detailed assessment report stats
  const calculateStats = () => {
    let score = 0;
    let answeredCount = 0;
    assessQuestions.forEach((q, idx) => {
      if (userAnswers[idx] !== undefined) {
        answeredCount++;
        if (userAnswers[idx] === (q.answer || 'A')) {
          score++;
        }
      }
    });
    const accuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;
    return { score, total: assessQuestions.length, answeredCount, accuracy };
  };

  const stats = calculateStats();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* REQUIREMENT 12: Back to Skills Button with Blue Colour & Arrow */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#2563eb',
            fontSize: '14px',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ArrowLeft size={16} color="#2563eb" />
          <span>Back to Skills</span>
        </button>
      </div>

      {!isSubmitted ? (
        /* ================= ASSESSMENT ACTIVE VIEW ================= */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          {/* Main Question Panel */}
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', color: '#334155', padding: '4px 14px', borderRadius: '9999px' }}>
                ASSESSMENT QUESTION {currentIndex + 1} OF {assessQuestions.length}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                {skillTitle || 'Gravitation Assessment'}
              </div>
            </div>

            {currentQ.assertion ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#0f172a', lineHeight: '1.5' }}>
                  <strong style={{ color: '#2563eb' }}>Assertion (A): </strong>
                  <span>{currentQ.assertion}</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#0f172a', lineHeight: '1.5' }}>
                  <strong style={{ color: '#2563eb' }}>Reason (R): </strong>
                  <span>{currentQ.reason}</span>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', lineHeight: '1.4' }}>
                {currentQ.question}
              </div>
            )}

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {currentQ.options?.map((optText, idx) => {
                const letter = optionLetters[idx];
                const isSelected = userAnswers[currentIndex] === letter;

                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(letter)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#ffffff',
                      color: isSelected ? '#1e40af' : '#334155',
                      fontWeight: isSelected ? '700' : '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isSelected ? '#2563eb' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b',
                      fontWeight: '800',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {letter}
                    </div>
                    <span>{optText}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <button
                onClick={toggleMarkForReview}
                style={{
                  background: markedForReview[currentIndex] ? '#fffbeb' : '#ffffff',
                  border: `1px solid ${markedForReview[currentIndex] ? '#f59e0b' : '#cbd5e1'}`,
                  color: markedForReview[currentIndex] ? '#b45309' : '#475569',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={14} color={markedForReview[currentIndex] ? '#b45309' : '#475569'} />
                <span>{markedForReview[currentIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '9999px',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: currentIndex === 0 ? '#94a3b8' : '#334155',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>
                <button
                  disabled={currentIndex === assessQuestions.length - 1}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: currentIndex === assessQuestions.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* REQUIREMENT 8 & SCREENSHOT 1: WHITE Question Palette Card */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <Clock size={22} color="#2563eb" />
              <span style={{ fontFamily: 'monospace', fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>{formatTime(seconds)}</span>
            </div>

            <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
              Question Palette ({assessQuestions.length} Questions)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
              {assessQuestions.map((_, idx) => {
                const isAns = userAnswers[idx] !== undefined;
                const isMrk = markedForReview[idx];
                const isCurr = currentIndex === idx;

                let btnBg = '#ffffff';
                let btnColor = '#0f172a';
                let btnBorder = '1px solid #cbd5e1';

                if (isAns) {
                  btnBg = '#2563eb';
                  btnColor = '#ffffff';
                  btnBorder = '1px solid #2563eb';
                } else if (isMrk) {
                  btnBg = '#fffbeb';
                  btnColor = '#b45309';
                  btnBorder = '1px solid #f59e0b';
                }

                if (isCurr) {
                  btnBorder = '2px solid #0f172a';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: btnBg,
                      color: btnColor,
                      border: btnBorder,
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#2563eb', borderRadius: '3px' }}></span>
                <span>Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '3px' }}></span>
                <span>Not Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '3px' }}></span>
                <span>Marked for Review</span>
              </div>
            </div>

            {/* REQUIREMENT 8: RECTANGULAR SUBMIT ASSESSMENT BUTTON */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
              }}
            >
              Submit Assessment
            </button>
          </div>
        </div>
      ) : (
        /* ================= ASSESSMENT REPORT VIEW ================= */
        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <BarChart3 size={28} color="#2563eb" />
            <h1 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Assessment Report
            </h1>
          </div>

          {/* 3 Summary Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {/* TOTAL SCORE */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                TOTAL SCORE
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: '#2563eb' }}>
                {stats.score} <span style={{ fontSize: '16px', color: '#64748b' }}>/ {stats.total}</span>
              </div>
            </div>

            {/* ACCURACY */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                ACCURACY
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: stats.accuracy >= 50 ? '#10b981' : '#ef4444' }}>
                {stats.accuracy}%
              </div>
            </div>

            {/* TIME TAKEN */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                TIME TAKEN
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Clock size={20} color="#2563eb" />
                <span>{formatTime(seconds)}</span>
              </div>
            </div>
          </div>

          {/* Question Breakdown Heading */}
          <h2 style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
            Question Breakdown ({assessQuestions.length} Questions)
          </h2>

          {/* List of Questions Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {assessQuestions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isAnswered = userAns !== undefined;
              const correctAns = q.answer || 'A';
              const isCorrect = isAnswered && userAns === correctAns;
              const isExpanded = expandedSolutions[idx];

              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: `1px solid ${isCorrect ? '#dcfce7' : isAnswered ? '#fecaca' : '#fef3c7'}`,
                    padding: '20px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Top Question Row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: isCorrect ? '#10b981' : isAnswered ? '#ef4444' : '#f59e0b',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </div>
                      {q.assertion ? (
                        <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>
                          <div style={{ marginBottom: '4px' }}><strong style={{ color: '#2563eb' }}>Assertion (A):</strong> {q.assertion}</div>
                          <div><strong style={{ color: '#2563eb' }}>Reason (R):</strong> {q.reason}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                          {q.question}
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: isCorrect ? '#dcfce7' : isAnswered ? '#fef2f2' : '#fffbeb',
                      color: isCorrect ? '#15803d' : isAnswered ? '#b91c1c' : '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      {isCorrect ? <CheckCircle2 size={13} color="#15803d" /> : isAnswered ? <XCircle size={13} color="#b91c1c" /> : null}
                      <span>{isCorrect ? 'Correct' : isAnswered ? 'Incorrect' : 'Skipped'}</span>
                    </div>
                  </div>

                  {/* 2x2 Grid of Options */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    {q.options?.map((optText, oIdx) => {
                      const letter = optionLetters[oIdx];
                      const isOptionSelected = userAns === letter;
                      const isOptionCorrect = letter === correctAns;

                      let optBg = '#f8fafc';
                      let optBorder = '#e2e8f0';
                      let optColor = '#334155';

                      if (isOptionCorrect) {
                        optBg = '#ecfdf5';
                        optBorder = '#10b981';
                        optColor = '#065f46';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optBg = '#fef2f2';
                        optBorder = '#ef4444';
                        optColor = '#991b1b';
                      }

                      return (
                        <div
                          key={oIdx}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: `1px solid ${optBorder}`,
                            background: optBg,
                            color: optColor,
                            fontSize: '13px',
                            fontWeight: isOptionCorrect || isOptionSelected ? '700' : '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span style={{ fontWeight: '800' }}>{letter}.</span>
                          <span>{optText}</span>
                          {isOptionCorrect && <CheckCircle2 size={14} color="#10b981" style={{ marginLeft: 'auto' }} />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Expandable Explanation Button */}
                  <button
                    onClick={() => toggleSolution(idx)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2563eb',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                  >
                    <span>{isExpanded ? '∧ Hide Solution' : '∨ Check Solution'}</span>
                  </button>

                  {/* Expanded Solution Box */}
                  {isExpanded && (
                    <div style={{ marginTop: '12px', background: '#eff6ff', borderRadius: '10px', padding: '14px', border: '1px solid #bfdbfe', fontSize: '13.5px', color: '#1e40af', lineHeight: '1.5' }}>
                      <strong>Solution: </strong>{q.explanation || 'Detailed solution explanation for this question.'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onBack}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2563eb',
                fontSize: '14.5px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} color="#2563eb" />
              <span>Back to Skills</span>
            </button>
          </div>
        </div>
      )}

      {/* REQUIREMENT 11: Footer */}
      <Footer />
    </div>
  );
}
