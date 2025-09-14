import { Profile, Skill } from '../types/Profile';

// Parse the interest taxonomy and extract all interests
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

// Extract all interests from the taxonomy
function extractInterests(data: string): string[] {
  const lines = data.split('\n').map(line => line.trim()).filter(line => line);
  const interests: string[] = [];
  
  for (const line of lines) {
    if (line.startsWith('\t')) {
      // This is an interest under a category
      interests.push(line.substring(1));
    } else {
      // This is either a category or standalone interest
      // Check if it appears as a subcategory elsewhere
      const isCategory = lines.some(l => l.startsWith('\t' + line));
      if (!isCategory) {
        interests.push(line);
      }
    }
  }
  
  return [...new Set(interests)]; // Remove duplicates
}

const ALL_INTERESTS = extractInterests(INTEREST_DATA);

// Profile generation data
const FIRST_NAMES = [
  'Ava', 'Kai', 'Leilani', 'Mason', 'Sophia', 'Ethan', 'Isabella', 'Noah', 'Mia', 'Aiden',
  'Emma', 'Lucas', 'Olivia', 'Liam', 'Charlotte', 'James', 'Amelia', 'Benjamin', 'Harper', 'Gabriel',
  'Evelyn', 'Alexander', 'Abigail', 'Michael', 'Emily', 'Elijah', 'Elizabeth', 'Owen', 'Sofia', 'Jackson',
  'Madison', 'Sebastian', 'Avery', 'Jack', 'Ella', 'Luke', 'Scarlett', 'Jacob', 'Victoria', 'Logan',
  'Aria', 'Matthew', 'Grace', 'Daniel', 'Chloe', 'Henry', 'Camila', 'Joseph', 'Penelope', 'Samuel',
  'Riley', 'David', 'Layla', 'Carter', 'Lillian', 'Wyatt', 'Nora', 'Jayden', 'Zoey', 'John',
  'Mila', 'Owen', 'Aubrey', 'Dylan', 'Hannah', 'Nathan', 'Lily', 'Grayson', 'Addison', 'Isaac',
  'Eleanor', 'Ryan', 'Natalie', 'Connor', 'Luna', 'Caleb', 'Savannah', 'Max', 'Brooklyn', 'Kevin',
  'Leah', 'Ian', 'Zoe', 'Cole', 'Stella', 'Hunter', 'Hazel', 'Thomas', 'Ellie', 'Chase',
  'Paisley', 'Jason', 'Audrey', 'Adrian', 'Skylar', 'Aaron', 'Violet', 'Charles', 'Claire', 'Bryce',
  'Bella', 'Jordan', 'Aurora', 'Evan', 'Lucy', 'Blake', 'Anna', 'Cooper', 'Samantha', 'Xavier',
  'Caroline', 'Parker', 'Genesis', 'Ashton', 'Aaliyah', 'Jaxon', 'Kennedy', 'Jose', 'Kinsley', 'Brayden',
  'Allison', 'Nicholas', 'Maya', 'Adam', 'Sarah', 'Nolan', 'Madelyn', 'Jeremiah', 'Adeline', 'Christian',
  'Alexa', 'William', 'Ariana', 'Landon', 'Elena', 'Gavin', 'Gabriella', 'Colin', 'Naomi', 'Jonathan',
  'Alice', 'Santiago', 'Sadie', 'Easton', 'Hailey', 'Angel', 'Eva', 'Jace', 'Emilia', 'Cameron',
  'Autumn', 'Levi', 'Quinn', 'Hudson', 'Nevaeh', 'Mateo', 'Piper', 'Julian', 'Ruby', 'Ayden',
  'Serenity', 'Eli', 'Willow', 'Jaxson', 'Everly', 'Braxton', 'Cora', 'Bentley', 'Kaylee', 'Lincoln',
  'Lydia', 'Joshua', 'Nova', 'Christopher', 'Brielle', 'Andrew', 'Delilah', 'Theodore', 'Isla', 'Josiah',
  'Jade', 'Elias', 'Mackenzie', 'Wayne', 'Sydney', 'Alex', 'Melanie', 'Salvador', 'Josephine', 'Damian'
];

const LAST_NAMES = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez',
  'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez',
  'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart',
  'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson',
  'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson',
  'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price',
  'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez', 'Powell',
  'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes', 'Gonzales',
  'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham', 'Reynolds',
  'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson', 'Ellis',
  'Tran', 'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens', 'Harrison',
  'Fernandez', 'McDonald', 'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen', 'Freeman',
  'Webb', 'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter', 'Gordon',
  'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon', 'Munoz', 'Hunt', 'Hicks', 'Holmes',
  'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar', 'Fox', 'Warren',
  'Mills', 'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels', 'Ferguson', 'Nichols', 'Stephens', 'Soto',
  'Weaver', 'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn', 'Kelley', 'Spencer', 'Hawkins', 'Arnold'
];

const ROLES = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer',
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer', 'ML Engineer',
  'Architect', 'Urban Planner', 'Structural Engineer', 'Construction Manager', 'Interior Designer',
  'Real Estate Developer', 'Environmental Consultant', 'Sustainability Analyst', 'Renewable Energy Engineer',
  'Digital Artist', 'Graphic Designer', 'Art Director', 'Museum Curator', 'Cultural Historian',
  'Film Producer', 'Content Creator', 'Podcast Host', 'Music Producer', 'Creative Writer',
  'Venture Capitalist', 'Angel Investor', 'Financial Analyst', 'Investment Manager', 'Startup Founder',
  'Business Strategist', 'Management Consultant', 'Project Manager', 'Operations Manager', 'HR Director',
  'Marketing Manager', 'Digital Marketer', 'Brand Manager', 'Social Media Manager', 'Content Strategist',
  'Journalist', 'PR Specialist', 'Communications Director', 'Media Producer', 'Documentary Filmmaker',
  'Game Developer', 'VR Developer', 'AR Specialist', '3D Artist', 'Animation Director',
  'Blockchain Developer', 'Crypto Analyst', 'DeFi Specialist', 'Web3 Product Manager', 'NFT Creator',
  'Educator', 'EdTech Specialist', 'Curriculum Designer', 'Learning Experience Designer', 'Educational Psychologist',
  'Public Policy Analyst', 'Civic Tech Developer', 'Non-Profit Director', 'Social Entrepreneur', 'Community Organizer',
  'Research Scientist', 'Marine Biologist', 'Climate Researcher', 'Conservation Biologist', 'Environmental Engineer',
  'Student - Computer Science', 'Student - Engineering', 'Student - Business', 'Student - Design', 'Graduate Student',
  'Tech Lead', 'Engineering Manager', 'CTO', 'Chief Product Officer', 'Innovation Director',
  'Freelance Designer', 'Independent Consultant', 'Creative Director', 'Brand Strategist', 'Design Researcher',
  'Healthcare Tech Specialist', 'Biotech Researcher', 'Medical Device Engineer', 'Health Data Analyst', 'Digital Health Product Manager',
  'E-commerce Manager', 'Growth Hacker', 'SEO Specialist', 'Performance Marketing Manager', 'Conversion Rate Optimizer'
];

const COMPANIES = [
  'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Spotify', 'Airbnb', 'Uber',
  'Salesforce', 'Adobe', 'Nvidia', 'Intel', 'Oracle', 'IBM', 'Cisco', 'VMware', 'ServiceNow', 'Zoom',
  'Stripe', 'Square', 'PayPal', 'Coinbase', 'Robinhood', 'Plaid', 'Figma', 'Notion', 'Slack', 'Discord',
  'GitHub', 'GitLab', 'Atlassian', 'MongoDB', 'Snowflake', 'Databricks', 'Palantir', 'Twilio', 'SendGrid', 'Okta',
  'University of Hawaii', 'Hawaii Pacific University', 'Chaminade University', 'Brigham Young University Hawaii',
  'Hawaiian Electric', 'Hawaiian Airlines', 'Alexander & Baldwin', 'Castle & Cooke', 'Kamehameha Schools',
  'First Hawaiian Bank', 'Bank of Hawaii', 'Hawaii State Federal Credit Union', 'Hawaii Community Foundation',
  'Blue Planet Foundation', 'Hawaii Green Growth', 'Sustainable Coastlines Hawaii', 'Malama Maunalua',
  'Honolulu Museum of Art', 'Bishop Museum', 'Polynesian Cultural Center', 'Hawaii Theatre Center',
  'DTRIC Insurance', 'Hawaii Medical Service Association', 'Kaiser Permanente Hawaii', 'Straub Medical Center',
  'RAND Corporation', 'East-West Center', 'Pacific International Center for High Technology Research',
  'Hawaii Ocean Science & Technology Park', 'High Technology Development Corporation', 'Blue Startups',
  'Henk Rogers Foundation', 'Elemental Excelerator', 'Energy Excelerator', 'XLR8UH', 'HTDC Incubators',
  'Honolulu Authority for Rapid Transportation', 'Hawaii Department of Transportation', 'City and County of Honolulu',
  'State of Hawaii', 'Hawaii Tourism Authority', 'Hawaii Convention Center', 'Hawaii Visitors and Convention Bureau',
  'Outrigger Enterprises', 'Hilton Grand Vacations', 'Marriott Vacations Worldwide', 'The Ritz-Carlton',
  'Ward Village', 'Howard Hughes Corporation', 'Brookfield Properties', 'Forest City Hawaii',
  'Hawaiian Host', 'Maui Jim', 'Crazy Shirts', 'Fighting Eel', 'Patagonia Hawaii', 'Whole Foods Market Hawaii'
];

const BIOS = [
  'Passionate about building technology that makes a positive impact on the world.',
  'Dedicated to creating sustainable solutions for Hawaii\'s environmental challenges.',
  'Focused on bridging the gap between traditional Hawaiian culture and modern innovation.',
  'Committed to advancing renewable energy adoption across the Pacific islands.',
  'Working to preserve and promote Hawaiian language and cultural heritage.',
  'Building immersive experiences that connect people with nature and culture.',
  'Developing educational technology to improve learning outcomes for underserved communities.',
  'Creating digital art that celebrates the beauty of island life and ocean conservation.',
  'Designing spaces that blend modern functionality with traditional Polynesian aesthetics.',
  'Helping startups scale while maintaining their connection to local values and community.',
  'Researching marine ecosystems to better understand and protect Hawaii\'s coral reefs.',
  'Building fintech solutions that increase financial inclusion in island communities.',
  'Creating content that showcases the innovation happening in Hawaii\'s tech scene.',
  'Developing AR experiences that bring Hawaiian history and mythology to life.',
  'Working on blockchain solutions for supply chain transparency in sustainable agriculture.',
  'Designing urban planning solutions that preserve green spaces and cultural sites.',
  'Building AI tools to help predict and mitigate the effects of climate change.',
  'Creating music that fuses traditional Hawaiian sounds with modern electronic production.',
  'Developing VR training programs for renewable energy technicians.',
  'Working on smart city initiatives that respect Hawaii\'s unique cultural landscape.',
  'Building e-commerce platforms that support local Hawaiian businesses and artisans.',
  'Researching sustainable construction materials using local volcanic rock and organic waste.',
  'Creating documentary films about ocean conservation and indigenous knowledge systems.',
  'Developing mobile apps that help tourists explore Hawaii responsibly and sustainably.',
  'Working on energy storage solutions optimized for island power grids.',
  'Building community platforms that strengthen connections between Hawaiian diaspora.',
  'Designing fashion that incorporates traditional Hawaiian patterns with modern sustainability.',
  'Developing IoT systems for monitoring and protecting endangered Hawaiian species.',
  'Creating investment strategies that prioritize environmental and social impact.',
  'Working on water conservation technologies suited for tropical island environments.',
  'Building educational games that teach Hawaiian history and environmental science.',
  'Developing drone technology for coral reef monitoring and marine research.',
  'Creating wellness apps inspired by traditional Hawaiian healing practices.',
  'Working on solar energy solutions optimized for Hawaii\'s unique climate conditions.',
  'Building platforms that connect local farmers with restaurants and consumers.',
  'Developing 3D printing techniques using recycled ocean plastic.',
  'Creating virtual museum experiences that preserve and share Hawaiian artifacts.',
  'Working on transportation solutions that reduce Hawaii\'s dependence on fossil fuels.',
  'Building tools that help small businesses navigate complex sustainability regulations.',
  'Developing language learning apps focused on preserving indigenous Pacific languages.'
];

// Interest combination patterns to create realistic profiles
const INTEREST_PATTERNS = [
  // Tech-focused patterns
  ['Web Development', 'Mobile App Development', 'Cloud Computing', 'DevOps', 'Cybersecurity'],
  ['AI/Machine Learning', 'Data Science', 'Blockchain Technology', 'Cybersecurity', 'Open Source Software'],
  ['Game Design & Development', 'Virtual Reality (VR) Development', 'Animation & Motion Graphics', '3D Printing', 'Interactive Storytelling'],
  ['Digital Marketing', 'Content Strategy', 'Social Media Marketing', 'E-commerce', 'SEO'],
  ['Educational Technology (EdTech)', 'Online Learning', 'Gamification in Learning', 'Instructional Design', 'STEM/STEAM Education'],
  
  // Sustainability patterns
  ['Renewable Energy', 'Climate Change Science', 'Green Building', 'Circular Economy', 'Corporate Social Responsibility'],
  ['Marine Biology', 'Conservation', 'Ecology', 'Waste Reduction', 'Reforestation'],
  ['Sustainable Agriculture', 'Land Management', 'Environmental Science', 'Renewable Energy', 'Climate Change Science'],
  
  // Creative patterns
  ['Digital Art', 'Graphic Design', 'Photography', 'Animation & Motion Graphics', 'Creative Writing'],
  ['Film Production', 'Podcasting', 'Music Production', 'Theater & Performing Arts', 'Creative Writing'],
  ['Fashion Design', 'Interior Design', 'Art History', 'Museum Curation', 'Photography'],
  
  // Business patterns
  ['Business Strategy', 'Project Management (Agile, Scrum)', 'Leadership', 'Public Speaking', 'Negotiation'],
  ['Venture Capital', 'Angel Investing', 'Startup Pitching', 'Financial Modeling', 'Impact Investing'],
  ['Real Estate Investment', 'PropTech', 'Urban Planning', 'Construction Technology', 'Smart Cities'],
  
  // Hawaiian culture patterns
  ['Hawaiian Language (ʻŌlelo Hawaiʻi)', 'Hula', 'Traditional Hawaiian Crafts', 'Cultural Heritage Preservation', 'Hawaiian History & Mythology'],
  ['Voyaging & Traditional Navigation', 'Marine Biology', 'Conservation', 'Museum Curation', 'Art History'],
  
  // Architecture & Construction patterns
  ['Architectural Design', 'Structural Engineering', 'BIM', 'Sustainable Architecture', 'Green Building'],
  ['Urban Planning', 'Smart Cities', 'Landscape Architecture', 'Construction Technology', 'Sustainable Architecture'],
  
  // Finance & Investment patterns
  ['FinTech', 'Blockchain Technology', 'Cryptocurrency', 'Algorithmic Trading', 'Financial Modeling'],
  ['Impact Investing', 'ESG', 'Corporate Social Responsibility', 'Social Entrepreneurship', 'Non-Profit Management'],
  
  // Health & Wellness patterns
  ['Mental Health and Wellness', 'Mindfulness and Meditation', 'Biohacking', 'Stoicism', 'Public Health'],
  
  // Student patterns
  ['Online Learning', 'Career Coaching', 'Networking Skills', 'Personal Branding', 'Time Management'],
  ['STEM/STEAM Education', 'Educational Psychology', 'Lifelong Learning', 'Financial Literacy', 'Leadership']
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateInterests(): string[] {
  const numInterests = Math.floor(Math.random() * 6) + 5; // 5-10 interests
  
  // 60% chance to use a pattern as base, 40% completely random
  if (Math.random() < 0.6) {
    const pattern = getRandomElement(INTEREST_PATTERNS);
    const baseInterests = getRandomElements(pattern, Math.min(pattern.length, numInterests - 2));
    const additionalInterests = getRandomElements(
      ALL_INTERESTS.filter(i => !baseInterests.includes(i)), 
      numInterests - baseInterests.length
    );
    return [...baseInterests, ...additionalInterests];
  } else {
    return getRandomElements(ALL_INTERESTS, numInterests);
  }
}

function generateSkills(): Skill[] {
  const numSkills = Math.floor(Math.random() * 6) + 3; // 3-8 skills
  const skillNames = getRandomElements(ALL_INTERESTS, numSkills);
  
  return skillNames.map(name => ({
    name,
    level: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3
  }));
}

export function generateProfiles(count: number = 200): Profile[] {
  const profiles: Profile[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const role = getRandomElement(ROLES);
    const bio = getRandomElement(BIOS);
    const interests = generateInterests();
    const skills = generateSkills();
    
    const profile: Profile = {
      id: `profile-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      role,
      city: Math.random() < 0.8 ? 'Honolulu' : getRandomElement(['Hilo', 'Kona', 'Lahaina', 'Lihue', 'Kaneohe']),
      bio,
      skills,
      interests,
      availability: getRandomElement(['Weeknights', 'Weekends', 'Flexible']),
      links: {
        linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.random().toString(36).substr(2, 4)}`,
        site: Math.random() < 0.4 ? `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev` : undefined
      },
      createdAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
    };
    
    profiles.push(profile);
  }
  
  return profiles;
}