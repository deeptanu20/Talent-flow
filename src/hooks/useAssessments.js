import { useState, useEffect } from 'react';

export const useAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample assessments data
  const sampleAssessments = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your JavaScript knowledge',
      questions: [
        {
          id: 1,
          question: 'What is a closure in JavaScript?',
          type: 'multiple-choice',
          options: ['A function', 'A variable', 'A scope concept', 'A loop'],
          correctAnswer: 2
        },
        {
          id: 2,
          question: 'Explain the difference between let and var',
          type: 'text',
          correctAnswer: 'Let has block scope, var has function scope'
        }
      ],
      timeLimit: 30, // minutes
      difficulty: 'Intermediate',
      status: 'active'
    },
    {
      id: 2,
      title: 'React Components',
      description: 'Test your React component knowledge',
      questions: [
        {
          id: 1,
          question: 'What is JSX?',
          type: 'multiple-choice',
          options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
          correctAnswer: 0
        }
      ],
      timeLimit: 45,
      difficulty: 'Beginner',
      status: 'active'
    }
  ];

  useEffect(() => {
    setAssessments(sampleAssessments);
  }, []);

  const addAssessment = async (assessmentData) => {
    setLoading(true);
    try {
      const newAssessment = {
        ...assessmentData,
        id: Date.now(),
        status: 'active'
      };
      setAssessments(prev => [newAssessment, ...prev]);
      setError(null);
      return newAssessment;
    } catch (err) {
      setError('Failed to add assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAssessment = async (id, updates) => {
    setLoading(true);
    try {
      setAssessments(prev => prev.map(assessment => 
        assessment.id === id ? { ...assessment, ...updates } : assessment
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAssessment = async (id) => {
    setLoading(true);
    try {
      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAssessmentById = (id) => {
    return assessments.find(assessment => assessment.id === id);
  };

  const submitAssessment = async (assessmentId, answers, candidateId) => {
    setLoading(true);
    try {
      // Calculate score
      const assessment = getAssessmentById(assessmentId);
      let score = 0;
      let totalQuestions = assessment.questions.length;

      assessment.questions.forEach((question, index) => {
        if (question.type === 'multiple-choice') {
          if (answers[index] === question.correctAnswer) {
            score++;
          }
        }
        // For text questions, you might want more complex scoring
      });

      const result = {
        id: Date.now(),
        assessmentId,
        candidateId,
        answers,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        completedAt: new Date().toISOString(),
      };

      setError(null);
      return result;
    } catch (err) {
      setError('Failed to submit assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    assessments,
    loading,
    error,
    addAssessment,
    updateAssessment,
    deleteAssessment,
    getAssessmentById,
    submitAssessment
  };
};
