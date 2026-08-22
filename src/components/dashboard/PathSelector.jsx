import React from 'react';
import {
  Link2,
  Zap,
  BookOpen,
  Target,
  Trophy,
  ChevronRight
} from 'lucide-react';

export default function PathSelector({ onSelectPath }) {
  const paths = [
    {
      id: 'connectomics',
      tag: 'BEFORE YOU BEGIN',
      title: 'Connectomics',
      desc: 'Verify your prerequisites and see how gravitation connects to other branches of physics.',
      icon: <Link2 size={20} color="#d97706" />,
      colorClass: 'connectomics'
    },
    {
      id: 'intro',
      tag: 'START HERE',
      title: 'Introduction',
      desc: 'Explore the 6 Big Questions (5W1H) and prerequisites to begin your journey into Gravitation.',
      icon: <Zap size={20} color="#2563eb" />,
      colorClass: 'intro'
    },
    {
      id: 'terminology',
      tag: 'THE LANGUAGE',
      title: 'Terminology',
      desc: 'Master the key terms, NCERT definitions, and fundamental principles that define gravitation.',
      icon: <BookOpen size={20} color="#059669" />,
      colorClass: 'terminology'
    },
    {
      id: 'skills',
      tag: 'CORE PRACTICE',
      title: 'Skills',
      desc: 'Dive into 15 individual topic modules with interactive Learn, Practice, and Assess modes.',
      icon: <Target size={20} color="#4f46e5" />,
      colorClass: 'skills'
    },
    {
      id: 'examEdge',
      tag: 'TEST READY',
      title: 'Exam Edge',
      desc: 'Challenge yourself with exam-style testbank and high-yield questions from previous NEET tests.',
      icon: <Trophy size={20} color="#db2777" />,
      colorClass: 'exam-edge'
    }
  ];

  return (
    <div className="path-selector-container">
      <div className="path-header-lbl">
        CHOOSE YOUR PATH
      </div>

      {paths.map((path) => (
        <div
          key={path.id}
          className={`path-card ${path.colorClass}`}
          onClick={() => onSelectPath(path.id)}
        >
          <div className="path-icon-wrapper">
            {path.icon}
          </div>

          <div className="path-card-content">
            <div className="path-tag">
              {path.tag}
            </div>

            <div className="path-title">
              {path.title}
            </div>

            <div className="path-desc">
              {path.desc}
            </div>
          </div>

          <ChevronRight
            className="path-chevron"
            size={18}
          />
        </div>
      ))}
    </div>
  );
}