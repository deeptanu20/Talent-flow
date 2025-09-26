import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants.js';

/**
 * API Response wrapper
 */
class APIResponse {
  constructor(data, status, message = null) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.success = status >= 200 && status < 300;
  }
}

/**
 * API Error class
 */
class APIError extends Error {
  constructor(message, status, response = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
  }
}

/**
 * API Service Class
 */
class APIService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<APIResponse>} API response
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    // Add request body for non-GET requests
    if (options.body && config.method !== 'GET') {
      config.body = typeof options.body === 'string' 
        ? options.body 
        : JSON.stringify(options.body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data = null;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new APIError(
          data.message || this.getErrorMessage(response.status),
          response.status,
          data
        );
      }

      return new APIResponse(data, response.status);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      
      if (error instanceof APIError) {
        throw error;
      }

      // Network or other errors
      throw new APIError(
        error.message || ERROR_MESSAGES.NETWORK_ERROR,
        0
      );
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} options - Additional options
   * @returns {Promise<APIResponse>} API response
   */
  async get(endpoint, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Additional options
   * @returns {Promise<APIResponse>} API response
   */
  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Additional options
   * @returns {Promise<APIResponse>} API response
   */
  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Additional options
   * @returns {Promise<APIResponse>} API response
   */
  async patch(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: data,
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional options
   * @returns {Promise<APIResponse>} API response
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Upload file
   * @param {string} endpoint - API endpoint
   * @param {File} file - File to upload
   * @param {Object} additionalData - Additional form data
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<APIResponse>} API response
   */
  async uploadFile(endpoint, file, additionalData = {}, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional data to form
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Let browser set content-type for multipart

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });
  }

  /**
   * Get error message for status code
   * @param {number} status - HTTP status code
   * @returns {string} Error message
   */
  getErrorMessage(status) {
    switch (status) {
      case 400:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 408:
        return 'Request timeout. Please try again.';
      case 429:
        return 'Too many requests. Please wait and try again.';
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      case 502:
        return 'Bad gateway. Server is temporarily unavailable.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return status >= 500 
          ? ERROR_MESSAGES.SERVER_ERROR 
          : ERROR_MESSAGES.NETWORK_ERROR;
    }
  }
}

/**
 * Jobs API
 */
export const jobsAPI = {
  getAll: (filters = {}) => api.get('/jobs', filters),
  getById: (id) => api.get(`/jobs/${id}`),
  getBySlug: (slug) => api.get(`/jobs/slug/${slug}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  archive: (id) => api.patch(`/jobs/${id}/archive`),
  unarchive: (id) => api.patch(`/jobs/${id}/unarchive`),
  delete: (id) => api.delete(`/jobs/${id}`),
  reorder: (ids) => api.post('/jobs/reorder', { ids }),
};

/**
 * Candidates API
 */
export const candidatesAPI = {
  getAll: (filters = {}) => api.get('/candidates', filters),
  getById: (id) => api.get(`/candidates/${id}`),
  create: (data) => api.post('/candidates', data),
  update: (id, data) => api.put(`/candidates/${id}`, data),
  updateStage: (id, stage) => api.patch(`/candidates/${id}/stage`, { stage }),
  delete: (id) => api.delete(`/candidates/${id}`),
  export: (filters = {}) => api.get('/candidates/export', filters),
};

/**
 * Assessments API
 */
export const assessmentsAPI = {
  getAll: (filters = {}) => api.get('/assessments', filters),
  getById: (id) => api.get(`/assessments/${id}`),
  create: (data) => api.post('/assessments', data),
  update: (id, data) => api.put(`/assessments/${id}`, data),
  delete: (id) => api.delete(`/assessments/${id}`),
  publish: (id) => api.patch(`/assessments/${id}/publish`),
  unpublish: (id) => api.patch(`/assessments/${id}/unpublish`),
  getResponses: (id) => api.get(`/assessments/${id}/responses`),
  submitResponse: (id, data) => api.post(`/assessments/${id}/responses`, data),
};

/**
 * Notes API
 */
export const notesAPI = {
  getByCandidateId: (candidateId) => api.get(`/candidates/${candidateId}/notes`),
  create: (candidateId, data) => api.post(`/candidates/${candidateId}/notes`, data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

/**
 * Analytics API
 */
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getJobsStats: () => api.get('/analytics/jobs'),
  getCandidatesStats: () => api.get('/analytics/candidates'),
  getHiringFunnel: () => api.get('/analytics/hiring-funnel'),
  getTimeToHire: () => api.get('/analytics/time-to-hire'),
};

/**
 * File Upload API
 */
export const filesAPI = {
  upload: (file, type = 'general') => 
    api.uploadFile('/files/upload', file, { type }),
  delete: (fileId) => api.delete(`/files/${fileId}`),
  getDownloadUrl: (fileId) => api.get(`/files/${fileId}/download-url`),
};

/**
 * Search API
 */
export const searchAPI = {
  global: (query) => api.get('/search', { q: query }),
  jobs: (query, filters = {}) => api.get('/search/jobs', { q: query, ...filters }),
  candidates: (query, filters = {}) => api.get('/search/candidates', { q: query, ...filters }),
};

// Create singleton instance
const api = new APIService();

export default api;
export { APIService, APIError, APIResponse };