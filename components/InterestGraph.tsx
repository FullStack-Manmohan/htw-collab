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
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 overflow-auto border border-blue-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🌊 Explore Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => onInterestClick(interest)}
              className={`chip transition-all duration-200 ${
                selectedInterest === interest
                  ? 'chip-selected'
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      {selectedInterest && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            👥 People interested in {selectedInterest}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profiles
              .filter(p => p.interests.includes(selectedInterest))
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
  const [useGraph, setUseGraph] = useState(true);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({ 
    nodes: [], 
    links: [] 
  });
  const forceGraphRef = useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ForceGraph2D = require('react-force-graph').ForceGraph2D;

    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-blue-100">
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
        
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => setUseGraph(false)}
            className="btn-ghost text-xs px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-300"
          >
            📋 Switch to List View
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