import type { RadiusToken } from '@/lib/figma-variables'

export interface RadiusProps {
  radiuses: RadiusToken[]
  title?: string
}

export const Radius = ({ radiuses, title = 'Radius' }: RadiusProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {radiuses.map((radius) => (
          <div
            key={radius.name}
            className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-center mb-4 gap-4">
              <div
                className="bg-blue-500 dark:bg-blue-600 size-20"
                style={{
                  borderRadius: radius.valueInPx,
                }}
              />
              <div
                className="border-2 border-solid border-blue-500 dark:border-blue-600 size-20"
                style={{
                  borderRadius: radius.valueInPx,
                }}
              />
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {radius.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                In px: {radius.valueInPx}px
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                In rem: {radius.valueInRem}
              </div>
              {radius.description && (
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {radius.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
