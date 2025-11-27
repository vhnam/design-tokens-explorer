/**
 * Shared utility functions for Figma variable processing
 */

/**
 * Extracts a description from variable name
 */
export function extractDescription(name: string): string | undefined {
  // Convert kebab-case or snake_case to readable text
  const readable = name
    .replace(/[-_]/g, ' ')
    .replace(/\//g, ' / ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return readable !== name ? readable : undefined
}

/**
 * Gets a token name for color variables
 */
export function getTokenName(name: string): string {
  return `color-${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
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
 * Gets a token name for shadow variables
 */
export function getShadowTokenName(name: string): string {
  return `${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
}

/**
 * Gets a token name for breakpoint variables
 */
export function getBreakpointTokenName(name: string): string {
  return `${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
}

/**
 * Gets a token name for typography variables
 */
export function getTypographyTokenName(name: string): string {
  return `${name
    .split('/')
    .map((str) => str.toLowerCase())
    .join('-')}`
}

