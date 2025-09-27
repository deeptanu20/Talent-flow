// components/assessments/QuestionEditor.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const QuestionEditor = ({ 
  questions = [], 
  onAddQuestion, 
  onUpdateQuestion, 
  onDeleteQuestion 
}) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const questionTypes = [
    { value: 'single-choice', label: 'Single Choice' },
    { value: 'multi-choice', label: 'Multiple Choice' },
    { value: 'short-text', label: 'Short Text' },
    { value: 'long-text', label: 'Long Text' },
    { value: 'numeric', label: 'Numeric' },
    { value: 'file-upload', label: 'File Upload' }
  ];

  const defaultQuestion = {
    type: 'single-choice',
    question: '',
    required: true,
    points: 1,
    options: ['Option 1', 'Option 2'],
    correctAnswer: 0,
    explanation: '',
    conditional: null
  };

  const [newQuestion, setNewQuestion] = useState(defaultQuestion);

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim()) return;
    
    onAddQuestion({ ...newQuestion });
    setNewQuestion({ ...defaultQuestion, id: undefined });
    setShowAddForm(false);
  };

  const handleUpdateQuestion = (index, updatedQuestion) => {
    onUpdateQuestion(index, updatedQuestion);
    setEditingQuestion(null);
  };

  const handleQuestionChange = (field, value, questionData = newQuestion, setter = setNewQuestion) => {
    setter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addOption = (questionData, setter) => {
    setter(prev => ({
      ...prev,
      options: [...prev.options, `Option ${prev.options.length + 1}`]
    }));
  };

  const updateOption = (index, value, questionData, setter) => {
    setter(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removeOption = (index, questionData, setter) => {
    if (questionData.options.length <= 2) return; // Keep at least 2 options
    
    setter(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      correctAnswer: prev.correctAnswer >= index ? Math.max(0, prev.correctAnswer - 1) : prev.correctAnswer
    }));
  };

  const renderQuestionForm = (questionData, setter, onSubmit, onCancel, submitLabel = "Add Question") => (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <Card.Content className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Question Type"
            options={questionTypes}
            value={questionData.type}
            onChange={(e) => handleQuestionChange('type', e.target.value, questionData, setter)}
          />
          <Input
            label="Points"
            type="number"
            min="1"
            max="10"
            value={questionData.points}
            onChange={(e) => handleQuestionChange('points', parseInt(e.target.value) || 1, questionData, setter)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <textarea
            value={questionData.question}
            onChange={(e) => handleQuestionChange('question', e.target.value, questionData, setter)}
            placeholder="Enter your question here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            required
          />
        </div>

        {/* Question Type Specific Fields */}
        {(questionData.type === 'single-choice' || questionData.type === 'multi-choice') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Options</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addOption(questionData, setter)}
              >
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {questionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <input
                      type={questionData.type === 'single-choice' ? 'radio' : 'checkbox'}
                      name={`correct-${questionData.id || 'new'}`}
                      checked={
                        questionData.type === 'single-choice' 
                          ? questionData.correctAnswer === index
                          : questionData.correctAnswers?.includes(index)
                      }
                      onChange={() => {
                        if (questionData.type === 'single-choice') {
                          handleQuestionChange('correctAnswer', index, questionData, setter);
                        } else {
                          const currentAnswers = questionData.correctAnswers || [];
                          const newAnswers = currentAnswers.includes(index)
                            ? currentAnswers.filter(i => i !== index)
                            : [...currentAnswers, index];
                          handleQuestionChange('correctAnswers', newAnswers, questionData, setter);
                        }
                      }}
                      className="mr-2"
                    />
                  </div>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value, questionData, setter)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${index + 1}`}
                  />
                  {questionData.options.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeOption(index, questionData, setter)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {questionData.type === 'numeric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Minimum Value"
              type="number"
              value={questionData.minValue || ''}
              onChange={(e) => handleQuestionChange('minValue', parseFloat(e.target.value), questionData, setter)}
            />
            <Input
              label="Maximum Value"
              type="number"
              value={questionData.maxValue || ''}
              onChange={(e) => handleQuestionChange('maxValue', parseFloat(e.target.value), questionData, setter)}
            />
          </div>
        )}

        {(questionData.type === 'short-text' || questionData.type === 'long-text') && (
          <Input
            label="Maximum Length"
            type="number"
            min="1"
            value={questionData.maxLength || ''}
            onChange={(e) => handleQuestionChange('maxLength', parseInt(e.target.value), questionData, setter)}
            placeholder="Optional character limit"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Explanation (Optional)
          </label>
          <textarea
            value={questionData.explanation || ''}
            onChange={(e) => handleQuestionChange('explanation', e.target.value, questionData, setter)}
            placeholder="Provide an explanation for the correct answer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id={`required-${questionData.id || 'new'}`}
            checked={questionData.required}
            onChange={(e) => handleQuestionChange('required', e.target.checked, questionData, setter)}
            className="mr-2"
          />
          <label htmlFor={`required-${questionData.id || 'new'}`} className="text-sm text-gray-700">
            Required question
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={!questionData.question.trim()}
          >
            {submitLabel}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Questions List */}
      {questions.map((question, index) => (
        <Card key={question.id} className="hover:shadow-md transition-shadow">
          <Card.Content>
            {editingQuestion === index ? (
              renderQuestionForm(
                question,
                (setter) => setter,
                () => handleUpdateQuestion(index, question),
                () => setEditingQuestion(null),
                "Update Question"
              )
            ) : (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" size="sm">
                        {questionTypes.find(t => t.value === question.type)?.label}
                      </Badge>
                      <Badge variant={question.required ? 'danger' : 'default'} size="sm">
                        {question.required ? 'Required' : 'Optional'}
                      </Badge>
                      <Badge variant="primary" size="sm">
                        {question.points} {question.points === 1 ? 'point' : 'points'}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </h3>
                    
                    {/* Show options for choice questions */}
                    {(question.type === 'single-choice' || question.type === 'multi-choice') && (
                      <div className="ml-4 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${
                              (question.type === 'single-choice' && question.correctAnswer === optIndex) ||
                              (question.type === 'multi-choice' && question.correctAnswers?.includes(optIndex))
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`} />
                            <span className="text-gray-700">{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.explanation && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingQuestion(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      ))}

      {/* Add New Question */}
      {showAddForm ? (
        renderQuestionForm(
          newQuestion,
          setNewQuestion,
          handleAddQuestion,
          () => {
            setShowAddForm(false);
            setNewQuestion(defaultQuestion);
          }
        )
      ) : (
        <Button
          variant="outline"
          onClick={() => setShowAddForm(true)}
          className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600"
        >
          + Add New Question
        </Button>
      )}
    </div>
  );
};

export default QuestionEditor;