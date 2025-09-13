#!/usr/bin/env python3
"""
Convert pairwise interest comparisons to a directed graph format.
Each node has connections based on k-NN and epsilon radius constraints.
"""

import argparse
import csv
import sys
from collections import defaultdict
from typing import Dict, List, Set, Tuple


def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='Convert pairwise interest comparisons to graph format'
    )
    parser.add_argument(
        '--min-k', 
        type=int, 
        required=True,
        help='Minimum number of connections per node'
    )
    parser.add_argument(
        '--max-k', 
        type=int, 
        required=True,
        help='Maximum number of connections per node'
    )
    parser.add_argument(
        '--epsilon', 
        type=float, 
        required=True,
        help='Maximum distance (score) for connections'
    )
    parser.add_argument(
        '--input', 
        type=str, 
        default='interest_comp.csv',
        help='Input CSV file (default: interest_comp.csv)'
    )
    parser.add_argument(
        '--output', 
        type=str, 
        default=None,
        help='Output file (default: stdout)'
    )
    
    args = parser.parse_args()
    
    if args.min_k > args.max_k:
        parser.error("min-k cannot be greater than max-k")
    if args.min_k < 0 or args.max_k < 0:
        parser.error("k values must be non-negative")
    if args.epsilon < 0:
        parser.error("epsilon must be non-negative")
    
    return args


def load_pairwise_comparisons(filename: str) -> Tuple[List[str], Dict[Tuple[str, str], float]]:
    """
    Load pairwise comparisons from CSV file.
    
    Returns:
        - List of unique interests (nodes)
        - Dictionary mapping (interest_a, interest_b) to score
    """
    interests = set()
    scores = {}
    
    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            interest_a = row['first_interest']
            interest_b = row['second_interest']
            score = float(row['score'])
            
            interests.add(interest_a)
            interests.add(interest_b)
            
            # Store both directions for easy lookup
            scores[(interest_a, interest_b)] = score
            scores[(interest_b, interest_a)] = score
    
    # Sort interests for consistent ordering
    interest_list = sorted(list(interests))
    
    return interest_list, scores


def build_graph(
    interests: List[str], 
    scores: Dict[Tuple[str, str], float],
    min_k: int,
    max_k: int,
    epsilon: float
) -> List[Tuple[int, int, float]]:
    """
    Build directed graph edges based on k-NN and epsilon constraints.
    
    Returns:
        List of edges as (source_id, target_id, score)
    """
    # Create interest to ID mapping
    interest_to_id = {interest: i for i, interest in enumerate(interests)}
    
    edges = []
    
    for source_interest in interests:
        source_id = interest_to_id[source_interest]
        
        # Get all possible connections for this node
        candidates = []
        for target_interest in interests:
            if source_interest == target_interest:
                continue
            
            # Check if we have a score for this pair
            if (source_interest, target_interest) in scores:
                score = scores[(source_interest, target_interest)]
                target_id = interest_to_id[target_interest]
                candidates.append((target_id, score))
        
        # Sort by score (lower is better/closer)
        candidates.sort(key=lambda x: x[1])
        
        # Apply epsilon and k constraints
        selected_edges = []
        
        # First, add all connections within epsilon (up to max_k)
        for target_id, score in candidates:
            if score <= epsilon and len(selected_edges) < max_k:
                selected_edges.append((target_id, score))
        
        # If we have fewer than min_k connections, add closest ones
        if len(selected_edges) < min_k:
            for target_id, score in candidates:
                if (target_id, score) not in selected_edges:
                    selected_edges.append((target_id, score))
                    if len(selected_edges) >= min_k:
                        break
        
        # Add edges to final list
        for target_id, score in selected_edges:
            edges.append((source_id, target_id, score))
    
    return edges


def output_graph(
    interests: List[str], 
    edges: List[Tuple[int, int, float]], 
    output_file=None
):
    """Output the graph in the specified format."""
    output = sys.stdout if output_file is None else open(output_file, 'w')
    
    try:
        # Output nodes
        for i, interest in enumerate(interests):
            print(f"{i}: {interest}", file=output)
        
        # Output edges
        for source_id, target_id, score in edges:
            print(f"{source_id},{target_id},{score}", file=output)
    finally:
        if output_file is not None:
            output.close()


def main():
    """Main function."""
    args = parse_arguments()
    
    # Load data
    try:
        interests, scores = load_pairwise_comparisons(args.input)
    except FileNotFoundError:
        print(f"Error: Input file '{args.input}' not found", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error reading input file: {e}", file=sys.stderr)
        sys.exit(1)
    
    # Build graph
    edges = build_graph(interests, scores, args.min_k, args.max_k, args.epsilon)
    
    # Output results
    output_graph(interests, edges, args.output)
    
    # Print statistics to stderr
    print(f"\nGraph statistics:", file=sys.stderr)
    print(f"  Nodes: {len(interests)}", file=sys.stderr)
    print(f"  Edges: {len(edges)}", file=sys.stderr)
    print(f"  Average out-degree: {len(edges) / len(interests):.2f}", file=sys.stderr)
    
    # Count connections per node
    out_degree = defaultdict(int)
    for source_id, _, _ in edges:
        out_degree[source_id] += 1
    
    min_connections = min(out_degree.values()) if out_degree else 0
    max_connections = max(out_degree.values()) if out_degree else 0
    print(f"  Min connections per node: {min_connections}", file=sys.stderr)
    print(f"  Max connections per node: {max_connections}", file=sys.stderr)


if __name__ == "__main__":
    main() 