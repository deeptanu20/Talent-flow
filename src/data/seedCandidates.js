/**
 * Seed Candidates Data for TalentFlow Application
 * This file contains mock candidate data for development and testing purposes
 */

import { addTime, subtractTime } from '../utils/dateUtils.js';

// Candidate stages in the hiring pipeline
export const CANDIDATE_STAGES = {
  APPLIED: 'applied',
  SCREENING: 'screening',
  PHONE_INTERVIEW: 'phone_interview',
  TECHNICAL_INTERVIEW: 'technical_interview',
  ONSITE_INTERVIEW: 'onsite_interview',
  FINAL_INTERVIEW: 'final_interview',
  OFFER_EXTENDED: 'offer_extended',
  OFFER_ACCEPTED: 'offer_accepted',
  HIRED: 'hired',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn'
};

// Resume/experience templates for different roles
const experienceTemplates = {
  frontend: {
    skills: ['JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'TypeScript', 'Webpack', 'Git'],
    previousRoles: ['Frontend Developer', 'Web Developer', 'UI Developer', 'JavaScript Developer'],
    companies: ['TechStartup Inc', 'WebDev Solutions', 'Digital Agency Pro', 'Innovation Labs']
  },
  backend: {
    skills: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Docker', 'AWS'],
    previousRoles: ['Backend Developer', 'Software Engineer', 'API Developer', 'Systems Engineer'],
    companies: ['CloudTech Corp', 'DataSystems LLC', 'ServerSide Solutions', 'Backend Pro']
  },
  fullstack: {
    skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git'],
    previousRoles: ['Full Stack Developer', 'Software Engineer', 'Web Developer', 'Technical Lead'],
    companies: ['FullStack Innovations', 'Complete Solutions', 'WebTech Pro', 'Development Hub']
  },
  mobile: {
    skills: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'iOS', 'Android', 'Firebase', 'REST APIs'],
    previousRoles: ['Mobile Developer', 'iOS Developer', 'Android Developer', 'App Developer'],
    companies: ['Mobile Innovations', 'App Solutions', 'MobileTech Pro', 'SmartApps Inc']
  },
  design: {
    skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'User Research', 'Prototyping'],
    previousRoles: ['UX Designer', 'UI Designer', 'Product Designer', 'Visual Designer'],
    companies: ['Design Studio Pro', 'Creative Solutions', 'UX Innovations', 'Visual Arts Corp']
  },
  product: {
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Market Research', 'Roadmapping', 'A/B Testing'],
    previousRoles: ['Product Manager', 'Senior Product Manager', 'Product Owner', 'Strategy Manager'],
    companies: ['Product Innovations', 'Strategic Solutions', 'Growth Labs', 'Product Pro Corp']
  },
  marketing: {
    skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Google Analytics', 'Social Media', 'Email Marketing'],
    previousRoles: ['Marketing Manager', 'Digital Marketer', 'Content Manager', 'Growth Marketer'],
    companies: ['Marketing Solutions', 'Digital Growth Co', 'Brand Innovations', 'Marketing Pro']
  },
  data: {
    skills: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Statistics', 'Data Visualization'],
    previousRoles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Research Scientist'],
    companies: ['DataTech Solutions', 'AI Innovations', 'Analytics Pro', 'Data Science Corp']
  }
};

// Helper function to generate random elements
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Base date for generating realistic application dates
const baseDate = new Date();

// Generate candidate names
const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Sarah', 'Emily', 'Jessica', 'Ashley', 'Jennifer', 'Amanda', 'Stephanie', 'Nicole',
  'Michael', 'Christopher', 'Matthew', 'Joshua', 'David', 'Andrew', 'Daniel', 'James',
  'Ryan', 'Kevin', 'Brandon', 'Tyler', 'Justin', 'Robert', 'John', 'William'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
];

// Generate phone numbers and emails
const generatePhoneNumber = () => {
  const area = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${exchange}-${number}`;
};

const generateEmail = (firstName, lastName) => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'email.com'];
  const separators = ['.', '_', ''];
  const domain = getRandomElement(domains);
  const separator = getRandomElement(separators);
  const number = Math.random() > 0.7 ? Math.floor(Math.random() * 100) : '';
  return `${firstName.toLowerCase()}${separator}${lastName.toLowerCase()}${number}@${domain}`;
};

// Generate work experience
const generateExperience = (role, yearsExp) => {
  const template = experienceTemplates[role];
  const experiences = [];
  let currentYear = new Date().getFullYear();
  let remainingYears = yearsExp;

  while (remainingYears > 0) {
    const yearsAtCompany = Math.min(Math.floor(Math.random() * 4) + 1, remainingYears);
    const startYear = currentYear - yearsAtCompany;
    const endYear = currentYear;

    experiences.push({
      company: getRandomElement(template.companies),
      role: getRandomElement(template.previousRoles),
      startDate: `${startYear}-01-01`,
      endDate: currentYear === new Date().getFullYear() ? 'Present' : `${endYear}-12-31`,
      duration: yearsAtCompany,
      description: `Worked as ${getRandomElement(template.previousRoles)} utilizing ${getRandomElements(template.skills, 3).join(', ')}`
    });

    currentYear = startYear;
    remainingYears -= yearsAtCompany;
  }

  return experiences.reverse();
};

// Generate education data
const universities = [
  'Stanford University', 'MIT', 'UC Berkeley', 'Carnegie Mellon', 'University of Washington',
  'Georgia Tech', 'University of Texas', 'Cornell University', 'UCLA', 'Princeton University',
  'Harvard University', 'Yale University', 'Columbia University', 'NYU', 'Boston University'
];

const degrees = ['Bachelor of Science', 'Master of Science', 'Bachelor of Arts', 'Master of Arts'];
const majors = [
  'Computer Science', 'Software Engineering', 'Information Technology', 'Data Science',
  'Electrical Engineering', 'Mathematics', 'Business Administration', 'Marketing',
  'Design', 'Psychology', 'Economics', 'Statistics'
];

const generateEducation = () => {
  const hasGraduateDegree = Math.random() > 0.6;
  const education = [];

  // Undergraduate degree
  const gradYear = new Date().getFullYear() - Math.floor(Math.random() * 15) - 2;
  education.push({
    institution: getRandomElement(universities),
    degree: getRandomElement(['Bachelor of Science', 'Bachelor of Arts']),
    major: getRandomElement(majors),
    graduationYear: gradYear,
    gpa: (Math.random() * 1.5 + 2.5).toFixed(2)
  });

  // Graduate degree (if applicable)
  if (hasGraduateDegree) {
    education.push({
      institution: getRandomElement(universities),
      degree: getRandomElement(['Master of Science', 'Master of Arts', 'MBA']),
      major: getRandomElement(majors),
      graduationYear: gradYear + Math.floor(Math.random() * 5) + 2,
      gpa: (Math.random() * 1.0 + 3.0).toFixed(2)
    });
  }

  return education;
};

// Generate interview notes
const generateInterviewNotes = (stage) => {
  const positiveNotes = [
    'Strong technical skills demonstrated',
    'Great communication abilities',
    'Shows enthusiasm for the role',
    'Problem-solving approach is excellent',
    'Team collaboration skills are impressive',
    'Quick learner with adaptability',
    'Good cultural fit for the organization'
  ];

  const neutralNotes = [
    'Meets basic requirements',
    'Standard technical knowledge',
    'Adequate communication skills',
    'Some areas for improvement noted'
  ];

  const negativeNotes = [
    'Technical skills need development',
    'Communication could be clearer',
    'Limited experience in required areas',
    'May not be the best fit for this role'
  ];

  const allNotes = [...positiveNotes, ...neutralNotes];
  if (stage === CANDIDATE_STAGES.REJECTED) {
    allNotes.push(...negativeNotes);
  }

  return getRandomElements(allNotes, Math.floor(Math.random() * 3) + 1);
};

// Generate salary expectations
const generateSalaryRange = (role, experience) => {
  const baseSalaries = {
    frontend: 75000,
    backend: 85000,
    fullstack: 90000,
    mobile: 80000,
    design: 70000,
    product: 95000,
    marketing: 65000,
    data: 100000
  };

  const base = baseSalaries[role] || 75000;
  const experienceMultiplier = 1 + (experience * 0.1);
  const variation = 0.8 + (Math.random() * 0.4); // ±20% variation
  
  const salary = Math.floor(base * experienceMultiplier * variation);
  return {
    min: salary - 5000,
    max: salary + 15000,
    preferred: salary + 5000
  };
};

// Generate candidate data
const generateCandidate = (id, roleType) => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const yearsExperience = Math.floor(Math.random() * 12) + 1;
  const applicationDate = subtractTime(baseDate, Math.floor(Math.random() * 90), 'days');
  
  // Determine current stage based on application date and random factors
  const stageKeys = Object.keys(CANDIDATE_STAGES);
  const daysSinceApplication = Math.floor((baseDate - applicationDate) / (1000 * 60 * 60 * 24));
  let currentStage;
  
  if (daysSinceApplication < 3) {
    currentStage = CANDIDATE_STAGES.APPLIED;
  } else if (daysSinceApplication < 7) {
    currentStage = getRandomElement([CANDIDATE_STAGES.APPLIED, CANDIDATE_STAGES.SCREENING]);
  } else if (daysSinceApplication < 14) {
    currentStage = getRandomElement([
      CANDIDATE_STAGES.SCREENING, 
      CANDIDATE_STAGES.PHONE_INTERVIEW, 
      CANDIDATE_STAGES.REJECTED
    ]);
  } else if (daysSinceApplication < 21) {
    currentStage = getRandomElement([
      CANDIDATE_STAGES.PHONE_INTERVIEW,
      CANDIDATE_STAGES.TECHNICAL_INTERVIEW,
      CANDIDATE_STAGES.REJECTED,
      CANDIDATE_STAGES.WITHDRAWN
    ]);
  } else {
    currentStage = getRandomElement([
      CANDIDATE_STAGES.TECHNICAL_INTERVIEW,
      CANDIDATE_STAGES.ONSITE_INTERVIEW,
      CANDIDATE_STAGES.FINAL_INTERVIEW,
      CANDIDATE_STAGES.OFFER_EXTENDED,
      CANDIDATE_STAGES.OFFER_ACCEPTED,
      CANDIDATE_STAGES.HIRED,
      CANDIDATE_STAGES.REJECTED,
      CANDIDATE_STAGES.WITHDRAWN
    ]);
  }

  const template = experienceTemplates[roleType];
  const skills = getRandomElements(template.skills, Math.floor(Math.random() * 4) + 4);
  
  return {
    id: `candidate_${id}`,
    personalInfo: {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhoneNumber(),
      location: getRandomElement([
        'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX',
        'Boston, MA', 'Los Angeles, CA', 'Chicago, IL', 'Denver, CO',
        'Portland, OR', 'Atlanta, GA', 'Miami, FL', 'Phoenix, AZ'
      ]),
      linkedIn: `linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      github: Math.random() > 0.3 ? `github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : null,
      portfolio: roleType === 'design' || roleType === 'frontend' ? 
        `${firstName.toLowerCase()}${lastName.toLowerCase()}.com` : null
    },
    
    applicationInfo: {
      appliedDate: applicationDate.toISOString(),
      position: `${template.previousRoles[0]} - Senior`,
      department: roleType === 'data' ? 'Data Science' : 
                 roleType === 'design' ? 'Design' :
                 roleType === 'product' ? 'Product' :
                 roleType === 'marketing' ? 'Marketing' : 'Engineering',
      source: getRandomElement(['LinkedIn', 'Company Website', 'Referral', 'Indeed', 'Glassdoor', 'AngelList']),
      referredBy: Math.random() > 0.8 ? getRandomElement(['John Doe', 'Jane Smith', 'Mike Johnson']) : null
    },

    experience: {
      totalYears: yearsExperience,
      currentRole: getRandomElement(template.previousRoles),
      currentCompany: getRandomElement(template.companies),
      workHistory: generateExperience(roleType, yearsExperience),
      skills: skills,
      certifications: Math.random() > 0.6 ? getRandomElements([
        'AWS Certified', 'Google Cloud Certified', 'Certified Scrum Master',
        'PMP Certified', 'Adobe Certified Expert', 'Microsoft Certified'
      ], Math.floor(Math.random() * 2) + 1) : []
    },

    education: generateEducation(),

    hiringPipeline: {
      currentStage,
      stageHistory: [
        {
          stage: CANDIDATE_STAGES.APPLIED,
          date: applicationDate.toISOString(),
          notes: ['Application submitted'],
          interviewer: null
        }
      ],
      nextSteps: currentStage !== CANDIDATE_STAGES.REJECTED && 
                 currentStage !== CANDIDATE_STAGES.WITHDRAWN && 
                 currentStage !== CANDIDATE_STAGES.HIRED ? 
        'Schedule next interview' : null,
      scheduledInterviews: [],
      interviewFeedback: currentStage !== CANDIDATE_STAGES.APPLIED ? 
        generateInterviewNotes(currentStage) : []
    },

    assessment: {
      technicalScore: roleType !== 'marketing' && roleType !== 'design' ? 
        Math.floor(Math.random() * 40) + 60 : null,
      culturalFit: Math.floor(Math.random() * 30) + 70,
      communicationSkills: Math.floor(Math.random() * 30) + 70,
      overallRating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      interviewerNotes: currentStage !== CANDIDATE_STAGES.APPLIED ? 
        generateInterviewNotes(currentStage).join('. ') : '',
      strengths: getRandomElements([
        'Strong problem solver', 'Excellent communicator', 'Team player',
        'Quick learner', 'Innovative thinker', 'Detail oriented',
        'Leadership potential', 'Technical expertise'
      ], Math.floor(Math.random() * 3) + 2),
      concerns: Math.random() > 0.7 ? getRandomElements([
        'Limited experience with X technology', 'May need mentoring',
        'Salary expectations high', 'Availability concerns'
      ], Math.floor(Math.random() * 2) + 1) : []
    },

    compensation: {
      currentSalary: Math.floor(Math.random() * 50000) + 60000,
      expectedSalary: generateSalaryRange(roleType, yearsExperience),
      benefits: getRandomElements([
        'Health Insurance', 'Dental Insurance', '401k Matching',
        'Stock Options', 'Flexible PTO', 'Remote Work',
        'Professional Development', 'Gym Membership'
      ], Math.floor(Math.random() * 4) + 3),
      negotiable: Math.random() > 0.3
    },

    documents: {
      resume: `resumes/${firstName}_${lastName}_resume.pdf`,
      coverLetter: Math.random() > 0.4 ? `cover_letters/${firstName}_${lastName}_cover.pdf` : null,
      portfolio: roleType === 'design' ? `portfolios/${firstName}_${lastName}_portfolio.pdf` : null,
      references: Math.random() > 0.5 ? [
        { name: 'John Reference', company: 'Previous Company', phone: generatePhoneNumber() },
        { name: 'Jane Reference', company: 'Another Company', phone: generatePhoneNumber() }
      ] : []
    },

    metadata: {
      createdAt: applicationDate.toISOString(),
      updatedAt: addTime(applicationDate, Math.floor(Math.random() * 10), 'days').toISOString(),
      tags: getRandomElements(['priority', 'referral', 'urgent', 'follow-up'], Math.floor(Math.random() * 2)),
      notes: Math.random() > 0.6 ? 'Additional notes about candidate' : '',
      internalRating: Math.floor(Math.random() * 5) + 1
    }
  };
};

// Generate seed data
export const generateCandidatesData = (count = 100) => {
  const candidates = [];
  const roleTypes = Object.keys(experienceTemplates);
  
  for (let i = 1; i <= count; i++) {
    const roleType = getRandomElement(roleTypes);
    candidates.push(generateCandidate(i, roleType));
  }
  
  return candidates;
};

// Export default dataset
export const seedCandidates = generateCandidatesData(50);

// Export utility functions
export {
  generateCandidate,
  experienceTemplates,
  generatePhoneNumber,
  generateEmail
};

// Statistics helper
export const getCandidateStats = (candidates = seedCandidates) => {
  const stats = {
    total: candidates.length,
    byStage: {},
    byDepartment: {},
    bySource: {},
    averageExperience: 0
  };

  let totalExperience = 0;

  candidates.forEach(candidate => {
    // By stage
    const stage = candidate.hiringPipeline.currentStage;
    stats.byStage[stage] = (stats.byStage[stage] || 0) + 1;

    // By department
    const dept = candidate.applicationInfo.department;
    stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1;

    // By source
    const source = candidate.applicationInfo.source;
    stats.bySource[source] = (stats.bySource[source] || 0) + 1;

    // Total experience
    totalExperience += candidate.experience.totalYears;
  });

  stats.averageExperience = (totalExperience / candidates.length).toFixed(1);

  return stats;
};