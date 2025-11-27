import type { ColorToken } from '@/lib/figma'

export interface ColorProps {
  colors: ColorToken[]
  title?: string
}

export const Color = ({ colors, title = 'Color Scheme' }: ColorProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: color.hexValue }}
            />
            <div className="p-3 bg-white dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {color.name}
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
        ))}
      </div>
    </div>
  )
}
