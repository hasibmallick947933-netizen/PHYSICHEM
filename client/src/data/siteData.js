export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Teachers', path: '/teachers' },
  { name: 'Courses', path: '/courses' },
  { name: 'Methodology', path: '/methodology' },
  { name: 'Contact', path: '/contact' },
];

export const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    subtitle: 'Understand how the universe works.',
    description: 'Explore motion, forces, energy, electricity, magnetism, optics, and the laws that shape the world around us.',
    tag: 'Classes 9–12',
    color: 'blue',
    accentColor: '#38BDF8',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    subtitle: 'Discover the science of matter.',
    description: 'Learn atoms, molecules, reactions, bonding, organic chemistry, inorganic chemistry, and physical chemistry through clear explanations.',
    tag: 'Classes 9–12',
    color: 'cyan',
    accentColor: '#22D3EE',
  },
];

export const classes = [
  {
    id: 'class-9',
    number: 9,
    title: 'Class 9',
    subjects: ['Physics', 'Chemistry'],
    description: 'Build your foundation in science.',
    highlights: ['Introduction to scientific concepts', 'Basic numerical problem-solving', 'Foundation for higher studies'],
  },
  {
    id: 'class-10',
    number: 10,
    title: 'Class 10',
    subjects: ['Physics', 'Chemistry'],
    description: 'Strengthen concepts and prepare for school and board examinations.',
    highlights: ['Board exam preparation', 'Comprehensive concept revision', 'Practice papers and mock tests'],
  },
  {
    id: 'class-11',
    number: 11,
    title: 'Class 11',
    subjects: ['Physics', 'Chemistry'],
    description: 'Develop strong higher-secondary fundamentals.',
    highlights: ['Advanced concepts introduction', 'Strong mathematical foundation', 'Competitive exam basics'],
  },
  {
    id: 'class-12',
    number: 12,
    title: 'Class 12',
    subjects: ['Physics', 'Chemistry'],
    description: 'Master concepts and prepare for examinations.',
    highlights: ['Complete syllabus coverage', 'Board + competitive exam prep', 'Advanced problem-solving'],
  },
];

export const teachers = [
  {
    id: 'physics-teacher',
    name: '[PHYSICS TEACHER NAME]',
    subject: 'Physics',
    classes: '9–12',
    qualification: '[Qualification]',
    experience: '[Experience]',
    bio: 'Helping students build conceptual clarity and confidence through clear explanations and numerical problem-solving.',
    philosophy: 'Every student can understand Physics when concepts are explained with clarity and connected to real-world examples.',
    approach: 'Concept explanation → Visual demonstrations → Numerical practice → Problem-solving mastery',
    color: 'blue',
    accentColor: '#38BDF8',
  },
  {
    id: 'chemistry-teacher',
    name: '[CHEMISTRY TEACHER NAME]',
    subject: 'Chemistry',
    classes: '9–12',
    qualification: '[Qualification]',
    experience: '[Experience]',
    bio: 'Making Chemistry easier to understand through strong fundamentals, reactions, and structured learning.',
    philosophy: 'Chemistry becomes fascinating when students understand the "why" behind every reaction and concept.',
    approach: 'Fundamental concepts → Reaction mechanisms → Practice problems → Comprehensive understanding',
    color: 'violet',
    accentColor: '#818CF8',
  },
];

export const methodologySteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'Start with clear concepts and strong fundamentals.',
    detail: 'Every topic begins with a clear explanation of the underlying concept. We ensure students understand the "why" before moving to the "how".',
  },
  {
    number: '02',
    title: 'Visualize',
    description: 'Use diagrams, examples, and scientific illustrations to understand difficult topics.',
    detail: 'Complex concepts are broken down with visual aids, real-world examples, and step-by-step demonstrations.',
  },
  {
    number: '03',
    title: 'Practice',
    description: 'Solve numerical problems, reactions, and subject-based questions.',
    detail: 'Regular practice with progressively challenging problems helps build confidence and problem-solving skills.',
  },
  {
    number: '04',
    title: 'Master',
    description: 'Revise, improve accuracy, and develop academic confidence.',
    detail: 'Through systematic revision and assessment, students develop mastery and exam readiness.',
  },
];

export const benefits = [
  'Concept-first learning',
  'Dedicated Physics and Chemistry teachers',
  'Classes 9–12',
  'Step-by-step explanations',
  'Numerical and reaction practice',
  'Focused academic guidance',
];

export const contactInfo = {
  physicsTacher: { name: '[PHYSICS TEACHER NAME]', phone: '[Phone Number]' },
  chemistryTeacher: { name: '[CHEMISTRY TEACHER NAME]', phone: '[Phone Number]' },
  email: '[Email Address]',
  address: '[Coaching Centre Address]',
  whatsapp: '[WhatsApp Number]',
};

export const trustPoints = [
  { icon: 'Atom', title: 'Strong Fundamentals', description: 'Understand the basics before moving to advanced concepts.' },
  { icon: 'Users', title: 'Dedicated Teachers', description: 'Learn with focused guidance from Physics and Chemistry experts.' },
  { icon: 'Target', title: 'Exam Confidence', description: 'Develop the skills and understanding needed for academic success.' },
];
