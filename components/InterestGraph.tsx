'use client';

import { useEffect, useRef, useState } from 'react';
import { Profile } from '../types/Profile';
import { getAllInterests, getProfiles } from '../lib/store';

interface InterestGraphProps {
  onInterestClick: (interest: string) => void;
  onPersonClick: (person: Profile) => void;
  selectedInterest?: string;
}

interface GraphNode {
  id: string;
  name: string;
  type: 'person' | 'interest';
  profile?: Profile;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

// Fallback component when react-force-graph fails
function FallbackGraph({ onInterestClick, onPersonClick, selectedInterest }: InterestGraphProps) {
  const interests = getAllInterests();
  const profiles = getProfiles();

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🌊 Explore Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => onInterestClick(interest)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedInterest === interest
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      {selectedInterest && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">
            People interested in {selectedInterest}:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profiles
              .filter(p => p.interests.includes(selectedInterest))
              .map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => onPersonClick(profile)}
                  className="text-left p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-medium">{profile.name}</div>
                  <div className="text-sm text-gray-600">{profile.role}</div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InterestGraph({ onInterestClick, onPersonClick, selectedInterest }: InterestGraphProps) {
  const [useGraph, setUseGraph] = useState(true);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({ 
    nodes: [], 
    links: [] 
  });
  const forceGraphRef = useRef<any>(null);

  useEffect(() => {
    try {
      const profiles = getProfiles();
      const interests = getAllInterests();

      // Create nodes for people and interests
      const personNodes: GraphNode[] = profiles.map(profile => ({
        id: `person-${profile.id}`,
        name: profile.name,
        type: 'person',
        profile
      }));

      const interestNodes: GraphNode[] = interests.map(interest => ({
        id: `interest-${interest}`,
        name: interest,
        type: 'interest'
      }));

      // Create links between people and their interests
      const links: GraphLink[] = [];
      profiles.forEach(profile => {
        profile.interests.forEach(interest => {
          links.push({
            source: `person-${profile.id}`,
            target: `interest-${interest}`
          });
        });
      });

      setGraphData({
        nodes: [...personNodes, ...interestNodes],
        links
      });
    } catch (error) {
      console.error('Error setting up graph data:', error);
      setUseGraph(false);
    }
  }, []);

  // Fallback if react-force-graph has issues
  if (!useGraph) {
    return <FallbackGraph 
      onInterestClick={onInterestClick} 
      onPersonClick={onPersonClick} 
      selectedInterest={selectedInterest} 
    />;
  }

  try {
    // Dynamic import to handle potential SSR issues
    const ForceGraph2D = require('react-force-graph').ForceGraph2D;

    return (
      <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden">
        <ForceGraph2D
          ref={forceGraphRef}
          width={800}
          height={384}
          graphData={graphData}
          nodeLabel={(node: GraphNode) => node.name}
          nodeColor={(node: GraphNode) => {
            if (node.type === 'interest') {
              return selectedInterest === node.name ? '#3B82F6' : '#10B981';
            }
            return '#F59E0B';
          }}
          nodeRelSize={6}
          linkColor={() => '#9CA3AF'}
          linkWidth={1}
          onNodeClick={(node: GraphNode) => {
            if (node.type === 'interest') {
              onInterestClick(node.name);
            } else if (node.type === 'person' && node.profile) {
              onPersonClick(node.profile);
            }
          }}
          nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.type === 'interest' 
              ? (selectedInterest === node.name ? '#1E40AF' : '#059669')
              : '#D97706';
            
            // Draw circle
            ctx.beginPath();
            ctx.arc(node.x || 0, node.y || 0, 8, 0, 2 * Math.PI, false);
            ctx.fill();
            
            // Draw label
            ctx.fillStyle = '#374151';
            ctx.fillText(label, node.x || 0, (node.y || 0) + 15);
          }}
          d3Force={{
            charge: -300,
            link: { distance: 50 },
            center: { strength: 0.5 }
          }}
        />
        
        <div className="absolute bottom-2 right-2">
          <button
            onClick={() => setUseGraph(false)}
            className="text-xs bg-white/80 px-2 py-1 rounded text-gray-600 hover:bg-white"
          >
            Switch to List View
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ForceGraph:', error);
    return <FallbackGraph 
      onInterestClick={onInterestClick} 
      onPersonClick={onPersonClick} 
      selectedInterest={selectedInterest} 
    />;
  }
}