# HTW Collab Semantic Knowledge Graph 🧠

## Overview

The HTW Collab platform now features a sophisticated **semantic knowledge graph** that intelligently connects interests based on conceptual similarity and hierarchical relationships. This creates a more intuitive and powerful way to discover collaboration opportunities.

## Features

### 🏗️ **Two-Level Hierarchical Structure**
- **Top Level**: 16 main interest categories (e.g., "Sustainability and Ecology", "Software & Technology")
- **Sub Level**: 149 specific interests organized under each category
- **Hierarchical Links**: Direct parent-child relationships between categories and interests

### 🧠 **Semantic Similarity Connections**
- **649 semantic links** connecting related interests across categories
- **Weight-based relationships** (0.0 - 1.0) indicating conceptual overlap
- **Cross-category connections** discover unexpected collaboration opportunities

### 🎯 **Smart Interest Matching**
- **Fuzzy matching** connects user interests to the semantic graph
- **Related interest suggestions** based on semantic similarity
- **Category-based filtering** for focused exploration

## Architecture

### Core Components

1. **`lib/semantic-graph.ts`** - Core semantic analysis engine
2. **`components/InterestGraph.tsx`** - Enhanced graph visualization
3. **`scripts/generate-semantic-graph.js`** - Data generation script
4. **`lib/data/interest_list.txt`** - Hierarchical interest taxonomy

### Data Structure

```typescript
interface SemanticNode {
  id: string;
  name: string;
  type: 'category' | 'interest';
  level: number; // 0 = category, 1 = interest
  category?: string; // parent category
}

interface SemanticLink {
  source: string;
  target: string;
  weight: number; // 0-1 similarity score
  type: 'hierarchical' | 'semantic';
}
```

## Graph Visualization

### Interactive Features
- **Category filtering** - Focus on specific interest domains
- **Semantic highlighting** - See related interests and their connection strength
- **Multi-layered view** - Categories (indigo), interests (green), people (amber)
- **Weighted edges** - Thicker lines = stronger conceptual connections

### Visual Legend
- 🔵 **Indigo nodes** = Interest categories
- 🟢 **Green nodes** = Individual interests
- 🟡 **Amber nodes** = People/profiles
- **Gray lines** = Hierarchical relationships
- **Purple lines** = Semantic similarity connections
- **Orange lines** = Person-to-interest connections

## Semantic Similarity Algorithm

The system uses a multi-layered approach to calculate conceptual similarity:

### 1. **Direct Text Matching** (Weight: 0.9)
- Substring containment (e.g., "AI" matches "AI/Machine Learning")

### 2. **Common Word Analysis** (Weight: 0.6-0.8)
- Shared meaningful terms between interest names
- Excludes stop words and common terms

### 3. **Semantic Group Classification** (Weight: 0.4-0.6)
- Pre-defined semantic clusters:
  - **Technology**: AI, blockchain, web development, cybersecurity
  - **Sustainability**: renewable energy, climate change, conservation
  - **Design**: architectural, graphic, digital art, animation
  - **Media**: film, podcasting, photography, content strategy
  - **Business**: venture capital, strategy, entrepreneurship
  - **Immersive**: VR/AR, metaverse, spatial computing
  - **Culture**: Hawaiian heritage, traditional arts, museum curation
  - **Wellness**: mental health, mindfulness, biohacking
  - **Education**: EdTech, curriculum, learning psychology
  - **Urban**: smart cities, planning, PropTech

## Usage Examples

### Finding Related Interests
```typescript
import { getRelatedInterests } from '@/lib/semantic-graph';

const related = getRelatedInterests(semanticData, "Blockchain Technology", 0.4);
// Returns: DeFi (0.85), Cryptocurrency (0.75), FinTech (0.52)
```

### Category Exploration
```typescript
import { getInterestsByCategory } from '@/lib/semantic-graph';

const techInterests = getInterestsByCategory(semanticData, "Software & Technology");
// Returns all tech-related interests with their semantic connections
```

## Data Generation

### Generating Fresh Graph Data
```bash
node scripts/generate-semantic-graph.js
```

This creates:
- **`public/data/semantic-graph.json`** - Complete graph data
- **`public/data/semantic-graph-simplified.json`** - Visualization-ready format

### Current Statistics
- **16 interest categories**
- **149 specific interests** 
- **149 hierarchical relationships**
- **649 semantic connections**
- **Average 43 connections per category**

## Benefits for HTW Collaboration

### 🎯 **Enhanced Discovery**
- Find collaborators with **complementary skills** across disciplines
- Discover **unexpected connections** between seemingly unrelated fields
- **Visual exploration** of the innovation ecosystem

### 🧠 **Intelligent Matching**
- **Semantic understanding** beyond exact keyword matching
- **Cross-pollination opportunities** between different domains
- **Weighted recommendations** based on conceptual overlap

### 🌊 **Hawaii Tech Community Mapping**
- **Visual representation** of the local tech ecosystem
- **Interest clustering** reveals community strengths and gaps
- **Strategic insights** for event planning and partnership building

## Future Enhancements

- **Machine learning similarity** using embedding models
- **Dynamic graph updates** based on user interaction patterns
- **Community strength metrics** showing collaboration density
- **Skill gap analysis** highlighting underrepresented connections
- **Event recommendation engine** based on semantic clustering

---

**Built with aloha for Honolulu Tech Week 🌺**