import { formatDate, downloadFile } from '../utils/helpers.js';
import { 
  CANDIDATE_STAGE_LABELS, 
  JOB_STATUS_LABELS,
  ASSESSMENT_STATUS 
} from '../utils/constants.js';

/**
 * CSV Export Service
 */
class CSVExportService {
  /**
   * Convert array of objects to CSV string
   * @param {Array} data - Array of objects to convert
   * @param {Array} columns - Column definitions
   * @returns {string} CSV string
   */
  arrayToCSV(data, columns) {
    if (!data || data.length === 0) {
      return '';
    }

    // Create header row
    const headers = columns.map(col => this.escapeCSVField(col.header || col.key));
    const csvRows = [headers.join(',')];

    // Create data rows
    data.forEach(item => {
      const row = columns.map(col => {
        let value = this.getNestedValue(item, col.key);
        
        // Apply formatter if provided
        if (col.formatter && typeof col.formatter === 'function') {
          value = col.formatter(value, item);
        }
        
        return this.escapeCSVField(value);
      });
      
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  /**
   * Escape CSV field value
   * @param {any} field - Field value
   * @returns {string} Escaped field value
   */
  escapeCSVField(field) {
    if (field === null || field === undefined) {
      return '';
    }

    const stringValue = String(field);
    
    // If field contains comma, newline, or quote, wrap in quotes and escape quotes
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  }

  /**
   * Get nested object value using dot notation
   * @param {Object} obj - Source object
   * @param {string} path - Dot notation path
   * @returns {any} Value at path
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  }

  /**
   * Generate filename with timestamp
   * @param {string} baseName - Base filename
   * @param {string} extension - File extension (default: 'csv')
   * @returns {string} Generated filename
   */
  generateFilename(baseName, extension = 'csv') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `${baseName}_${timestamp}.${extension}`;
  }

  // ===================
  // JOBS EXPORT
  // ===================

  /**
   * Export jobs to CSV
   * @param {Array} jobs - Array of job objects
   * @param {string} filename - Custom filename (optional)
   */
  exportJobs(jobs, filename = null) {
    const columns = [
      { key: 'id', header: 'ID' },
      { key: 'title', header: 'Job Title' },
      { key: 'slug', header: 'Slug' },
      { key: 'department', header: 'Department' },
      { key: 'type', header: 'Job Type' },
      { key: 'location', header: 'Location' },
      { 
        key: 'status', 
        header: 'Status',
        formatter: (value) => JOB_STATUS_LABELS[value] || value
      },
      { 
        key: 'salary', 
        header: 'Salary',
        formatter: (value) => value ? `$${value.toLocaleString()}` : ''
      },
      {
        key: 'tags',
        header: 'Tags',
        formatter: (value) => Array.isArray(value) ? value.join('; ') : value
      },
      { 
        key: 'createdAt', 
        header: 'Created Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { 
        key: 'updatedAt', 
        header: 'Updated Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { key: 'description', header: 'Description' },
    ];

    const csvContent = this.arrayToCSV(jobs, columns);
    const exportFilename = filename || this.generateFilename('jobs_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  // ===================
  // CANDIDATES EXPORT
  // ===================

  /**
   * Export candidates to CSV
   * @param {Array} candidates - Array of candidate objects
   * @param {string} filename - Custom filename (optional)
   */
  exportCandidates(candidates, filename = null) {
    const columns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Full Name' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Phone' },
      { 
        key: 'stage', 
        header: 'Current Stage',
        formatter: (value) => CANDIDATE_STAGE_LABELS[value] || value
      },
      { key: 'jobId', header: 'Job ID' },
      { key: 'jobTitle', header: 'Job Title' },
      { 
        key: 'experience', 
        header: 'Experience (Years)',
        formatter: (value) => value || '0'
      },
      { key: 'location', header: 'Location' },
      {
        key: 'skills',
        header: 'Skills',
        formatter: (value) => Array.isArray(value) ? value.join('; ') : value
      },
      { key: 'university', header: 'University' },
      { key: 'degree', header: 'Degree' },
      { 
        key: 'salary', 
        header: 'Expected Salary',
        formatter: (value) => value ? `${value.toLocaleString()}` : ''
      },
      { 
        key: 'appliedAt', 
        header: 'Applied Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { 
        key: 'createdAt', 
        header: 'Created Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { 
        key: 'updatedAt', 
        header: 'Last Updated',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { key: 'notes', header: 'Notes' },
    ];

    const csvContent = this.arrayToCSV(candidates, columns);
    const exportFilename = filename || this.generateFilename('candidates_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  /**
   * Export candidates with detailed stage history
   * @param {Array} candidates - Array of candidate objects with stage history
   * @param {string} filename - Custom filename (optional)
   */
  exportCandidatesWithHistory(candidates, filename = null) {
    const flattenedData = [];
    
    candidates.forEach(candidate => {
      if (candidate.stageHistory && candidate.stageHistory.length > 0) {
        candidate.stageHistory.forEach(history => {
          flattenedData.push({
            ...candidate,
            historyStage: history.stage,
            historyDate: history.changedAt,
            historyNotes: history.notes || '',
            changedBy: history.changedBy || '',
          });
        });
      } else {
        // Add candidate even without history
        flattenedData.push({
          ...candidate,
          historyStage: candidate.stage,
          historyDate: candidate.createdAt,
          historyNotes: '',
          changedBy: '',
        });
      }
    });

    const columns = [
      { key: 'id', header: 'Candidate ID' },
      { key: 'name', header: 'Full Name' },
      { key: 'email', header: 'Email' },
      { key: 'jobTitle', header: 'Job Title' },
      { 
        key: 'historyStage', 
        header: 'Stage',
        formatter: (value) => CANDIDATE_STAGE_LABELS[value] || value
      },
      { 
        key: 'historyDate', 
        header: 'Stage Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { key: 'historyNotes', header: 'Stage Notes' },
      { key: 'changedBy', header: 'Changed By' },
    ];

    const csvContent = this.arrayToCSV(flattenedData, columns);
    const exportFilename = filename || this.generateFilename('candidates_history_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  // ===================
  // ASSESSMENTS EXPORT
  // ===================

  /**
   * Export assessments to CSV
   * @param {Array} assessments - Array of assessment objects
   * @param {string} filename - Custom filename (optional)
   */
  exportAssessments(assessments, filename = null) {
    const columns = [
      { key: 'id', header: 'Assessment ID' },
      { key: 'title', header: 'Assessment Title' },
      { key: 'jobId', header: 'Job ID' },
      { key: 'jobTitle', header: 'Job Title' },
      { 
        key: 'status', 
        header: 'Status',
        formatter: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
      },
      { 
        key: 'timeLimit', 
        header: 'Time Limit (minutes)',
        formatter: (value) => value || 'No limit'
      },
      { 
        key: 'passingScore', 
        header: 'Passing Score (%)',
        formatter: (value) => value || 'No minimum'
      },
      {
        key: 'sections',
        header: 'Number of Sections',
        formatter: (value) => Array.isArray(value) ? value.length : 0
      },
      {
        key: 'totalQuestions',
        header: 'Total Questions',
        formatter: (value, item) => {
          if (!item.sections || !Array.isArray(item.sections)) return 0;
          return item.sections.reduce((total, section) => {
            return total + (section.questions ? section.questions.length : 0);
          }, 0);
        }
      },
      { 
        key: 'createdAt', 
        header: 'Created Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { 
        key: 'updatedAt', 
        header: 'Updated Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
      { key: 'description', header: 'Description' },
    ];

    const csvContent = this.arrayToCSV(assessments, columns);
    const exportFilename = filename || this.generateFilename('assessments_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  /**
   * Export assessment responses to CSV
   * @param {Array} responses - Array of response objects
   * @param {string} filename - Custom filename (optional)
   */
  exportAssessmentResponses(responses, filename = null) {
    const flattenedData = [];
    
    responses.forEach(response => {
      if (response.answers && typeof response.answers === 'object') {
        Object.entries(response.answers).forEach(([questionId, answer]) => {
          flattenedData.push({
            responseId: response.id,
            candidateId: response.candidateId,
            candidateName: response.candidateName,
            candidateEmail: response.candidateEmail,
            assessmentId: response.assessmentId,
            assessmentTitle: response.assessmentTitle,
            questionId,
            answer: typeof answer === 'object' ? JSON.stringify(answer) : answer,
            score: response.score,
            submittedAt: response.submittedAt,
          });
        });
      } else {
        // Add response even without detailed answers
        flattenedData.push({
          responseId: response.id,
          candidateId: response.candidateId,
          candidateName: response.candidateName,
          candidateEmail: response.candidateEmail,
          assessmentId: response.assessmentId,
          assessmentTitle: response.assessmentTitle,
          questionId: '',
          answer: '',
          score: response.score,
          submittedAt: response.submittedAt,
        });
      }
    });

    const columns = [
      { key: 'responseId', header: 'Response ID' },
      { key: 'candidateId', header: 'Candidate ID' },
      { key: 'candidateName', header: 'Candidate Name' },
      { key: 'candidateEmail', header: 'Candidate Email' },
      { key: 'assessmentId', header: 'Assessment ID' },
      { key: 'assessmentTitle', header: 'Assessment Title' },
      { key: 'questionId', header: 'Question ID' },
      { key: 'answer', header: 'Answer' },
      { 
        key: 'score', 
        header: 'Total Score (%)',
        formatter: (value) => value ? `${value}%` : ''
      },
      { 
        key: 'submittedAt', 
        header: 'Submitted Date',
        formatter: (value) => value ? formatDate(value) : ''
      },
    ];

    const csvContent = this.arrayToCSV(flattenedData, columns);
    const exportFilename = filename || this.generateFilename('assessment_responses_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  // ===================
  // ANALYTICS EXPORT
  // ===================

  /**
   * Export hiring funnel data to CSV
   * @param {Object} funnelData - Hiring funnel statistics
   * @param {string} filename - Custom filename (optional)
   */
  exportHiringFunnel(funnelData, filename = null) {
    const data = Object.entries(funnelData).map(([stage, count]) => ({
      stage: CANDIDATE_STAGE_LABELS[stage] || stage,
      count,
      percentage: funnelData.applied > 0 ? ((count / funnelData.applied) * 100).toFixed(1) : '0',
    }));

    const columns = [
      { key: 'stage', header: 'Stage' },
      { key: 'count', header: 'Number of Candidates' },
      { key: 'percentage', header: 'Percentage of Applied (%)' },
    ];

    const csvContent = this.arrayToCSV(data, columns);
    const exportFilename = filename || this.generateFilename('hiring_funnel_export');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  /**
   * Export comprehensive report with multiple sheets simulation
   * @param {Object} reportData - Object containing all report data
   * @param {string} filename - Custom filename (optional)
   */
  exportComprehensiveReport(reportData, filename = null) {
    const {
      jobs = [],
      candidates = [],
      assessments = [],
      analytics = {}
    } = reportData;

    // Create a summary report combining all data
    const summaryData = [
      { metric: 'Total Jobs', value: jobs.length },
      { metric: 'Active Jobs', value: jobs.filter(j => j.status === 'active').length },
      { metric: 'Total Candidates', value: candidates.length },
      { metric: 'Hired Candidates', value: candidates.filter(c => c.stage === 'hired').length },
      { metric: 'Total Assessments', value: assessments.length },
      { metric: 'Published Assessments', value: assessments.filter(a => a.status === 'published').length },
      { metric: 'Overall Hire Rate (%)', value: candidates.length > 0 ? ((candidates.filter(c => c.stage === 'hired').length / candidates.length) * 100).toFixed(1) : '0' },
    ];

    const columns = [
      { key: 'metric', header: 'Metric' },
      { key: 'value', header: 'Value' },
    ];

    const csvContent = this.arrayToCSV(summaryData, columns);
    const exportFilename = filename || this.generateFilename('comprehensive_report');
    
    downloadFile(csvContent, exportFilename, 'text/csv');
    return csvContent;
  }

  // ===================
  // BATCH EXPORT
  // ===================

  /**
   * Export multiple data types as separate CSV files in a zip-like format
   * Note: In a real implementation, you might want to use a zip library
   * @param {Object} data - Object containing different data types
   */
  exportBatch(data) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    if (data.jobs && data.jobs.length > 0) {
      this.exportJobs(data.jobs, `jobs_${timestamp}.csv`);
    }
    
    if (data.candidates && data.candidates.length > 0) {
      this.exportCandidates(data.candidates, `candidates_${timestamp}.csv`);
    }
    
    if (data.assessments && data.assessments.length > 0) {
      this.exportAssessments(data.assessments, `assessments_${timestamp}.csv`);
    }
    
    if (data.analytics) {
      this.exportHiringFunnel(data.analytics, `analytics_${timestamp}.csv`);
    }
  }

  // ===================
  // TEMPLATE EXPORTS
  // ===================

  /**
   * Export template for bulk candidate import
   */
  exportCandidateTemplate() {
    const templateData = [{
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      experience: '3',
      location: 'New York, NY',
      skills: 'JavaScript; React; Node.js',
      university: 'University of Technology',
      degree: 'Computer Science',
      expectedSalary: '75000',
      notes: 'Experienced developer with strong frontend skills',
    }];

    const columns = [
      { key: 'name', header: 'Full Name *' },
      { key: 'email', header: 'Email *' },
      { key: 'phone', header: 'Phone' },
      { key: 'experience', header: 'Experience (Years)' },
      { key: 'location', header: 'Location' },
      { key: 'skills', header: 'Skills (semicolon separated)' },
      { key: 'university', header: 'University' },
      { key: 'degree', header: 'Degree' },
      { key: 'expectedSalary', header: 'Expected Salary' },
      { key: 'notes', header: 'Notes' },
    ];

    const csvContent = this.arrayToCSV(templateData, columns);
    downloadFile(csvContent, 'candidate_import_template.csv', 'text/csv');
    return csvContent;
  }

  /**
   * Export template for bulk job import
   */
  exportJobTemplate() {
    const templateData = [{
      title: 'Senior Software Engineer',
      slug: 'senior-software-engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: '120000',
      tags: 'JavaScript; React; Senior',
      description: 'We are looking for a senior software engineer to join our team...',
    }];

    const columns = [
      { key: 'title', header: 'Job Title *' },
      { key: 'slug', header: 'Slug *' },
      { key: 'department', header: 'Department *' },
      { key: 'type', header: 'Job Type *' },
      { key: 'location', header: 'Location *' },
      { key: 'salary', header: 'Salary' },
      { key: 'tags', header: 'Tags (semicolon separated)' },
      { key: 'description', header: 'Description *' },
    ];

    const csvContent = this.arrayToCSV(templateData, columns);
    downloadFile(csvContent, 'job_import_template.csv', 'text/csv');
    return csvContent;
  }
}

// Create singleton instance
const csvExportService = new CSVExportService();

export default csvExportService;
export { CSVExportService };