/**
 * DTCG Token Hierarchy Colors
 * Following Design Tokens Community Group standard
 */
export const TOKEN_COLORS = {
  global: '#E9D5FF',      // Light purple - Foundation
  brand: '#93C5FD',       // Light blue - Brand
  semantic: '#6EE7B7',    // Teal/green - Semantic
  component: '#FCD34D',   // Yellow/gold - Component
  orphan: '#FCA5A5',      // Light red - Invalid
  default: '#D1D5DB'      // Gray - Unknown
} as const;

/**
 * Badge colors with text colors for contrast
 */
export const BADGE_COLORS = {
  global: {
    background: '#E9D5FF',
    text: '#6B21A8'
  },
  brand: {
    background: '#93C5FD',
    text: '#1E40AF'
  },
  semantic: {
    background: '#6EE7B7',
    text: '#065F46'
  },
  component: {
    background: '#FCD34D',
    text: '#92400E'
  },
  orphan: {
    background: '#FCA5A5',
    text: '#991B1B'
  }
} as const;

/**
 * Token group type definitions
 */
export const TOKEN_GROUPS = {
  GLOBAL: 'global',
  BRAND: 'brand',
  SEMANTIC: 'semantic',
  COMPONENT: 'component',
  ORPHAN: 'orphan'
} as const;

/**
 * Token group labels for display
 */
export const TOKEN_GROUP_LABELS = {
  [TOKEN_GROUPS.GLOBAL]: 'Global',
  [TOKEN_GROUPS.BRAND]: 'Brand',
  [TOKEN_GROUPS.SEMANTIC]: 'Semantic',
  [TOKEN_GROUPS.COMPONENT]: 'Component',
  [TOKEN_GROUPS.ORPHAN]: 'Orphan (Invalid)'
} as const;

/**
 * Token group descriptions
 */
export const TOKEN_GROUP_DESCRIPTIONS = {
  [TOKEN_GROUPS.GLOBAL]: 'Foundation-level tokens - raw values (colors, sizes, etc.)',
  [TOKEN_GROUPS.BRAND]: 'Brand-specific tokens that reference global tokens',
  [TOKEN_GROUPS.SEMANTIC]: 'Context-specific tokens (e.g., primary, success, warning)',
  [TOKEN_GROUPS.COMPONENT]: 'Component-specific tokens',
  [TOKEN_GROUPS.ORPHAN]: 'Invalid tokens with missing or broken references'
} as const;

/**
 * D3 Force Simulation Parameters
 */
export const SIMULATION_CONFIG = {
  linkDistance: 100,
  chargeStrength: -300,
  collisionRadius: 40,
  nodeRadius: 10
} as const;
