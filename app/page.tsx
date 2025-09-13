'use client';

import { useState, useEffect } from 'react';
import GraphVisualization from '@/components/GraphVisualization';
import { GraphData } from '@/lib/graphGenerator';

export default function Home() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [threshold, setThreshold] = useState(0.15);
  const [loading, setLoading] = useState(false);
  const [topConnected, setTopConnected] = useState<Array<{label: string, connections: number}>>([]);

  useEffect(() => {
    loadGraph(0.15);
  }, []);

  const loadGraph = async (thresholdValue: number) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threshold: thresholdValue }),
      });

      const result = await response.json();
      if (result.success) {
        setGraphData(result.data);
        setTopConnected(result.topConnected || []);
      }
    } catch (error) {
      console.error('Error loading graph:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThresholdChange = (value: number) => {
    setThreshold(value);
  };

  const handleRegenerateGraph = () => {
    loadGraph(threshold);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 md:p-6 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">🌐</span>
            Interest Knowledge Graph
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Threshold Control */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Similarity Threshold
              </label>
              <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={threshold * 100}
                  onChange={(e) => handleThresholdChange(Number(e.target.value) / 100)}
                  className="w-48 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="font-semibold text-purple-600 min-w-[3rem] text-center">
                  {threshold.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Regenerate Button */}
            <button
              onClick={handleRegenerateGraph}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide text-sm"
            >
              {loading ? 'Generating...' : 'Regenerate Graph'}
            </button>

            {/* Statistics */}
            <div className="flex gap-3">
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow">
                <div className="text-xl font-bold text-purple-600">
                  {graphData?.statistics.totalNodes || '-'}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Nodes</div>
              </div>
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow">
                <div className="text-xl font-bold text-purple-600">
                  {graphData?.statistics.totalEdges || '-'}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Edges</div>
              </div>
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow">
                <div className="text-xl font-bold text-purple-600">
                  {graphData?.statistics.categoriesCount || '-'}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Graph Container */}
        <div className="flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <GraphVisualization graphData={graphData} />
        </div>

        {/* Side Panel */}
        <div className="w-80 space-y-4">
          {/* Info Panel */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>ℹ️</span> Graph Controls
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <p><strong>Navigation:</strong> Click and drag to pan, scroll to zoom</p>
              <p><strong>Selection:</strong> Click nodes to highlight connections</p>
              <p><strong>Threshold:</strong> Lower values show more connections, higher values show only stronger relationships</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                <span className="text-xs text-gray-600">Main Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-white shadow-sm"></div>
                <span className="text-xs text-gray-600">Sub-Interests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500 opacity-60"></div>
                <span className="text-xs text-gray-600">Strong Similarity (&gt;0.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-orange-400 opacity-60"></div>
                <span className="text-xs text-gray-600">Medium Similarity (&gt;0.3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-gray-300"></div>
                <span className="text-xs text-gray-600">Weak Similarity (&lt;0.3)</span>
              </div>
            </div>
          </div>

          {/* Top Connected */}
          {topConnected.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Most Connected</h3>
              <div className="space-y-1">
                {topConnected.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 truncate max-w-[200px]">{item.label}</span>
                    <span className="font-semibold text-purple-600">{item.connections}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
} 