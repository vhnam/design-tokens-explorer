/**
 * Type definitions for Design Tokens according to DTCG 2025.10 standard
 */

export interface TokenDefinition {
  $value: string | number;
  $type?: string;
  $description?: string;
  [key: string]: any;
}

export interface TokenGroup {
  $type?: string;
  $description?: string;
  [key: string]: any;
}

export interface Token {
  path: string;
  name: string;
  value: string | number;
  type?: string;
  description?: string;
  isGlobal: boolean;
  references: string[];
  referencedBy: string[];
}

export interface TokenMap {
  [path: string]: Token;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'global' | 'semantic' | 'orphan';
  tokenType?: string;
  value?: string | number;
  description?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AnalysisReport {
  totalTokens: number;
  globalTokens: number;
  semanticTokens: number;
  orphanTokens: number;
  orphanTokensList: Array<{
    path: string;
    value: string | number;
    missingReference: string;
    description?: string;
  }>;
  statistics: {
    avgReferencesPerToken: number;
    maxDepth: number;
    circularReferences: string[][];
  };
}

export interface VisualizationOutput {
  format: 'd3' | 'dot' | 'mermaid';
  data: any;
}
