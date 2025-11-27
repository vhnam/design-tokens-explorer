/**
 * Utility to fetch Figma variables and convert them to color tokens
 *
 * Usage:
 * 1. Get your Figma file URL (e.g., https://figma.com/design/pqrs/ExampleFile?node-id=1-2)
 * 2. Extract fileKey (pqrs) and nodeId (1:2 or 1-2)
 * 3. Call this function with those parameters
 *
 * Note: This function is designed to be called server-side or via MCP tools
 */

export interface FetchFigmaVariablesOptions {
  fileKey: string
  nodeId: string
}

export interface FigmaVariableResult {
  variables: Record<string, string>
  error?: string
}

/**
 * Fetches Figma variables using MCP Figma tools
 * This should be called from a server context or via MCP
 */
export async function fetchFigmaVariables(
  options: FetchFigmaVariablesOptions,
): Promise<FigmaVariableResult> {
  const { fileKey, nodeId } = options

  // Normalize nodeId format (convert 1-2 to 1:2 if needed)
  const normalizedNodeId = nodeId.replace('-', ':')

  try {
    // In a real implementation, this would call the MCP Figma tool
    // For now, this is a placeholder that shows the expected structure
    // You would use: mcp_Figma_get_variable_defs({ fileKey, nodeId: normalizedNodeId })

    return {
      variables: {},
      error:
        'This function requires MCP Figma tools. Please use the MCP tools directly or provide variables manually.',
    }
  } catch (error) {
    return {
      variables: {},
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Helper to extract fileKey and nodeId from a Figma URL
 */
export function parseFigmaUrl(
  url: string,
): { fileKey: string; nodeId: string } | null {
  // Match: https://figma.com/design/:fileKey/:fileName?node-id=:int1-:int2
  const match = url.match(
    /figma\.com\/design\/([^/]+)\/[^?]+\?node-id=([\d-]+)/,
  )

  if (!match) {
    return null
  }

  const fileKey = match[1]
  const nodeId = match[2].replace('-', ':') // Convert 1-2 to 1:2

  return { fileKey, nodeId }
}
