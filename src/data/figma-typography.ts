/**
 * Figma typography variables data
 *
 * To populate these with real Figma data:
 *
 * 1. Use MCP Figma tools to fetch variable definitions:
 *    - Use `mcp_Figma_get_variable_defs` with fileKey and nodeId
 *    - Example: For file "g2bfVe3ggry7wwOjKJ1cI5", node "24-295"
 *
 * 2. Or use the Figma API directly to fetch variables
 *
 * 3. Typography variables include:
 *    - Font families
 *    - Font sizes
 *    - Font weights
 *    - Line heights
 *    - Letter spacings
 *
 * 4. Typography variables fetched from:
 *    - Typography Primitives and Semantic: node-id=24-295
 */

/**
 * Typography primitive tokens
 * These are the base design tokens for typography
 */
export const typographyPrimitives: Record<string, string> = {
  // Font families
  'primitives/font-families/headings': 'Montserrat',
  'primitives/font-families/sans': 'Be Vietnam Pro',
  'primitives/font-families/mono': 'Roboto Mono',

  // Font sizes (in px)
  'primitives/font-sizes/xs': '12',
  'primitives/font-sizes/sm': '14',
  'primitives/font-sizes/md': '16',
  'primitives/font-sizes/lg': '18',
  'primitives/font-sizes/xl': '20',

  // Font weights
  'primitives/font-weights/regular': '400',
  'primitives/font-weights/bold': '700',

  // Line heights
  'primitives/line-heights/xs': '1.4',
  'primitives/line-heights/sm': '1.45',
  'primitives/line-heights/md': '1.55',
  'primitives/line-heights/lg': '1.6',
  'primitives/line-heights/xl': '1.65',

  // Letter spacings (in px)
  'primitives/letter-spacings/tighter': '-0.05',
  'primitives/letter-spacings/tight': '-0.03',
  'primitives/letter-spacings/normal': '0',
  'primitives/letter-spacings/wide': '0.03',
  'primitives/letter-spacings/wider': '0.05',
}

/**
 * Typography semantic tokens
 * These map to specific use cases (headings, body text, etc.)
 */
export const typographySemantic: Record<string, TypographyStyle> = {
  // Headings
  'semantic/typography/h1': {
    fontFamily: 'Montserrat',
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: -0.03,
  },
  'semantic/typography/h2': {
    fontFamily: 'Montserrat',
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: -0.03,
  },
  'semantic/typography/h3': {
    fontFamily: 'Montserrat',
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  'semantic/typography/h4': {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.45,
    letterSpacing: 0,
  },
  'semantic/typography/h5': {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  'semantic/typography/h6': {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: 0.03,
  },
  // Paragraph
  'semantic/typography/paragraph': {
    fontFamily: 'Be Vietnam Pro',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.65,
    letterSpacing: 0,
  },
}

/**
 * Typography style interface
 */
export interface TypographyStyle {
  fontFamily: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: number
}
