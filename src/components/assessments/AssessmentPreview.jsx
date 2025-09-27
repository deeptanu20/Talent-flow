import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const AssessmentPreview = ({ assessment, readOnly = true, onSubmit }) => {
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(assessment.timeLimit * 60); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResponseChange = (sectionIndex, questionIndex, value) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getResponse = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    return responses[key] || '';
  };

  const isQuestionAnswered = (sectionIndex, questionIndex) => {
    const response = getResponse(sectionIndex, questionIndex);
    return response !== '' && response !== null && response !== undefined;
  };

  const getCompletionStats = () => {
    const totalQuestions = assessment.sections.reduce((total, section) => 
      total + section.questions.length, 0
    );
    
    const answeredQuestions = Object.keys(responses).length;
    
    return {
      answered: answeredQuestions,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0
    };
  };

  const stats = getCompletionStats();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question, sectionIndex, questionIndex) => {
    const response = getResponse(sectionIndex, questionIndex);
    
    switch (question.type) {
      case 'single-choice':
        return (
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`q-${sectionIndex}-${questionIndex}`}
                  value={optionIndex}
                  checked={response == optionIndex}
                  onChange={(e) => handleResponseChange(sectionIndex, questionIndex, parseInt(e.target.value))}
                  className="text-blue-600"
                  disabled={readOnly}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multi-choice':
        return (
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={optionIndex}
                  checked={Array.isArray(response) && response.includes(optionIndex)}
                  onChange={(e) => {
                    const currentResponses = Array.isArray(response) ? response : [];
                    const newResponses = e.target.checked
                      ? [...currentResponses, optionIndex]
                      : currentResponses.filter(r => r !== optionIndex);
                    handleResponseChange(sectionIndex, questionIndex, newResponses);
                  }}
                  className="text-blue-600"
                  disabled={readOnly}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'short-text':
        return (
          <input
            type="text"
            value={response || ''}
            onChange={(e) => handleResponseChange(sectionIndex, questionIndex, e.target.value)}
            placeholder="Enter your answer..."
            maxLength={question.maxLength}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={readOnly}
          />
        );

      case 'long-text':
        return (
          <textarea
            value={response || ''}
            onChange={(e) => handleResponseChange(sectionIndex, questionIndex, e.target.value)}
            placeholder="Enter your detailed answer..."
            maxLength={question.maxLength}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            disabled={readOnly}
          />
        );

      case 'numeric':
        return (
          <input
            type="number"
            value={response || ''}
            onChange={(e) => handleResponseChange(sectionIndex, questionIndex, parseFloat(e.target.value))}
            placeholder="Enter a number..."
            min={question.minValue}
            max={question.maxValue}
            step="any"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={readOnly}
          />
        );

      case 'file-upload':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {readOnly ? (
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm">File upload functionality (Preview mode)</p>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  onChange={(e) => handleResponseChange(sectionIndex, questionIndex, e.target.files[0])}
                  className="hidden"
                  id={`file-${sectionIndex}-${questionIndex}`}
                />
                <label htmlFor={`file-${sectionIndex}-${questionIndex}`} className="cursor-pointer">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Click to upload file</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
                {response && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {response.name}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-500">Unsupported question type</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Assessment Header */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>{assessment.title}</Card.Title>
              {assessment.description && (
                <p className="text-gray-600 mt-1">{assessment.description}</p>
              )}
            </div>
            {!readOnly && (
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(timeRemaining)}
                </div>
                <p className="text-sm text-gray-500">Time remaining</p>
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{assessment.sections.length}</p>
              <p className="text-sm text-gray-500">Sections</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.answered}</p>
              <p className="text-sm text-gray-500">Answered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{assessment.timeLimit}</p>
              <p className="text-sm text-gray-500">Minutes</p>
            </div>
          </div>
          
          {!readOnly && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm text-gray-600">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Section Navigation */}
      {assessment.sections.length > 1 && (
        <Card>
          <Card.Content>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {assessment.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentSection === index
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSection(Math.min(assessment.sections.length - 1, currentSection + 1))}
                  disabled={currentSection === assessment.sections.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Current Section */}
      {assessment.sections[currentSection] && (
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>{assessment.sections[currentSection].title}</Card.Title>
                {assessment.sections[currentSection].description && (
                  <p className="text-gray-600 mt-1">{assessment.sections[currentSection].description}</p>
                )}
              </div>
              <Badge variant="outline">
                Section {currentSection + 1} of {assessment.sections.length}
              </Badge>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-6">
              {assessment.sections[currentSection].questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Question {questionIndex + 1}
                        </span>
                        {question.required && (
                          <Badge variant="danger" size="sm">Required</Badge>
                        )}
                        <Badge variant="outline" size="sm">
                          {question.points} {question.points === 1 ? 'point' : 'points'}
                        </Badge>
                        {isQuestionAnswered(currentSection, questionIndex) && (
                          <Badge variant="success" size="sm">✓ Answered</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                  
                  {renderQuestion(question, currentSection, questionIndex)}
                  
                  {question.explanation && readOnly && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Submit Section */}
      {!readOnly && (
        <Card>
          <Card.Content>
            <div className="text-center">
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900">
                  Ready to submit your assessment?
                </p>
                <p className="text-gray-600">
                  You have answered {stats.answered} out of {stats.total} questions
                </p>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                onClick={() => onSubmit && onSubmit(responses)}
                loading={isSubmitting}
                disabled={stats.answered === 0}
              >
                Submit Assessment
              </Button>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default AssessmentPreview;