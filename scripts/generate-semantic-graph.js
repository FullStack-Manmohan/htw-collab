#!/usr/bin/env node

// Script to generate semantic knowledge graph data from interest categories
// Usage: node scripts/generate-semantic-graph.js

const fs = require('fs');
const path = require('path');

// Copy the semantic graph functions (simplified for Node.js)
function parseInterestHierarchy(interestText) {
  const lines = interestText.split('\n').filter(line => line.trim());
  const nodes = [];
  const links = [];
  const categories = [];
  
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

function generateSemanticLinks(nodes) {
  const interests = nodes.filter(node => node.type === 'interest');
  const links = [];
  
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
      
      if (similarity > 0.3) {
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

function calculateSemanticSimilarity(interest1, interest2, semanticGroups) {
  const name1 = interest1.toLowerCase();
  const name2 = interest2.toLowerCase();
  
  // Direct substring match
  if (name1.includes(name2) || name2.includes(name1)) {
    return 0.9;
  }
  
  // Check for common words
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

// Main execution
async function generateSemanticGraph() {
  try {
    // Read the interest list file
    const interestFilePath = path.join(__dirname, '../lib/data/interest_list.txt');
    
    if (!fs.existsSync(interestFilePath)) {
      console.error(`Interest file not found at: ${interestFilePath}`);
      console.log('Please ensure the interest_list.txt file exists in lib/data/');
      process.exit(1);
    }
    
    const interestText = fs.readFileSync(interestFilePath, 'utf8');
    console.log('📊 Parsing interest hierarchy...');
    
    // Parse and generate semantic graph
    const semanticData = parseInterestHierarchy(interestText);
    
    console.log(`✅ Generated semantic graph:`);
    console.log(`   📁 Categories: ${semanticData.categories.length}`);
    console.log(`   🏷️  Interests: ${semanticData.nodes.filter(n => n.type === 'interest').length}`);
    console.log(`   🔗 Hierarchical links: ${semanticData.links.filter(l => l.type === 'hierarchical').length}`);
    console.log(`   🧠 Semantic links: ${semanticData.links.filter(l => l.type === 'semantic').length}`);
    
    // Create output directory
    const outputDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write complete graph data
    const outputPath = path.join(outputDir, 'semantic-graph.json');
    fs.writeFileSync(outputPath, JSON.stringify(semanticData, null, 2));
    console.log(`💾 Saved complete graph to: ${outputPath}`);
    
    // Write simplified version for visualization
    const simplifiedData = {
      categories: semanticData.categories,
      interests_by_category: {},
      semantic_connections: semanticData.links
        .filter(l => l.type === 'semantic' && l.weight > 0.5)
        .map(l => ({
          from: l.source.replace('interest-', ''),
          to: l.target.replace('interest-', ''),
          weight: Math.round(l.weight * 100) / 100
        }))
    };
    
    semanticData.categories.forEach(category => {
      simplifiedData.interests_by_category[category] = semanticData.nodes
        .filter(n => n.type === 'interest' && n.category === category)
        .map(n => n.name);
    });
    
    const simplifiedPath = path.join(outputDir, 'semantic-graph-simplified.json');
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplifiedData, null, 2));
    console.log(`📋 Saved simplified graph to: ${simplifiedPath}`);
    
    // Generate statistics
    console.log(`\n📈 Semantic Analysis Stats:`);
    semanticData.categories.forEach(category => {
      const categoryInterests = semanticData.nodes.filter(n => n.category === category);
      const categoryConnections = semanticData.links.filter(l => 
        l.type === 'semantic' && (
          categoryInterests.some(i => i.id === l.source) ||
          categoryInterests.some(i => i.id === l.target)
        )
      );
      
      console.log(`   ${category}: ${categoryInterests.length} interests, ${categoryConnections.length} connections`);
    });
    
    console.log(`\n🚀 Semantic knowledge graph generation complete!`);
    
  } catch (error) {
    console.error('❌ Error generating semantic graph:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSemanticGraph();
}

module.exports = { generateSemanticGraph, parseInterestHierarchy };