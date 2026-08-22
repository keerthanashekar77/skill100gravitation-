// Normalized Data Loader for Physics Class 11 — Gravitation
import questions300 from '../../Gravitation_Class11_NEET_300_Questions_Complete.json';
import connectomicsData from '../../Gravitation_Connectomics.json';
import introData from '../../Gravitation_Introduction_Big_Questions_and_Prerequisites.json';
import ncertQuestionsData from '../../Gravitation_Questions_UPDATED_CORRECT_EXPLANATIONS.json';
import skillsContentData from '../../Gravitation_Skill_Content_FINAL.json';
import terminologyData from '../../Gravitation_Terminology_UPDATED_NCERT_Current_Syllabus.json';
import pyqData from '../../NEET_Gravitation_All_Verified_PYQs (2).json';

// Helper to normalize questions
export const get300Questions = () => questions300.questions || [];
export const get300Concepts = () => questions300.concepts || [];

export const getConnectomics = () => connectomicsData;
export const getIntroduction = () => introData;

export const getNcertQuestions = () => ncertQuestionsData.sections || [];

export const getSkillsContent = () => skillsContentData;
export const getSkillsNavigation = () => skillsContentData.navigation || [];

// Strict ID mapping helper
export const normalizeTopicId = (id) => {
  if (!id) return 'intro';
  return id.trim();
};

// Retrieve 20 distinct Practice questions from the 300 question file
export const getPracticeQuestions = (skillIdOrTitle = '') => {
  const allQs = get300Questions();
  const practiceQs = allQs.filter(q => q.type === 'Practice');
  if (practiceQs.length === 0) return allQs.slice(0, 20);

  if (!skillIdOrTitle) return practiceQs.slice(0, 20);

  const topics = skillsContentData.topics || [];
  const matchedTopic = topics.find(t => t.id === skillIdOrTitle || t.title?.toLowerCase() === skillIdOrTitle.toLowerCase());
  const targetTitle = matchedTopic ? matchedTopic.title : skillIdOrTitle;

  // Filter matched topic questions first by exact title
  const matched = practiceQs.filter(q => q.concept?.toLowerCase() === targetTitle.toLowerCase());
  const remaining = practiceQs.filter(q => q.concept?.toLowerCase() !== targetTitle.toLowerCase());

  const result = [...matched, ...remaining].slice(0, 20);
  return result;
};

export const getAssertionReasonQuestions = () => {
  const sections = ncertQuestionsData.sections || [];
  const arSection = sections.find(s => s.section && s.section.toLowerCase().includes('assertion')) || {};
  const questions = arSection.questions || [];

  const letterMap = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' };

  return questions.map((q, idx) => {
    const correctLetter = letterMap[q.correctOption] || 'A';
    const correctExp = q.optionExplanations?.find(o => o.option === q.correctOption)?.explanation || q.explanation || 'Assertion & Reason evaluation.';

    return {
      id: `ar_${q.id || idx + 1}`,
      concept: 'Assertion & Reasoning',
      type: 'Assessment',
      isAssertionReason: true,
      assertion: q.assertion,
      reason: q.reason,
      question: `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`,
      options: q.options || [
        "1. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.",
        "2. Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.",
        "3. Assertion is true, but Reason is false.",
        "4. Both Assertion and Reason are false."
      ],
      answer: correctLetter,
      explanation: correctExp
    };
  });
};

// Retrieve distinct Assessment questions including Assertion & Reasoning questions
export const getAssessmentQuestions = (skillIdOrTitle = '') => {
  const allQs = get300Questions();
  const assessQs = allQs.filter(q => q.type === 'Assessment');
  const arQs = getAssertionReasonQuestions();

  const combinedQs = [...assessQs, ...arQs];

  if (!skillIdOrTitle) return combinedQs;

  const topics = skillsContentData.topics || [];
  const matchedTopic = topics.find(t => t.id === skillIdOrTitle || t.title?.toLowerCase() === skillIdOrTitle.toLowerCase());
  const targetTitle = matchedTopic ? matchedTopic.title : skillIdOrTitle;

  // Filter matched topic questions first by exact title
  const matched = combinedQs.filter(q => q.concept?.toLowerCase() === targetTitle.toLowerCase());
  const remaining = combinedQs.filter(q => q.concept?.toLowerCase() !== targetTitle.toLowerCase());

  const result = [...matched, ...remaining];
  return result;
};

export const getTerminology = () => terminologyData;

export const getPYQs = () => pyqData.questions || [];
export const getPYQStats = () => pyqData.statistics || {};

// Summary statistics for the Dashboard
export const getDashboardStats = () => {
  return {
    totalConcepts: questions300.concept_count || 15,
    totalQuestions: (questions300.total_questions || 300) + (pyqData.questions?.length || 68),
    totalNCERTLiners: ncertQuestionsData.total_questions || 87,
    pyqCount: pyqData.questions?.length || 68,
    skillsCount: skillsContentData.navigation?.length || 15
  };
};

export default {
  questions300,
  connectomicsData,
  introData,
  ncertQuestionsData,
  skillsContentData,
  terminologyData,
  pyqData,
  getDashboardStats,
  getPracticeQuestions,
  getAssessmentQuestions,
  normalizeTopicId
};

