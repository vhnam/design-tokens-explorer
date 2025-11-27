import type { TypographyToken } from '@/lib/figma'

export interface TypographySemanticProps {
  typographyTokens: Array<TypographyToken>
  title?: string
}

export const TypographySemantic = ({
  typographyTokens,
  title = 'Typography Semantic',
}: TypographySemanticProps) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-8">
        {typographyTokens.map((token) => (
          <div
            key={token.name}
            className="flex flex-col rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm p-6 bg-white dark:bg-gray-800"
          >
            <div className="mb-4">
              <div
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontFamily: token.fontFamily,
                  fontSize: token.fontSizeInPx,
                  fontWeight: token.fontWeight,
                  lineHeight: token.lineHeight,
                  letterSpacing: token.letterSpacing,
                }}
              >
                {token.name.replace(/semantic-typography-/g, '').toUpperCase()}{' '}
                - The quick brown fox jumps over the lazy dog
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Font Family
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {token.fontFamily}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Font Size
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {token.fontSizeInPx} / {token.fontSizeInRem}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Font Weight
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {token.fontWeight}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Line Height
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {token.lineHeightValue}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Letter Spacing
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {token.letterSpacing}
                </div>
              </div>
            </div>

            {token.description && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {token.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
