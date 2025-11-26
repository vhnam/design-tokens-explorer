/**
 * Figma radius variables data
 *
 * To populate these with real Figma data:
 *
 * 1. Use MCP Figma tools to fetch variable definitions:
 *    - Use `mcp_Figma_get_variable_defs` with fileKey and nodeId
 *    - Example: For file "g2bfVe3ggry7wwOjKJ1cI5", node "24:306"
 *
 * 2. Or use the Figma API directly to fetch variables
 *
 * 3. The data structure should be:
 *    {
 *      'radius/xs': '2',
 *      'radius/sm': '4',
 *      // ... more radius variables
 *    }
 *
 * 4. Radius variables fetched from:
 *    - Radius: node-id=24-306
 */

export const radiusVariables: Record<string, string> = {
  'radius/xs': '2',
  'radius/sm': '4',
  'radius/md': '8',
  'radius/lg': '16',
  'radius/xl': '32',
  'radius/full': '1000',
}

