import React from 'react';
import { ArrowLeft, Orbit, Zap, BookOpen, Target, Trophy } from 'lucide-react';

export default function SectionHeader({ activeTab, onTabChange, onBackToDashboard }) {
  const tabs = [
    { id: 'connectomics', label: 'Connectomics', icon: (active) => <Orbit size={14} color={active ? '#ffffff' : '#f59e0b'} /> },
    { id: 'intro', label: 'Intro', icon: (active) => <Zap size={14} color={active ? '#ffffff' : '#eab308'} /> },
    { id: 'terminology', label: 'Terminology', icon: (active) => <BookOpen size={14} color={active ? '#ffffff' : '#10b981'} /> },
    { id: 'skills', label: 'Skills', icon: (active) => <Target size={14} color={active ? '#ffffff' : '#ec4899'} /> },
    { id: 'examEdge', label: 'Exam Edge', icon: (active) => <Trophy size={14} color={active ? '#ffffff' : '#f97316'} /> },
  ];

  return (
    <div className="section-header-bar">
      <button className="btn-back-dashboard" onClick={onBackToDashboard}>
        <ArrowLeft size={14} color="#2563eb" />
        <span>Back to Dashboard</span>
      </button>

      <div className="section-pill-tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`pill-tab ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon(isActive)}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
