import { NextRequest, NextResponse } from 'next/server';
import { InterestGraphBuilder } from '@/lib/graphGenerator';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { threshold = 0.15 } = await request.json();
    
    // Read the interest file
    const filePath = path.join(process.cwd(), 'public', 'interest_list.txt');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Build the graph
    const builder = new InterestGraphBuilder();
    builder.parseInterestFile(fileContent);
    builder.calculateSimilarityScores();
    const graphData = builder.buildGraph(threshold);
    
    // Get top connected interests
    const topConnected = builder.getTopConnectedInterests(graphData, 10);
    
    return NextResponse.json({
      success: true,
      data: graphData,
      topConnected
    });
  } catch (error) {
    console.error('Error generating graph:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate graph' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return default graph with threshold 0.15
  try {
    const filePath = path.join(process.cwd(), 'public', 'interest_list.txt');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const builder = new InterestGraphBuilder();
    builder.parseInterestFile(fileContent);
    builder.calculateSimilarityScores();
    const graphData = builder.buildGraph(0.15);
    
    const topConnected = builder.getTopConnectedInterests(graphData, 10);
    
    return NextResponse.json({
      success: true,
      data: graphData,
      topConnected
    });
  } catch (error) {
    console.error('Error generating graph:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate graph' },
      { status: 500 }
    );
  }
} 