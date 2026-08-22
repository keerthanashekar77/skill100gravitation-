import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

export default function RevisionFlashcard({ card, currentIndex, totalCards, onPrev, onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset to front face whenever card index changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  if (!card) return null;

  return (
    <div className="flashcard-deck-container">
      {/* Top Header Card Counter */}
      <div className="flashcard-counter-header">
        <div className="counter-pill">
          Card {currentIndex + 1} of {totalCards}
        </div>
      </div>

      {/* Main Flashcard */}
      <div
        className={`flashcard-card-box ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flashcard-card-inner">
          {/* FRONT FACE */}
          <div className="flashcard-face flashcard-front">
            <div className="card-top-icon-row">
              {card.icon}
              <span className="card-topic-tag">TOPIC {currentIndex + 1}</span>
            </div>

            <div className="card-front-center">
              <h3 className="card-front-title">{card.title}</h3>
              <p className="card-front-hint">Tap card to reveal formulas & key principles</p>
            </div>

            <div className="card-flip-prompt">
              <RotateCw size={14} />
              <span>Click to Flip Card</span>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="flashcard-face flashcard-back">
            <div className="card-top-icon-row">
              {card.icon}
              <span className="card-topic-tag">{card.title}</span>
            </div>

            <div className="card-back-body">
              <div className="card-bullets-list">
                {card.bullets && card.bullets.map((bullet, idx) => (
                  <div key={idx} className="card-bullet-row">
                    <span className="bullet-symbol">›</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {card.backDetails && (
                <div className="card-extra-details">
                  {card.backDetails}
                </div>
              )}
            </div>

            <div className="card-flip-prompt">
              <RotateCw size={14} />
              <span>Click to Flip Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flashcard-navigation-bar">
        <button
          className="flashcard-nav-button"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <span className="flashcard-status-text">
          {isFlipped ? 'Back (Revealed)' : 'Front (Click to Reveal)'}
        </span>

        <button
          className="flashcard-nav-button"
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
