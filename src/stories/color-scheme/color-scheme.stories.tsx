import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColorScheme } from './color-scheme'
import { processFigmaVariables } from '@/lib/figma'
import {
  darkColorScheme,
  grayColorScheme,
  redColorScheme,
  pinkColorScheme,
  grapeColorScheme,
  violetColorScheme,
  indigoColorScheme,
  blueColorScheme,
  cyanColorScheme,
  tealColorScheme,
  greenColorScheme,
  limeColorScheme,
  yellowColorScheme,
  orangeColorScheme,
  blackAndWhiteColorScheme,
} from '@/data/figma-colors'

const meta = {
  title: 'Design Tokens/Colors/Foundations',
  component: ColorScheme,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorScheme>

export default meta
type Story = StoryObj<typeof meta>

// Dark color scheme from Figma
const darkColors = processFigmaVariables(darkColorScheme)
export const Dark: Story = {
  args: {
    colors: darkColors,
    title: 'Dark',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dark color palette fetched from Figma Design Tokens Explorer (node-id=17-89). This palette ranges from light gray (#c9c9c9) to near black (#141414).',
      },
    },
  },
}

// Gray color scheme from Figma
const grayColors = processFigmaVariables(grayColorScheme)
export const Gray: Story = {
  args: {
    colors: grayColors,
    title: 'Gray',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gray color palette fetched from Figma Design Tokens Explorer (node-id=17-90). This palette ranges from very light gray (#f8f9fa) to dark gray (#212529).',
      },
    },
  },
}

// Red color scheme from Figma
const redColors = processFigmaVariables(redColorScheme)
export const Red: Story = {
  args: {
    colors: redColors,
    title: 'Red',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Red color palette fetched from Figma Design Tokens Explorer (node-id=18-122). This palette ranges from very light red (#fff5f5) to deep red (#c92a2a).',
      },
    },
  },
}

// Pink color scheme from Figma
const pinkColors = processFigmaVariables(pinkColorScheme)
export const Pink: Story = {
  args: {
    colors: pinkColors,
    title: 'Pink',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pink color palette fetched from Figma Design Tokens Explorer (node-id=20-154). This palette ranges from very light pink (#fff0f6) to deep pink (#a61e4d).',
      },
    },
  },
}

// Grape color scheme from Figma
const grapeColors = processFigmaVariables(grapeColorScheme)
export const Grape: Story = {
  args: {
    colors: grapeColors,
    title: 'Grape',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Grape color palette fetched from Figma Design Tokens Explorer (node-id=20-187). This palette ranges from very light purple (#f8f0fc) to deep purple (#862e9c).',
      },
    },
  },
}

// Violet color scheme from Figma
const violetColors = processFigmaVariables(violetColorScheme)
export const Violet: Story = {
  args: {
    colors: violetColors,
    title: 'Violet',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Violet color palette fetched from Figma Design Tokens Explorer (node-id=20-228). This palette ranges from very light violet (#f3f0ff) to deep violet (#5f3dc4).',
      },
    },
  },
}

// Indigo color scheme from Figma
const indigoColors = processFigmaVariables(indigoColorScheme)
export const Indigo: Story = {
  args: {
    colors: indigoColors,
    title: 'Indigo',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Indigo color palette fetched from Figma Design Tokens Explorer (node-id=21-360). This palette ranges from very light indigo (#edf2ff) to deep indigo (#364fc7).',
      },
    },
  },
}

// Blue color scheme from Figma
const blueColors = processFigmaVariables(blueColorScheme)
export const Blue: Story = {
  args: {
    colors: blueColors,
    title: 'Blue',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Blue color palette fetched from Figma Design Tokens Explorer (node-id=21-371). This palette ranges from very light blue (#e7f5ff) to deep blue (#1864ab).',
      },
    },
  },
}

// Cyan color scheme from Figma
const cyanColors = processFigmaVariables(cyanColorScheme)
export const Cyan: Story = {
  args: {
    colors: cyanColors,
    title: 'Cyan',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cyan color palette fetched from Figma Design Tokens Explorer (node-id=21-382). This palette ranges from very light cyan (#e3fafc) to deep cyan (#0b7285).',
      },
    },
  },
}

// Teal color scheme from Figma
const tealColors = processFigmaVariables(tealColorScheme)
export const Teal: Story = {
  args: {
    colors: tealColors,
    title: 'Teal',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Teal color palette fetched from Figma Design Tokens Explorer (node-id=21-393). This palette ranges from very light teal (#e6fcf5) to deep teal (#087f5b).',
      },
    },
  },
}

// Green color scheme from Figma
const greenColors = processFigmaVariables(greenColorScheme)
export const Green: Story = {
  args: {
    colors: greenColors,
    title: 'Green',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Green color palette fetched from Figma Design Tokens Explorer (node-id=21-404). This palette ranges from very light green (#ebfbee) to deep green (#2b8a3e).',
      },
    },
  },
}

// Lime color scheme from Figma
const limeColors = processFigmaVariables(limeColorScheme)
export const Lime: Story = {
  args: {
    colors: limeColors,
    title: 'Lime',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lime color palette fetched from Figma Design Tokens Explorer (node-id=21-415). This palette ranges from very light lime (#f4fce3) to deep lime (#5c940d).',
      },
    },
  },
}

// Yellow color scheme from Figma
const yellowColors = processFigmaVariables(yellowColorScheme)
export const Yellow: Story = {
  args: {
    colors: yellowColors,
    title: 'Yellow',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Yellow color palette fetched from Figma Design Tokens Explorer (node-id=21-546). This palette ranges from very light yellow (#fff9db) to deep yellow (#e67700).',
      },
    },
  },
}

// Orange color scheme from Figma
const orangeColors = processFigmaVariables(orangeColorScheme)
export const Orange: Story = {
  args: {
    colors: orangeColors,
    title: 'Orange',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Orange color palette fetched from Figma Design Tokens Explorer (node-id=21-557). This palette ranges from very light orange (#fff4e6) to deep orange (#d9480f).',
      },
    },
  },
}

// Black and White color scheme from Figma
const blackAndWhiteColors = processFigmaVariables(blackAndWhiteColorScheme)
export const BlackAndWhite: Story = {
  args: {
    colors: blackAndWhiteColors,
    title: 'Black and White',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Black and White color palette fetched from Figma Design Tokens Explorer (node-id=23-289). Contains pure white (#ffffff) and pure black (#000000).',
      },
    },
  },
}
