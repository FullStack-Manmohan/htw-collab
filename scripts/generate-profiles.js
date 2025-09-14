const fs = require('fs');

// Parse interest categories from the text file
const INTEREST_DATA = `Sustainability and Ecology
	Ecology
	Conservation
	Climate Change Science
	Marine Biology
	Sustainable Agriculture
	Renewable Energy
	Green Building
	Circular Economy
	Waste Reduction
	Land Management
	Reforestation
	Corporate Social Responsibility
AEC (Architecture, Eng & Construction)
	Architectural Design
	Structural Engineering
	BIM
	Sustainable Architecture
	Construction Technology
	Smart Cities
	Urban Planning
	Landscape Architecture
	Real Estate Investment
	PropTech
AR/VR & Metaverse
	Virtual Reality (VR) Development
	Augmented Reality (AR) Applications
	Metaverse Platforms
	Spatial Computing
	Digital Twins
	Game Design
	Interactive Storytelling
	3D Printing
	Animation & Motion Graphics
Hawaiian Art and Culture
	Hawaiian Language (ʻŌlelo Hawaiʻi)
	Hula
	Traditional Hawaiian Crafts
	Voyaging & Traditional Navigation
	Hawaiian History & Mythology
	Museum Curation
	Cultural Heritage Preservation
	Art History
Art and Culture
	Digital Art
	Generative Art
	Animation
	Film Production
	Podcasting
	Music Production
	Creative Writing
	Theater & Performing Arts
	Museum Curation
	Art History
	Photography
	Graphic Design
	Fashion Design
	Interior Design
Bitcoin & Crypto
	Blockchain Technology
	Cryptocurrency
	Decentralized Finance (DeFi)
	Web3
	NFTs
	Algorithmic Trading
	Cybersecurity
	FinTech
Consulting & Professional Services
	Business Strategy
	Project Management (Agile, Scrum)
	Change Management
	Leadership
	Public Speaking
	Negotiation
	Corporate Finance
	Mergers & Acquisitions
	Market Research
Education & EdTech
	Educational Technology (EdTech)
	Online Learning
	STEM/STEAM Education
	Gamification in Learning
	Lifelong Learning
	Curriculum Development
	Instructional Design
	Educational Psychology
Gaming & Entertainment
	Game Design & Development
	Esports
	Interactive Storytelling
	Animation & Motion Graphics
	Music Production
	Sound Design
	Virtual Reality (VR)
	Augmented Reality (AR)
Government & Public Sector
	Public Policy
	Civic Technology (CivicTech)
	Diplomacy
	Non-Profit Management
	Social Entrepreneurship
	Urban Planning
	Smart Cities
	Public Health
Investment & Venture Capital
	Venture Capital
	Angel Investing
	Impact Investing
	ESG
	FinTech
	Stock Market Analysis
	Mergers & Acquisitions
	Corporate Finance
	Financial Modeling
	Startup Pitching
Marketing & AdTech
	Digital Marketing
	Content Strategy
	SEO
	Social Media Marketing
	Marketing Technology (MarTech/AdTech)
	Data-Driven Marketing
	Branding
	Public Relations
	E-commerce
Media & Communications
	Journalism
	Public Relations
	Brand Storytelling
	Podcasting
	Film Production
	Social Media Management
	Content Strategy
	Digital Media
Real Estate & PropTech
	Real Estate Investment
	PropTech
	Green Building
	Smart Cities
	Urban Planning
	Architectural Design
	Construction Technology
Software & Technology
	Web Development
	Mobile App Development
	Cloud Computing
	DevOps
	Open Source Software
	Data Science
	Cybersecurity
	AI/Machine Learning
	IoT
	Robotics
	Blockchain
Student
	Online Learning
	Lifelong Learning
	Career Coaching
	Networking Skills
	Personal Branding
	Financial Literacy
	Time Management
	Productivity Hacks
	Mental Health and Wellness
	Mindfulness and Meditation
Leadership
Project Management
Public Speaking
Networking Skills
Personal Branding
Financial Literacy
Time Management
Productivity Hacks
Mental Health and Wellness
Mindfulness and Meditation
Stoicism
Biohacking
Creative Coding`;

// Parse interests from the hierarchical data
function parseInterests(data) {
  const lines = data.split('\n').filter(line => line.trim());
  const interests = [];
  
  for (const line of lines) {
    if (line.startsWith('\t')) {
      // This is an interest under a category
      interests.push(line.trim());
    } else {
      // This is a standalone interest or category
      const trimmed = line.trim();
      if (!trimmed.includes(' & ') && !trimmed.includes('(') && trimmed !== 'Student') {
        // Add as interest if it's not obviously a category title
        if (!['Sustainability and Ecology', 'AEC', 'AR/VR', 'Hawaiian Art and Culture', 
              'Art and Culture', 'Bitcoin', 'Consulting', 'Education', 'Gaming', 
              'Government', 'Investment', 'Marketing', 'Media', 'Real Estate', 
              'Software'].some(cat => trimmed.includes(cat.split(' ')[0]))) {
          interests.push(trimmed);
        }
      }
    }
  }
  
  return interests;
}

const allInterests = parseInterests(INTEREST_DATA);
console.log('Found', allInterests.length, 'interests');

// Helper functions
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomChoices(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Data for profile generation
const firstNames = [
  'Akira', 'Keoni', 'Leilani', 'Makoa', 'Nalani', 'Koa', 'Pika', 'Moana', 'Kai', 'Naia',
  'James', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Chris', 'Ashley', 'Matt', 'Lauren',
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Blake', 'Cameron', 'Drew',
  'Elena', 'Diego', 'Sofia', 'Luis', 'Maya', 'Carlos', 'Isabella', 'Antonio', 'Gabriela', 'Jose',
  'Yuki', 'Hiroshi', 'Sakura', 'Takeshi', 'Ami', 'Kenji', 'Rina', 'Daichi', 'Yui', 'Ryo',
  'Wei', 'Li', 'Mei', 'Chen', 'Ling', 'Feng', 'Xia', 'Jun', 'Yan', 'Hui',
  'Priya', 'Arjun', 'Kavya', 'Rohan', 'Anaya', 'Vikram', 'Ishita', 'Kiran', 'Sanya', 'Raj',
  'Amara', 'Kofi', 'Zara', 'Kwame', 'Nia', 'Jabari', 'Kaya', 'Asante', 'Zuri', 'Jengo'
];

const lastNames = [
  'Kamehameha', 'Nakamura', 'Tanaka', 'Yamamoto', 'Takahashi', 'Watanabe', 'Ito', 'Suzuki', 'Kato', 'Yoshida',
  'Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres',
  'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson',
  'Chen', 'Wong', 'Lee', 'Liu', 'Chang', 'Yang', 'Wu', 'Huang', 'Zhou', 'Wang',
  'Patel', 'Shah', 'Singh', 'Kumar', 'Sharma', 'Gupta', 'Mehta', 'Jain', 'Reddy', 'Kapoor',
  'Kim', 'Park', 'Choi', 'Jung', 'Kang', 'Yoon', 'Lim', 'Han', 'Oh', 'Seo',
  'Okafor', 'Adebayo', 'Mensah', 'Asante', 'Boateng', 'Owusu', 'Kofi', 'Akoto', 'Darko', 'Sarpong'
];

const techRoles = [
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer',
  'Data Scientist', 'ML Engineer', 'AI Researcher', 'DevOps Engineer', 'Cloud Architect',
  'Product Manager', 'UX Designer', 'UI Designer', 'Product Designer', 'Design Lead',
  'Engineering Manager', 'Tech Lead', 'Solutions Architect', 'Security Engineer',
  'Mobile Developer', 'Game Developer', 'QA Engineer', 'Site Reliability Engineer',
  'Data Engineer', 'Analytics Engineer', 'Growth Engineer', 'Platform Engineer',
  'Research Scientist', 'Technical Writer', 'Developer Advocate', 'Community Manager',
  'Startup Founder', 'CTO', 'VP Engineering', 'Head of Product', 'Design Director',
  'Business Analyst', 'Project Manager', 'Scrum Master', 'Technical Recruiter',
  'Sales Engineer', 'Customer Success Engineer', 'Implementation Specialist',
  'Blockchain Developer', 'VR Developer', 'AR Developer', 'IoT Engineer',
  'Sustainability Engineer', 'EdTech Specialist', 'FinTech Developer', 'HealthTech Engineer',
  'Climate Tech Researcher', 'Ocean Data Scientist', 'Green Building Engineer', 'Smart City Planner'
];

const hawaiiCities = [
  'Honolulu', 'Kailua', 'Kaneohe', 'Pearl City', 'Hilo', 'Kona', 'Waikiki', 'Aiea',
  'Mililani', 'Kapolei', 'Wahiawa', 'Laie', 'Haleiwa', 'Kahala', 'Hawaii Kai',
  'Keeaumoku', 'Manoa', 'Kahului', 'Waipahu', 'Ewa Beach', 'Makakilo', 'Kalihi'
];

const availabilities = ['Flexible', 'Weekends', 'Weeknights', 'Mornings', 'Afternoons'];

const skillSets = {
  'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Git', 'API Development'],
  'Data Scientist': ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Pandas'],
  'UX Designer': ['Figma', 'User Research', 'Prototyping', 'Usability Testing', 'Design Systems', 'Wireframing'],
  'Product Manager': ['Product Strategy', 'Roadmapping', 'Agile', 'Stakeholder Management', 'Analytics', 'A/B Testing'],
  'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring', 'Linux'],
  'Mobile Developer': ['React Native', 'Swift', 'Kotlin', 'Flutter', 'iOS', 'Android', 'App Store'],
  'Blockchain Developer': ['Solidity', 'Web3', 'Smart Contracts', 'Ethereum', 'DeFi', 'NFTs', 'Crypto'],
  'AI Researcher': ['Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Research', 'Publishing'],
  'Climate Tech Researcher': ['Environmental Science', 'Data Modeling', 'GIS', 'Sustainability', 'Research', 'Policy']
};

// Generate profiles
function generateProfile(id) {
  const firstName = randomChoice(firstNames);
  const lastName = randomChoice(lastNames);
  const name = `${firstName} ${lastName}`;
  const role = randomChoice(techRoles);
  const city = randomChoice(hawaiiCities);
  
  // Generate 5-10 interests
  const numInterests = randomInt(5, 10);
  const interests = randomChoices(allInterests, numInterests);
  
  // Generate skills based on role
  const baseSkills = skillSets[role] || ['Problem Solving', 'Communication', 'Teamwork', 'Leadership'];
  const numSkills = randomInt(3, 6);
  const selectedSkills = randomChoices(baseSkills, numSkills);
  const skills = selectedSkills.map(skill => ({
    name: skill,
    level: randomInt(1, 3)
  }));
  
  // Generate bio with some interest-based context
  const primaryInterest = interests[0];
  const bios = [
    `Passionate about ${primaryInterest.toLowerCase()} and building innovative solutions`,
    `Working at the intersection of technology and ${primaryInterest.toLowerCase()}`,
    `Dedicated to creating meaningful impact through ${primaryInterest.toLowerCase()}`,
    `Building the future of ${primaryInterest.toLowerCase()} in Hawaii`,
    `Combining technical expertise with passion for ${primaryInterest.toLowerCase()}`,
    `Focused on sustainable innovation in ${primaryInterest.toLowerCase()}`,
    `Driving change through technology and ${primaryInterest.toLowerCase()}`,
    `Creating solutions that matter in ${primaryInterest.toLowerCase()}`
  ];
  
  const availability = randomChoice(availabilities);
  
  // Generate links
  const links = {};
  if (Math.random() > 0.3) {
    const linkedinName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    links.linkedin = `linkedin.com/in/${linkedinName}`;
  }
  if (Math.random() > 0.7) {
    const siteName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const domains = ['.dev', '.io', '.com', '.tech'];
    links.site = `${siteName}${randomChoice(domains)}`;
  }
  
  return {
    id: (25 + id).toString(),
    name,
    role,
    city,
    bio: randomChoice(bios),
    skills,
    interests,
    availability,
    links,
    createdAt: Date.now() - (86400000 * (26 + id))
  };
}

// Generate 100 profiles
const profiles = [];
for (let i = 1; i <= 100; i++) {
  profiles.push(generateProfile(i));
}

// Output as TypeScript
const output = `import { Profile } from '../types/Profile';

export const generatedProfiles: Profile[] = ${JSON.stringify(profiles, null, 2)};
`;

fs.writeFileSync('./lib/generated-profiles.ts', output);
console.log('✅ Generated 100 profiles with interests from interest_list.txt');
console.log('📝 Saved to lib/generated-profiles.ts');

// Show stats
const allGeneratedInterests = new Set();
profiles.forEach(p => p.interests.forEach(i => allGeneratedInterests.add(i)));
console.log(`📊 Stats:
- 100 profiles generated
- ${allGeneratedInterests.size} unique interests used
- Average ${(profiles.reduce((sum, p) => sum + p.interests.length, 0) / 100).toFixed(1)} interests per profile
- ${new Set(profiles.map(p => p.role)).size} unique roles
- ${new Set(profiles.map(p => p.city)).size} unique cities`);