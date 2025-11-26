import { Shadow } from './shadow'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { processFigmaShadowVariables } from '@/lib/figma-variables'
import { shadowVariables } from '@/data/figma-shadow'

const meta = {
  title: 'Design Tokens/Shadow',
  component: Shadow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Shadow>

export default meta
type Story = StoryObj<typeof meta>

// Shadow variables from Figma
const shadows = processFigmaShadowVariables(shadowVariables)
export const ShadowTokens: Story = {
  args: {
    shadows,
    title: 'Shadow',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shadow variables fetched from Figma Design Tokens Explorer (node-id=26-31). These shadow values range from xs (extra small) to xl (extra large), each with multiple drop shadow effects.',
      },
    },
  },
}

