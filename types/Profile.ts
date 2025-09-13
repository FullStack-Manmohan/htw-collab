export type Skill = { 
  name: string; 
  level: 1 | 2 | 3; // 1=B, 2=I, 3=A
};

export type Profile = {
  id: string;
  name: string;
  role: string; // Engineer, Designer, PM, Growth, Full-stack, etc.
  city?: string;
  bio?: string;
  skills: Skill[];
  interests: string[];
  availability?: "Weeknights" | "Weekends" | "Flexible";
  links?: { linkedin?: string; site?: string };
  createdAt: number;
};