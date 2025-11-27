import { TypographyPrimitives } from './typography-primitives'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { processFigmaTypographyPrimitives } from '@/lib/figma'
import { typographyPrimitives } from '@/data/figma-typography'

const meta = {
  title: 'Design Tokens/Typography',
  component: TypographyPrimitives,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyPrimitives>

export default meta
type Story = StoryObj<typeof meta>

// Typography primitives from Figma
const primitives = processFigmaTypographyPrimitives(typographyPrimitives)

export const TypographyPrimitivesStory: Story = {
  name: 'Primitives',
  args: {
    fontFamilies: primitives.fontFamilies,
    fontSizes: primitives.fontSizes,
    fontWeights: primitives.fontWeights,
    lineHeights: primitives.lineHeights,
    letterSpacings: primitives.letterSpacings,
    title: 'Typography Primitives',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Typography primitive tokens fetched from Figma Design Tokens Explorer (node-id=24-295). These are the base design tokens for typography including font families, sizes, weights, line heights, and letter spacings.',
      },
    },
  },
}
