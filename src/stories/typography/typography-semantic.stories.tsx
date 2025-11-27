import { TypographySemantic } from './typography-semantic'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { processFigmaTypographyTokens } from '@/lib/figma'
import { typographySemantic } from '@/data/figma-typography'

const meta = {
  title: 'Design Tokens/Typography',
  component: TypographySemantic,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographySemantic>

export default meta
type Story = StoryObj<typeof meta>

// Typography semantic tokens from Figma
const typographyTokens = processFigmaTypographyTokens(typographySemantic)

export const TypographySemanticStory: Story = {
  name: 'Semantic',
  args: {
    typographyTokens,
    title: 'Typography Semantic',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Typography semantic tokens fetched from Figma Design Tokens Explorer (node-id=24-295). These tokens define the typography styles for headings.',
      },
    },
  },
}
