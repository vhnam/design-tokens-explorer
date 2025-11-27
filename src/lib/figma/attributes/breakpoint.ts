import { getBreakpointTokenName, extractDescription } from '../handlers'

/**
 * Breakpoint token interface
 */
export interface BreakpointToken {
  name: string
  valueInPx: number
  valueInEm: string
  description?: string
}

/**
 * Converts Figma breakpoint variable definitions to BreakpointToken format
 * @param figmaVariables - Object with variable names as keys and breakpoint values as strings
 * @returns Array of BreakpointToken objects
 */
export function processFigmaBreakpointVariables(
  figmaVariables: Record<string, string>,
): BreakpointToken[] {
  return Object.entries(figmaVariables)
    .filter(([name, value]) => {
      // Filter for breakpoint variables (numeric values)
      return (
        name.toLowerCase().includes('breakpoint') &&
        typeof value === 'string' &&
        !isNaN(Number(value))
      )
    })
    .map(([name, value]) => {
      const numericValue = Number(value)

      return {
        name: getBreakpointTokenName(name),
        valueInPx: numericValue,
        valueInEm: `${numericValue / 16}em`,
        description: extractDescription(name),
      }
    })
    .sort((a, b) => a.valueInPx - b.valueInPx)
}
