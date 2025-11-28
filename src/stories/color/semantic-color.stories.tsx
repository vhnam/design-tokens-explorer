import type { Meta, StoryObj } from '@storybook/react-vite'
import { SemanticColor } from './semantic-color'
import { processFigmaVariables } from '@/lib/figma'
import {
  lightModeSemanticColors,
  darkModeSemanticColors,
} from '@/data/figma-semantic-colors'

const meta = {
  title: 'Design Tokens/Colors/Semantic',
  component: SemanticColor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SemanticColor>

export default meta
type Story = StoryObj<typeof meta>

// Semantic colors from Figma
const lightModeColors = processFigmaVariables(lightModeSemanticColors)
const darkModeColors = processFigmaVariables(darkModeSemanticColors)

export const SemanticColors: Story = {
  args: {
    lightModeColors,
    darkModeColors,
    title: 'Semantic Colors',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Semantic color tokens with Light/Dark mode support fetched from Figma Design Tokens Explorer (node-id=23-290). These tokens define semantic color variants (text, filled, filled-hover, light, light-hover, light-color, outline, outline-hover) for each color family.',
      },
    },
  },
}
