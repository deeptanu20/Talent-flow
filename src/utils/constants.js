// Application Constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000,
  DELAY_MIN: parseInt(import.meta.env.VITE_API_DELAY_MIN) || 200,
  DELAY_MAX: parseInt(import.meta.env.VITE_API_DELAY_MAX) || 1200,
  ERROR_RATE: parseFloat(import.meta.env.VITE_API_ERROR_RATE) || 0.1,
};

// App Metadata
export const APP_INFO = {
  NAME: import.meta.env.VITE_APP_NAME || 'TalentFlow',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: 'Mini Hiring Platform for Modern Recruitment',
};

// Job-related Constants
export const JOB_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  CLOSED: 'closed',
};

export const JOB_STATUS_LABELS = {
  [JOB_STATUS.ACTIVE]: 'Active',
  [JOB_STATUS.DRAFT]: 'Draft',
  [JOB_STATUS.ARCHIVED]: 'Archived',
  [JOB_STATUS.CLOSED]: 'Closed',
};

export const JOB_STATUS_COLORS = {
  [JOB_STATUS.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  [JOB_STATUS.DRAFT]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  [JOB_STATUS.ARCHIVED]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  [JOB_STATUS.CLOSED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
];

export const JOB_LOCATIONS = [
  'Remote',
  'On-site',
  'Hybrid',
];

export const JOB_DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

// Candidate-related Constants
export const CANDIDATE_STAGES = {
  APPLIED: 'applied',
  SCREEN: 'screen',
  TECHNICAL: 'technical',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

export const CANDIDATE_STAGE_LABELS = {
  [CANDIDATE_STAGES.APPLIED]: 'Applied',
  [CANDIDATE_STAGES.SCREEN]: 'Screening',
  [CANDIDATE_STAGES.TECHNICAL]: 'Technical',
  [CANDIDATE_STAGES.INTERVIEW]: 'Interview',
  [CANDIDATE_STAGES.OFFER]: 'Offer',
  [CANDIDATE_STAGES.HIRED]: 'Hired',
  [CANDIDATE_STAGES.REJECTED]: 'Rejected',
};

export const CANDIDATE_STAGE_COLORS = {
  [CANDIDATE_STAGES.APPLIED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  [CANDIDATE_STAGES.SCREEN]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  [CANDIDATE_STAGES.TECHNICAL]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  [CANDIDATE_STAGES.INTERVIEW]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
  [CANDIDATE_STAGES.OFFER]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  [CANDIDATE_STAGES.HIRED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  [CANDIDATE_STAGES.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
};

export const CANDIDATE_EXPERIENCE_LEVELS = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Lead',
  'Principal',
  'Director',
];

export const CANDIDATE_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
  'Node.js', 'Python', 'Java', 'C++', 'Go',
  'HTML/CSS', 'Sass', 'Tailwind CSS', 'Bootstrap',
  'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'GraphQL', 'REST API', 'Microservices',
  'Agile', 'Scrum', 'Project Management',
];

// Assessment-related Constants
export const ASSESSMENT_QUESTION_TYPES = {
  MCQ: 'mcq',
  TEXT: 'text',
  NUMERIC: 'numeric',
  FILE: 'file',
  BOOLEAN: 'boolean',
};

export const ASSESSMENT_QUESTION_TYPE_LABELS = {
  [ASSESSMENT_QUESTION_TYPES.MCQ]: 'Multiple Choice',
  [ASSESSMENT_QUESTION_TYPES.TEXT]: 'Text Answer',
  [ASSESSMENT_QUESTION_TYPES.NUMERIC]: 'Numeric Answer',
  [ASSESSMENT_QUESTION_TYPES.FILE]: 'File Upload',
  [ASSESSMENT_QUESTION_TYPES.BOOLEAN]: 'Yes/No',
};

export const ASSESSMENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
};

// Virtual List Constants
export const VIRTUAL_LIST = {
  ITEM_HEIGHT: 80,
  BUFFER_SIZE: 5,
  OVERSCAN: 3,
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  THEME: 'talentflow_theme',
  USER_PREFERENCES: 'talentflow_preferences',
  JOBS_FILTERS: 'talentflow_jobs_filters',
  CANDIDATES_FILTERS: 'talentflow_candidates_filters',
  SIDEBAR_COLLAPSED: 'talentflow_sidebar_collapsed',
  KANBAN_COLUMN_ORDER: 'talentflow_kanban_order',
};

// Theme Constants
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAIL: '/jobs/:jobId',
  CANDIDATES: '/candidates',
  CANDIDATE_PROFILE: '/candidates/:id',
  ASSESSMENTS: '/assessments',
  ANALYTICS: '/analytics',
  NOT_FOUND: '/404',
};

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
};

// Animation Constants
export const ANIMATIONS = {
  DURATION_FAST: 150,
  DURATION_NORMAL: 300,
  DURATION_SLOW: 500,
  EASING_DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  FILE_TOO_LARGE: `File size must be less than ${FILE_UPLOAD.MAX_SIZE / (1024 * 1024)}MB.`,
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a valid file.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  DUPLICATE_SLUG: 'This slug already exists. Please choose a different one.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  JOB_CREATED: 'Job created successfully!',
  JOB_UPDATED: 'Job updated successfully!',
  JOB_ARCHIVED: 'Job archived successfully!',
  JOB_UNARCHIVED: 'Job unarchived successfully!',
  JOB_DELETED: 'Job deleted successfully!',
  CANDIDATE_UPDATED: 'Candidate updated successfully!',
  CANDIDATE_STAGE_CHANGED: 'Candidate stage updated successfully!',
  NOTE_ADDED: 'Note added successfully!',
  ASSESSMENT_CREATED: 'Assessment created successfully!',
  ASSESSMENT_UPDATED: 'Assessment updated successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
  PREFERENCES_SAVED: 'Preferences saved successfully!',
};

// Default Values
export const DEFAULTS = {
  AVATAR_URL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  COMPANY_LOGO: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
  PAGE_TITLE: 'TalentFlow - Hiring Made Simple',
};

// Mention Suggestions (for notes)
export const MENTION_SUGGESTIONS = [
  { id: 'hr', name: 'HR Team', email: 'hr@talentflow.com' },
  { id: 'tech', name: 'Tech Team', email: 'tech@talentflow.com' },
  { id: 'hiring-manager', name: 'Hiring Manager', email: 'hiring@talentflow.com' },
  { id: 'recruiter', name: 'Recruiter', email: 'recruiter@talentflow.com' },
];

// Chart Colors (for analytics)
export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
];

export default {
  API_CONFIG,
  APP_INFO,
  JOB_STATUS,
  CANDIDATE_STAGES,
  ROUTES,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};