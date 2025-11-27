import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radius } from './radius'
import { processFigmaRadiusVariables } from '@/lib/figma'
import { radiusVariables } from '@/data/figma-radius'

const meta = {
  title: 'Design Tokens/Radius',
  component: Radius,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radius>

export default meta
type Story = StoryObj<typeof meta>

// Radius variables from Figma
const radiuses = processFigmaRadiusVariables(radiusVariables)
export const RadiusTokens: Story = {
  args: {
    radiuses,
    title: 'Radius',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radius variables fetched from Figma Design Tokens Explorer (node-id=24-306). These radius values range from 2px (xs) to 1000px (full).',
      },
    },
  },
}

