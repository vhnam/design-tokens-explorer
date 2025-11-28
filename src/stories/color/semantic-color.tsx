import { useState } from 'react'
import type { ColorToken } from '@/lib/figma'

export interface SemanticColorProps {
  lightModeColors: ColorToken[]
  darkModeColors: ColorToken[]
  title?: string
}

export const SemanticColor = ({
  lightModeColors,
  darkModeColors,
  title = 'Semantic Colors',
}: SemanticColorProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colors = mode === 'light' ? lightModeColors : darkModeColors

  // Group colors by color family (e.g., 'dark', 'gray', 'red', etc.)
  // Color names are formatted as "color-dark-text", "color-gray-filled", etc.
  const groupedColors = colors.reduce(
    (acc, color) => {
      // Remove "color-" prefix and split by "-"
      const parts = color.name.replace(/^color-/, '').split('-')
      const family = parts[0] || 'unknown'
      if (!acc[family]) {
        acc[family] = []
      }
      acc[family].push(color)
      return acc
    },
    {} as Record<string, ColorToken[]>,
  )

  const colorFamilies = Object.keys(groupedColors).sort()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('light')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setMode('dark')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {colorFamilies.map((family) => {
          const familyColors = groupedColors[family]
          return (
            <div key={family} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                {family}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {familyColors.map((color) => {
                  // Extract variant from color name (e.g., "color-dark-text" -> "text")
                  const parts = color.name.replace(/^color-/, '').split('-')
                  const variant = parts.slice(1).join('-') || family
                  return (
                    <div
                      key={color.name}
                      className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div
                        className="h-24 w-full"
                        style={{ backgroundColor: color.rgbValue }}
                      />
                      <div className="p-3 bg-white dark:bg-gray-800">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          color-{family}-{variant}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                          Hex: {color.hexValue}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                          OKLCH: {color.oklchValue}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                          RGB: {color.rgbValue}
                        </div>
                        {color.description && (
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {color.description}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
