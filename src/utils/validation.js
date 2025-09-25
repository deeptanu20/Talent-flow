import { isValidEmail, isValidPhone, isEmpty } from './helpers.js';
import { ERROR_MESSAGES, FILE_UPLOAD } from './constants.js';

/**
 * Validation rule types
 */
export const VALIDATION_RULES = {
  REQUIRED: 'required',
  EMAIL: 'email',
  PHONE: 'phone',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  MIN: 'min',
  MAX: 'max',
  PATTERN: 'pattern',
  CUSTOM: 'custom',
  FILE_SIZE: 'fileSize',
  FILE_TYPE: 'fileType',
  UNIQUE: 'unique',
};

/**
 * Create validation rule
 * @param {string} type - Rule type
 * @param {any} value - Rule value
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const createRule = (type, value, message) => ({
  type,
  value,
  message,
});

/**
 * Required field validation rule
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const required = (message = ERROR_MESSAGES.REQUIRED_FIELD) =>
  createRule(VALIDATION_RULES.REQUIRED, true, message);

/**
 * Email validation rule
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const email = (message = ERROR_MESSAGES.INVALID_EMAIL) =>
  createRule(VALIDATION_RULES.EMAIL, true, message);

/**
 * Phone validation rule
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const phone = (message = ERROR_MESSAGES.INVALID_PHONE) =>
  createRule(VALIDATION_RULES.PHONE, true, message);

/**
 * Minimum length validation rule
 * @param {number} length - Minimum length
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const minLength = (length, message) =>
  createRule(
    VALIDATION_RULES.MIN_LENGTH,
    length,
    message || `Must be at least ${length} characters long.`
  );

/**
 * Maximum length validation rule
 * @param {number} length - Maximum length
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const maxLength = (length, message) =>
  createRule(
    VALIDATION_RULES.MAX_LENGTH,
    length,
    message || `Must be no more than ${length} characters long.`
  );

/**
 * Minimum value validation rule
 * @param {number} value - Minimum value
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const min = (value, message) =>
  createRule(
    VALIDATION_RULES.MIN,
    value,
    message || `Must be at least ${value}.`
  );

/**
 * Maximum value validation rule
 * @param {number} value - Maximum value
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const max = (value, message) =>
  createRule(
    VALIDATION_RULES.MAX,
    value,
    message || `Must be no more than ${value}.`
  );

/**
 * Pattern validation rule
 * @param {RegExp} pattern - Regular expression pattern
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const pattern = (pattern, message = 'Invalid format.') =>
  createRule(VALIDATION_RULES.PATTERN, pattern, message);

/**
 * Custom validation rule
 * @param {Function} validator - Custom validation function
 * @param {string} message - Error message
 * @returns {Object} Validation rule
 */
export const custom = (validator, message = 'Invalid value.') =>
  createRule(VALIDATION_RULES.CUSTOM, validator, message);

/**
 * File size validation rule
 * @param {number} maxSize - Maximum file size in bytes
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const fileSize = (maxSize = FILE_UPLOAD.MAX_SIZE, message) =>
  createRule(
    VALIDATION_RULES.FILE_SIZE,
    maxSize,
    message || ERROR_MESSAGES.FILE_TOO_LARGE
  );

/**
 * File type validation rule
 * @param {string[]} allowedTypes - Allowed MIME types
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const fileType = (allowedTypes = FILE_UPLOAD.ALLOWED_TYPES, message) =>
  createRule(
    VALIDATION_RULES.FILE_TYPE,
    allowedTypes,
    message || ERROR_MESSAGES.INVALID_FILE_TYPE
  );

/**
 * Unique validation rule (for checking uniqueness against existing data)
 * @param {Function} checkFunction - Function to check uniqueness
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule
 */
export const unique = (checkFunction, message = 'This value already exists.') =>
  createRule(VALIDATION_RULES.UNIQUE, checkFunction, message);

/**
 * Validate a single field value against rules
 * @param {any} value - Value to validate
 * @param {Array} rules - Array of validation rules
 * @param {Object} context - Additional context for validation
 * @returns {Object} Validation result { isValid, error }
 */
export const validateField = async (value, rules = [], context = {}) => {
  if (!rules || rules.length === 0) {
    return { isValid: true, error: null };
  }

  for (const rule of rules) {
    const result = await validateRule(value, rule, context);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true, error: null };
};

/**
 * Validate a single rule
 * @param {any} value - Value to validate
 * @param {Object} rule - Validation rule
 * @param {Object} context - Additional context
 * @returns {Object} Validation result { isValid, error }
 */
const validateRule = async (value, rule, context) => {
  const { type, value: ruleValue, message } = rule;

  switch (type) {
    case VALIDATION_RULES.REQUIRED:
      if (isEmpty(value)) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.EMAIL:
      if (value && !isValidEmail(value)) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.PHONE:
      if (value && !isValidPhone(value)) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.MIN_LENGTH:
      if (value && value.length < ruleValue) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.MAX_LENGTH:
      if (value && value.length > ruleValue) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.MIN:
      if (value != null && Number(value) < ruleValue) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.MAX:
      if (value != null && Number(value) > ruleValue) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.PATTERN:
      if (value && !ruleValue.test(value)) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.CUSTOM:
      try {
        const isValid = await ruleValue(value, context);
        if (!isValid) {
          return { isValid: false, error: message };
        }
      } catch (error) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.FILE_SIZE:
      if (value && value.size > ruleValue) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.FILE_TYPE:
      if (value && !ruleValue.includes(value.type)) {
        return { isValid: false, error: message };
      }
      break;

    case VALIDATION_RULES.UNIQUE:
      try {
        const isUnique = await ruleValue(value, context);
        if (!isUnique) {
          return { isValid: false, error: message };
        }
      } catch (error) {
        return { isValid: false, error: message };
      }
      break;

    default:
      console.warn(`Unknown validation rule type: ${type}`);
      break;
  }

  return { isValid: true, error: null };
};

/**
 * Validate multiple fields
 * @param {Object} data - Data to validate
 * @param {Object} schema - Validation schema
 * @param {Object} context - Additional context
 * @returns {Object} Validation result { isValid, errors }
 */
export const validateForm = async (data, schema, context = {}) => {
  const errors = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(schema)) {
    const fieldValue = data[fieldName];
    const result = await validateField(fieldValue, rules, { ...context, data });

    if (!result.isValid) {
      errors[fieldName] = result.error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

/**
 * Job validation schema
 */
export const jobValidationSchema = {
  title: [
    required('Job title is required.'),
    minLength(3, 'Job title must be at least 3 characters long.'),
    maxLength(100, 'Job title must be no more than 100 characters long.'),
  ],
  slug: [
    required('Job slug is required.'),
    pattern(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
    minLength(3, 'Slug must be at least 3 characters long.'),
    maxLength(50, 'Slug must be no more than 50 characters long.'),
  ],
  description: [
    required('Job description is required.'),
    minLength(50, 'Job description must be at least 50 characters long.'),
    maxLength(5000, 'Job description must be no more than 5000 characters long.'),
  ],
  department: [
    required('Department is required.'),
  ],
  type: [
    required('Job type is required.'),
  ],
  location: [
    required('Location is required.'),
  ],
  salary: [
    custom((value) => {
      if (value && (isNaN(value) || Number(value) < 0)) {
        return false;
      }
      return true;
    }, 'Salary must be a valid positive number.'),
  ],
};

/**
 * Candidate validation schema
 */
export const candidateValidationSchema = {
  name: [
    required('Name is required.'),
    minLength(2, 'Name must be at least 2 characters long.'),
    maxLength(100, 'Name must be no more than 100 characters long.'),
  ],
  email: [
    required('Email is required.'),
    email(),
  ],
  phone: [
    phone(),
  ],
  experience: [
    min(0, 'Experience cannot be negative.'),
    max(50, 'Experience cannot be more than 50 years.'),
  ],
  resume: [
    fileType(),
    fileSize(),
  ],
};

/**
 * Assessment validation schema
 */
export const assessmentValidationSchema = {
  title: [
    required('Assessment title is required.'),
    minLength(3, 'Title must be at least 3 characters long.'),
    maxLength(100, 'Title must be no more than 100 characters long.'),
  ],
  description: [
    maxLength(1000, 'Description must be no more than 1000 characters long.'),
  ],
  timeLimit: [
    min(1, 'Time limit must be at least 1 minute.'),
    max(480, 'Time limit cannot be more than 8 hours.'),
  ],
};

/**
 * Question validation schema
 */
export const questionValidationSchema = {
  title: [
    required('Question title is required.'),
    minLength(5, 'Question must be at least 5 characters long.'),
    maxLength(500, 'Question must be no more than 500 characters long.'),
  ],
  type: [
    required('Question type is required.'),
  ],
  options: [
    custom((options, context) => {
      const { data } = context;
      if (data.type === 'mcq' && (!options || options.length < 2)) {
        return false;
      }
      return true;
    }, 'Multiple choice questions must have at least 2 options.'),
  ],
  correctAnswer: [
    custom((answer, context) => {
      const { data } = context;
      if (data.type === 'mcq' && !answer) {
        return false;
      }
      return true;
    }, 'Please select the correct answer for multiple choice questions.'),
  ],
};

/**
 * Note validation schema
 */
export const noteValidationSchema = {
  content: [
    required('Note content is required.'),
    minLength(1, 'Note cannot be empty.'),
    maxLength(2000, 'Note must be no more than 2000 characters long.'),
  ],
};

/**
 * Create conditional validation rule
 * @param {Function} condition - Condition function
 * @param {Array} rules - Rules to apply if condition is true
 * @returns {Object} Conditional validation rule
 */
export const when = (condition, rules) => ({
  type: 'conditional',
  condition,
  rules,
});

/**
 * Validate conditional rules
 * @param {any} value - Value to validate
 * @param {Object} conditionalRule - Conditional rule
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export const validateConditional = async (value, conditionalRule, context) => {
  const { condition, rules } = conditionalRule;
  
  if (await condition(value, context)) {
    return await validateField(value, rules, context);
  }
  
  return { isValid: true, error: null };
};

export default {
  validateField,
  validateForm,
  jobValidationSchema,
  candidateValidationSchema,
  assessmentValidationSchema,
  questionValidationSchema,
  noteValidationSchema,
  required,
  email,
  phone,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  custom,
  fileSize,
  fileType,
  unique,
  when,
};