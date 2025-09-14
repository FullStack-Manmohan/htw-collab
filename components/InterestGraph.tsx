'use client';

import { useEffect, useRef, useState } from 'react';
import { Profile } from '../types/Profile';
import { getProfiles } from '../lib/store';
import { 
  parseInterestHierarchy, 
  createVisualizationGraph,
  getInterestsByCategory,
  getRelatedInterests,
  type SemanticGraphData,
  type SemanticNode 
} from '../lib/semantic-graph';

// Custom D3 Force Graph Component
const CustomForceGraph = ({ graphData, onNodeClick, width = 800, height = 384 }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const d3Ref = useRef<any>(null);

  useEffect(() => {
    if (!svgRef.current || !graphData) return;

    // Import D3 dynamically
    import('d3').then((d3) => {
      d3Ref.current = d3;
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous content

      const { nodes, links } = graphData;

      // Create zoom behavior
      const zoomBehavior = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          const { transform } = event;
          setTransform({ x: transform.x, y: transform.y, k: transform.k });
          g.attr('transform', transform);
        });

      svg.call(zoomBehavior as any);

      // Main group for all graph elements
      const g = svg.append('g');

      // Create simulation with adjusted forces for better layout
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id((d: any) => d.id).distance(60))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(15));

      // Create links
      const link = g.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', (d: any) => Math.sqrt(d.weight || 1) * 1.5)
        .attr('stroke-opacity', 0.6);

      // Create nodes
      const node = g.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 8)
        .attr('fill', '#06b6d4') // All nodes are interests (cyan)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .call(d3.drag<SVGCircleElement, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      // Add labels
      const labels = g.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text((d: any) => d.name)
        .attr('font-size', '10px')
        .attr('font-family', 'Inter, sans-serif')
        .attr('fill', '#1f2937')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('pointer-events', 'none');

      // Add click handlers
      node.on('click', (event: any, d: any) => {
        if (onNodeClick) {
          onNodeClick(d);
        }
      });

      // Add hover effects
      node.on('mouseenter', (event: any, d: any) => {
        link.style('stroke', (l: any) => 
          l.source === d || l.target === d ? '#ef4444' : '#94a3b8'
        );
        link.style('stroke-width', (l: any) => 
          l.source === d || l.target === d ? 3 : Math.sqrt(l.weight || 1) * 1.5
        );
      }).on('mouseleave', () => {
        link.style('stroke', '#94a3b8');
        link.style('stroke-width', (d: any) => Math.sqrt(d.weight || 1) * 1.5);
      });

      // Update positions on tick
      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);

        labels
          .attr('x', (d: any) => d.x)
          .attr('y', (d: any) => d.y + 16);
      });

      // Auto-fit the graph after simulation settles
      setTimeout(() => {
        const bounds = g.node()?.getBBox();
        if (bounds) {
          const fullWidth = bounds.width;
          const fullHeight = bounds.height;
          const midX = bounds.x + fullWidth / 2;
          const midY = bounds.y + fullHeight / 2;

          const scale = Math.min(width / fullWidth, height / fullHeight) * 0.7;
          const translate = [width / 2 - scale * midX, height / 2 - scale * midY];

          svg.transition().duration(750).call(
            zoomBehavior.transform as any,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
          );
        }
      }, 1000);

      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      // Store zoom behavior for external controls
      (svgRef.current as any).__zoom__ = zoomBehavior;
    });
  }, [graphData, onNodeClick, width, height]);

  const handleZoomIn = () => {
    if (!d3Ref.current || !svgRef.current) return;
    const d3 = d3Ref.current;
    const svg = d3.select(svgRef.current);
    const zoomBehavior = (svgRef.current as any).__zoom__;
    if (zoomBehavior) {
      svg.transition().duration(200).call(zoomBehavior.scaleBy, 1.5);
    }
  };

  const handleZoomOut = () => {
    if (!d3Ref.current || !svgRef.current) return;
    const d3 = d3Ref.current;
    const svg = d3.select(svgRef.current);
    const zoomBehavior = (svgRef.current as any).__zoom__;
    if (zoomBehavior) {
      svg.transition().duration(200).call(zoomBehavior.scaleBy, 1 / 1.5);
    }
  };

  const handleReset = () => {
    if (!d3Ref.current || !svgRef.current) return;
    const d3 = d3Ref.current;
    const svg = d3.select(svgRef.current);
    const zoomBehavior = (svgRef.current as any).__zoom__;
    if (zoomBehavior) {
      svg.transition().duration(500).call(zoomBehavior.transform as any, d3.zoomIdentity);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="Zoom In"
        >
          <span className="text-gray-700 font-bold text-lg">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="Zoom Out"
        >
          <span className="text-gray-700 font-bold text-lg">−</span>
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="Reset View"
        >
          <span className="text-gray-700 text-xs">⌂</span>
        </button>
      </div>

      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full cursor-move"
        style={{ background: '#ffffff' }}
      />
    </div>
  );
};

interface InterestGraphProps {
  onInterestClick: (interest: string) => void;
  onPersonClick: (person: Profile) => void;
  selectedInterest?: string;
}

interface GraphNode {
  id: string;
  name: string;
  type: 'person' | 'category' | 'interest';
  profile?: Profile;
  level?: number;
  category?: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string;
  target: string;
  weight?: number;
  linkType?: 'hierarchical' | 'semantic' | 'person';
}

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
	Mindfulness and Meditation`;

// Fallback component with semantic categories
function SemanticFallbackGraph({ onInterestClick, onPersonClick, selectedInterest }: InterestGraphProps) {
  const [semanticData, setSemanticData] = useState<SemanticGraphData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const profiles = getProfiles();

  useEffect(() => {
    try {
      console.log('🔄 Parsing semantic data...');
      const data = parseInterestHierarchy(INTEREST_DATA);
      console.log('✅ Parsed categories:', data.categories.length);
      console.log('✅ Parsed interests:', data.nodes.filter(n => n.type === 'interest').length);
      setSemanticData(data);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error parsing semantic data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <div className="text-lg font-semibold text-gray-700">Loading Semantic Graph...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg font-semibold text-red-700 mb-2">Error Loading Graph</div>
          <div className="text-sm text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!semanticData) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔</div>
          <div className="text-lg font-semibold text-gray-700">No Data Available</div>
        </div>
      </div>
    );
  }

  const displayInterests = selectedCategory 
    ? getInterestsByCategory(semanticData, selectedCategory)
    : semanticData.nodes.filter(n => n.type === 'interest').slice(0, 20);

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 overflow-auto border border-blue-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🧠 Semantic Interest Network
          <span className="text-sm font-normal text-gray-600">
            ({semanticData.categories.length} categories, {semanticData.nodes.filter(n => n.type === 'interest').length} interests)
          </span>
        </h3>
        
        {/* Category Navigation */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`chip transition-all duration-200 ${
                !selectedCategory
                  ? 'chip-selected'
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              All Categories
            </button>
            {semanticData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`chip transition-all duration-200 ${
                  selectedCategory === category
                    ? 'chip-selected'
                    : 'hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-2">
          {displayInterests.map((node) => (
            <button
              key={node.id}
              onClick={() => onInterestClick(node.name)}
              className={`chip transition-all duration-200 ${
                selectedInterest === node.name
                  ? 'chip-selected'
                  : 'hover:bg-green-50 hover:border-green-300'
              }`}
            >
              {node.name}
            </button>
          ))}
        </div>

        {/* Related Interests */}
        {selectedInterest && semanticData && (
          <div className="mt-4 p-4 bg-white/70 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🔗 Related Interests</h4>
            <div className="flex flex-wrap gap-2">
              {getRelatedInterests(semanticData, selectedInterest, 0.4)
                .slice(0, 8)
                .map(({ interest, weight }) => (
                  <button
                    key={interest.id}
                    onClick={() => onInterestClick(interest.name)}
                    className="chip bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs"
                    title={`Similarity: ${Math.round(weight * 100)}%`}
                  >
                    {interest.name} ({Math.round(weight * 100)}%)
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      
      {selectedInterest && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            👥 People interested in {selectedInterest}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profiles
              .filter(p => p.interests.some(interest => 
                interest.toLowerCase().includes(selectedInterest.toLowerCase()) ||
                selectedInterest.toLowerCase().includes(interest.toLowerCase())
              ))
              .map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => onPersonClick(profile)}
                  className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {profile.name}
                      </div>
                      <div className="text-sm text-gray-600">{profile.role}</div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InterestGraph({ onInterestClick, onPersonClick, selectedInterest }: InterestGraphProps) {
  const [semanticData, setSemanticData] = useState<SemanticGraphData | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useForceGraph, setUseForceGraph] = useState(true);

  // Load and parse semantic data
  useEffect(() => {
    try {
      console.log('🔄 Parsing semantic data...');
      const data = parseInterestHierarchy(INTEREST_DATA);
      console.log('✅ Parsed semantic data:', {
        categories: data.categories.length,
        interests: data.nodes.filter(n => n.type === 'interest').length,
        links: data.links.length
      });
      
      setSemanticData(data);
      
      // Convert to force-graph format
      const vizData = createVisualizationGraph(data);
      console.log('✅ Created visualization data:', {
        nodes: vizData.nodes.length,
        links: vizData.links.length
      });
      
      setGraphData(vizData);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error loading semantic data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <div className="text-lg font-semibold text-gray-700">Loading Semantic Graph...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !semanticData || !graphData) {
    return (
      <div className="w-full min-h-96">
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-600">⚠️</span>
            <span className="font-semibold text-yellow-800">Graph Visualization Error</span>
          </div>
          <p className="text-sm text-yellow-700 mb-3">
            {error || 'Failed to load graph data'}. Showing semantic fallback view.
          </p>
          <button
            onClick={() => setUseForceGraph(!useForceGraph)}
            className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
          >
            {useForceGraph ? 'Use List View' : 'Try Graph View'}
          </button>
        </div>
        <SemanticFallbackGraph 
          onInterestClick={onInterestClick} 
          onPersonClick={onPersonClick} 
          selectedInterest={selectedInterest} 
        />
      </div>
    );
  }

  // Force graph view
  if (useForceGraph) {
    return (
      <div className="w-full min-h-96">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">🌐 Interactive Network Graph</h3>
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {graphData.nodes.length} nodes • {graphData.links.length} connections
            </span>
          </div>
          <button
            onClick={() => setUseForceGraph(false)}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
          >
            📋 List View
          </button>
        </div>
        
        <div className="w-full h-96 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <CustomForceGraph
            graphData={graphData}
            onNodeClick={(node: any) => {
              // All nodes are interests now
              onInterestClick(node.name);
            }}
            width={800}
            height={384}
          />
        </div>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span>Interests</span>
          </div>
          <span className="text-gray-500">• Click nodes to explore • Hover to highlight connections • Drag to rearrange</span>
        </div>
      </div>
    );
  }

  // Fallback to semantic list view
  return (
    <div className="w-full min-h-96">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">📋 Semantic Network List</h3>
        <button
          onClick={() => setUseForceGraph(true)}
          className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md transition-colors"
        >
          🌐 Graph View
        </button>
      </div>
      <SemanticFallbackGraph 
        onInterestClick={onInterestClick} 
        onPersonClick={onPersonClick} 
        selectedInterest={selectedInterest} 
      />
    </div>
  );
}