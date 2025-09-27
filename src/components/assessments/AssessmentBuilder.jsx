import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import QuestionEditor from './QuestionEditor';
import AssessmentPreview from './AssessmentPreview';

const AssessmentBuilder = ({ 
  jobId, 
  initialAssessment = null, 
  onSave, 
  onCancel 
}) => {
  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    sections: [
      {
        id: Date.now(),
        title: 'General Questions',
        description: 'Basic assessment questions',
        questions: []
      }
    ]
  });

  const [activeSection, setActiveSection] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load initial assessment data
  useEffect(() => {
    if (initialAssessment) {
      setAssessment(initialAssessment);
    }
  }, [initialAssessment]);

  const handleAssessmentChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: `Section ${assessment.sections.length + 1}`,
      description: '',
      questions: []
    };
    
    setAssessment(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    
    setActiveSection(assessment.sections.length);
  };

  const updateSection = (sectionIndex, field, value) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex 
          ? { ...section, [field]: value }
          : section
      )
    }));
  };

  const deleteSection = (sectionIndex) => {
    if (assessment.sections.length === 1) return; // Keep at least one section
    
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
    
    if (activeSection >= assessment.sections.length - 1) {
      setActiveSection(Math.max(0, activeSection - 1));
    }
  };

  const addQuestion = (sectionIndex, question) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex
          ? { 
              ...section, 
              questions: [...section.questions, { 
                ...question, 
                id: Date.now() + Math.random() 
              }] 
            }
          : section
      )
    }));
  };

  const updateQuestion = (sectionIndex, questionIndex, updatedQuestion) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) => 
                qIndex === questionIndex ? updatedQuestion : q
              )
            }
          : section
      )
    }));
  };

  const deleteQuestion = (sectionIndex, questionIndex) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex
          ? {
              ...section,
              questions: section.questions.filter((_, qIndex) => qIndex !== questionIndex)
            }
          : section
      )
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        ...assessment,
        jobId,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
    } finally {
      setSaving(false);
    }
  };

  const totalQuestions = assessment.sections.reduce((total, section) => 
    total + section.questions.length, 0
  );

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Assessment Preview</h2>
          <Button
            variant="outline"
            onClick={() => setShowPreview(false)}
          >
            Back to Editor
          </Button>
        </div>
        <AssessmentPreview assessment={assessment} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Builder</h1>
          <p className="text-gray-600">Create and edit job-specific assessments</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={totalQuestions === 0}
          >
            Preview
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            loading={saving}
            disabled={!assessment.title || totalQuestions === 0}
          >
            Save Assessment
          </Button>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Assessment Settings */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <Card.Title>Assessment Settings</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <Input
                label="Title"
                required
                value={assessment.title}
                onChange={(e) => handleAssessmentChange('title', e.target.value)}
                placeholder="e.g., Frontend Developer Assessment"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={assessment.description}
                  onChange={(e) => handleAssessmentChange('description', e.target.value)}
                  placeholder="Describe what this assessment covers..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                />
              </div>
              
              <Input
                label="Time Limit (minutes)"
                type="number"
                min="1"
                max="180"
                value={assessment.timeLimit}
                onChange={(e) => handleAssessmentChange('timeLimit', parseInt(e.target.value) || 30)}
              />
              
              <Input
                label="Passing Score (%)"
                type="number"
                min="0"
                max="100"
                value={assessment.passingScore}
                onChange={(e) => handleAssessmentChange('passingScore', parseInt(e.target.value) || 70)}
              />
              
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Sections:</span>
                    <span className="font-medium">{assessment.sections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Duration:</span>
                    <span className="font-medium">{assessment.timeLimit} min</span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Sections List */}
          <Card className="mt-4">
            <Card.Header>
              <div className="flex items-center justify-between">
                <Card.Title>Sections</Card.Title>
                <Button size="sm" onClick={addSection}>
                  Add Section
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                {assessment.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      activeSection === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSection(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {section.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {section.questions.length} questions
                        </p>
                      </div>
                      {assessment.sections.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSection(index);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Right Panel - Section Editor */}
        <div className="lg:col-span-3">
          {assessment.sections.length > 0 && (
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <div>
                    <Card.Title>
                      {assessment.sections[activeSection]?.title || 'Section'}
                    </Card.Title>
                    <p className="text-sm text-gray-600 mt-1">
                      {assessment.sections[activeSection]?.questions.length || 0} questions
                    </p>
                  </div>
                  <Badge variant="outline">
                    Section {activeSection + 1} of {assessment.sections.length}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-6">
                  {/* Section Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Section Title"
                      value={assessment.sections[activeSection]?.title || ''}
                      onChange={(e) => updateSection(activeSection, 'title', e.target.value)}
                      placeholder="Enter section title"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Description
                      </label>
                      <input
                        type="text"
                        value={assessment.sections[activeSection]?.description || ''}
                        onChange={(e) => updateSection(activeSection, 'description', e.target.value)}
                        placeholder="Brief description of this section"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Questions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Questions</h3>
                    </div>
                    
                    <QuestionEditor
                      questions={assessment.sections[activeSection]?.questions || []}
                      onAddQuestion={(question) => addQuestion(activeSection, question)}
                      onUpdateQuestion={(questionIndex, question) => updateQuestion(activeSection, questionIndex, question)}
                      onDeleteQuestion={(questionIndex) => deleteQuestion(activeSection, questionIndex)}
                    />
                  </div>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentBuilder;
