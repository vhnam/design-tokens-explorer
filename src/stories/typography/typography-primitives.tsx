interface TypographyPrimitivesProps {
  fontFamilies: Record<string, string>
  fontSizes: Record<string, number>
  fontWeights: Record<string, number>
  lineHeights: Record<string, number>
  letterSpacings: Record<string, number>
  title?: string
}

export const TypographyPrimitives = ({
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  title = 'Typography Primitives',
}: TypographyPrimitivesProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="space-y-8">
        {/* Font Families */}
        {Object.keys(fontFamilies).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Font Families
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(fontFamilies).map(([name, value]) => (
                <div
                  key={name}
                  className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {name.replace(/primitives-font-families-/g, '')}
                  </div>
                  <div
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: value }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Font Sizes */}
        {Object.keys(fontSizes).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Font Sizes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(fontSizes)
                .sort(([, a], [, b]) => a - b)
                .map(([name, value]) => (
                  <div
                    key={name}
                    className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {name.replace(/primitives-font-sizes-/g, '')}
                    </div>
                    <div
                      className="text-gray-900 dark:text-gray-100 font-semibold"
                      style={{ fontSize: `${value}px` }}
                    >
                      Aa
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                      {value}px / {value / 16}rem
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Font Weights */}
        {Object.keys(fontWeights).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Font Weights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(fontWeights)
                .sort(([, a], [, b]) => a - b)
                .map(([name, value]) => (
                  <div
                    key={name}
                    className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {name.replace(/primitives-font-weights-/g, '')}
                    </div>
                    <div
                      className="text-2xl text-gray-900 dark:text-gray-100"
                      style={{ fontWeight: value }}
                    >
                      Aa
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Line Heights */}
        {Object.keys(lineHeights).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Line Heights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(lineHeights)
                .sort(([, a], [, b]) => a - b)
                .map(([name, value]) => (
                  <div
                    key={name}
                    className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {name.replace(/primitives-line-heights-/g, '')}
                    </div>
                    <div
                      className="text-base text-gray-900 dark:text-gray-100"
                      style={{ lineHeight: value }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Letter Spacings */}
        {Object.keys(letterSpacings).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Letter Spacings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(letterSpacings)
                .sort(([, a], [, b]) => a - b)
                .map(([name, value]) => (
                  <div
                    key={name}
                    className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {name.replace(/primitives-letter-spacings-/g, '')}
                    </div>
                    <div
                      className="text-lg text-gray-900 dark:text-gray-100 font-semibold"
                      style={{ letterSpacing: `${value}em` }}
                    >
                      Aa Bb Cc
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                      {value}em
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
