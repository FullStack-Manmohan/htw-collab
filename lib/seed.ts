import { Profile } from '../types/Profile';

export const seedProfiles: Profile[] = [
  {
    id: '1',
    name: 'Kai Nakamura',
    role: 'Full-stack Engineer',
    city: 'Honolulu',
    bio: 'Building the future of sustainable tech in paradise 🌺',
    skills: [
      { name: 'React', level: 3 },
      { name: 'TypeScript', level: 3 },
      { name: 'Node.js', level: 2 },
      { name: 'Python', level: 2 }
    ],
    interests: ['AI', 'Climate', 'Ocean Conservation'],
    availability: 'Weekends',
    links: { linkedin: 'linkedin.com/in/kainakamura' },
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: '2',
    name: 'Maya Chen',
    role: 'Product Designer',
    city: 'Honolulu',
    bio: 'Designing human-centered experiences that connect communities',
    skills: [
      { name: 'Figma', level: 3 },
      { name: 'User Research', level: 3 },
      { name: 'Prototyping', level: 2 },
      { name: 'Design Systems', level: 2 }
    ],
    interests: ['Community', 'Health', 'Education'],
    availability: 'Flexible',
    links: { site: 'mayachen.design' },
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: '3',
    name: 'Alex Patel',
    role: 'AI Engineer',
    city: 'Honolulu',
    bio: 'Applying machine learning to solve real-world problems',
    skills: [
      { name: 'Python', level: 3 },
      { name: 'TensorFlow', level: 3 },
      { name: 'MLOps', level: 2 },
      { name: 'Data Science', level: 3 }
    ],
    interests: ['AI', 'Healthcare', 'Climate'],
    availability: 'Weeknights',
    links: { linkedin: 'linkedin.com/in/alexpatel-ai' },
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: '4',
    name: 'Sophia Rivera',
    role: 'Growth PM',
    city: 'Honolulu',
    bio: 'Scaling startups with data-driven growth strategies',
    skills: [
      { name: 'Analytics', level: 3 },
      { name: 'A/B Testing', level: 3 },
      { name: 'SQL', level: 2 },
      { name: 'Product Strategy', level: 3 }
    ],
    interests: ['Fintech', 'Community', 'SaaS'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/sophiarivera' },
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: '5',
    name: 'Jordan Kim',
    role: 'Frontend Engineer',
    city: 'Kailua',
    bio: 'Crafting beautiful, accessible web experiences',
    skills: [
      { name: 'React', level: 3 },
      { name: 'CSS', level: 3 },
      { name: 'Accessibility', level: 2 },
      { name: 'Performance', level: 2 }
    ],
    interests: ['Web3', 'Design', 'Accessibility'],
    availability: 'Weekends',
    links: { site: 'jordankim.dev' },
    createdAt: Date.now() - 86400000 * 1
  },
  {
    id: '6',
    name: 'Liam Thompson',
    role: 'Backend Engineer',
    city: 'Honolulu',
    bio: 'Building scalable systems for the next billion users',
    skills: [
      { name: 'Go', level: 3 },
      { name: 'Kubernetes', level: 2 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Microservices', level: 2 }
    ],
    interests: ['Infrastructure', 'Performance', 'Open Source'],
    availability: 'Weeknights',
    links: { linkedin: 'linkedin.com/in/liamthompson' },
    createdAt: Date.now() - 86400000 * 6
  },
  {
    id: '7',
    name: 'Isabella Santos',
    role: 'UX Designer',
    city: 'Honolulu',
    bio: 'Creating inclusive designs that empower diverse communities',
    skills: [
      { name: 'User Research', level: 3 },
      { name: 'Figma', level: 2 },
      { name: 'Usability Testing', level: 3 },
      { name: 'Information Architecture', level: 2 }
    ],
    interests: ['Accessibility', 'Social Impact', 'Education'],
    availability: 'Flexible',
    links: { site: 'isabellasantos.com' },
    createdAt: Date.now() - 86400000 * 7
  },
  {
    id: '8',
    name: 'Tyler Park',
    role: 'DevOps Engineer',
    city: 'Pearl City',
    bio: 'Automating the future, one deployment at a time',
    skills: [
      { name: 'AWS', level: 3 },
      { name: 'Docker', level: 3 },
      { name: 'Terraform', level: 2 },
      { name: 'CI/CD', level: 3 }
    ],
    interests: ['Cloud', 'Automation', 'Security'],
    availability: 'Weeknights',
    links: { linkedin: 'linkedin.com/in/tylerpark-devops' },
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: '9',
    name: 'Emma Wilson',
    role: 'Product Manager',
    city: 'Honolulu',
    bio: 'Bridging the gap between technology and human needs',
    skills: [
      { name: 'Product Strategy', level: 3 },
      { name: 'Roadmapping', level: 3 },
      { name: 'Stakeholder Management', level: 2 },
      { name: 'Agile', level: 2 }
    ],
    interests: ['Healthcare', 'SaaS', 'User Experience'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/emmawilson-pm' },
    createdAt: Date.now() - 86400000 * 9
  },
  {
    id: '10',
    name: 'Carlos Rodriguez',
    role: 'Data Scientist',
    city: 'Honolulu',
    bio: 'Turning data into insights that drive meaningful change',
    skills: [
      { name: 'Python', level: 3 },
      { name: 'R', level: 2 },
      { name: 'Machine Learning', level: 3 },
      { name: 'Statistics', level: 3 }
    ],
    interests: ['Climate', 'Healthcare', 'Ocean Conservation'],
    availability: 'Weekends',
    links: { linkedin: 'linkedin.com/in/carlosrodriguez-ds' },
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: '11',
    name: 'Zoe Chang',
    role: 'Growth Marketer',
    city: 'Waikiki',
    bio: 'Building brands that resonate with island communities',
    skills: [
      { name: 'Digital Marketing', level: 3 },
      { name: 'Content Strategy', level: 2 },
      { name: 'SEO', level: 2 },
      { name: 'Social Media', level: 3 }
    ],
    interests: ['Community', 'Tourism', 'Local Business'],
    availability: 'Flexible',
    links: { site: 'zoechang.marketing' },
    createdAt: Date.now() - 86400000 * 11
  },
  {
    id: '12',
    name: 'Ryan Foster',
    role: 'Mobile Engineer',
    city: 'Kaneohe',
    bio: 'Building native mobile experiences for island life',
    skills: [
      { name: 'React Native', level: 3 },
      { name: 'iOS', level: 2 },
      { name: 'Android', level: 2 },
      { name: 'Flutter', level: 1 }
    ],
    interests: ['Mobile', 'Tourism', 'Local Apps'],
    availability: 'Weekends',
    links: { linkedin: 'linkedin.com/in/ryanfoster-mobile' },
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: '13',
    name: 'Aria Patel',
    role: 'Blockchain Engineer',
    city: 'Honolulu',
    bio: 'Exploring decentralized solutions for sustainable futures',
    skills: [
      { name: 'Solidity', level: 3 },
      { name: 'Web3', level: 3 },
      { name: 'Smart Contracts', level: 2 },
      { name: 'DeFi', level: 2 }
    ],
    interests: ['Web3', 'Sustainability', 'Finance'],
    availability: 'Weeknights',
    links: { site: 'ariapatel.crypto' },
    createdAt: Date.now() - 86400000 * 13
  },
  {
    id: '14',
    name: 'Marcus Johnson',
    role: 'Security Engineer',
    city: 'Aiea',
    bio: 'Protecting digital infrastructure in the Pacific',
    skills: [
      { name: 'Cybersecurity', level: 3 },
      { name: 'Penetration Testing', level: 2 },
      { name: 'Network Security', level: 3 },
      { name: 'Incident Response', level: 2 }
    ],
    interests: ['Security', 'Privacy', 'Infrastructure'],
    availability: 'Weeknights',
    links: { linkedin: 'linkedin.com/in/marcusjohnson-sec' },
    createdAt: Date.now() - 86400000 * 14
  },
  {
    id: '15',
    name: 'Luna Garcia',
    role: 'Visual Designer',
    city: 'Honolulu',
    bio: 'Creating visual stories inspired by island culture',
    skills: [
      { name: 'Illustration', level: 3 },
      { name: 'Brand Design', level: 3 },
      { name: 'Adobe Creative Suite', level: 3 },
      { name: 'Animation', level: 1 }
    ],
    interests: ['Art', 'Culture', 'Tourism'],
    availability: 'Flexible',
    links: { site: 'lunagarcia.art' },
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: '16',
    name: 'Noah Chen',
    role: 'QA Engineer',
    city: 'Mililani',
    bio: 'Ensuring quality in every line of code',
    skills: [
      { name: 'Test Automation', level: 3 },
      { name: 'Selenium', level: 2 },
      { name: 'Quality Assurance', level: 3 },
      { name: 'Bug Tracking', level: 2 }
    ],
    interests: ['Quality', 'Process', 'Tools'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/noahchen-qa' },
    createdAt: Date.now() - 86400000 * 16
  },
  {
    id: '17',
    name: 'Ava Martinez',
    role: 'Business Analyst',
    city: 'Honolulu',
    bio: 'Bridging business needs with technical solutions',
    skills: [
      { name: 'Business Analysis', level: 3 },
      { name: 'Process Mapping', level: 2 },
      { name: 'Requirements Gathering', level: 3 },
      { name: 'Data Analysis', level: 2 }
    ],
    interests: ['Process Improvement', 'Strategy', 'Operations'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/avamartinez-ba' },
    createdAt: Date.now() - 86400000 * 17
  },
  {
    id: '18',
    name: 'Ethan Lee',
    role: 'Technical Writer',
    city: 'Kapolei',
    bio: 'Making complex technology accessible to everyone',
    skills: [
      { name: 'Technical Writing', level: 3 },
      { name: 'Documentation', level: 3 },
      { name: 'API Documentation', level: 2 },
      { name: 'Content Strategy', level: 2 }
    ],
    interests: ['Education', 'Documentation', 'Developer Experience'],
    availability: 'Flexible',
    links: { site: 'ethanlee.docs' },
    createdAt: Date.now() - 86400000 * 18
  },
  {
    id: '19',
    name: 'Chloe Williams',
    role: 'Systems Architect',
    city: 'Honolulu',
    bio: 'Designing resilient systems for island communities',
    skills: [
      { name: 'System Design', level: 3 },
      { name: 'Architecture', level: 3 },
      { name: 'Scalability', level: 2 },
      { name: 'Performance', level: 2 }
    ],
    interests: ['Architecture', 'Scalability', 'Resilience'],
    availability: 'Weeknights',
    links: { linkedin: 'linkedin.com/in/chloewilliams-arch' },
    createdAt: Date.now() - 86400000 * 19
  },
  {
    id: '20',
    name: 'Oliver Davis',
    role: 'Community Manager',
    city: 'Honolulu',
    bio: 'Building vibrant tech communities across the Pacific',
    skills: [
      { name: 'Community Building', level: 3 },
      { name: 'Event Planning', level: 3 },
      { name: 'Social Media', level: 2 },
      { name: 'Content Creation', level: 2 }
    ],
    interests: ['Community', 'Events', 'Networking'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/oliverdavis-cm' },
    createdAt: Date.now() - 86400000 * 20
  },
  {
    id: '21',
    name: 'Stella Wong',
    role: 'Research Scientist',
    city: 'Honolulu',
    bio: 'Advancing AI research for ocean and climate science',
    skills: [
      { name: 'Research', level: 3 },
      { name: 'Machine Learning', level: 3 },
      { name: 'Data Analysis', level: 3 },
      { name: 'Scientific Writing', level: 2 }
    ],
    interests: ['AI', 'Climate', 'Ocean Conservation', 'Research'],
    availability: 'Flexible',
    links: { site: 'stellawong.research' },
    createdAt: Date.now() - 86400000 * 21
  },
  {
    id: '22',
    name: 'Diego Santos',
    role: 'Sales Engineer',
    city: 'Kahala',
    bio: 'Connecting innovative tech solutions with island businesses',
    skills: [
      { name: 'Technical Sales', level: 3 },
      { name: 'Solution Architecture', level: 2 },
      { name: 'Customer Success', level: 3 },
      { name: 'Demos', level: 3 }
    ],
    interests: ['Sales', 'Customer Success', 'B2B SaaS'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/diegosantos-se' },
    createdAt: Date.now() - 86400000 * 22
  },
  {
    id: '23',
    name: 'Harper Kim',
    role: 'Site Reliability Engineer',
    city: 'Wahiawa',
    bio: 'Keeping systems running smoothly across time zones',
    skills: [
      { name: 'SRE', level: 3 },
      { name: 'Monitoring', level: 3 },
      { name: 'Incident Management', level: 2 },
      { name: 'Automation', level: 2 }
    ],
    interests: ['Reliability', 'Monitoring', 'Automation'],
    availability: 'Flexible',
    links: { linkedin: 'linkedin.com/in/harperkim-sre' },
    createdAt: Date.now() - 86400000 * 23
  },
  {
    id: '24',
    name: 'Phoenix Taylor',
    role: 'Innovation Lead',
    city: 'Honolulu',
    bio: 'Fostering innovation in Hawaii\'s emerging tech ecosystem',
    skills: [
      { name: 'Innovation Management', level: 3 },
      { name: 'Strategy', level: 3 },
      { name: 'Venture Building', level: 2 },
      { name: 'Ecosystem Development', level: 2 }
    ],
    interests: ['Innovation', 'Startups', 'Ecosystem', 'Strategy'],
    availability: 'Flexible',
    links: { site: 'phoenixtaylor.ventures' },
    createdAt: Date.now() - 86400000 * 24
  },
  {
    id: '25',
    name: 'River Nakamura',
    role: 'Sustainability Engineer',
    city: 'Kailua',
    bio: 'Engineering solutions for a carbon-neutral Hawaii',
    skills: [
      { name: 'Sustainability', level: 3 },
      { name: 'Environmental Science', level: 2 },
      { name: 'Data Modeling', level: 3 },
      { name: 'IoT', level: 2 }
    ],
    interests: ['Sustainability', 'Climate', 'Environment', 'Clean Energy'],
    availability: 'Weekends',
    links: { site: 'rivernakamura.eco' },
    createdAt: Date.now() - 86400000 * 25
  }
];