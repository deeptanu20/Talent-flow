import { createServer, Model, Factory, Response } from 'miragejs';
import { API_CONFIG } from '../utils/constants.js';
import { seedJobs } from '../data/seedJobs.js';
import { seedCandidates } from '../data/seedCandidates.js';
import { seedAssessments } from '../data/seedAssessments.js';

/**
 * Create delay to simulate network latency
 * @returns {Promise} Delayed promise
 */
const createDelay = () => {
  const delay = Math.random() * (API_CONFIG.DELAY_MAX - API_CONFIG.DELAY_MIN) + API_CONFIG.DELAY_MIN;
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Simulate API errors based on error rate
 * @returns {boolean} Whether to simulate error
 */
const shouldSimulateError = () => {
  return Math.random() < API_CONFIG.ERROR_RATE;
};

/**
 * Create error response
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Response} Mirage response
 */
const createErrorResponse = (status, message) => {
  return new Response(status, {}, { message, status });
};

/**
 * Setup MirageJS server
 */
export const setupMirageServer = () => {
  return createServer({
    // Define models
    models: {
      job: Model,
      candidate: Model,
      assessment: Model,
      note: Model,
      response: Model,
    },

    // Define factories for generating fake data
    factories: {
      job: Factory.extend({
        title() { return 'Software Engineer'; },
        department() { return 'Engineering'; },
        status() { return 'active'; },
      }),
      
      candidate: Factory.extend({
        name() { return 'John Doe'; },
        email() { return 'john@example.com'; },
        stage() { return 'applied'; },
      }),
    },

    // Seed database with initial data
    seeds(server) {
      // Add seed data
      seedJobs.forEach(job => server.create('job', job));
      seedCandidates.forEach(candidate => server.create('candidate', candidate));
      seedAssessments.forEach(assessment => server.create('assessment', assessment));
    },

    // Define API routes
    routes() {
      this.namespace = '/api';

      // ===================
      // JOBS ROUTES
      // ===================
      
      this.get('/jobs', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to fetch jobs');
        }

        const { status, department, search, page = 1, limit = 10 } = request.queryParams;
        let jobs = schema.jobs.all().models;

        // Apply filters
        if (status) {
          jobs = jobs.filter(job => job.status === status);
        }
        
        if (department) {
          jobs = jobs.filter(job => job.department === department);
        }
        
        if (search) {
          const searchTerm = search.toLowerCase();
          jobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm)
          );
        }

        // Apply pagination
        const total = jobs.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedJobs = jobs.slice(startIndex, endIndex);

        return {
          data: paginatedJobs,
          meta: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
          },
        };
      });

      this.get('/jobs/:id', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to fetch job');
        }

        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }
        
        return job;
      });

      this.get('/jobs/slug/:slug', async (schema, request) => {
        await createDelay();
        
        const job = schema.jobs.findBy({ slug: request.params.slug });
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }
        
        return job;
      });

      this.post('/jobs', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to create job');
        }

        const attrs = JSON.parse(request.requestBody);
        const job = schema.jobs.create({
          ...attrs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        return job;
      });

      this.put('/jobs/:id', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to update job');
        }

        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }

        const attrs = JSON.parse(request.requestBody);
        job.update({
          ...attrs,
          updatedAt: new Date().toISOString(),
        });
        
        return job;
      });

      this.patch('/jobs/:id/archive', async (schema, request) => {
        await createDelay();
        
        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }

        job.update({ 
          status: 'archived',
          updatedAt: new Date().toISOString(),
        });
        
        return job;
      });

      this.patch('/jobs/:id/unarchive', async (schema, request) => {
        await createDelay();
        
        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }

        job.update({ 
          status: 'active',
          updatedAt: new Date().toISOString(),
        });
        
        return job;
      });

      this.delete('/jobs/:id', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to delete job');
        }

        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return createErrorResponse(404, 'Job not found');
        }

        // Also delete related candidates
        schema.candidates.where({ jobId: request.params.id }).destroy();
        job.destroy();
        
        return new Response(204);
      });

      this.post('/jobs/reorder', async (schema, request) => {
        await createDelay();
        
        const { ids } = JSON.parse(request.requestBody);
        
        // Update order for each job
        ids.forEach((id, index) => {
          const job = schema.jobs.find(id);
          if (job) {
            job.update({ 
              order: index,
              updatedAt: new Date().toISOString(),
            });
          }
        });
        
        return { success: true };
      });

      // ===================
      // CANDIDATES ROUTES
      // ===================
      
      this.get('/candidates', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to fetch candidates');
        }

        const { jobId, stage, search, page = 1, limit = 50 } = request.queryParams;
        let candidates = schema.candidates.all().models;

        // Apply filters
        if (jobId) {
          candidates = candidates.filter(candidate => candidate.jobId == jobId);
        }
        
        if (stage) {
          candidates = candidates.filter(candidate => candidate.stage === stage);
        }
        
        if (search) {
          const searchTerm = search.toLowerCase();
          candidates = candidates.filter(candidate => 
            candidate.name.toLowerCase().includes(searchTerm) ||
            candidate.email.toLowerCase().includes(searchTerm)
          );
        }

        // Apply pagination
        const total = candidates.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedCandidates = candidates.slice(startIndex, endIndex);

        return {
          data: paginatedCandidates,
          meta: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
          },
        };
      });

      this.get('/candidates/:id', async (schema, request) => {
        await createDelay();
        
        const candidate = schema.candidates.find(request.params.id);
        if (!candidate) {
          return createErrorResponse(404, 'Candidate not found');
        }
        
        return candidate;
      });

      this.post('/candidates', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to create candidate');
        }

        const attrs = JSON.parse(request.requestBody);
        const candidate = schema.candidates.create({
          ...attrs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        return candidate;
      });

      this.put('/candidates/:id', async (schema, request) => {
        await createDelay();
        
        const candidate = schema.candidates.find(request.params.id);
        if (!candidate) {
          return createErrorResponse(404, 'Candidate not found');
        }

        const attrs = JSON.parse(request.requestBody);
        candidate.update({
          ...attrs,
          updatedAt: new Date().toISOString(),
        });
        
        return candidate;
      });

      this.patch('/candidates/:id/stage', async (schema, request) => {
        await createDelay();
        
        if (shouldSimulateError()) {
          return createErrorResponse(500, 'Failed to update candidate stage');
        }

        const candidate = schema.candidates.find(request.params.id);
        if (!candidate) {
          return createErrorResponse(404, 'Candidate not found');
        }

        const { stage } = JSON.parse(request.requestBody);
        candidate.update({ 
          stage,
          updatedAt: new Date().toISOString(),
        });
        
        return candidate;
      });

      // ===================
      // ASSESSMENTS ROUTES
      // ===================
      
      this.get('/assessments', async (schema, request) => {
        await createDelay();
        
        const { jobId } = request.queryParams;
        let assessments = schema.assessments.all().models;

        if (jobId) {
          assessments = assessments.filter(assessment => assessment.jobId == jobId);
        }

        return assessments;
      });

      this.get('/assessments/:id', async (schema, request) => {
        await createDelay();
        
        const assessment = schema.assessments.find(request.params.id);
        if (!assessment) {
          return createErrorResponse(404, 'Assessment not found');
        }
        
        return assessment;
      });

      this.post('/assessments', async (schema, request) => {
        await createDelay();
        
        const attrs = JSON.parse(request.requestBody);
        const assessment = schema.assessments.create({
          ...attrs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        return assessment;
      });

      // ===================
      // NOTES ROUTES
      // ===================
      
      this.get('/candidates/:candidateId/notes', async (schema, request) => {
        await createDelay();
        
        const notes = schema.notes.where({ candidateId: request.params.candidateId });
        return notes.models;
      });

      this.post('/candidates/:candidateId/notes', async (schema, request) => {
        await createDelay();
        
        const attrs = JSON.parse(request.requestBody);
        const note = schema.notes.create({
          ...attrs,
          candidateId: request.params.candidateId,
          createdAt: new Date().toISOString(),
        });
        
        return note;
      });

      // ===================
      // ANALYTICS ROUTES
      // ===================
      
      this.get('/analytics/dashboard', async (schema) => {
        await createDelay();
        
        const jobs = schema.jobs.all().models;
        const candidates = schema.candidates.all().models;

        // Calculate basic stats
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter(job => job.status === 'active').length;
        const totalCandidates = candidates.length;
        
        // Calculate candidates by stage
        const candidatesByStage = candidates.reduce((acc, candidate) => {
          acc[candidate.stage] = (acc[candidate.stage] || 0) + 1;
          return acc;
        }, {});

        return {
          totalJobs,
          activeJobs,
          totalCandidates,
          candidatesByStage,
          hireRate: Math.round((candidatesByStage.hired || 0) / totalCandidates * 100),
        };
      });

      // ===================
      // SEARCH ROUTES
      // ===================
      
      this.get('/search', async (schema, request) => {
        await createDelay();
        
        const { q } = request.queryParams;
        const searchTerm = q.toLowerCase();
        
        const jobs = schema.jobs.all().models.filter(job => 
          job.title.toLowerCase().includes(searchTerm)
        ).slice(0, 5);
        
        const candidates = schema.candidates.all().models.filter(candidate => 
          candidate.name.toLowerCase().includes(searchTerm) ||
          candidate.email.toLowerCase().includes(searchTerm)
        ).slice(0, 5);

        return {
          jobs,
          candidates,
        };
      });

      // Handle unmatched routes
      this.passthrough();
    },
  });
};

export default setupMirageServer;