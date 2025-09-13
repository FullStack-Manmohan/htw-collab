import { Profile, Skill } from '../types/Profile';

// Cosine similarity for skill vectors
export function skillSimilarity(profile1: Profile, profile2: Profile): number {
  const allSkills = Array.from(new Set([
    ...profile1.skills.map(s => s.name),
    ...profile2.skills.map(s => s.name)
  ]));

  if (allSkills.length === 0) return 0;

  const vector1 = allSkills.map(skill => {
    const found = profile1.skills.find(s => s.name === skill);
    return found ? found.level : 0;
  });

  const vector2 = allSkills.map(skill => {
    const found = profile2.skills.find(s => s.name === skill);
    return found ? found.level : 0;
  });

  const dotProduct = vector1.reduce((sum: number, a, i) => sum + a * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum: number, a) => sum + a * a, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum: number, a) => sum + a * a, 0));

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
}

// Jaccard similarity for interests
export function interestSimilarity(profile1: Profile, profile2: Profile): number {
  const set1 = new Set(profile1.interests);
  const set2 = new Set(profile2.interests);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

// Role complement scoring
export function roleComplement(role1: string, role2: string): number {
  const complementMap: Record<string, string[]> = {
    'Engineer': ['Designer', 'PM', 'Growth'],
    'Designer': ['Engineer', 'PM', 'Full-stack'],
    'PM': ['Engineer', 'Designer', 'Growth'],
    'Growth': ['Engineer', 'PM', 'Designer'],
    'Full-stack': ['Designer', 'PM', 'Growth']
  };

  const complements = complementMap[role1] || [];
  return complements.includes(role2) ? 1.2 : 1.0;
}

// Location bonus (same city)
export function locationBonus(profile1: Profile, profile2: Profile): number {
  if (!profile1.city || !profile2.city) return 1.0;
  return profile1.city.toLowerCase() === profile2.city.toLowerCase() ? 1.3 : 1.0;
}

// Overall match score
export function calculateMatchScore(profile1: Profile, profile2: Profile): number {
  const skillScore = skillSimilarity(profile1, profile2);
  const interestScore = interestSimilarity(profile1, profile2);
  const roleScore = roleComplement(profile1.role, profile2.role);
  const locationScore = locationBonus(profile1, profile2);

  return (skillScore * 0.4 + interestScore * 0.4 + 0.2) * roleScore * locationScore;
}

// Get best matches for a profile
export function getBestMatches(profile: Profile, candidates: Profile[], limit = 5): Profile[] {
  return candidates
    .filter(c => c.id !== profile.id)
    .map(candidate => ({
      ...candidate,
      score: calculateMatchScore(profile, candidate)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...profile }) => profile);
}