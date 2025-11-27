import { getRadiusTokenName, extractDescription } from '../handlers'

/**
 * Radius token interface
 */
export interface RadiusToken {
  name: string
  valueInPx: number
  valueInRem: string
  description?: string
}

/**
 * Converts Figma radius variable definitions to RadiusToken format
 * @param figmaVariables - Object with variable names as keys and radius values as strings
 * @returns Array of RadiusToken objects
 */
export function processFigmaRadiusVariables(
  figmaVariables: Record<string, string>,
): RadiusToken[] {
  return Object.entries(figmaVariables)
    .filter(([name, value]) => {
      // Filter for radius variables (numeric values)
      return (
        name.toLowerCase().includes('radius') &&
        typeof value === 'string' &&
        !isNaN(Number(value))
      )
    })
    .map(([name, value]) => {
      const numericValue = Number(value)

      return {
        name: getRadiusTokenName(name),
        value: `${numericValue}px`,
        valueInPx: numericValue,
        valueInRem: `${numericValue / 16}rem`,
        description: extractDescription(name),
      }
    })
    .sort((a, b) => a.valueInPx - b.valueInPx)
}
