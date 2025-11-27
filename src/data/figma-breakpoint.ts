/**
 * Figma breakpoint variables data
 *
 * To populate these with real Figma data:
 *
 * 1. Use MCP Figma tools to fetch variable definitions:
 *    - Use `mcp_Figma_get_variable_defs` with fileKey and nodeId
 *    - Example: For file "g2bfVe3ggry7wwOjKJ1cI5", node "34:81"
 *
 * 2. Or use the Figma API directly to fetch variables
 *
 * 3. The data structure should be:
 *    {
 *      'breakpoint/xs': '576',
 *      'breakpoint/sm': '768',
 *      // ... more breakpoint variables
 *    }
 *
 * 4. Breakpoint variables fetched from:
 *    - Breakpoint: node-id=34-81
 */

export const breakpointVariables: Record<string, string> = {
  'breakpoint/xs': '576',
  'breakpoint/sm': '768',
  'breakpoint/md': '992',
  'breakpoint/lg': '1200',
  'breakpoint/xl': '1408',
}
