# Interest Knowledge Graph - Next.js

A modern Next.js application that creates an interactive semantic knowledge graph from hierarchical interest data, visualizing relationships between topics based on conceptual similarity.

## 🌟 Features

- **Two-Level Hierarchical Structure**: Displays main categories and their sub-interests
- **Semantic Similarity Calculation**: Uses TF-IDF and cosine similarity to find conceptual relationships
- **Interactive Web Visualization**: Beautiful, responsive graph interface with pan, zoom, and node selection
- **Real-time Threshold Adjustment**: Control the density of connections dynamically
- **Graph Statistics**: View node count, edge count, and category distribution
- **Most Connected Nodes**: See which interests have the most connections
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **vis-network**: Interactive network visualization
- **Built-in TF-IDF**: Custom implementation for semantic similarity

## 📦 Installation

1. **Clone or download this repository**

2. **Install dependencies**:
```bash
npm install
```

## 🚀 Quick Start

### Development Mode

Start the development server:

```bash
npm run dev
```

Then open your browser and navigate to:
```
http://localhost:3000
```

### Production Build

Build for production:

```bash
npm run build
npm start
```

## 📊 Understanding the Graph

### Node Types
- **Red nodes (larger)**: Main interest categories
- **Teal nodes (smaller)**: Sub-interests within categories

### Edge Types
- **Light teal edges**: Parent-child relationships (category to sub-interest)
- **Red edges**: Strong similarity (>0.5)
- **Orange edges**: Medium similarity (0.3-0.5)  
- **Gray edges**: Weak similarity (0.15-0.3)

### Similarity Threshold
- **Lower values (0.1-0.2)**: More connections, shows weaker relationships
- **Medium values (0.2-0.3)**: Balanced view of meaningful connections
- **Higher values (0.3+)**: Only strong, highly-related connections

## 🛠️ Customization

### Modifying Interests

Edit `public/interest_list.txt`:
- Main categories: Start at the beginning of the line
- Sub-interests: Indent with a tab character

Example:
```
New Category
	Sub-interest 1
	Sub-interest 2
```

### Adjusting the Algorithm

Edit `lib/graphGenerator.ts` to modify:

1. **Similarity calculation** (~line 150-200):
   - Adjust TF-IDF parameters
   - Modify tokenization logic
   - Change similarity thresholds

2. **Keyword expansions** (~line 30-75):
   - Add domain-specific abbreviations
   - Include more semantic keywords
   - Customize for your field

3. **Visual styling** (~line 240-280):
   - Change node colors and sizes
   - Modify edge styling
   - Adjust physics simulation

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   └── generate-graph/
│   │       └── route.ts        # API endpoint for graph generation
│   ├── page.tsx                # Main page component
│   └── layout.tsx              # Root layout
├── components/
│   └── GraphVisualization.tsx  # Graph visualization component
├── lib/
│   └── graphGenerator.ts       # Core graph generation logic
├── public/
│   └── interest_list.txt       # Input: Hierarchical interest data
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🔧 API Endpoints

- `POST /api/generate-graph` - Generate graph with custom threshold
  - Body: `{ threshold: 0.15 }`
  - Returns: Graph data with nodes, edges, and statistics

## 🎯 Use Cases

1. **Skills Mapping**: Visualize relationships between different skills and competencies
2. **Curriculum Design**: Identify related topics for course planning
3. **Career Planning**: Discover connections between different fields
4. **Knowledge Management**: Organize and understand domain relationships
5. **Team Building**: Find complementary skills and interests

## 🎨 Features

### Interactive Controls
- **Threshold Slider**: Adjust similarity threshold in real-time
- **Regenerate Button**: Apply new threshold settings
- **Statistics Display**: Live node, edge, and category counts
- **Most Connected Panel**: View top connected interests

### Graph Interactions
- **Pan**: Click and drag to move around
- **Zoom**: Scroll to zoom in/out
- **Select**: Click nodes to highlight connections
- **Hover**: View connection strength on edges

## 🐛 Troubleshooting

**Issue**: Graph is too cluttered
- **Solution**: Increase the similarity threshold (0.2-0.3)

**Issue**: Missing obvious connections
- **Solution**: Lower the similarity threshold (0.1-0.15)

**Issue**: Categories not showing sub-interests
- **Solution**: Check that sub-interests are properly indented with tabs in `public/interest_list.txt`

**Issue**: Build errors
- **Solution**: Ensure Node.js 18+ is installed and run `npm install`

## 📈 Performance Tips

- For large datasets (>500 nodes), increase similarity threshold to reduce edges
- The graph uses physics simulation for layout - allow it to stabilize
- Modern browsers (Chrome, Firefox, Edge) provide best performance

## 🤝 Contributing

Feel free to:
- Add new interest categories
- Improve similarity algorithms
- Enhance visualization features
- Optimize performance
- Report issues

## 📄 License

This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

Built with:
- Next.js for the React framework
- vis-network for graph visualization
- Tailwind CSS for styling
- TypeScript for type safety
