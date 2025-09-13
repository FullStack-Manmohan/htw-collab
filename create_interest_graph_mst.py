#!/usr/bin/env python3
"""
Script to create a graph from pairwise interest comparisons and build a minimum spanning tree.
Reads from interest_comp.csv and outputs nodes and edges.
"""

import csv
from typing import Dict, List, Tuple, Set


class UnionFind:
    """Union-Find data structure for Kruskal's MST algorithm."""
    
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True


def read_interest_comparisons(filename: str) -> List[Tuple[str, str, int]]:
    """Read pairwise interest comparisons from CSV file."""
    comparisons = []
    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            first = row['first_interest'].strip()
            second = row['second_interest'].strip()
            score = int(row['score'])
            comparisons.append((first, second, score))
    return comparisons


def build_graph(comparisons: List[Tuple[str, str, int]]) -> Tuple[Dict[str, int], List[Tuple[int, int, int]]]:
    """
    Build graph from comparisons.
    Returns:
        - interest_to_id: mapping from interest name to numerical ID
        - edges: list of (id_a, id_b, score) tuples
    """
    # Get all unique interests
    interests = set()
    for first, second, _ in comparisons:
        interests.add(first)
        interests.add(second)
    
    # Sort interests for consistent ordering
    sorted_interests = sorted(interests)
    
    # Create ID mapping
    interest_to_id = {interest: idx for idx, interest in enumerate(sorted_interests)}
    
    # Create edges list with IDs
    edges = []
    for first, second, score in comparisons:
        id_a = interest_to_id[first]
        id_b = interest_to_id[second]
        edges.append((id_a, id_b, score))
    
    return interest_to_id, edges


def kruskal_mst(n: int, edges: List[Tuple[int, int, int]]) -> List[Tuple[int, int, int]]:
    """
    Compute minimum spanning tree using Kruskal's algorithm.
    
    Args:
        n: number of nodes
        edges: list of (node_a, node_b, weight) tuples
    
    Returns:
        List of edges in the MST
    """
    # Sort edges by weight (score)
    sorted_edges = sorted(edges, key=lambda x: x[2])
    
    # Initialize Union-Find
    uf = UnionFind(n)
    
    # Build MST
    mst_edges = []
    for a, b, weight in sorted_edges:
        if uf.union(a, b):
            mst_edges.append((a, b, weight))
            if len(mst_edges) == n - 1:
                break
    
    return mst_edges


def main():
    # Read data
    print("Reading interest comparisons from interest_comp.csv...")
    comparisons = read_interest_comparisons('interest_comp.csv')
    
    # Build graph
    print("Building graph...")
    interest_to_id, edges = build_graph(comparisons)
    
    # Create reverse mapping for output
    id_to_interest = {v: k for k, v in interest_to_id.items()}
    
    # Compute MST
    print("Computing minimum spanning tree...")
    n = len(interest_to_id)
    mst_edges = kruskal_mst(n, edges)
    
    # Output results
    print("\n" + "="*60)
    print("MINIMUM SPANNING TREE")
    print("="*60)
    
    # Output nodes
    print("\nNODES:")
    print("-"*40)
    for idx in range(n):
        print(f"{idx}: {id_to_interest[idx]}")
    
    # Output MST edges
    print("\nMST EDGES:")
    print("-"*40)
    total_weight = 0
    for a, b, weight in mst_edges:
        print(f"{a},{b},{weight}")
        total_weight += weight
    
    print("\n" + "="*60)
    print(f"Total MST weight: {total_weight}")
    print(f"Number of nodes: {n}")
    print(f"Number of edges in MST: {len(mst_edges)}")
    print("="*60)
    
    # Optionally save to file
    output_file = "interest_graph_mst.txt"
    print(f"\nSaving output to {output_file}...")
    with open(output_file, 'w') as f:
        f.write("NODES:\n")
        for idx in range(n):
            f.write(f"{idx}: {id_to_interest[idx]}\n")
        f.write("\nEDGES:\n")
        for a, b, weight in mst_edges:
            f.write(f"{a},{b},{weight}\n")
    print(f"Output saved to {output_file}")


if __name__ == "__main__":
    main() 