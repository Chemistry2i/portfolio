import projectCampusBallot from '@/assets/project-campus-ballot.jpg';
import projectAgriBuddy from '@/assets/project-agri-buddy.jpg';
import projectQuickCart from '@/assets/project-quick-cart.jpg';

export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  problem: string;
  solution: string;
  results: string;
  features: string[];
  duration: string;
  role: string;
}

export const projects: ProjectData[] = [
  {
    id: 1,
    slug: 'campus-ballot',
    title: 'Campus Ballot - Online Voting System',
    description: 'A secure and transparent online voting platform designed for campus elections, featuring real-time results, voter authentication, and election management.',
    image: projectCampusBallot,
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Authentication'],
    liveUrl: 'https://campusballot.tech',
    githubUrl: 'https://github.com/Chemistry2i',
    category: 'Full Stack Development',
    problem: 'Campus elections were plagued by low voter turnout, paper ballot fraud, and delayed result announcements. Students needed a trustworthy, accessible platform to cast their votes securely from anywhere.',
    solution: 'Built a full-stack online voting system with end-to-end encryption, real-time vote counting, and multi-factor voter authentication. The platform includes an admin dashboard for election management, candidate profiles, and automated result tabulation.',
    results: 'Increased voter participation by 60%, reduced election costs by 40%, and delivered results within minutes of polls closing — compared to days with manual counting.',
    features: [
      'Secure voter authentication with student ID verification',
      'Real-time vote counting and live results dashboard',
      'Admin panel for managing elections, candidates, and voters',
      'Responsive design for mobile and desktop voting',
      'Automated email notifications for election updates',
    ],
    duration: '3 months',
    role: 'Full Stack Developer',
  },
  {
    id: 2,
    slug: 'agri-buddy',
    title: 'Agri Buddy - Agricultural Solution',
    description: 'An innovative online agricultural platform connecting farmers with resources, market insights, and expert advice for improved farming practices.',
    image: projectAgriBuddy,
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API'],
    liveUrl: 'https://agri-buddy.onrender.com',
    githubUrl: 'https://github.com/Chemistry2i',
    category: 'Full Stack Development',
    problem: 'Small-scale farmers in Uganda lacked access to real-time market prices, weather forecasts, and expert agricultural advice. This information gap led to poor crop yields and unfair pricing from middlemen.',
    solution: 'Developed a comprehensive agricultural platform that aggregates market data, provides weather-based farming recommendations, and connects farmers directly with agricultural experts through a Q&A forum.',
    results: 'Helped 200+ farmers access fair market pricing, reduced post-harvest losses by providing timely weather alerts, and created a knowledge-sharing community.',
    features: [
      'Real-time market price tracking for major crops',
      'Weather-based farming recommendations',
      'Expert Q&A forum for agricultural advice',
      'Resource library with farming best practices',
      'Mobile-first responsive interface for rural users',
    ],
    duration: '4 months',
    role: 'Full Stack Developer',
  },
  {
    id: 3,
    slug: 'quick-cart',
    title: 'Quick Cart - E-commerce Platform',
    description: 'A modern e-commerce platform with seamless shopping experience, featuring advanced filtering, secure payment integration, and inventory management.',
    image: projectQuickCart,
    tech: ['React', 'Express', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Chemistry2i',
    category: 'Full Stack Development',
    problem: 'Local businesses struggled to establish an online presence and reach customers beyond their physical locations. Existing e-commerce solutions were too expensive and complex for small business owners.',
    solution: 'Created an affordable, easy-to-use e-commerce platform with intuitive product management, secure Stripe payment processing, and automated inventory tracking. The platform supports multiple vendors and includes analytics dashboards.',
    results: 'Enabled 15+ local businesses to sell online, processing 500+ orders in the first month with a 98% payment success rate.',
    features: [
      'Advanced product search with filters and categories',
      'Secure payment processing via Stripe',
      'Vendor dashboard with sales analytics',
      'Automated inventory management and low-stock alerts',
      'Order tracking and email notifications',
    ],
    duration: '5 months',
    role: 'Full Stack Developer',
  },
];
