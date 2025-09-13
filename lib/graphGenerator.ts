// Simple stopword list for English
const stopwords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to',
  'was', 'will', 'with', 'the', 'this', 'these', 'they', 'those', 'what',
  'when', 'where', 'who', 'why', 'how', 'which', 'or', 'not', 'no', 'but'
]);

function removeStopwords(words: string[]): string[] {
  return words.filter(word => !stopwords.has(word.toLowerCase()));
}

export interface Interest {
  id: number;
  label: string;
  level: number; // 0 for category, 1 for sub-interest
  category?: string;
  size?: number;
  color?: string;
}

export interface Edge {
  from: number;
  to: number;
  value: number;
  title?: string;
  color?: string;
  width?: number;
}

export interface GraphData {
  nodes: Interest[];
  edges: Edge[];
  statistics: {
    totalNodes: number;
    totalEdges: number;
    categoriesCount: number;
  };
}

// Keyword expansion mappings
const abbreviations: Record<string, string> = {
  'VR': 'Virtual Reality',
  'AR': 'Augmented Reality',
  'AI': 'Artificial Intelligence',
  'ML': 'Machine Learning',
  'IoT': 'Internet of Things',
  'ESG': 'Environmental Social Governance',
  'SEO': 'Search Engine Optimization',
  'BIM': 'Building Information Modeling',
  'STEM': 'Science Technology Engineering Mathematics',
  'STEAM': 'Science Technology Engineering Arts Mathematics',
  'DeFi': 'Decentralized Finance',
  'NFTs': 'Non-Fungible Tokens',
  'DevOps': 'Development Operations',
  'EdTech': 'Educational Technology',
  'PropTech': 'Property Technology',
  'FinTech': 'Financial Technology',
  'MarTech': 'Marketing Technology',
  'AdTech': 'Advertising Technology',
  'CivicTech': 'Civic Technology'
};

const keywordExpansion: Record<string, string> = {
  'Blockchain': 'distributed ledger cryptocurrency decentralized',
  'Sustainability': 'environment green eco-friendly renewable',
  'Climate': 'environment weather global warming sustainability',
  'Data': 'analytics statistics machine learning AI',
  'Design': 'creative visual user experience UX UI',
  'Development': 'programming coding software engineering',
  'Management': 'leadership organization planning strategy',
  'Marketing': 'advertising promotion branding communications',
  'Finance': 'investment money capital funding economics',
  'Technology': 'digital software hardware innovation',
  'Education': 'learning teaching training knowledge',
  'Art': 'creative culture aesthetics expression',
  'Architecture': 'building design construction planning',
  'Engineering': 'technical design systems construction',
  'Virtual': 'digital immersive 3D simulation',
  'Augmented': 'enhanced mixed reality digital overlay',
  'Smart': 'intelligent automated IoT connected digital',
  'Green': 'sustainable eco-friendly environmental renewable',
  'Digital': 'technology online electronic computerized',
  'Social': 'community people interaction networking'
};

export class InterestGraphBuilder {
  private interests: Interest[] = [];
  private categories: Map<string, Interest[]> = new Map();
  private similarityMatrix: number[][] = [];

  parseInterestFile(content: string): void {
    const lines = content.split('\n');
    let currentCategory: string | null = null;
    let nodeId = 0;

    for (const line of lines) {
      // Remove line numbers if present
      const cleanLine = line.replace(/^\s*\d+\|/, '').trim();
      
      if (!cleanLine) continue;

      // Check if it's a category (not indented with tab)
      if (!line.startsWith('\t') && !line.match(/^\s+\d+\|\t/)) {
        currentCategory = cleanLine;
        this.interests.push({
          id: nodeId++,
          label: cleanLine,
          level: 0,
          size: 30,
          color: '#FF6B6B'
        });
        this.categories.set(currentCategory, []);
      } else {
        // It's a sub-interest (indented)
        const subInterest = cleanLine;
        const interest: Interest = {
          id: nodeId++,
          label: subInterest,
          level: 1,
          category: currentCategory || undefined,
          size: 15,
          color: '#4ECDC4'
        };
        
        this.interests.push(interest);
        
        if (currentCategory) {
          const categoryInterests = this.categories.get(currentCategory) || [];
          categoryInterests.push(interest);
          this.categories.set(currentCategory, categoryInterests);
        }
      }
    }
  }

  private expandText(interest: string, category?: string): string {
    let expanded = interest;

    // Expand abbreviations
    for (const [abbr, full] of Object.entries(abbreviations)) {
      if (expanded.includes(abbr) && !expanded.includes(full)) {
        expanded = expanded.replace(abbr, `${abbr} ${full}`);
      }
    }

    // Add category context
    if (category && category !== interest) {
      expanded = `${expanded} ${category}`;
    }

    // Add semantic keywords
    const expandedLower = expanded.toLowerCase();
    for (const [key, keywords] of Object.entries(keywordExpansion)) {
      if (expandedLower.includes(key.toLowerCase())) {
        expanded = `${expanded} ${keywords}`;
      }
    }

    return expanded;
  }

  private tokenize(text: string): string[] {
    // Simple tokenization and stopword removal
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    return removeStopwords(words);
  }

  private calculateTFIDF(): Map<string, number>[] {
    const documents: string[][] = [];
    const tfidfs: Map<string, number>[] = [];

    // Create documents from expanded texts
    for (const interest of this.interests) {
      const expandedText = this.expandText(interest.label, interest.category);
      documents.push(this.tokenize(expandedText));
    }

    // Calculate document frequency
    const df = new Map<string, number>();
    const N = documents.length;

    for (const doc of documents) {
      const uniqueWords = new Set(doc);
      for (const word of uniqueWords) {
        df.set(word, (df.get(word) || 0) + 1);
      }
    }

    // Calculate TF-IDF for each document
    for (const doc of documents) {
      const tfidf = new Map<string, number>();
      const wordCount = doc.length;
      
      // Calculate term frequency
      const tf = new Map<string, number>();
      for (const word of doc) {
        tf.set(word, (tf.get(word) || 0) + 1);
      }

      // Calculate TF-IDF
      for (const [word, count] of tf.entries()) {
        const tfValue = count / wordCount;
        const idfValue = Math.log(N / (df.get(word) || 1));
        tfidf.set(word, tfValue * idfValue);
      }

      tfidfs.push(tfidf);
    }

    return tfidfs;
  }

  private cosineSimilarity(vec1: Map<string, number>, vec2: Map<string, number>): number {
    const keys = new Set([...vec1.keys(), ...vec2.keys()]);
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (const key of keys) {
      const val1 = vec1.get(key) || 0;
      const val2 = vec2.get(key) || 0;
      dotProduct += val1 * val2;
      norm1 += val1 * val1;
      norm2 += val2 * val2;
    }

    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  calculateSimilarityScores(): void {
    const tfidfs = this.calculateTFIDF();
    const n = this.interests.length;
    
    // Initialize similarity matrix
    this.similarityMatrix = Array(n).fill(null).map(() => Array(n).fill(0));

    // Calculate pairwise similarities
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        if (i === j) {
          this.similarityMatrix[i][j] = 1;
        } else {
          const similarity = this.cosineSimilarity(tfidfs[i], tfidfs[j]);
          this.similarityMatrix[i][j] = similarity;
          this.similarityMatrix[j][i] = similarity;
        }
      }
    }
  }

  buildGraph(similarityThreshold: number = 0.15): GraphData {
    const nodes = [...this.interests];
    const edges: Edge[] = [];
    const nodeIdMap = new Map<string, number>();

    // Create node ID mapping
    for (const interest of this.interests) {
      nodeIdMap.set(interest.label, interest.id);
    }

    // Add parent-child edges
    for (const [category, subInterests] of this.categories.entries()) {
      const categoryId = nodeIdMap.get(category);
      if (categoryId !== undefined) {
        for (const subInterest of subInterests) {
          edges.push({
            from: categoryId,
            to: subInterest.id,
            value: 1.0,
            color: '#95E1D3',
            title: 'belongs to',
            width: 2
          });
        }
      }
    }

    // Add similarity-based edges
    let similarityEdges = 0;
    for (let i = 0; i < this.interests.length; i++) {
      for (let j = i + 1; j < this.interests.length; j++) {
        const similarity = this.similarityMatrix[i][j];
        
        if (similarity > similarityThreshold) {
          // Skip parent-child relationships
          const interest1 = this.interests[i];
          const interest2 = this.interests[j];
          
          let isParentChild = false;
          for (const [category, subs] of this.categories.entries()) {
            if ((interest1.label === category && subs.includes(interest2)) ||
                (interest2.label === category && subs.includes(interest1))) {
              isParentChild = true;
              break;
            }
          }

          if (!isParentChild) {
            let edgeColor = '#E0E0E0';
            let edgeWidth = 1;
            
            if (similarity > 0.5) {
              edgeColor = '#FF6B6B';
              edgeWidth = 3;
            } else if (similarity > 0.3) {
              edgeColor = '#FFA07A';
              edgeWidth = 2;
            }

            edges.push({
              from: interest1.id,
              to: interest2.id,
              value: similarity,
              color: edgeColor,
              title: `Similarity: ${similarity.toFixed(2)}`,
              width: edgeWidth
            });
            similarityEdges++;
          }
        }
      }
    }

    return {
      nodes,
      edges,
      statistics: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        categoriesCount: this.categories.size
      }
    };
  }

  getTopConnectedInterests(graphData: GraphData, count: number = 10): Array<{label: string, connections: number}> {
    const connectionCount = new Map<number, number>();
    
    // Count connections for each node
    for (const edge of graphData.edges) {
      connectionCount.set(edge.from, (connectionCount.get(edge.from) || 0) + 1);
      connectionCount.set(edge.to, (connectionCount.get(edge.to) || 0) + 1);
    }

    // Sort by connection count
    const sorted = Array.from(connectionCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([nodeId, connections]) => {
        const node = graphData.nodes.find(n => n.id === nodeId);
        return {
          label: node?.label || 'Unknown',
          connections
        };
      });

    return sorted;
  }
} 