/**
 * Figma shadow variables data
 *
 * To populate these with real Figma data:
 *
 * 1. Use MCP Figma tools to fetch variable definitions:
 *    - Use `mcp_Figma_get_variable_defs` with fileKey and nodeId
 *    - Example: For file "g2bfVe3ggry7wwOjKJ1cI5", node "26:31"
 *
 * 2. Or use the Figma API directly to fetch variables
 *
 * 3. The data structure should be:
 *    {
 *      'shadow-xs': 'Effect(type: DROP_SHADOW, ...)',
 *      'shadow-sm': 'Effect(type: DROP_SHADOW, ...)',
 *      // ... more shadow variables
 *    }
 *
 * 4. Shadow variables fetched from:
 *    - Shadow: node-id=26-31
 */

export const shadowVariables: Record<string, string> = {
  'shadow-xs':
    'Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0)',
  'shadow-sm':
    'Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 10), radius: 15, spread: -5); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 7), radius: 7, spread: -5)',
  'shadow-md':
    'Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 20), radius: 25, spread: -5); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 10), radius: 10, spread: -5)',
  'shadow-lg':
    'Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 28), radius: 23, spread: -7); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 12), radius: 12, spread: -7)',
  'shadow-xl':
    'Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 36), radius: 28, spread: -7); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 17), radius: 17, spread: -7)',
}

