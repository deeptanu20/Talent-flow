import Dexie from 'dexie';
import { STORAGE_KEYS } from '../utils/constants.js';

/**
 * IndexedDB Database using Dexie
 */
class TalentFlowDB extends Dexie {
  constructor() {
    super('TalentFlowDB');
    
    this.version(1).stores({
      jobs: '++id, title, slug, status, department, createdAt, updatedAt',
      candidates: '++id, name, email, stage, jobId, createdAt, updatedAt',
      assessments: '++id, title, jobId, status, createdAt, updatedAt',
      notes: '++id, candidateId, authorId, content, createdAt',
      responses: '++id, candidateId, assessmentId, answers, submittedAt',
      settings: 'key, value, updatedAt',
    });

    // Define table references
    this.jobs = this.table('jobs');
    this.candidates = this.table('candidates');
    this.assessments = this.table('assessments');
    this.notes = this.table('notes');
    this.responses = this.table('responses');
    this.settings = this.table('settings');
  }
}

// Create database instance
const db = new TalentFlowDB();

/**
 * Storage Service Class
 */
class StorageService {
  constructor() {
    this.db = db;
    this.isSupported = this.checkIndexedDBSupport();
  }

  /**
   * Check if IndexedDB is supported
   * @returns {boolean} Support status
   */
  checkIndexedDBSupport() {
    try {
      return 'indexedDB' in window && indexedDB !== null;
    } catch (e) {
      return false;
    }
  }

  /**
   * Initialize storage and seed initial data if needed
   */
  async initialize() {
    try {
      if (!this.isSupported) {
        console.warn('IndexedDB not supported, using fallback storage');
        return;
      }

      await this.db.open();
      
      // Check if this is the first time opening the database
      const jobCount = await this.db.jobs.count();
      if (jobCount === 0) {
        await this.seedInitialData();
      }

      console.log('Storage initialized successfully');
    } catch (error) {
      console.error('Failed to initialize storage:', error);
    }
  }

  /**
   * Seed initial data for demo purposes
   */
  async seedInitialData() {
    try {
      // This will be populated with seed data from separate files
      const { seedJobs } = await import('../data/seedJobs.js');
      const { seedCandidates } = await import('../data/seedCandidates.js');
      
      // Add jobs
      await this.db.jobs.bulkAdd(seedJobs);
      
      // Add candidates
      await this.db.candidates.bulkAdd(seedCandidates);
      
      console.log('Initial data seeded successfully');
    } catch (error) {
      console.error('Failed to seed initial data:', error);
    }
  }

  // ===================
  // JOBS STORAGE
  // ===================

  /**
   * Get all jobs with optional filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Jobs array
   */
  async getJobs(filters = {}) {
    try {
      let collection = this.db.jobs.orderBy('createdAt').reverse();

      if (filters.status) {
        collection = collection.filter(job => job.status === filters.status);
      }

      if (filters.department) {
        collection = collection.filter(job => job.department === filters.department);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        collection = collection.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
      }

      return await collection.toArray();
    } catch (error) {
      console.error('Failed to get jobs:', error);
      return [];
    }
  }

  /**
   * Get job by ID
   * @param {number} id - Job ID
   * @returns {Promise<Object|null>} Job object
   */
  async getJob(id) {
    try {
      return await this.db.jobs.get(id);
    } catch (error) {
      console.error('Failed to get job:', error);
      return null;
    }
  }

  /**
   * Get job by slug
   * @param {string} slug - Job slug
   * @returns {Promise<Object|null>} Job object
   */
  async getJobBySlug(slug) {
    try {
      return await this.db.jobs.where('slug').equals(slug).first();
    } catch (error) {
      console.error('Failed to get job by slug:', error);
      return null;
    }
  }

  /**
   * Create new job
   * @param {Object} jobData - Job data
   * @returns {Promise<number>} Created job ID
   */
  async createJob(jobData) {
    try {
      const now = new Date();
      const jobWithTimestamp = {
        ...jobData,
        createdAt: now,
        updatedAt: now,
        status: jobData.status || 'draft'
      };
      
      return await this.db.jobs.add(jobWithTimestamp);
    } catch (error) {
      console.error('Failed to create job:', error);
      throw error;
    }
  }

  /**
   * Update existing job
   * @param {number} id - Job ID
   * @param {Object} updates - Job updates
   * @returns {Promise<number>} Number of updated records
   */
  async updateJob(id, updates) {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      return await this.db.jobs.update(id, updateData);
    } catch (error) {
      console.error('Failed to update job:', error);
      throw error;
    }
  }

  /**
   * Delete job
   * @param {number} id - Job ID
   * @returns {Promise<void>}
   */
  async deleteJob(id) {
    try {
      await this.db.transaction('rw', this.db.jobs, this.db.candidates, this.db.assessments, async () => {
        // Delete associated candidates
        await this.db.candidates.where('jobId').equals(id).delete();
        
        // Delete associated assessments
        await this.db.assessments.where('jobId').equals(id).delete();
        
        // Delete the job
        await this.db.jobs.delete(id);
      });
    } catch (error) {
      console.error('Failed to delete job:', error);
      throw error;
    }
  }

  // ===================
  // CANDIDATES STORAGE
  // ===================

  /**
   * Get all candidates with optional filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Candidates array
   */
  async getCandidates(filters = {}) {
    try {
      let collection = this.db.candidates.orderBy('createdAt').reverse();

      if (filters.jobId) {
        collection = collection.filter(candidate => candidate.jobId === filters.jobId);
      }

      if (filters.stage) {
        collection = collection.filter(candidate => candidate.stage === filters.stage);
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        collection = collection.filter(candidate => 
          candidate.name.toLowerCase().includes(searchTerm) ||
          candidate.email.toLowerCase().includes(searchTerm)
        );
      }

      return await collection.toArray();
    } catch (error) {
      console.error('Failed to get candidates:', error);
      return [];
    }
  }

  /**
   * Get candidate by ID
   * @param {number} id - Candidate ID
   * @returns {Promise<Object|null>} Candidate object
   */
  async getCandidate(id) {
    try {
      return await this.db.candidates.get(id);
    } catch (error) {
      console.error('Failed to get candidate:', error);
      return null;
    }
  }

  /**
   * Create new candidate
   * @param {Object} candidateData - Candidate data
   * @returns {Promise<number>} Created candidate ID
   */
  async createCandidate(candidateData) {
    try {
      const now = new Date();
      const candidateWithTimestamp = {
        ...candidateData,
        createdAt: now,
        updatedAt: now,
        stage: candidateData.stage || 'applied'
      };
      
      return await this.db.candidates.add(candidateWithTimestamp);
    } catch (error) {
      console.error('Failed to create candidate:', error);
      throw error;
    }
  }

  /**
   * Update existing candidate
   * @param {number} id - Candidate ID
   * @param {Object} updates - Candidate updates
   * @returns {Promise<number>} Number of updated records
   */
  async updateCandidate(id, updates) {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      return await this.db.candidates.update(id, updateData);
    } catch (error) {
      console.error('Failed to update candidate:', error);
      throw error;
    }
  }

  /**
   * Delete candidate
   * @param {number} id - Candidate ID
   * @returns {Promise<void>}
   */
  async deleteCandidate(id) {
    try {
      await this.db.transaction('rw', this.db.candidates, this.db.notes, this.db.responses, async () => {
        // Delete associated notes
        await this.db.notes.where('candidateId').equals(id).delete();
        
        // Delete associated responses
        await this.db.responses.where('candidateId').equals(id).delete();
        
        // Delete the candidate
        await this.db.candidates.delete(id);
      });
    } catch (error) {
      console.error('Failed to delete candidate:', error);
      throw error;
    }
  }

  /**
   * Move candidate to different stage
   * @param {number} id - Candidate ID
   * @param {string} newStage - New stage
   * @returns {Promise<number>} Number of updated records
   */
  async moveCandidateStage(id, newStage) {
    try {
      return await this.updateCandidate(id, { stage: newStage });
    } catch (error) {
      console.error('Failed to move candidate stage:', error);
      throw error;
    }
  }

  // ===================
  // ASSESSMENTS STORAGE
  // ===================

  /**
   * Get all assessments with optional filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Assessments array
   */
  async getAssessments(filters = {}) {
    try {
      let collection = this.db.assessments.orderBy('createdAt').reverse();

      if (filters.jobId) {
        collection = collection.filter(assessment => assessment.jobId === filters.jobId);
      }

      if (filters.status) {
        collection = collection.filter(assessment => assessment.status === filters.status);
      }

      return await collection.toArray();
    } catch (error) {
      console.error('Failed to get assessments:', error);
      return [];
    }
  }

  /**
   * Get assessment by ID
   * @param {number} id - Assessment ID
   * @returns {Promise<Object|null>} Assessment object
   */
  async getAssessment(id) {
    try {
      return await this.db.assessments.get(id);
    } catch (error) {
      console.error('Failed to get assessment:', error);
      return null;
    }
  }

  /**
   * Create new assessment
   * @param {Object} assessmentData - Assessment data
   * @returns {Promise<number>} Created assessment ID
   */
  async createAssessment(assessmentData) {
    try {
      const now = new Date();
      const assessmentWithTimestamp = {
        ...assessmentData,
        createdAt: now,
        updatedAt: now,
        status: assessmentData.status || 'draft'
      };
      
      return await this.db.assessments.add(assessmentWithTimestamp);
    } catch (error) {
      console.error('Failed to create assessment:', error);
      throw error;
    }
  }

  /**
   * Update existing assessment
   * @param {number} id - Assessment ID
   * @param {Object} updates - Assessment updates
   * @returns {Promise<number>} Number of updated records
   */
  async updateAssessment(id, updates) {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      return await this.db.assessments.update(id, updateData);
    } catch (error) {
      console.error('Failed to update assessment:', error);
      throw error;
    }
  }

  /**
   * Delete assessment
   * @param {number} id - Assessment ID
   * @returns {Promise<void>}
   */
  async deleteAssessment(id) {
    try {
      await this.db.transaction('rw', this.db.assessments, this.db.responses, async () => {
        // Delete associated responses
        await this.db.responses.where('assessmentId').equals(id).delete();
        
        // Delete the assessment
        await this.db.assessments.delete(id);
      });
    } catch (error) {
      console.error('Failed to delete assessment:', error);
      throw error;
    }
  }

  // ===================
  // NOTES STORAGE
  // ===================

  /**
   * Get notes for candidate
   * @param {number} candidateId - Candidate ID
   * @returns {Promise<Array>} Notes array
   */
  async getCandidateNotes(candidateId) {
    try {
      return await this.db.notes
        .where('candidateId')
        .equals(candidateId)
        .orderBy('createdAt')
        .reverse()
        .toArray();
    } catch (error) {
      console.error('Failed to get candidate notes:', error);
      return [];
    }
  }

  /**
   * Add note to candidate
   * @param {Object} noteData - Note data
   * @returns {Promise<number>} Created note ID
   */
  async addCandidateNote(noteData) {
    try {
      const noteWithTimestamp = {
        ...noteData,
        createdAt: new Date()
      };
      
      return await this.db.notes.add(noteWithTimestamp);
    } catch (error) {
      console.error('Failed to add candidate note:', error);
      throw error;
    }
  }

  /**
   * Delete note
   * @param {number} id - Note ID
   * @returns {Promise<void>}
   */
  async deleteNote(id) {
    try {
      await this.db.notes.delete(id);
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  }

  // ===================
  // RESPONSES STORAGE
  // ===================

  /**
   * Get assessment responses
   * @param {number} assessmentId - Assessment ID
   * @returns {Promise<Array>} Responses array
   */
  async getAssessmentResponses(assessmentId) {
    try {
      return await this.db.responses
        .where('assessmentId')
        .equals(assessmentId)
        .toArray();
    } catch (error) {
      console.error('Failed to get assessment responses:', error);
      return [];
    }
  }

  /**
   * Get candidate responses
   * @param {number} candidateId - Candidate ID
   * @returns {Promise<Array>} Responses array
   */
  async getCandidateResponses(candidateId) {
    try {
      return await this.db.responses
        .where('candidateId')
        .equals(candidateId)
        .toArray();
    } catch (error) {
      console.error('Failed to get candidate responses:', error);
      return [];
    }
  }

  /**
   * Submit assessment response
   * @param {Object} responseData - Response data
   * @returns {Promise<number>} Created response ID
   */
  async submitAssessmentResponse(responseData) {
    try {
      const responseWithTimestamp = {
        ...responseData,
        submittedAt: new Date()
      };
      
      return await this.db.responses.add(responseWithTimestamp);
    } catch (error) {
      console.error('Failed to submit assessment response:', error);
      throw error;
    }
  }

  // ===================
  // SETTINGS STORAGE
  // ===================

  /**
   * Get setting value
   * @param {string} key - Setting key
   * @param {any} defaultValue - Default value if not found
   * @returns {Promise<any>} Setting value
   */
  async getSetting(key, defaultValue = null) {
    try {
      const setting = await this.db.settings.get(key);
      return setting ? setting.value : defaultValue;
    } catch (error) {
      console.error('Failed to get setting:', error);
      return defaultValue;
    }
  }

  /**
   * Set setting value
   * @param {string} key - Setting key
   * @param {any} value - Setting value
   * @returns {Promise<void>}
   */
  async setSetting(key, value) {
    try {
      await this.db.settings.put({
        key,
        value,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Failed to set setting:', error);
      throw error;
    }
  }

  // ===================
  // ANALYTICS & REPORTING
  // ===================

  /**
   * Get job statistics
   * @param {number} jobId - Job ID
   * @returns {Promise<Object>} Job statistics
   */
  async getJobStats(jobId) {
    try {
      const candidates = await this.db.candidates.where('jobId').equals(jobId).toArray();
      
      const stats = {
        totalCandidates: candidates.length,
        stageBreakdown: {},
        recentActivity: []
      };

      // Calculate stage breakdown
      candidates.forEach(candidate => {
        stats.stageBreakdown[candidate.stage] = 
          (stats.stageBreakdown[candidate.stage] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Failed to get job stats:', error);
      return null;
    }
  }

  /**
   * Get overall analytics data
   * @returns {Promise<Object>} Analytics data
   */
  async getAnalyticsData() {
    try {
      const [jobs, candidates, assessments] = await Promise.all([
        this.db.jobs.toArray(),
        this.db.candidates.toArray(),
        this.db.assessments.toArray()
      ]);

      return {
        totalJobs: jobs.length,
        totalCandidates: candidates.length,
        totalAssessments: assessments.length,
        activeJobs: jobs.filter(job => job.status === 'active').length,
        jobsByDepartment: this.groupByField(jobs, 'department'),
        candidatesByStage: this.groupByField(candidates, 'stage'),
        recentJobs: jobs.slice(0, 5),
        recentCandidates: candidates.slice(0, 10)
      };
    } catch (error) {
      console.error('Failed to get analytics data:', error);
      return null;
    }
  }

  // ===================
  // UTILITY METHODS
  // ===================

  /**
   * Group array by field
   * @param {Array} array - Array to group
   * @param {string} field - Field to group by
   * @returns {Object} Grouped object
   */
  groupByField(array, field) {
    return array.reduce((acc, item) => {
      const key = item[field] || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Clear all data
   * @returns {Promise<void>}
   */
  async clearAllData() {
    try {
      await this.db.transaction('rw', 
        this.db.jobs, 
        this.db.candidates, 
        this.db.assessments, 
        this.db.notes, 
        this.db.responses, 
        this.db.settings, 
        async () => {
          await Promise.all([
            this.db.jobs.clear(),
            this.db.candidates.clear(),
            this.db.assessments.clear(),
            this.db.notes.clear(),
            this.db.responses.clear(),
            this.db.settings.clear()
          ]);
        }
      );
      
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw error;
    }
  }

  /**
   * Export data for backup
   * @returns {Promise<Object>} Exported data
   */
  async exportData() {
    try {
      const [jobs, candidates, assessments, notes, responses, settings] = await Promise.all([
        this.db.jobs.toArray(),
        this.db.candidates.toArray(),
        this.db.assessments.toArray(),
        this.db.notes.toArray(),
        this.db.responses.toArray(),
        this.db.settings.toArray()
      ]);

      return {
        jobs,
        candidates,
        assessments,
        notes,
        responses,
        settings,
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to export data:', error);
      throw error;
    }
  }

  /**
   * Import data from backup
   * @param {Object} data - Data to import
   * @returns {Promise<void>}
   */
  async importData(data) {
    try {
      await this.db.transaction('rw',
        this.db.jobs,
        this.db.candidates,
        this.db.assessments,
        this.db.notes,
        this.db.responses,
        this.db.settings,
        async () => {
          // Clear existing data
          await this.clearAllData();

          // Import new data
          if (data.jobs?.length) await this.db.jobs.bulkAdd(data.jobs);
          if (data.candidates?.length) await this.db.candidates.bulkAdd(data.candidates);
          if (data.assessments?.length) await this.db.assessments.bulkAdd(data.assessments);
          if (data.notes?.length) await this.db.notes.bulkAdd(data.notes);
          if (data.responses?.length) await this.db.responses.bulkAdd(data.responses);
          if (data.settings?.length) await this.db.settings.bulkAdd(data.settings);
        }
      );

      console.log('Data imported successfully');
    } catch (error) {
      console.error('Failed to import data:', error);
      throw error;
    }
  }
}

// Create and export storage service instance
const storageService = new StorageService();

export default storageService;