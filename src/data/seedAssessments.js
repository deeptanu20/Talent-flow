import { ASSESSMENT_STATUS, ASSESSMENT_QUESTION_TYPES } from '../utils/constants.js';
import { generateId } from '../utils/helpers.js';

/**
 * Sample assessment questions for different job types
 */
const sampleQuestions = {
  technical: [
    {
      id: generateId(),
      title: 'What is the difference between let, const, and var in JavaScript?',
      type: ASSESSMENT_QUESTION_TYPES.MCQ,
      required: true,
      options: [
        { id: 'a', text: 'No difference, they are interchangeable', isCorrect: false },
        { id: 'b', text: 'let and const are block-scoped, var is function-scoped', isCorrect: true },
        { id: 'c', text: 'var and const are block-scoped, let is function-scoped', isCorrect: false },
        { id: 'd', text: 'All three are function-scoped', isCorrect: false },
      ],
      correctAnswer: 'b',
      points: 10,
    },
    {
      id: generateId(),
      title: 'Explain the concept of closures in JavaScript with an example.',
      type: ASSESSMENT_QUESTION_TYPES.TEXT,
      required: true,
      maxLength: 500,
      points: 15,
    },
    {
      id: generateId(),
      title: 'What is your experience with React hooks? (in years)',
      type: ASSESSMENT_QUESTION_TYPES.NUMERIC,
      required: false,
      min: 0,
      max: 10,
      points: 5,
    },
  ],
  
  general: [
    {
      id: generateId(),
      title: 'Why are you interested in joining our company?',
      type: ASSESSMENT_QUESTION_TYPES.TEXT,
      required: true,
      maxLength: 300,
      points: 10,
    },
    {
      id: generateId(),
      title: 'How do you handle working under pressure?',
      type: ASSESSMENT_QUESTION_TYPES.MCQ,
      required: true,
      options: [
        { id: 'a', text: 'I tend to get overwhelmed and make mistakes', isCorrect: false },
        { id: 'b', text: 'I prioritize tasks and stay focused on solutions', isCorrect: true },
        { id: 'c', text: 'I avoid high-pressure situations', isCorrect: false },
        { id: 'd', text: 'I delegate all tasks to others', isCorrect: false },
      ],
      correctAnswer: 'b',
      points: 8,
    },
    {
      id: generateId(),
      title: 'Are you comfortable working remotely?',
      type: ASSESSMENT_QUESTION_TYPES.BOOLEAN,
      required: true,
      points: 5,
    },
  ],

  design: [
    {
      id: generateId(),
      title: 'What design principles do you consider most important for user experience?',
      type: ASSESSMENT_QUESTION_TYPES.MCQ,
      required: true,
      options: [
        { id: 'a', text: 'Visual appeal and aesthetics only', isCorrect: false },
        { id: 'b', text: 'Usability, accessibility, and consistency', isCorrect: true },
        { id: 'c', text: 'Following the latest trends', isCorrect: false },
        { id: 'd', text: 'Using as many colors as possible', isCorrect: false },
      ],
      correctAnswer: 'b',
      points: 12,
    },
    {
      id: generateId(),
      title: 'Please upload your portfolio or design samples.',
      type: ASSESSMENT_QUESTION_TYPES.FILE,
      required: true,
      allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
      maxSize: 10485760, // 10MB
      points: 20,
    },
    {
      id: generateId(),
      title: 'Describe your design process from concept to final product.',
      type: ASSESSMENT_QUESTION_TYPES.TEXT,
      required: true,
      maxLength: 600,
      points: 15,
    },
  ],
};

/**
 * Sample assessments data
 */
export const seedAssessments = [
  {
    id: 1,
    title: 'Frontend Developer Technical Assessment',
    description: 'Technical evaluation for frontend development position including JavaScript, React, and general programming concepts.',
    jobId: 1, // Senior Frontend Developer
    status: ASSESSMENT_STATUS.PUBLISHED,
    timeLimit: 60, // minutes
    passingScore: 70, // percentage
    sections: [
      {
        id: generateId(),
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of core JavaScript concepts.',
        questions: [
          sampleQuestions.technical[0],
          sampleQuestions.technical[1],
        ],
      },
      {
        id: generateId(),
        title: 'React Experience',
        description: 'Questions about React framework experience.',
        questions: [
          sampleQuestions.technical[2],
        ],
      },
      {
        id: generateId(),
        title: 'General Questions',
        description: 'General questions about work preferences and motivation.',
        questions: [
          sampleQuestions.general[0],
          sampleQuestions.general[2],
        ],
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },

  {
    id: 2,
    title: 'Product Manager Evaluation',
    description: 'Assessment for product management role focusing on strategic thinking and leadership skills.',
    jobId: 2, // Product Manager
    status: ASSESSMENT_STATUS.PUBLISHED,
    timeLimit: 45,
    passingScore: 75,
    sections: [
      {
        id: generateId(),
        title: 'Strategic Thinking',
        description: 'Questions about product strategy and market analysis.',
        questions: [
          {
            id: generateId(),
            title: 'How would you prioritize features for a new product launch?',
            type: ASSESSMENT_QUESTION_TYPES.TEXT,
            required: true,
            maxLength: 400,
            points: 20,
          },
          {
            id: generateId(),
            title: 'What frameworks do you use for market research?',
            type: ASSESSMENT_QUESTION_TYPES.MCQ,
            required: true,
            options: [
              { id: 'a', text: 'Only surveys and interviews', isCorrect: false },
              { id: 'b', text: 'Data analytics, user research, and competitive analysis', isCorrect: true },
              { id: 'c', text: 'Social media monitoring only', isCorrect: false },
              { id: 'd', text: 'Guesswork and intuition', isCorrect: false },
            ],
            correctAnswer: 'b',
            points: 15,
          },
        ],
      },
      {
        id: generateId(),
        title: 'General Assessment',
        description: 'General questions about work style and motivation.',
        questions: [
          sampleQuestions.general[0],
          sampleQuestions.general[1],
        ],
      },
    ],
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
  },

  {
    id: 3,
    title: 'UX Designer Portfolio Review',
    description: 'Design assessment including portfolio review and design thinking evaluation.',
    jobId: 3, // UX Designer
    status: ASSESSMENT_STATUS.PUBLISHED,
    timeLimit: 90,
    passingScore: 80,
    sections: [
      {
        id: generateId(),
        title: 'Design Principles',
        description: 'Test knowledge of fundamental design principles.',
        questions: [
          sampleQuestions.design[0],
          sampleQuestions.design[2],
        ],
      },
      {
        id: generateId(),
        title: 'Portfolio Submission',
        description: 'Upload your design portfolio for review.',
        questions: [
          sampleQuestions.design[1],
        ],
      },
      {
        id: generateId(),
        title: 'Motivation & Fit',
        description: 'Questions about your interest in the role.',
        questions: [
          sampleQuestions.general[0],
        ],
      },
    ],
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
  },

  {
    id: 4,
    title: 'Marketing Manager Assessment',
    description: 'Evaluation for marketing management position including strategy and campaign planning.',
    jobId: 4, // Marketing Manager
    status: ASSESSMENT_STATUS.DRAFT,
    timeLimit: 50,
    passingScore: 70,
    sections: [
      {
        id: generateId(),
        title: 'Marketing Strategy',
        description: 'Questions about marketing strategy and planning.',
        questions: [
          {
            id: generateId(),
            title: 'How do you measure the success of a marketing campaign?',
            type: ASSESSMENT_QUESTION_TYPES.MCQ,
            required: true,
            options: [
              { id: 'a', text: 'Only by revenue generated', isCorrect: false },
              { id: 'b', text: 'Multiple KPIs including reach, engagement, conversion, and ROI', isCorrect: true },
              { id: 'c', text: 'Number of social media likes only', isCorrect: false },
              { id: 'd', text: 'Brand awareness surveys only', isCorrect: false },
            ],
            correctAnswer: 'b',
            points: 15,
          },
          {
            id: generateId(),
            title: 'Describe a successful marketing campaign you have managed.',
            type: ASSESSMENT_QUESTION_TYPES.TEXT,
            required: true,
            maxLength: 500,
            points: 20,
          },
        ],
      },
      {
        id: generateId(),
        title: 'Digital Marketing',
        description: 'Questions about digital marketing channels and tools.',
        questions: [
          {
            id: generateId(),
            title: 'Rate your experience with Google Analytics (1-10)',
            type: ASSESSMENT_QUESTION_TYPES.NUMERIC,
            required: true,
            min: 1,
            max: 10,
            points: 8,
          },
        ],
      },
      {
        id: generateId(),
        title: 'General Questions',
        description: 'General assessment questions.',
        questions: [
          sampleQuestions.general[1],
        ],
      },
    ],
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },

  {
    id: 5,
    title: 'Data Analyst Skills Test',
    description: 'Technical assessment for data analyst position covering statistics, SQL, and data visualization.',
    jobId: 5, // Data Analyst
    status: ASSESSMENT_STATUS.PUBLISHED,
    timeLimit: 75,
    passingScore: 75,
    sections: [
      {
        id: generateId(),
        title: 'SQL & Database',
        description: 'Test your SQL and database knowledge.',
        questions: [
          {
            id: generateId(),
            title: 'What is the difference between INNER JOIN and LEFT JOIN?',
            type: ASSESSMENT_QUESTION_TYPES.TEXT,
            required: true,
            maxLength: 300,
            points: 15,
          },
          {
            id: generateId(),
            title: 'Which SQL function would you use to remove duplicates?',
            type: ASSESSMENT_QUESTION_TYPES.MCQ,
            required: true,
            options: [
              { id: 'a', text: 'UNIQUE', isCorrect: false },
              { id: 'b', text: 'DISTINCT', isCorrect: true },
              { id: 'c', text: 'REMOVE', isCorrect: false },
              { id: 'd', text: 'DELETE_DUPLICATES', isCorrect: false },
            ],
            correctAnswer: 'b',
            points: 10,
          },
        ],
      },
      {
        id: generateId(),
        title: 'Statistics & Analysis',
        description: 'Statistical concepts and data analysis questions.',
        questions: [
          {
            id: generateId(),
            title: 'How many years of experience do you have with statistical analysis?',
            type: ASSESSMENT_QUESTION_TYPES.NUMERIC,
            required: true,
            min: 0,
            max: 20,
            points: 5,
          },
          {
            id: generateId(),
            title: 'Have you worked with machine learning models?',
            type: ASSESSMENT_QUESTION_TYPES.BOOLEAN,
            required: true,
            points: 8,
          },
        ],
      },
    ],
    createdAt: '2024-01-19T11:20:00Z',
    updatedAt: '2024-01-19T11:20:00Z',
  },
];

/**
 * Sample assessment responses (for demo purposes)
 */
export const seedAssessmentResponses = [
  {
    id: 1,
    candidateId: 1,
    assessmentId: 1,
    answers: {
      [sampleQuestions.technical[0].id]: 'b',
      [sampleQuestions.technical[1].id]: 'Closures allow inner functions to access outer function variables even after the outer function returns. Example: function outer() { let x = 1; return function inner() { console.log(x); }; }',
      [sampleQuestions.technical[2].id]: 3,
      [sampleQuestions.general[0].id]: 'I am excited about your company\'s innovative approach to web development and the opportunity to work with cutting-edge technologies.',
    },
    score: 85,
    submittedAt: '2024-01-20T10:30:00Z',
  },
  {
    id: 2,
    candidateId: 2,
    assessmentId: 1,
    answers: {
      [sampleQuestions.technical[0].id]: 'a',
      [sampleQuestions.technical[1].id]: 'Closures are when functions remember variables from outside their scope.',
      [sampleQuestions.technical[2].id]: 1,
      [sampleQuestions.general[0].id]: 'Your company has a great reputation and good benefits.',
    },
    score: 65,
    submittedAt: '2024-01-21T14:15:00Z',
  },
];

export default {
  seedAssessments,
  seedAssessmentResponses,
  sampleQuestions,
};