import { ProjectType } from '../types/projects';

export const mockProjects: ProjectType[] = [
  {
    id: '1',
    title: 'Smart City IoT Platform',
    description:
      'A comprehensive IoT platform for smart city management, including traffic monitoring, waste management, and energy optimization.',
    field: {
      id: '1',
      title: 'Development',
      description: '',
    },
    type: 'PFA',
    year: 2023,
    students: ['Ahmed Ben Ali', 'Fatma Trabelsi'],
    supervisors: ['Dr. Mohamed Karim'],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'IoT', 'MQTT'],
    images: ['assets/projects/smart-city.jpg'],
  },
  {
    id: '2',
    title: 'Predictive Maintenance System',
    description:
      'A machine learning-based system for predicting equipment failures in industrial settings, reducing downtime and maintenance costs.',
    field: {
      id: '2',
      title: 'Data Engineering',
      description: '',
    },
    type: 'PFA',
    year: 2023,
    students: ['Sami Bouazizi', 'Nour El Houda Mejri'],
    supervisors: ['Dr. Leila Sassi'],
    technologies: ['Python', 'TensorFlow', 'Kafka', 'Docker', 'AWS'],
    images: ['assets/projects/predictive-maintenance.jpg'],
    githubUrl: 'https://github.com/example/predictive-maintenance',
  },
  {
    id: '3',
    title: 'Distributed Data Processing Framework',
    description:
      'A scalable framework for processing large datasets across distributed systems with fault tolerance and high throughput.',
    field: {
      id: '3',
      title: 'Big Data',
      description: '',
    },
    type: 'PFA',
    year: 2023,
    students: ['Youssef Gharbi', 'Ines Maaloul'],
    supervisors: ['Dr. Kamel Jemai'],
    technologies: ['Scala', 'Apache Spark', 'Hadoop', 'HDFS', 'Kubernetes'],
    images: ['assets/projects/data-processing.jpg'],
    githubUrl: 'https://github.com/example/distributed-processing',
    demoUrl: 'https://demo.example.com/distributed-processing',
  },
  {
    id: '4',
    title: 'E-Learning Platform',
    description:
      'An interactive e-learning platform with personalized learning paths, progress tracking, and real-time collaboration features.',
    field: {
      id: '1',
      title: 'Development',
      description: '',
    },
    type: 'Course',
    year: 2023,
    students: ['Mariem Belkadhi', 'Omar Frikha'],
    supervisors: ['Dr. Sonia Ayachi'],
    technologies: ['React', 'Firebase', 'Express.js', 'WebRTC', 'Redux'],
    images: ['assets/projects/e-learning.jpg'],
  },
  {
    id: '5',
    title: 'Customer Segmentation Analysis',
    description:
      'A data analysis project that segments customers based on purchasing behavior, demographics, and engagement metrics.',
    field: {
      id: '2',
      title: 'Data Engineering',
      description: '',
    },
    type: 'Course',
    year: 2023,
    students: ['Rania Kammoun', 'Aziz Belhadj'],
    supervisors: ['Dr. Nabil Khelifi'],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Tableau', 'SQL'],
    images: ['assets/projects/customer-segmentation.jpg'],
  },
  {
    id: '6',
    title: 'Real-time Analytics Dashboard',
    description:
      'A real-time analytics dashboard for monitoring business metrics, user behavior, and system performance.',
    field: {
      id: '3',
      title: 'Big Data',
      description: '',
    },
    type: 'Course',
    year: 2023,
    students: ['Tarek Masmoudi', 'Salma Chaari'],
    supervisors: ['Dr. Hanen Borchani'],
    technologies: [
      'Apache Kafka',
      'Elasticsearch',
      'Kibana',
      'D3.js',
      'Node.js',
    ],
    images: ['assets/projects/real-time-dashboard.jpg'],
    demoUrl: 'https://dashboard.example.com',
  },
  {
    id: '7',
    title: 'AI-powered Resume Screening Tool',
    description:
      'An AI system that automatically screens and ranks job applications based on required skills and experience using NLP.',
    field: {
      id: '2',
      title: 'Data Engineering',
      description: '',
    },
    type: 'PFA',
    year: 2023,
    students: ['Khalil Dridi', 'Imen Arfaoui'],
    supervisors: ['Dr. Hichem Bouhlel'],
    technologies: ['Python', 'spaCy', 'FastAPI', 'PostgreSQL', 'Docker'],
    images: ['assets/projects/resume-screening.jpg'],
    githubUrl: 'https://github.com/example/resume-ai',
  },

  {
    id: '8',
    title: 'Blockchain Voting System',
    description:
      'A secure and transparent online voting system built with blockchain technology to prevent fraud and ensure integrity.',
    field: {
      id: '1',
      title: 'Development',
      description: '',
    },
    type: 'PFA',
    year: 2023,
    students: ['Hanen Yahia', 'Bilel Mhiri'],
    supervisors: ['Dr. Rami Jaziri'],
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'IPFS'],
    images: ['assets/projects/blockchain-voting.jpg'],
    githubUrl: 'https://github.com/example/blockchain-vote',
    demoUrl: 'https://vote.example.com',
  },

  {
    id: '9',
    title: 'Sales Forecasting Model',
    description:
      'A forecasting system that predicts future sales using historical data and seasonal trends, aiding decision-making.',
    field: {
      id: '2',
      title: 'Data Engineering',
      description: '',
    },
    type: 'Summary Internship',
    year: 2023,
    students: ['Ons Neji'],
    supervisors: ['Dr. Walid Krichen'],
    technologies: ['R', 'Prophet', 'SQL', 'Power BI'],
    images: ['assets/projects/sales-forecast.jpg'],
  },

  {
    id: '10',
    title: 'Cloud File Sharing Platform',
    description:
      'A secure cloud platform allowing users to store and share files with role-based access and encrypted storage.',
    field: {
      id: '1',
      title: 'Development',
      description: '',
    },
    type: 'Course',
    year: 2023,
    students: ['Mehdi Chaabane', 'Lina Kallel'],
    supervisors: ['Dr. Amine Abbes'],
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'AWS S3'],
    images: ['assets/projects/cloud-sharing.jpg'],
    demoUrl: 'https://fileshare.example.com',
  },
];
