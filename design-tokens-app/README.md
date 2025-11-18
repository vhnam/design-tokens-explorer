# Design Tokens Explorer

An interactive React application for visualizing design tokens with D3.js force-directed graphs.

## Features

- **Interactive Force-Directed Graph**: Visualize token relationships and dependencies using D3.js
- **Statistics Dashboard**: View comprehensive statistics about your design tokens
- **Token Details Panel**: Click on any token to see detailed information including references and dependencies
- **DTCG Hierarchy Support**: Full support for Design Tokens Community Group standard (Global → Brand → Semantic → Component)
- **Advanced Filtering**: Filter tokens by hierarchy level and search by name
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Interactive zoom, pan, and drag functionality

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Data Format

The application expects two JSON files in the `public` directory:

### `d3-data.json`
Contains nodes and links for the force-directed graph:

```json
{
  "nodes": [
    {
      "id": "token.id",
      "label": "Token Label",
      "group": "global|semantic|orphan",
      "type": "color|dimension|number",
      "value": "token value",
      "description": "optional description"
    }
  ],
  "links": [
    {
      "source": "source.token.id",
      "target": "target.token.id",
      "label": "references"
    }
  ]
}
```

### `report.json`
Contains detailed token analysis and statistics:

```json
{
  "summary": {
    "totalTokens": 0,
    "globalTokens": 0,
    "semanticTokens": 0,
    "orphanTokens": 0
  },
  "statistics": {
    "avgReferencesPerToken": 0,
    "maxDepth": 0,
    "circularReferences": []
  },
  "tokens": [
    {
      "path": "token.path",
      "value": "token value",
      "type": "color|dimension|number",
      "isGlobal": true,
      "references": [],
      "referencedBy": []
    }
  ]
}
```

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **D3.js** - Data visualization
- **Vite** - Build tool and dev server

## Project Structure

```
design-tokens-app/
├── public/
│   ├── d3-data.json      # Graph data
│   └── report.json       # Token analysis data
├── src/
│   ├── components/
│   │   ├── ForceGraph.tsx      # D3 force-directed graph
│   │   ├── StatsDashboard.tsx  # Statistics display
│   │   ├── TokenDetails.tsx    # Token detail panel
│   │   └── Filters.tsx         # Filter controls
│   ├── hooks/
│   │   └── useTokenData.ts     # Data loading hook
│   ├── types.ts                # TypeScript types
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # App styles
│   └── index.css               # Global styles
└── package.json
```

## Usage

1. Place your `d3-data.json` and `report.json` files in the `public` directory
2. Start the development server
3. Interact with the visualization:
   - **Click and drag** nodes to reposition them
   - **Scroll/pinch** to zoom in and out
   - **Click** on nodes to see detailed information
   - Use **filters** to show/hide token types
   - Use **search** to find specific tokens

## DTCG Token Hierarchy

The application follows the [Design Tokens Community Group (DTCG)](https://tr.designtokens.org/) standard hierarchy:

- **Global Tokens** (Purple): Foundation-level tokens - raw values (colors, sizes, etc.)
- **Brand Tokens** (Blue): Brand-specific tokens that reference global tokens
- **Semantic Tokens** (Green): Context-specific tokens (e.g., primary, success, warning)
- **Component Tokens** (Yellow/Gold): Component-specific tokens
- **Orphan Tokens** (Red): Invalid tokens with missing or broken references

## License

MIT
