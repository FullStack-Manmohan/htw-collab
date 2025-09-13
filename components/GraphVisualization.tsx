'use client';

import React, { useEffect, useRef } from 'react';
import { Network, DataSet } from 'vis-network/standalone';
import { GraphData } from '@/lib/graphGenerator';

interface GraphVisualizationProps {
  graphData: GraphData | null;
}

export default function GraphVisualization({ graphData }: GraphVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current || !graphData) return;

    // Create datasets
    const nodes = new DataSet(graphData.nodes.map(node => ({
      id: node.id,
      label: node.label,
      level: node.level,
      size: node.size,
      color: node.color,
      font: {
        size: node.level === 0 ? 14 : 10,
        face: 'Arial'
      },
      mass: node.level === 0 ? 3 : 1
    })));

    const edges = new DataSet(graphData.edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      value: edge.value,
      color: edge.color,
      title: edge.title,
      width: edge.width
    })));

    // Create network
    const data = { nodes, edges };
    
    const options = {
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -150,
          centralGravity: 0.015,
          springLength: 100,
          springConstant: 0.08,
          damping: 0.4,
          avoidOverlap: 0.9
        },
        minVelocity: 0.75,
        maxVelocity: 30
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        navigationButtons: true,
        keyboard: true,
        zoomView: true
      },
      nodes: {
        borderWidth: 2,
        borderWidthSelected: 4,
        shape: 'dot'
      },
      edges: {
        smooth: {
          type: 'continuous',
          roundness: 0.5
        }
      }
    };

    // Clean up previous network
    if (networkRef.current) {
      networkRef.current.destroy();
    }

    // Create new network
    networkRef.current = new Network(containerRef.current, data, options);

    // Cleanup on unmount
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [graphData]);

  if (!graphData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading graph...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
} 