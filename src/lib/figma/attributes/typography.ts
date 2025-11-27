import { extractDescription, getTypographyTokenName } from '../handlers'
import type { TypographyStyle } from '@/data/figma-typography'

/**
 * Typography token interface
 */
export interface TypographyToken {
  name: string
  fontFamily: string
  fontSize: number
  fontSizeInPx: string
  fontSizeInRem: string
  fontWeight: number
  lineHeight: number
  lineHeightValue: string
  letterSpacing: string
  cssValue: string
  description?: string
}

/**
 * Converts TypographyStyle to TypographyToken format
 * @param name - Token name
 * @param style - TypographyStyle object
 * @returns TypographyToken object
 */
export function processTypographyStyle(
  name: string,
  style: TypographyStyle,
): TypographyToken {
  const fontSizeInRem = `${style.fontSize / 16}rem`

  // Generate CSS value
  const cssValue = `font-family: ${style.fontFamily}; font-size: ${style.fontSize}px; font-weight: ${style.fontWeight}; line-height: ${style.lineHeight}; letter-spacing: ${style.letterSpacing}px;`

  return {
    name: getTypographyTokenName(name),
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontSizeInPx: `${style.fontSize}px`,
    fontSizeInRem,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
    lineHeightValue: style.lineHeight.toString(),
    letterSpacing: `${style.letterSpacing}em`,
    cssValue,
    description: extractDescription(name),
  }
}

/**
 * Converts Figma typography semantic tokens to TypographyToken format
 * @param figmaTypography - Object with token names as keys and TypographyStyle as values
 * @returns Array of TypographyToken objects
 */
export function processFigmaTypographyTokens(
  figmaTypography: Record<string, TypographyStyle>,
): Array<TypographyToken> {
  return Object.entries(figmaTypography)
    .map(([name, style]) => processTypographyStyle(name, style))
    .sort((a, b) => {
      // Check if token is a heading (h1-h6) or paragraph
      const aIsHeading = /-h[1-6]$/.test(a.name)
      const bIsHeading = /-h[1-6]$/.test(b.name)
      const aIsParagraph = a.name.toLowerCase().includes('paragraph')
      const bIsParagraph = b.name.toLowerCase().includes('paragraph')

      // Paragraph always at the bottom
      if (aIsParagraph && !bIsParagraph) return 1
      if (!aIsParagraph && bIsParagraph) return -1

      // If both are headings, sort by font size (largest first)
      if (aIsHeading && bIsHeading) {
        if (b.fontSize !== a.fontSize) {
          return b.fontSize - a.fontSize
        }
        // Then by name
        return a.name.localeCompare(b.name)
      }

      // For other cases, maintain original order
      return 0
    })
}

/**
 * Converts Figma typography primitive variables to a structured format
 * @param figmaVariables - Object with variable names as keys and values as strings
 * @returns Object grouped by category (font-families, font-sizes, etc.)
 */
export function processFigmaTypographyPrimitives(
  figmaVariables: Record<string, string>,
): {
  fontFamilies: Record<string, string>
  fontSizes: Record<string, number>
  fontWeights: Record<string, number>
  lineHeights: Record<string, number>
  letterSpacings: Record<string, number>
} {
  const fontFamilies: Record<string, string> = {}
  const fontSizes: Record<string, number> = {}
  const fontWeights: Record<string, number> = {}
  const lineHeights: Record<string, number> = {}
  const letterSpacings: Record<string, number> = {}

  Object.entries(figmaVariables).forEach(([name, value]) => {
    const tokenName = getTypographyTokenName(name)

    if (name.includes('font-families')) {
      fontFamilies[tokenName] = value
    } else if (name.includes('font-sizes')) {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        fontSizes[tokenName] = numValue
      }
    } else if (name.includes('font-weights')) {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        fontWeights[tokenName] = numValue
      }
    } else if (name.includes('line-heights')) {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        lineHeights[tokenName] = numValue
      }
    } else if (name.includes('letter-spacings')) {
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        letterSpacings[tokenName] = numValue
      }
    }
  })

  return {
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
  }
}
