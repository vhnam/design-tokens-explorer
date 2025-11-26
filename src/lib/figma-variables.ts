import type { ColorToken } from '@/stories/color-scheme'

export function getTokenName(name: string): string {
  return `color-${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
}

/**
 * Converts Figma variable definitions to ColorToken format
 * @param figmaVariables - Object with variable names as keys and hex colors as values
 * @returns Array of ColorToken objects
 */
export function processFigmaVariables(
  figmaVariables: Record<string, string>,
): ColorToken[] {
  return Object.entries(figmaVariables)
    .filter(([_, value]) => {
      // Filter for color values (hex, rgb, rgba, or named colors)
      return (
        typeof value === 'string' &&
        (value.startsWith('#') ||
          value.startsWith('rgb') ||
          /^[a-z]+$/i.test(value))
      )
    })
    .map(([name, value]) => {
      const hexValue = convertToHex(value)
      const oklchValue = convertToOKLCH(hexValue)
      const rgbValue = convertToRGB(value)

      return {
        name: getTokenName(name),
        hexValue,
        oklchValue,
        rgbValue,
        description: extractDescription(name),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Parses a color string (HEX or RGB) into RGB components
 * @param color - Color string in HEX (#fff, #ffffff) or RGB (rgb(255, 0, 0)) format
 * @returns Object with red, green, blue values (0-255)
 */
function parseColorToRGB(color: string): {
  red: number
  green: number
  blue: number
} {
  // HEX format: #ffffff or #fff
  if (color.startsWith('#')) {
    const hex = color.slice(1)

    // Handle 3-digit hex (#fff)
    if (hex.length === 3) {
      return {
        red: parseInt(hex[0] + hex[0], 16),
        green: parseInt(hex[1] + hex[1], 16),
        blue: parseInt(hex[2] + hex[2], 16),
      }
    }

    // Handle 6-digit hex (#ffffff)
    if (hex.length === 6) {
      return {
        red: parseInt(hex.slice(0, 2), 16),
        green: parseInt(hex.slice(2, 4), 16),
        blue: parseInt(hex.slice(4, 6), 16),
      }
    }

    throw new Error(`Invalid HEX format: ${color}`)
  }

  // RGB/RGBA format: rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!rgbMatch) {
    throw new Error(
      `Invalid color format: ${color}. Expected HEX (#fff or #ffffff) or RGB (rgb(r, g, b))`,
    )
  }

  return {
    red: parseInt(rgbMatch[1], 10),
    green: parseInt(rgbMatch[2], 10),
    blue: parseInt(rgbMatch[3], 10),
  }
}

/**
 * Converts various color formats to hex
 */
export function convertToHex(color: string): string {
  // Already hex
  if (color.startsWith('#')) {
    return color
  }

  // RGB/RGBA format: rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (rgbMatch) {
    const red = parseInt(rgbMatch[1], 10)
    const green = parseInt(rgbMatch[2], 10)
    const blue = parseInt(rgbMatch[3], 10)
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
  }

  // Named colors - return as is (browser will handle)
  return color
}

/**
 * Converts various color formats to RGB
 */
export function convertToRGB(color: string): string {
  // Already RGB
  if (color.startsWith('rgb')) {
    return color
  }

  const { red, green, blue } = parseColorToRGB(color)
  return `rgb(${red}, ${green}, ${blue})`
}

/**
 * Linearizes sRGB values (sRGB → linear sRGB)
 */
function linearize(val: number): number {
  return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
}

/**
 * Formats OKLCH values with specified decimal precision
 */
export function shortenOklch(
  l: number,
  c: number,
  h: number,
  lDigits = 3,
  cDigits = 3,
  hDigits = 1,
): string {
  return `oklch(${l.toFixed(lDigits)} ${c.toFixed(cDigits)} ${h.toFixed(hDigits)})`
}

/**
 * Converts a color string to OKLCH format
 * Supports HEX (#fff, #ffffff) and RGB (rgb(r, g, b)) formats
 */
export function convertToOKLCH(color: string): string {
  // Already OKLCH
  if (color.startsWith('oklch')) {
    return color
  }

  const { red, green, blue } = parseColorToRGB(color)

  // Convert 0–255 → 0–1 and linearize
  const srgb = [red, green, blue].map((v) => v / 255).map(linearize)

  const [lr, lg, lb] = srgb

  // Convert linear RGB → LMS
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  // Nonlinear transform (cube-root)
  const l_n = Math.cbrt(l)
  const m_n = Math.cbrt(m)
  const s_n = Math.cbrt(s)

  // LMS → OKLab
  const L = 0.2104542553 * l_n + 0.793617785 * m_n - 0.0040720468 * s_n
  const a = 1.9779984951 * l_n - 2.428592205 * m_n + 0.4505937099 * s_n
  const b_ = 0.0259040371 * l_n + 0.7827717662 * m_n - 0.808675766 * s_n

  // OKLab → OKLCH
  const C = Math.sqrt(a * a + b_ * b_)
  let H = Math.atan2(b_, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return shortenOklch(L, C, H)
}

/**
 * Extracts a description from variable name
 */
function extractDescription(name: string): string | undefined {
  // Convert kebab-case or snake_case to readable text
  const readable = name
    .replace(/[-_]/g, ' ')
    .replace(/\//g, ' / ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return readable !== name ? readable : undefined
}

/**
 * Gets a token name for radius variables
 */
export function getRadiusTokenName(name: string): string {
  return `${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
}

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
