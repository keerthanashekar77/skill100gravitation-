import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

export default function FlashCard({ icon, title, bullets, backDetails, category }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flash-card-container ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleToggleFlip}
      title="Click to flip card"
    >
      <div className="flash-card-inner">
        {/* Front Face */}
        <div className="flash-card-front">
          <div>
            <div className="flash-card-title-row">
              {icon}
              <span className="flash-card-title">{title}</span>
            </div>
            <div className="flash-card-bullets">
              {bullets && bullets.map((bullet, idx) => (
                <div key={idx} className="flash-card-bullet-item">
                  <span className="flash-card-bullet-icon">›</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flash-card-flip-hint">
            <RotateCw size={12} />
            <span>Click to flip card</span>
          </div>
        </div>

        {/* Back Face */}
        <div className="flash-card-back">
          <div>
            <div className="flash-card-title-row">
              {icon}
              <span className="flash-card-title">{title}</span>
            </div>
            <span className="flash-card-back-badge">DEEP CONCEPT & NEET TRAP</span>

            <div className="flash-card-back-text">
              {backDetails ? (
                typeof backDetails === 'string' ? (
                  <p>{backDetails}</p>
                ) : (
                  backDetails
                )
              ) : (
                <>
                  <p><strong>Key Principle:</strong> Direct conceptual application for NEET & Class 11 exams.</p>
                  <p><strong>NEET Trap:</strong> Always pay attention to vector direction and negative signs in potential energy equations.</p>
                </>
              )}
            </div>
          </div>

          <div className="flash-card-flip-hint">
            <RotateCw size={12} />
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
