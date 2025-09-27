import React, { useState, useEffect } from 'react';
import AssessmentPreview from './AssessmentPreview';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ResponseForm = ({ 
  assessment, 
  candidateId, 
  onSubmit, 
  onSave, 
  initialResponses = {} 
}) => {
  const [responses, setResponses] = useState(initialResponses);
  const [timeRemaining, setTimeRemaining] = useState(assessment.timeLimit * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Timer effect
  useEffect(() => {
    if (isSubmitted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit(true); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted]);

  // Auto-save effect
  useEffect(() => {
    if (Object.keys(responses).length === 0) return;

    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [responses]);

  const handleAutoSave = async () => {
    setAutoSaving(true);
    try {
      await onSave({
        candidateId,
        assessmentId: assessment.id,
        responses,
        timeRemaining,
        savedAt: new Date().toISOString()
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleSubmit = async (isAutoSubmit = false) => {
    setIsSubmitted(true);
    
    const submissionData = {
      candidateId,
      assessmentId: assessment.id,
      responses,
      timeSpent: (assessment.timeLimit * 60) - timeRemaining,
      submittedAt: new Date().toISOString(),
      isAutoSubmit,
      score: calculateScore()
    };

    try {
      await onSubmit(submissionData);
    } catch (error) {
      console.error('Submission failed:', error);
      setIsSubmitted(false);
    }
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    assessment.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        totalPoints += question.points;
        
        const responseKey = `${sectionIndex}-${questionIndex}`;
        const response = responses[responseKey];
        
        if (isCorrectAnswer(question, response)) {
          earnedPoints += question.points;
        }
      });
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  };

  const isCorrectAnswer = (question, response) => {
    switch (question.type) {
      case 'single-choice':
        return response === question.correctAnswer;
      
      case 'multi-choice':
        if (!Array.isArray(response) || !Array.isArray(question.correctAnswers)) return false;
        return response.length === question.correctAnswers.length &&
               response.every(r => question.correctAnswers.includes(r));
      
      case 'numeric':
        const numResponse = parseFloat(response);
        return !isNaN(numResponse) && 
               (question.minValue === undefined || numResponse >= question.minValue) &&
               (question.maxValue === undefined || numResponse <= question.maxValue);
      
      case 'short-text':
      case 'long-text':
        // For text questions, we'd need manual grading or keyword matching
        // For demo purposes, just check if answered
        return response && response.trim().length > 0;
      
      case 'file-upload':
        return response !== null && response !== undefined;
      
      default:
        return false;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining > 300) return 'text-green-600'; // > 5 minutes
    if (timeRemaining > 60) return 'text-yellow-600';  // > 1 minute
    return 'text-red-600'; // < 1 minute
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Card>
          <Card.Content>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900">
                Assessment Submitted Successfully!
              </h2>
              
              <div className="space-y-2 text-gray-600">
                <p>Thank you for completing the {assessment.title}.</p>
                <p>Your responses have been recorded and will be reviewed by our team.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time spent:</span>
                  <span className="font-medium">
                    {formatTime((assessment.timeLimit * 60) - timeRemaining)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Questions answered:</span>
                  <span className="font-medium">
                    {Object.keys(responses).length} / {
                      assessment.sections.reduce((total, section) => total + section.questions.length, 0)
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated score:</span>
                  <span className="font-medium">{calculateScore()}%</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                You will be notified once your assessment has been reviewed.
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timer and Auto-save Status */}
      <Card>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getTimeColor()}`}>
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-xs text-gray-500">Time remaining</p>
              </div>
              
              {autoSaving && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Auto-saving...</span>
                </div>
              )}
              
              {lastSaved && !autoSaving && (
                <div className="text-sm text-green-600">
                  ✓ Saved at {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAutoSave}
              disabled={autoSaving}
            >
              Save Progress
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Assessment Form */}
      <AssessmentPreview
        assessment={assessment}
        readOnly={false}
        onSubmit={() => handleSubmit(false)}
        responses={responses}
        onResponseChange={(sectionIndex, questionIndex, value) => {
          const key = `${sectionIndex}-${questionIndex}`;
          setResponses(prev => ({
            ...prev,
            [key]: value
          }));
        }}
      />
    </div>
  );
};

export default ResponseForm;