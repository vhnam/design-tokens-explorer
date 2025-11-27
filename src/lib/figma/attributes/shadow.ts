import { getShadowTokenName, extractDescription } from '../handlers'

/**
 * Shadow token interface
 */
export interface ShadowToken {
  name: string
  cssValueInPx: string
  cssValueInRem: string
  description?: string
}

/**
 * Shadow token array type
 */
export type ShadowTokenArray = Array<ShadowToken>

/**
 * Converts hex color with alpha to rgba string
 * @param hex - Hex color with alpha (e.g., #0000001A)
 * @returns rgba string (e.g., rgba(0, 0, 0, 0.1))
 */
function hexWithAlphaToRgba(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '')

  // Handle 8-digit hex (RRGGBBAA)
  if (cleanHex.length === 8) {
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)
    const a = parseInt(cleanHex.slice(6, 8), 16) / 255
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
  }

  // Handle 6-digit hex (assume opaque)
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  // Fallback
  return hex
}

/**
 * Parses a single Effect string to CSS box-shadow value
 * @param effectString - Effect string from Figma (e.g., "Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0)")
 * @returns CSS box-shadow value (e.g., "0 1px 2px 0 rgba(0, 0, 0, 0.1)")
 */
function parseEffectToBoxShadow(
  effectString: string,
  unit: 'px' | 'rem',
): string {
  // Extract color (hex format: #RRGGBB or #RRGGBBAA)
  const colorMatch = effectString.match(/color:\s*(#[0-9A-Fa-f]+)/)
  const color = colorMatch
    ? hexWithAlphaToRgba(colorMatch[1])
    : 'rgba(0, 0, 0, 0.1)'

  // Extract offset (x, y)
  const offsetMatch = effectString.match(/offset:\s*\((-?\d+),\s*(-?\d+)\)/)
  const offsetX = offsetMatch ? parseInt(offsetMatch[1], 10) : 0
  const offsetY = offsetMatch ? parseInt(offsetMatch[2], 10) : 0

  // Extract radius (blur)
  const radiusMatch = effectString.match(/radius:\s*(\d+)/)
  const radius = radiusMatch ? parseInt(radiusMatch[1], 10) : 0

  // Extract spread
  const spreadMatch = effectString.match(/spread:\s*(-?\d+)/)
  const spread = spreadMatch ? parseInt(spreadMatch[1], 10) : 0

  // Convert to CSS box-shadow format: offsetX offsetY blur spread color
  if (unit === 'px') {
    return `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`
  } else {
    return `${offsetX * 0.0625}rem ${offsetY * 0.0625}rem ${radius * 0.0625}rem ${spread * 0.0625}rem ${color}`
  }
}

/**
 * Converts Figma shadow variable definitions to ShadowToken format
 * @param figmaVariables - Object with variable names as keys and Effect strings as values
 * @returns Array of ShadowToken objects
 */
export function processFigmaShadowVariables(
  figmaVariables: Record<string, string>,
): Array<ShadowToken> {
  return Object.entries(figmaVariables)
    .filter(([name, value]) => {
      // Filter for shadow variables (Effect strings)
      return (
        name.toLowerCase().includes('shadow') &&
        typeof value === 'string' &&
        value.includes('Effect')
      )
    })
    .map(([name, value]) => {
      // Split multiple effects by semicolon
      const effects = value.split(';').filter((e) => e.trim().length > 0)

      // Parse each effect and combine into a single box-shadow value
      const boxShadowsInPx = effects
        .map((effect) => parseEffectToBoxShadow(effect.trim(), 'px'))
        .join(', ')
      const boxShadowsInRem = effects
        .map((effect) => parseEffectToBoxShadow(effect.trim(), 'rem'))
        .join(', ')

      return {
        name: getShadowTokenName(name),
        cssValueInPx: boxShadowsInPx,
        cssValueInRem: boxShadowsInRem,
        description: extractDescription(name),
      }
    })
    .sort((a, b) => {
      // Sort by name (xs, sm, md, lg, xl)
      const order = ['xs', 'sm', 'md', 'lg', 'xl']
      const aOrder = order.findIndex((size) => a.name.includes(size))
      const bOrder = order.findIndex((size) => b.name.includes(size))
      return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder)
    })
}
