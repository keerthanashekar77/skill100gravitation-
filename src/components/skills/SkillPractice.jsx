import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Bookmark, CheckCircle2, XCircle } from 'lucide-react';
import { getPracticeQuestions } from '../../data/gravitationData';
import Footer from '../common/Footer';

export default function SkillPractice({ skillId, skillTitle, onExit, onCompletePractice, onStartAssess }) {
  const practiceQuestions = getPracticeQuestions(skillId || skillTitle);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    return `${mins.toString()}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = practiceQuestions[currentIndex] || {
    question: 'Which statement best describes gravitation?',
    options: [
      'A repulsive force between charged bodies',
      'A universal attractive force between masses',
      'A force acting only on planets',
      'A force acting only on falling objects'
    ],
    answer: 'B',
    explanation: 'Gravitation is the universal attractive interaction between any two bodies having mass.'
  };

  const selectedOpt = selectedAnswers[currentIndex];
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (letter) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: letter });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview({ ...markedForReview, [currentIndex]: !markedForReview[currentIndex] });
  };

  const handleNext = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate stats
  const calculateScore = () => {
    let score = 0;
    practiceQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === (q.answer || 'A')) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const total = practiceQuestions.length;
  const percentage = total > 0 ? (score / total) : 0;
  const strokeDashoffset = 339.29 * (1 - percentage);

  const correctLetter = currentQ.answer || 'A';
  const isCorrect = selectedOpt === correctLetter;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {!isSubmitted ? (
        /* ================= PRACTICE ACTIVE VIEW ================= */
        <div>
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={onExit}
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

          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {/* Main Question Panel */}
            <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', color: '#334155', padding: '4px 14px', borderRadius: '9999px' }}>
                  PRACTICE QUESTION {currentIndex + 1} OF {practiceQuestions.length}
                </div>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '4px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: '800' }}>
                  Practice {currentIndex + 1}/{practiceQuestions.length}
                </div>
              </div>

              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', lineHeight: '1.4' }}>
                {currentQ.question}
              </div>

              {/* Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {currentQ.options?.map((optText, idx) => {
                  const letter = optionLetters[idx];
                  const isSelected = selectedOpt === letter;
                  let optBorder = '1px solid #e2e8f0';
                  let optBg = '#ffffff';
                  let optColor = '#334155';

                  if (selectedOpt) {
                    if (letter === correctLetter) {
                      optBorder = '2px solid #10b981';
                      optBg = '#ecfdf5';
                      optColor = '#065f46';
                    } else if (isSelected) {
                      optBorder = '2px solid #ef4444';
                      optBg = '#fef2f2';
                      optColor = '#991b1b';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(letter)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: optBorder,
                        background: optBg,
                        color: optColor,
                        fontWeight: isSelected || (selectedOpt && letter === correctLetter) ? '700' : '500',
                        fontSize: '14px',
                        cursor: selectedOpt ? 'default' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isSelected ? (isCorrect ? '#10b981' : '#ef4444') : (selectedOpt && letter === correctLetter ? '#10b981' : '#f1f5f9'),
                        color: isSelected || (selectedOpt && letter === correctLetter) ? '#ffffff' : '#64748b',
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

              {/* Answer Feedback Card */}
              {selectedOpt && (
                <div style={{
                  background: isCorrect ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isCorrect ? '#047857' : '#b91c1c', fontWeight: '800', fontSize: '14px', marginBottom: '6px' }}>
                    {isCorrect ? <CheckCircle2 size={18} color="#047857" /> : <XCircle size={18} color="#b91c1c" />}
                    <span>{isCorrect ? 'Correct!' : 'Not quite!'}</span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: isCorrect ? '#065f46' : '#991b1b', lineHeight: '1.5' }}>
                    <strong>Explanation: </strong>{currentQ.explanation || 'Gravitational attraction acts universally between all masses.'}
                  </div>
                </div>
              )}

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
                    onClick={handlePrev}
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
                    onClick={handleNext}
                    style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '8px 20px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {currentIndex === practiceQuestions.length - 1 ? 'Submit Practice' : 'Next Question →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= PRACTICE FINAL REPORT (MATCHING REFERENCE SCREENSHOT 1 EXACTLY) ================= */
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              padding: '40px 48px',
              width: '100%',
              maxWidth: '480px',
              textAlign: 'center',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
            }}
          >
            {/* Top Back to Skills link */}
            <div style={{ marginBottom: '28px' }}>
              <button
                onClick={onExit}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                ← Back to Skills
              </button>
            </div>

            {/* Circular Progress Gauge */}
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 20px auto' }}>
              <svg width="130" height="130" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="8"
                  strokeDasharray="339.29"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '130px',
                  height: '130px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ fontFamily: 'Outfit', fontSize: '36px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>
                  {score}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginTop: '2px' }}>
                  out of {total}
                </div>
              </div>
            </div>

            {/* Time Taken Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#64748b',
                marginBottom: '24px'
              }}
            >
              <Clock size={13} color="#64748b" />
              <span>Time Taken: {formatTime(seconds)}</span>
            </div>

            {/* Motivational Emoji */}
            <div style={{ fontSize: '42px', marginBottom: '12px', lineHeight: '1' }}>
              💪
            </div>

            {/* Heading & Subheading */}
            <h2 style={{ fontFamily: 'Outfit', fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
              Keep Learning!
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 32px 0', lineHeight: '1.4' }}>
              Review the concepts and try again for 100%.
            </p>

            {/* Bottom Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={onExit}
                style={{
                  background: '#ffffff',
                  border: '2px solid #2563eb',
                  borderRadius: '9999px',
                  padding: '10px 22px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#2563eb',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Back to Skills
              </button>

              <button
                onClick={onStartAssess || onExit}
                style={{
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '10px 22px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#ffffff',
                  cursor: 'pointer',
                  flex: 1,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
                }}
              >
                Take Assessment 🏆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUIREMENT 11: Dark Footer */}
      <Footer />
    </div>
  );
}
