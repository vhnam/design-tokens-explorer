import type { TokenNode } from './token.types';

/**
 * Graph visualization types
 */

export interface TokenLink {
  source: string | TokenNode;
  target: string | TokenNode;
  label: string;
}

export interface GraphData {
  nodes: TokenNode[];
  links: TokenLink[];
}

export interface FilterState {
  showGlobal: boolean;
  showBrand: boolean;
  showSemantic: boolean;
  showComponent: boolean;
  showOrphan: boolean;
  searchTerm: string;
}
