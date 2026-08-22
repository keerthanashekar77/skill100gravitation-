import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import SectionHeader from './components/common/SectionHeader';
import DashboardHero from './components/dashboard/DashboardHero';
import PathSelector from './components/dashboard/PathSelector';
import ConnectomicsView from './components/connectomics/ConnectomicsView';
import IntroView from './components/intro/IntroView';
import TerminologyView from './components/terminology/TerminologyView';
import SkillsView from './components/skills/SkillsView';
import ExamEdgeView from './components/examEdge/ExamEdgeView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userMastery, setUserMastery] = useState(0);

  const handleUpdateMastery = (newMasteryScore) => {
    setUserMastery((prev) => Math.max(prev, newMasteryScore));
  };

  return (
    <div className="app-container">
      {/* Main Navbar */}
      <Navbar onNavigateHome={() => setActiveTab('dashboard')} />

      <main className="main-content">
        {/* If on inner page, show Subnav SectionHeader */}
        {activeTab !== 'dashboard' && (
          <SectionHeader
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <DashboardHero userMastery={userMastery} />
            <PathSelector onSelectPath={(pathId) => setActiveTab(pathId)} />
          </div>
        )}

        {/* Connectomics View */}
        {activeTab === 'connectomics' && (
          <ConnectomicsView onNavigateIntro={() => setActiveTab('intro')} />
        )}

        {/* Intro View */}
        {activeTab === 'intro' && (
          <IntroView onNavigateTerminology={() => setActiveTab('terminology')} />
        )}

        {/* Terminology View */}
        {activeTab === 'terminology' && (
          <TerminologyView onNavigateSkills={() => setActiveTab('skills')} />
        )}

        {/* Skills View */}
        {activeTab === 'skills' && (
          <SkillsView onUpdateMastery={handleUpdateMastery} />
        )}

        {/* Exam Edge View */}
        {activeTab === 'examEdge' && <ExamEdgeView />}
      </main>
    </div>
  );
}
