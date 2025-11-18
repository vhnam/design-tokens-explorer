/**
 * Graph Builder - Builds directed graph from token relationships
 */

import { TokenMap, Graph, GraphNode, GraphEdge } from './types';

export class GraphBuilder {
  /**
   * Build a directed graph from the token map
   */
  buildGraph(tokenMap: TokenMap): Graph {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const addedNodes = new Set<string>();

    // Create nodes for all tokens
    for (const [path, token] of Object.entries(tokenMap)) {
      if (addedNodes.has(path)) continue;

      const nodeType = this.determineNodeType(token, tokenMap);

      nodes.push({
        id: path,
        label: this.formatLabel(path),
        type: nodeType,
        tokenType: token.type,
        value: token.value,
        description: token.description
      });

      addedNodes.add(path);
    }

    // Create edges for all references
    for (const [path, token] of Object.entries(tokenMap)) {
      for (const ref of token.references) {
        // Only create edge if the target exists
        if (tokenMap[ref]) {
          edges.push({
            source: path,
            target: ref,
            label: 'references'
          });
        }
      }
    }

    return { nodes, edges };
  }

  /**
   * Determine the type of node
   */
  private determineNodeType(token: any, tokenMap: TokenMap): 'global' | 'semantic' | 'orphan' {
    if (token.isGlobal) {
      return 'global';
    }

    // Check if all references are valid
    const hasInvalidReference = token.references.some((ref: string) => !tokenMap[ref]);
    if (hasInvalidReference) {
      return 'orphan';
    }

    return 'semantic';
  }

  /**
   * Format label for display
   */
  private formatLabel(path: string): string {
    const parts = path.split('.');
    // Return the last 2-3 parts for readability
    if (parts.length > 3) {
      return parts.slice(-3).join('.');
    }
    return path;
  }

  /**
   * Build a subgraph for a specific token and its dependencies
   */
  buildSubgraph(tokenPath: string, tokenMap: TokenMap, depth: number = Infinity): Graph {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const visited = new Set<string>();

    const traverse = (path: string, currentDepth: number): void => {
      if (visited.has(path) || currentDepth > depth) return;
      visited.add(path);

      const token = tokenMap[path];
      if (!token) return;

      // Add node
      const nodeType = this.determineNodeType(token, tokenMap);
      nodes.push({
        id: path,
        label: this.formatLabel(path),
        type: nodeType,
        tokenType: token.type,
        value: token.value,
        description: token.description
      });

      // Add edges and recurse
      for (const ref of token.references) {
        if (tokenMap[ref]) {
          edges.push({
            source: path,
            target: ref,
            label: 'references'
          });
          traverse(ref, currentDepth + 1);
        }
      }
    };

    traverse(tokenPath, 0);
    return { nodes, edges };
  }

  /**
   * Group nodes by type
   */
  groupNodesByType(graph: Graph): Map<string, GraphNode[]> {
    const groups = new Map<string, GraphNode[]>();

    for (const node of graph.nodes) {
      const type = node.type;
      if (!groups.has(type)) {
        groups.set(type, []);
      }
      groups.get(type)!.push(node);
    }

    return groups;
  }

  /**
   * Get all nodes that are not connected (isolated)
   */
  getIsolatedNodes(graph: Graph): GraphNode[] {
    const connectedNodes = new Set<string>();

    for (const edge of graph.edges) {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    }

    return graph.nodes.filter(node => !connectedNodes.has(node.id));
  }
}
