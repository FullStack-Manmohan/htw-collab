# Interest Knowledge Graph Generator

A Python-based tool that creates an interactive semantic knowledge graph from hierarchical interest data, visualizing relationships between topics based on conceptual similarity.

## 🌟 Features

- **Two-Level Hierarchical Structure**: Displays main categories and their sub-interests
- **Semantic Similarity Calculation**: Uses TF-IDF and cosine similarity to find conceptual relationships
- **Interactive Web Visualization**: Beautiful, responsive graph interface with pan, zoom, and node selection
- **Adjustable Similarity Threshold**: Control the density of connections in real-time
- **Graph Statistics**: View node count, edge count, and category distribution
- **Export Capabilities**: Save graph data as JSON for further analysis

## 📦 Installation

1. **Clone or download this repository**

2. **Install required packages**:
```bash
pip install -r requirements.txt
```

## 🚀 Quick Start

### Option 1: Run the Web Application

Start the interactive web application:

```bash
python app.py
```

Then open your browser and navigate to:
```
http://localhost:5000
```

### Option 2: Generate Graph Directly

Run the standalone script to generate the graph:

```bash
python semantic_graph_generator.py
```

This will create:
- `interest_graph.html` - Interactive visualization
- `graph_data.json` - Graph data in JSON format

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

### Adjusting the Similarity Algorithm

Edit `semantic_graph_generator.py` to modify:

1. **Similarity calculation** (lines ~120-140):
   - Adjust TF-IDF parameters
   - Modify n-gram range
   - Change max features

2. **Keyword expansions** (lines ~60-110):
   - Add domain-specific abbreviations
   - Include more semantic keywords
   - Customize for your field

3. **Visual styling** (lines ~200-250):
   - Change node colors and sizes
   - Modify edge styling
   - Adjust physics simulation

### Adding New Interests

Edit `interest_list.txt`:
- Main categories: Start at the beginning of the line
- Sub-interests: Indent with a tab character

Example:
```
New Category
	Sub-interest 1
	Sub-interest 2
```

## 📁 File Structure

```
.
├── interest_list.txt           # Input: Hierarchical interest data
├── semantic_graph_generator.py # Core graph generation logic
├── app.py                      # Flask web application
├── templates/
│   └── index.html             # Web interface
├── static/                    # Generated files
│   ├── interest_graph.html    # Graph visualization
│   └── graph_data.json        # Graph data export
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## 🔧 API Endpoints (Web App)

- `GET /` - Main interface
- `GET /graph` - Graph visualization iframe
- `POST /generate_graph` - Regenerate with new threshold
- `GET /graph_data` - Get graph data as JSON
- `GET /categories` - List all categories

## 🎯 Use Cases

1. **Skills Mapping**: Visualize relationships between different skills and competencies
2. **Curriculum Design**: Identify related topics for course planning
3. **Career Planning**: Discover connections between different fields
4. **Knowledge Management**: Organize and understand domain relationships
5. **Team Building**: Find complementary skills and interests

## 🐛 Troubleshooting

**Issue**: Graph is too cluttered
- **Solution**: Increase the similarity threshold (0.2-0.3)

**Issue**: Missing obvious connections
- **Solution**: Lower the similarity threshold (0.1-0.15)

**Issue**: Categories not showing sub-interests
- **Solution**: Check that sub-interests are properly indented with tabs in `interest_list.txt`

**Issue**: Import errors
- **Solution**: Ensure all packages are installed: `pip install -r requirements.txt`

## 📈 Performance Tips

- For large datasets (>500 nodes), increase similarity threshold to reduce edges
- Close other browser tabs when viewing complex graphs
- Use Chrome or Firefox for best performance
- Adjust physics settings in the code for faster stabilization

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
- NetworkX for graph operations
- Pyvis for interactive visualization
- Scikit-learn for similarity calculations
- Flask for web application framework
