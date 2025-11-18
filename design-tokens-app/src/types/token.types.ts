/**
 * Token type definitions following DTCG standard
 */

export type TokenGroup = 'global' | 'brand' | 'semantic' | 'component' | 'orphan';

export interface TokenNode {
  id: string;
  label: string;
  group: TokenGroup;
  type?: string;
  value: string;
  description?: string;
  // D3 simulation properties
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface ReportToken {
  path: string;
  value: string;
  type?: string;
  isGlobal: boolean;
  references: string[];
  referencedBy: string[];
}

export interface OrphanToken {
  path: string;
  value: string;
  missingReference: string;
  description?: string;
}

export interface TokenSummary {
  totalTokens: number;
  globalTokens: number;
  brandTokens?: number;
  semanticTokens: number;
  componentTokens?: number;
  orphanTokens: number;
}

export interface TokenStatistics {
  avgReferencesPerToken: number;
  maxDepth: number;
  circularReferences: string[];
}

export interface TokenGraphInfo {
  nodeCount: number;
  edgeCount: number;
  nodesByType: {
    global: number;
    brand?: number;
    semantic: number;
    component?: number;
    orphan: number;
  };
}

export interface ReportData {
  summary: TokenSummary;
  statistics: TokenStatistics;
  orphanTokens: OrphanToken[];
  graph: TokenGraphInfo;
  tokens: ReportToken[];
}
