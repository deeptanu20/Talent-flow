/**
 * Seed Jobs Data for TalentFlow Application
 * This file contains mock job data for development and testing purposes
 */

import { addTime, subtractTime } from '../utils/dateUtils.js';

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Job skill sets for different roles
const skillSets = {
  frontend: ['JavaScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'TypeScript', 'Webpack', 'SASS'],
  backend: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL', 'Docker'],
  fullstack: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Git', 'Agile'],
  mobile: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'iOS', 'Android', 'Firebase', 'REST APIs'],
  devops: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux', 'CI/CD', 'Monitoring'],
  design: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'User Research', 'Prototyping', 'Wireframing'],
  marketing: ['Google Analytics', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'A/B Testing'],
  sales: ['CRM', 'Salesforce', 'Lead Generation', 'Account Management', 'Negotiation', 'Cold Calling'],
  hr: ['Recruiting', 'Talent Acquisition', 'HRIS', 'Employee Relations', 'Compensation', 'Benefits'],
  finance: ['Excel', 'Financial Analysis', 'Budgeting', 'Forecasting', 'QuickBooks', 'SAP', 'Auditing']
};

// Benefits packages
const benefitsPackages = [
  ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k) Matching', 'Paid Time Off'],
  ['Health Insurance', 'Dental Insurance', 'Remote Work', 'Flexible Hours', 'Learning Budget'],
  ['Health Insurance', 'Life Insurance', 'Stock Options', 'Gym Membership', 'Catered Meals'],
  ['Health Insurance', 'Dental Insurance', 'Vision Insurance', 'Parental Leave', 'Mental Health Support'],
  ['Health Insurance', '401(k) Matching', 'Unlimited PTO', 'Work from Home Stipend', 'Professional Development']
];

// Company information
const companies = [
  {
    name: 'TechCorp Solutions',
    description: 'Leading technology solutions provider focused on enterprise software development.',
    industry: 'Technology',
    size: '500-1000 employees',
    location: 'San Francisco, CA'
  },
  {
    name: 'InnovateLabs',
    description: 'Innovative startup building next-generation AI and machine learning products.',
    industry: 'Artificial Intelligence',
    size: '50-100 employees',
    location: 'Austin, TX'
  },
  {
    name: 'GlobalFinance Inc',
    description: 'International financial services company providing banking and investment solutions.',
    industry: 'Financial Services',
    size: '1000+ employees',
    location: 'New York, NY'
  },
  {
    name: 'HealthTech Innovations',
    description: 'Healthcare technology company developing digital health solutions.',
    industry: 'Healthcare Technology',
    size: '200-500 employees',
    location: 'Boston, MA'
  },
  {
    name: 'EcoSustain Corp',
    description: 'Sustainable technology company focused on environmental solutions.',
    industry: 'Clean Technology',
    size: '100-200 employees',
    location: 'Portland, OR'
  }
];

// Base date for generating realistic job posting dates
const baseDate = new Date();

export const seedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    slug: generateSlug('Senior Frontend Developer'),
    company: companies[0],
    department: 'Engineering',
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `We are seeking a Senior Frontend Developer to join our dynamic engineering team. You will be responsible for building and maintaining high-quality web applications using modern frontend technologies.

**Key Responsibilities:**
• Develop and maintain responsive web applications using React and TypeScript
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize application performance and ensure cross-browser compatibility
• Mentor junior developers and participate in code reviews
• Work closely with backend developers to integrate APIs
• Contribute to technical architecture decisions

**What We Offer:**
• Competitive salary and equity package
• Comprehensive health benefits
• Flexible work arrangements
• Learning and development opportunities
• Modern tech stack and tools`,
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of JavaScript, HTML5, and CSS3',
      'Strong experience with React and modern JavaScript frameworks',
      'Experience with TypeScript and state management libraries',
      'Proficiency in responsive design and CSS preprocessors',
      'Knowledge of testing frameworks (Jest, Cypress)',
      'Experience with version control (Git) and CI/CD pipelines',
      'Bachelor\'s degree in Computer Science or equivalent experience'
    ],
    skills: skillSets.frontend,
    benefits: benefitsPackages[0],
    status: 'active',
    priority: 'high',
    applicationDeadline: addTime(baseDate, 30, 'days'),
    createdAt: subtractTime(baseDate, 7, 'days'),
    updatedAt: subtractTime(baseDate, 2, 'days'),
    createdBy: 'Sarah Johnson',
    tags: ['React', 'TypeScript', 'Frontend', 'Senior'],
    applicationCount: 45,
    viewCount: 1250
  },

  {
    id: 2,
    title: 'Full Stack Engineer',
    slug: generateSlug('Full Stack Engineer'),
    company: companies[1],
    department: 'Engineering',
    location: 'Austin, TX',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryRange: {
      min: 90000,
      max: 130000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Join our innovative startup as a Full Stack Engineer! You'll work on cutting-edge AI products that are revolutionizing how businesses operate. This is a unique opportunity to shape the future of technology.

**What You'll Do:**
• Build and maintain full-stack applications using Node.js and React
• Design and implement RESTful APIs and database schemas
• Collaborate with ML engineers to integrate AI models
• Participate in agile development processes
• Contribute to technical architecture and system design
• Ensure code quality through testing and peer reviews

**Why Join Us:**
• Work on revolutionary AI technology
• Direct impact on product development
• Stock options with high growth potential
• Unlimited PTO and flexible hours
• Learning stipend for conferences and courses`,
    requirements: [
      '3+ years of full-stack development experience',
      'Strong proficiency in JavaScript/Node.js and React',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of cloud platforms (AWS, GCP, or Azure)',
      'Understanding of RESTful API design principles',
      'Experience with Git and agile development methodologies',
      'Strong problem-solving and debugging skills',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    skills: skillSets.fullstack,
    benefits: benefitsPackages[1],
    status: 'active',
    priority: 'high',
    applicationDeadline: addTime(baseDate, 25, 'days'),
    createdAt: subtractTime(baseDate, 5, 'days'),
    updatedAt: subtractTime(baseDate, 1, 'days'),
    createdBy: 'Mike Chen',
    tags: ['Full Stack', 'Node.js', 'React', 'AI', 'Startup'],
    applicationCount: 32,
    viewCount: 890
  },

  {
    id: 3,
    title: 'DevOps Engineer',
    slug: generateSlug('DevOps Engineer'),
    company: companies[2],
    department: 'Infrastructure',
    location: 'New York, NY',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salaryRange: {
      min: 130000,
      max: 170000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `We're looking for a Senior DevOps Engineer to join our infrastructure team at a leading financial services company. You'll be responsible for building and maintaining our cloud infrastructure and deployment pipelines.

**Key Responsibilities:**
• Design and implement scalable cloud infrastructure on AWS
• Build and maintain CI/CD pipelines using Jenkins and GitLab
• Automate deployment processes and infrastructure provisioning
• Monitor system performance and implement alerting solutions
• Ensure security compliance and best practices
• Collaborate with development teams to optimize application deployment

**Benefits:**
• Competitive compensation package
• Comprehensive benefits including health, dental, and vision
• 401(k) with company matching
• Professional development opportunities
• Flexible work arrangements`,
    requirements: [
      '5+ years of DevOps or infrastructure engineering experience',
      'Strong experience with AWS cloud services',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of CI/CD tools (Jenkins, GitLab CI)',
      'Scripting skills in Python, Bash, or similar',
      'Understanding of monitoring tools (Prometheus, Grafana)',
      'Financial services experience preferred'
    ],
    skills: skillSets.devops,
    benefits: benefitsPackages[2],
    status: 'active',
    priority: 'medium',
    applicationDeadline: addTime(baseDate, 45, 'days'),
    createdAt: subtractTime(baseDate, 10, 'days'),
    updatedAt: subtractTime(baseDate, 3, 'days'),
    createdBy: 'David Rodriguez',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'CI/CD', 'Infrastructure'],
    applicationCount: 28,
    viewCount: 675
  },

  {
    id: 4,
    title: 'UX/UI Designer',
    slug: generateSlug('UX/UI Designer'),
    company: companies[3],
    department: 'Design',
    location: 'Boston, MA',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryRange: {
      min: 75000,
      max: 105000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Join our design team to create intuitive and impactful healthcare technology solutions. As a UX/UI Designer, you'll work on products that directly improve patient outcomes and healthcare experiences.

**What You'll Do:**
• Design user interfaces for web and mobile healthcare applications
• Conduct user research and usability testing
• Create wireframes, prototypes, and high-fidelity designs
• Collaborate with product managers and engineers
• Maintain and evolve our design system
• Ensure accessibility standards are met

**Impact:**
• Work on products that save lives
• Collaborate with healthcare professionals
• Shape the future of digital health
• Grow with a fast-expanding team`,
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio demonstrating design process',
      'Experience with user research methodologies',
      'Knowledge of accessibility standards (WCAG)',
      'Understanding of responsive design principles',
      'Healthcare industry experience is a plus',
      'Bachelor\'s degree in Design or related field'
    ],
    skills: skillSets.design,
    benefits: benefitsPackages[3],
    status: 'active',
    priority: 'medium',
    applicationDeadline: addTime(baseDate, 20, 'days'),
    createdAt: subtractTime(baseDate, 12, 'days'),
    updatedAt: subtractTime(baseDate, 4, 'days'),
    createdBy: 'Emily Watson',
    tags: ['UX', 'UI', 'Design', 'Healthcare', 'Figma'],
    applicationCount: 41,
    viewCount: 920
  },

  {
    id: 5,
    title: 'Product Manager',
    slug: generateSlug('Product Manager'),
    company: companies[4],
    department: 'Product',
    location: 'Portland, OR',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salaryRange: {
      min: 110000,
      max: 145000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Lead product development for our sustainable technology solutions. As a Product Manager, you'll drive the product strategy and roadmap for our environmental impact products.

**Responsibilities:**
• Define product vision and strategy for sustainability products
• Conduct market research and competitive analysis
• Work with engineering teams to prioritize features
• Collaborate with stakeholders across the organization
• Analyze product metrics and user feedback
• Drive go-to-market strategies for new features

**Mission-Driven Work:**
• Contribute to environmental sustainability
• Work with cutting-edge clean technology
• Make a positive impact on the planet
• Join a passionate and dedicated team`,
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership abilities',
      'Data-driven decision making approach',
      'Experience with product analytics tools',
      'Environmental or clean tech industry experience preferred',
      'MBA or technical degree preferred'
    ],
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Market Research', 'Stakeholder Management', 'Roadmapping'],
    benefits: benefitsPackages[4],
    status: 'active',
    priority: 'high',
    applicationDeadline: addTime(baseDate, 35, 'days'),
    createdAt: subtractTime(baseDate, 8, 'days'),
    updatedAt: subtractTime(baseDate, 1, 'days'),
    createdBy: 'Alex Thompson',
    tags: ['Product Manager', 'Strategy', 'Clean Tech', 'Sustainability'],
    applicationCount: 37,
    viewCount: 1150
  },

  {
    id: 6,
    title: 'Data Scientist',
    slug: generateSlug('Data Scientist'),
    company: companies[1],
    department: 'Data Science',
    location: 'Austin, TX',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryRange: {
      min: 100000,
      max: 140000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Join our AI research team as a Data Scientist! You'll work on machine learning models that power our intelligent products and help our clients make data-driven decisions.

**What You'll Do:**
• Develop and deploy machine learning models
• Analyze large datasets to extract insights
• Collaborate with engineering teams on model implementation
• Present findings to stakeholders and leadership
• Stay current with latest ML/AI research
• Contribute to our data science platform and tools`,
    requirements: [
      '3+ years of data science experience',
      'Strong proficiency in Python and SQL',
      'Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)',
      'Knowledge of statistics and experimental design',
      'Experience with cloud platforms (AWS, GCP)',
      'Strong communication and visualization skills',
      'Master\'s degree in Data Science, Statistics, or related field'
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow', 'AWS', 'Data Visualization'],
    benefits: benefitsPackages[1],
    status: 'active',
    priority: 'medium',
    applicationDeadline: addTime(baseDate, 28, 'days'),
    createdAt: subtractTime(baseDate, 6, 'days'),
    updatedAt: subtractTime(baseDate, 2, 'days'),
    createdBy: 'Dr. Lisa Park',
    tags: ['Data Science', 'Machine Learning', 'Python', 'AI'],
    applicationCount: 29,
    viewCount: 780
  },

  {
    id: 7,
    title: 'Marketing Manager',
    slug: generateSlug('Marketing Manager'),
    company: companies[3],
    department: 'Marketing',
    location: 'Boston, MA',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryRange: {
      min: 70000,
      max: 95000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Drive marketing initiatives for our healthcare technology products. You'll develop and execute marketing strategies to reach healthcare professionals and organizations.

**Key Responsibilities:**
• Develop and execute integrated marketing campaigns
• Manage content marketing and social media strategies
• Analyze marketing performance and ROI
• Collaborate with sales teams on lead generation
• Manage vendor relationships and marketing budget
• Organize and participate in industry conferences`,
    requirements: [
      '4+ years of marketing experience',
      'Experience in B2B marketing, preferably healthcare',
      'Strong analytical and project management skills',
      'Proficiency in marketing automation tools',
      'Content creation and campaign management experience',
      'Bachelor\'s degree in Marketing or related field'
    ],
    skills: skillSets.marketing,
    benefits: benefitsPackages[3],
    status: 'active',
    priority: 'low',
    applicationDeadline: addTime(baseDate, 40, 'days'),
    createdAt: subtractTime(baseDate, 15, 'days'),
    updatedAt: subtractTime(baseDate, 7, 'days'),
    createdBy: 'Jennifer Adams',
    tags: ['Marketing', 'B2B', 'Healthcare', 'Campaign Management'],
    applicationCount: 22,
    viewCount: 540
  },

  {
    id: 8,
    title: 'Backend Developer',
    slug: generateSlug('Backend Developer'),
    company: companies[2],
    department: 'Engineering',
    location: 'New York, NY',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryRange: {
      min: 95000,
      max: 125000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Join our backend engineering team to build scalable financial services infrastructure. You'll work on high-performance systems that process millions of transactions daily.

**What You'll Build:**
• Scalable microservices architecture
• High-frequency trading systems
• Real-time data processing pipelines
• Secure financial APIs
• Database optimization and performance tuning`,
    requirements: [
      '3+ years of backend development experience',
      'Strong proficiency in Java or Python',
      'Experience with microservices architecture',
      'Knowledge of databases (PostgreSQL, Redis)',
      'Understanding of financial systems (preferred)',
      'Experience with message queues and event streaming'
    ],
    skills: skillSets.backend,
    benefits: benefitsPackages[2],
    status: 'active',
    priority: 'medium',
    applicationDeadline: addTime(baseDate, 22, 'days'),
    createdAt: subtractTime(baseDate, 9, 'days'),
    updatedAt: subtractTime(baseDate, 3, 'days'),
    createdBy: 'Robert Kim',
    tags: ['Backend', 'Java', 'Microservices', 'Financial Services'],
    applicationCount: 31,
    viewCount: 690
  },

  {
    id: 9,
    title: 'Mobile Developer (React Native)',
    slug: generateSlug('Mobile Developer (React Native)'),
    company: companies[0],
    department: 'Mobile',
    location: 'San Francisco, CA',
    locationType: 'hybrid',
    employmentType: 'contract',
    experienceLevel: 'senior',
    salaryRange: {
      min: 80,
      max: 120,
      currency: 'USD',
      period: 'hourly'
    },
    description: `We're seeking a Senior Mobile Developer to build our cross-platform mobile applications using React Native. This is a 6-month contract with potential for extension.

**Project Focus:**
• Build new features for our mobile applications
• Optimize performance for iOS and Android
• Integrate with existing backend services
• Collaborate with design team on user experience
• Implement automated testing and CI/CD`,
    requirements: [
      '4+ years of mobile development experience',
      'Strong expertise in React Native',
      'Experience with native iOS and Android development',
      'Knowledge of mobile app store deployment',
      'Understanding of mobile security best practices'
    ],
    skills: skillSets.mobile,
    benefits: ['Flexible Schedule', 'Contract Rate', 'Remote Work Options'],
    status: 'active',
    priority: 'medium',
    applicationDeadline: addTime(baseDate, 15, 'days'),
    createdAt: subtractTime(baseDate, 4, 'days'),
    updatedAt: subtractTime(baseDate, 1, 'days'),
    createdBy: 'Sarah Johnson',
    tags: ['Mobile', 'React Native', 'Contract', 'iOS', 'Android'],
    applicationCount: 18,
    viewCount: 420
  },

  {
    id: 10,
    title: 'HR Business Partner',
    slug: generateSlug('HR Business Partner'),
    company: companies[4],
    department: 'Human Resources',
    location: 'Portland, OR',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salaryRange: {
      min: 85000,
      max: 110000,
      currency: 'USD',
      period: 'yearly'
    },
    description: `Partner with leadership to drive HR strategy and initiatives. You'll play a key role in building our company culture and supporting our growing team.

**Strategic Focus:**
• Partner with department heads on talent strategy
• Lead employee engagement and retention initiatives
• Develop and implement HR policies and procedures
• Support organizational change management
• Drive diversity, equity, and inclusion programs`,
    requirements: [
      '5+ years of HR business partner experience',
      'Strong knowledge of employment law',
      'Experience with HRIS systems',
      'Excellent communication and interpersonal skills',
      'Change management experience'
    ],
    skills: skillSets.hr,
    benefits: benefitsPackages[4],
    status: 'draft',
    priority: 'low',
    applicationDeadline: addTime(baseDate, 50, 'days'),
    createdAt: subtractTime(baseDate, 2, 'days'),
    updatedAt: subtractTime(baseDate, 1, 'days'),
    createdBy: 'Patricia Wilson',
    tags: ['HR', 'Business Partner', 'Leadership', 'Culture'],
    applicationCount: 0,
    viewCount: 85
  }
];

// Export individual job for testing
export const getJobById = (id) => {
  return seedJobs.find(job => job.id === id);
};

// Export jobs by status
export const getJobsByStatus = (status) => {
  return seedJobs.filter(job => job.status === status);
};

// Export jobs by department
export const getJobsByDepartment = (department) => {
  return seedJobs.filter(job => job.department === department);
};

// Export active jobs count
export const getActiveJobsCount = () => {
  return seedJobs.filter(job => job.status === 'active').length;
};

export default seedJobs;