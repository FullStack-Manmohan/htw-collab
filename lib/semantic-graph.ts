// Semantic Knowledge Graph for Interest Categories

export interface SemanticNode {
  id: string;
  name: string;
  type: 'category' | 'interest';
  level: number; // 0 = top-level category, 1 = sub-interest
  category?: string; // parent category for sub-interests
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface SemanticLink {
  source: string;
  target: string;
  weight: number; // 0-1, conceptual similarity
  type: 'hierarchical' | 'semantic';
}

export interface SemanticGraphData {
  nodes: SemanticNode[];
  links: SemanticLink[];
  categories: string[];
}

// Parse the interest list text file structure
export function parseInterestHierarchy(interestText: string): SemanticGraphData {
  const lines = interestText.split('\n').filter(line => line.trim());
  const nodes: SemanticNode[] = [];
  const links: SemanticLink[] = [];
  const categories: string[] = [];
  
  let currentCategory = '';
  
  lines.forEach((line, index) => {
    if (!line.startsWith('\t')) {
      // Top-level category
      currentCategory = line.trim();
      categories.push(currentCategory);
      
      nodes.push({
        id: `category-${currentCategory}`,
        name: currentCategory,
        type: 'category',
        level: 0
      });
    } else {
      // Sub-interest
      const interest = line.trim();
      
      nodes.push({
        id: `interest-${interest}`,
        name: interest,
        type: 'interest',
        level: 1,
        category: currentCategory
      });
      
      // Hierarchical link to parent category
      links.push({
        source: `category-${currentCategory}`,
        target: `interest-${interest}`,
        weight: 1.0,
        type: 'hierarchical'
      });
    }
  });
  
  // Generate semantic links between related interests
  const semanticLinks = generateSemanticLinks(nodes);
  links.push(...semanticLinks);
  
  return { nodes, links, categories };
}

// Generate semantic similarity links between interests
function generateSemanticLinks(nodes: SemanticNode[]): SemanticLink[] {
  const interests = nodes.filter(node => node.type === 'interest');
  const links: SemanticLink[] = [];
  
  // Define semantic similarity patterns
  const semanticGroups = {
    'technology': [
      'ai', 'machine learning', 'blockchain', 'web development', 'mobile app', 
      'cloud computing', 'devops', 'cybersecurity', 'data science', 'iot', 'robotics'
    ],
    'sustainability': [
      'renewable energy', 'climate change', 'green building', 'conservation', 
      'ecology', 'circular economy', 'sustainable', 'marine biology'
    ],
    'design': [
      'architectural design', 'graphic design', 'interior design', 'fashion design',
      'digital art', 'animation', 'bim', 'ui/ux'
    ],
    'media': [
      'film production', 'podcasting', 'music production', 'photography',
      'content strategy', 'digital media', 'social media'
    ],
    'business': [
      'venture capital', 'angel investing', 'business strategy', 'project management',
      'corporate finance', 'mergers', 'startup', 'entrepreneurship'
    ],
    'immersive': [
      'virtual reality', 'augmented reality', 'metaverse', 'spatial computing',
      'digital twins', 'game design', '3d printing'
    ],
    'culture': [
      'hawaiian', 'hula', 'museum', 'art history', 'cultural heritage',
      'traditional', 'voyaging', 'mythology'
    ],
    'wellness': [
      'mental health', 'mindfulness', 'meditation', 'biohacking', 'stoicism'
    ],
    'education': [
      'online learning', 'edtech', 'stem', 'curriculum', 'instructional design',
      'lifelong learning', 'educational psychology'
    ],
    'urban': [
      'urban planning', 'smart cities', 'real estate', 'proptech', 'construction'
    ]
  };
  
  // Calculate semantic similarity between interests
  interests.forEach((interest1, i) => {
    interests.slice(i + 1).forEach(interest2 => {
      const similarity = calculateSemanticSimilarity(
        interest1.name, 
        interest2.name, 
        semanticGroups
      );
      
      if (similarity > 0.3) { // Only create links for meaningful similarity
        links.push({
          source: interest1.id,
          target: interest2.id,
          weight: similarity,
          type: 'semantic'
        });
      }
    });
  });
  
  return links;
}

// Calculate semantic similarity between two interests
function calculateSemanticSimilarity(
  interest1: string, 
  interest2: string, 
  semanticGroups: Record<string, string[]>
): number {
  const name1 = interest1.toLowerCase();
  const name2 = interest2.toLowerCase();
  
  // Direct substring match
  if (name1.includes(name2) || name2.includes(name1)) {
    return 0.9;
  }
  
  // Check for common words (excluding common terms)
  const stopWords = ['and', 'or', 'the', 'of', 'in', 'for', 'with', 'on', 'by'];
  const words1 = name1.split(/[\s&\-\/]+/).filter(w => w.length > 2 && !stopWords.includes(w));
  const words2 = name2.split(/[\s&\-\/]+/).filter(w => w.length > 2 && !stopWords.includes(w));
  
  const commonWords = words1.filter(word => words2.includes(word));
  if (commonWords.length > 0) {
    return 0.6 + (commonWords.length * 0.1);
  }
  
  // Semantic group similarity
  let maxGroupSimilarity = 0;
  Object.values(semanticGroups).forEach(group => {
    const matches1 = group.filter(keyword => name1.includes(keyword)).length;
    const matches2 = group.filter(keyword => name2.includes(keyword)).length;
    
    if (matches1 > 0 && matches2 > 0) {
      const similarity = 0.4 + (Math.min(matches1, matches2) * 0.1);
      maxGroupSimilarity = Math.max(maxGroupSimilarity, similarity);
    }
  });
  
  return maxGroupSimilarity;
}

// Get interests by category
export function getInterestsByCategory(data: SemanticGraphData, category: string): SemanticNode[] {
  return data.nodes.filter(node => 
    node.type === 'interest' && node.category === category
  );
}

// Get related interests (semantic connections)
export function getRelatedInterests(
  data: SemanticGraphData, 
  interestName: string, 
  minWeight = 0.4
): Array<{ interest: SemanticNode; weight: number }> {
  const interestId = `interest-${interestName}`;
  
  return data.links
    .filter(link => 
      link.type === 'semantic' && 
      link.weight >= minWeight &&
      (link.source === interestId || link.target === interestId)
    )
    .map(link => {
      const relatedId = link.source === interestId ? link.target : link.source;
      const relatedNode = data.nodes.find(node => node.id === relatedId);
      return relatedNode ? { interest: relatedNode, weight: link.weight } : null;
    })
    .filter((item): item is { interest: SemanticNode; weight: number } => item !== null)
    .sort((a, b) => b.weight - a.weight);
}

// Create a simplified graph for visualization - INTERESTS ONLY
export function createVisualizationGraph(
  data: SemanticGraphData,
  focusCategory?: string
): { nodes: SemanticNode[]; links: SemanticLink[] } {
  if (focusCategory) {
    // Filter to show only interests from the specified category
    const categoryInterests = getInterestsByCategory(data, focusCategory);
    
    // Include semantic links between these interests
    const links = data.links.filter(link => 
      link.type === 'semantic' && link.weight > 0.4 && 
      categoryInterests.some(n => n.id === link.source) && 
      categoryInterests.some(n => n.id === link.target)
    );
    
    return { nodes: categoryInterests, links };
  }
  
  // Show all interests with semantic connections
  const interestNodes = data.nodes.filter(n => n.type === 'interest');
  
  // Only include semantic links with reasonable weights
  const links = data.links.filter(link => 
    link.type === 'semantic' && 
    link.weight > 0.4 && 
    interestNodes.some(n => n.id === link.source) && 
    interestNodes.some(n => n.id === link.target)
  );
  
  return { nodes: interestNodes, links };
}