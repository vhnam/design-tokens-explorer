import type { ShadowToken } from '@/lib/figma'

export interface ShadowProps {
  shadows: Array<ShadowToken>
  title?: string
}

export const Shadow = ({ shadows, title = 'Shadow' }: ShadowProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shadows.map((shadow) => (
          <div
            key={shadow.name}
            className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className="bg-white dark:bg-gray-800 size-32 rounded-lg"
                style={{
                  boxShadow: shadow.cssValueInPx,
                }}
              />
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {shadow.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                In px: {shadow.cssValueInPx}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                In rem: {shadow.cssValueInRem}
              </div>
              {shadow.description && (
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {shadow.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
