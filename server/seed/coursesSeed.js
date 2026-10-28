const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

const initialCourses = [
  {
    slug: 'mca',
    title: 'MCA — Master of Computer Applications',
    shortDesc: 'Master of Computer Applications',
    icon: 'fa-laptop-code',
    overview: 'The Master of Computer Applications (MCA) is a two-year postgraduate program designed to develop professionals in software development, system design, networking, and advanced computing. It focuses on practical knowledge, analytical thinking, and technical skills required in the IT industry.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'BCA / B.Sc (IT) / B.Tech (CS) or equivalent with minimum 50% marks',
    intake: 60,
    fees: '₹75,000 / year',
    coreSubjects: ['DSA', 'DBMS', 'OS', 'Web Technologies', 'Java', 'AI & Cloud Computing'],
    careerOptions: ['Software Engineer', 'Full Stack Developer', 'Data Analyst', 'System Architect'],
    syllabus: [
      { semester: 1, title: 'Foundations of Computing', subjects: ['Programming in C++', 'Computer Networks', 'Discrete Mathematics', 'Computer Organization'] },
      { semester: 2, title: 'Core Systems & Data', subjects: ['Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems', 'Software Engineering'] },
      { semester: 3, title: 'Advanced Technologies', subjects: ['Web Technologies', 'Machine Learning', 'Cloud Computing', 'Cyber Security'] },
      { semester: 4, title: 'Industry Practicum', subjects: ['Major Capstone Project', 'Industrial Internship', 'Seminar & Viva'] }
    ]
  },
  {
    slug: 'mba',
    title: 'MBA — Master of Business Administration',
    shortDesc: 'Master of Business Administration',
    icon: 'fa-building-columns',
    overview: 'The Master of Business Administration (MBA) prepares future leaders and managers with comprehensive skills in business strategy, financial management, marketing, human resources, and business analytics.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Bachelor degree in any discipline with minimum 50% aggregate',
    intake: 120,
    fees: '₹90,000 / year',
    coreSubjects: ['Financial Management', 'Marketing Management', 'HR Management', 'Business Analytics', 'Operations Management'],
    careerOptions: ['Product Manager', 'Management Consultant', 'Financial Analyst', 'Marketing Director'],
    syllabus: [
      { semester: 1, title: 'Business Fundamentals', subjects: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Organizational Behaviour'] },
      { semester: 2, title: 'Functional Management', subjects: ['Marketing Management', 'Human Resource Management', 'Operations Research', 'Corporate Finance'] },
      { semester: 3, title: 'Specializations', subjects: ['Strategic Management', 'Business Intelligence & Analytics', 'Elective Domain I', 'Elective Domain II'] },
      { semester: 4, title: 'Strategy & Project', subjects: ['Corporate Governance', 'Entrepreneurship Development', 'Master Thesis & Project'] }
    ]
  },
  {
    slug: 'btech-cse',
    title: 'B.Tech — Computer Science & Engineering',
    shortDesc: 'Computer Science & Engineering',
    icon: 'fa-microchip',
    overview: 'B.Tech Computer Science & Engineering focuses on foundational and modern computing principles, systems engineering, programming paradigms, computer architecture, and distributed networks.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 60%',
    intake: 180,
    fees: '₹1,20,000 / year',
    coreSubjects: ['Algorithms', 'Compiler Design', 'Computer Networks', 'Operating Systems', 'Database Systems', 'Software Engineering'],
    careerOptions: ['Software Development Engineer', 'Systems Engineer', 'Cloud Architect', 'DevOps Specialist'],
    syllabus: [
      { semester: 1, title: 'Engineering Foundations I', subjects: ['Engineering Mathematics I', 'Programming in C', 'Engineering Physics', 'Digital Electronics'] },
      { semester: 2, title: 'Engineering Foundations II', subjects: ['Engineering Mathematics II', 'Object Oriented Programming (C++)', 'Data Structures', 'Environmental Science'] },
      { semester: 3, title: 'Core Systems', subjects: ['Discrete Mathematics', 'Design & Analysis of Algorithms', 'Computer Organization & Architecture', 'DBMS'] },
      { semester: 4, title: 'Applied Systems', subjects: ['Operating Systems', 'Theory of Computation', 'Computer Networks', 'Microprocessors'] }
    ]
  },
  {
    slug: 'btech-cseit',
    title: 'B.Tech — Computer Science & Information Technology',
    shortDesc: 'Computer Science & Information Technology',
    icon: 'fa-desktop',
    overview: 'Bridging computational science and information systems, this program emphasizes enterprise networking, information security, internet technologies, and distributed database systems.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry',
    intake: 120,
    fees: '₹1,15,000 / year',
    coreSubjects: ['Information Systems', 'Web Engineering', 'Network Security', 'Distributed Systems', 'Cloud Computing'],
    careerOptions: ['IT Consultant', 'Network Administrator', 'Full Stack Engineer', 'Cyber Security Analyst'],
    syllabus: [
      { semester: 1, title: 'First Year Core', subjects: ['Applied Mathematics', 'Introduction to Computing', 'Basic Electrical', 'Engineering Graphics'] },
      { semester: 2, title: 'Core Computing', subjects: ['Python Programming', 'Data Structures', 'Digital Logic Design', 'Communication Skills'] },
      { semester: 3, title: 'Information Systems', subjects: ['Database Management Systems', 'Software Engineering', 'Computer Networks', 'Java Programming'] },
      { semester: 4, title: 'Enterprise Technologies', subjects: ['Web Technologies', 'Information Security', 'Cloud Infrastructure', 'Agile Methodologies'] }
    ]
  },
  {
    slug: 'btech-aiml',
    title: 'B.Tech — Artificial Intelligence & Machine Learning',
    shortDesc: 'Artificial Intelligence & Machine Learning',
    icon: 'fa-robot',
    overview: 'An advanced, high-demand specialization focusing on deep learning, neural networks, natural language processing, computer vision, robotics, and generative AI systems.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry (minimum 65%)',
    intake: 60,
    fees: '₹1,30,000 / year',
    coreSubjects: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Big Data'],
    careerOptions: ['AI/ML Engineer', 'Data Scientist', 'NLP Specialist', 'Computer Vision Engineer', 'Research Scientist'],
    syllabus: [
      { semester: 1, title: 'Foundations', subjects: ['Linear Algebra & Calculus', 'Python for Data Science', 'Engineering Physics', 'Problem Solving with Logic'] },
      { semester: 2, title: 'Data & Systems', subjects: ['Probability & Statistics', 'Data Structures & Algorithms', 'Object Oriented Programming', 'Discrete Mathematics'] },
      { semester: 3, title: 'Core Machine Learning', subjects: ['Supervised & Unsupervised Learning', 'Data Preprocessing & Visualization', 'Database Systems', 'Neural Networks'] },
      { semester: 4, title: 'Advanced AI & Deep Learning', subjects: ['Deep Learning with PyTorch', 'Computer Vision', 'Natural Language Processing', 'AI Ethics & Governance'] }
    ]
  },
  {
    slug: 'mtech',
    title: 'M.Tech — Master of Technology',
    shortDesc: 'Master of Technology',
    icon: 'fa-gears',
    overview: 'Postgraduate research and specialization in advanced computational engineering, high performance computing, distributed algorithms, and state-of-the-art technological architectures.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.Tech / B.E. in relevant discipline or MCA / M.Sc with valid GATE score or entrance exam',
    intake: 30,
    fees: '₹85,000 / year',
    coreSubjects: ['Advanced Algorithms', 'High Performance Computing', 'Distributed Systems', 'Research Methodology'],
    careerOptions: ['Principal Research Engineer', 'Senior Architect', 'Chief Technology Officer', 'Academician / Professor'],
    syllabus: [
      { semester: 1, title: 'Advanced Core', subjects: ['Advanced Algorithm Design', 'High Performance Computing', 'Research Methodology & IPR', 'Elective I'] },
      { semester: 2, title: 'Specialized Systems', subjects: ['Distributed Computing', 'Advanced Machine Learning', 'Elective II', 'Elective III'] },
      { semester: 3, title: 'Dissertation Phase I', subjects: ['Dissertation Research I', 'Seminar & Literature Review'] },
      { semester: 4, title: 'Dissertation Phase II', subjects: ['Final Dissertation Defense', 'Conference Publication'] }
    ]
  }
];

const seedCoursesAndAssignments = async () => {
  try {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(initialCourses);
      console.log(' Seeded 6 initial academic courses into MongoDB Atlas!');
    }

    const assignmentCount = await Assignment.countDocuments();
    if (assignmentCount === 0) {
      await Assignment.insertMany([
        {
          title: 'Implement Binary Search Tree in C++',
          description: 'Write a program to implement insertion, deletion, and inorder traversal of a Binary Search Tree with time complexity analysis.',
          course: 'All',
          section: 'All',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        },
        {
          title: 'Database Normalization Case Study',
          description: 'Normalize an unnormalized college enrollment database schema up to BCNF with step-by-step functional dependency proofs.',
          course: 'All',
          section: 'All',
          dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
        },
        {
          title: 'Responsive Web Portal Layout',
          description: 'Build a responsive single page dashboard with authentication token caching and dark mode toggle.',
          course: 'All',
          section: 'All',
          dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
        }
      ]);
      console.log(' Seeded default academic assignments into MongoDB Atlas!');
    }
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
};

module.exports = seedCoursesAndAssignments;
