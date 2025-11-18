# Design Tokens Explorer - Architecture

## Project Structure

```
src/
├── components/              # React components organized by feature
│   ├── graph/              # Force-directed graph visualization
│   │   ├── ForceGraph.tsx
│   │   └── index.ts
│   ├── dashboard/          # Statistics dashboard
│   │   ├── StatsDashboard.tsx
│   │   └── index.ts
│   ├── filters/            # Token filtering controls
│   │   ├── Filters.tsx
│   │   └── index.ts
│   ├── token/              # Token details panel
│   │   ├── TokenDetails.tsx
│   │   └── index.ts
│   └── index.ts            # Central component exports
├── hooks/                  # Custom React hooks
│   └── useTokenData.ts     # Data loading hook
├── types/                  # TypeScript type definitions
│   ├── token.types.ts      # Token-related types
│   ├── graph.types.ts      # Graph visualization types
│   └── index.ts            # Central type exports
├── utils/                  # Utility functions and constants
│   └── constants.ts        # DTCG colors, labels, configs
├── App.tsx                 # Main application component
├── App.css                 # Application styles
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Design Principles

### 1. Feature-Based Organization
Components are organized by feature/domain rather than type:
- `components/graph/` - Everything related to the force graph
- `components/dashboard/` - Statistics and metrics
- `components/filters/` - Filtering functionality
- `components/token/` - Token details and information

### 2. Centralized Constants
All DTCG-related constants are defined in `utils/constants.ts`:
- Token colors and theming
- Group labels and descriptions
- D3 simulation parameters
- Reusable across all components

### 3. Type Safety
Types are organized by domain in `types/`:
- `token.types.ts` - Token data structures
- `graph.types.ts` - Visualization-specific types
- All types exported through `types/index.ts`

### 4. Clean Imports
Each feature folder has an `index.ts` for clean imports:
```typescript
// Instead of:
import { ForceGraph } from './components/graph/ForceGraph';
import { StatsDashboard } from './components/dashboard/StatsDashboard';

// Use:
import { ForceGraph, StatsDashboard } from './components';
```

## Key Files

### `utils/constants.ts`
Defines all DTCG hierarchy constants:
- `TOKEN_COLORS` - Color scheme for each token level
- `TOKEN_GROUPS` - Token group identifiers
- `TOKEN_GROUP_LABELS` - Display labels
- `TOKEN_GROUP_DESCRIPTIONS` - Detailed descriptions
- `BADGE_COLORS` - Badge styling with text colors
- `SIMULATION_CONFIG` - D3 force simulation parameters

### `types/token.types.ts`
Core token data structures:
- `TokenNode` - Graph node representation
- `ReportToken` - Token from analysis report
- `TokenSummary` - Statistics summary
- `ReportData` - Complete report structure

### `types/graph.types.ts`
Visualization-specific types:
- `TokenLink` - Graph edge/link
- `GraphData` - Complete graph data
- `FilterState` - Filter controls state

### `hooks/useTokenData.ts`
Custom hook for loading token data:
- Fetches `d3-data.json` and `report.json`
- Manages loading and error states
- Returns typed data structures

## Component Architecture

### ForceGraph
**Location**: `components/graph/ForceGraph.tsx`

D3-powered force-directed graph visualization:
- Uses constants from `utils/constants.ts` for colors and simulation
- Dynamic legend generation
- Interactive node dragging and clicking
- Zoom and pan support

**Props**:
```typescript
interface ForceGraphProps {
  data: GraphData;
  onNodeClick?: (node: TokenNode) => void;
}
```

### StatsDashboard
**Location**: `components/dashboard/StatsDashboard.tsx`

Displays token statistics:
- Total, global, brand, semantic, component, orphan counts
- Average references per token
- Maximum depth
- Circular reference warnings

**Props**:
```typescript
interface StatsDashboardProps {
  data: ReportData;
}
```

### Filters
**Location**: `components/filters/Filters.tsx`

Token filtering controls:
- Checkboxes for each DTCG level
- Color-coded badges
- Search input
- Uses `FilterState` type

**Props**:
```typescript
interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}
```

### TokenDetails
**Location**: `components/token/TokenDetails.tsx`

Displays detailed token information:
- Token ID, label, type, value
- References and referenced-by lists
- Color-coded badges
- Close button

**Props**:
```typescript
interface TokenDetailsProps {
  node: TokenNode | null;
  reportData: ReportToken[];
  onClose: () => void;
}
```

## DTCG Standard Support

The application fully implements the Design Tokens Community Group (DTCG) standard hierarchy:

1. **Global** (Purple) - Foundation tokens
2. **Brand** (Blue) - Brand-specific tokens
3. **Semantic** (Green) - Context-specific tokens
4. **Component** (Yellow) - Component-level tokens
5. **Orphan** (Red) - Invalid/broken tokens

All color schemes and labels are centralized in `constants.ts` for easy maintenance.

## Data Flow

```
public/
├── d3-data.json    ─┐
└── report.json      │
                     ├──> useTokenData() ──> App State
                     │                           │
                     │                           ├──> ForceGraph
                     │                           ├──> StatsDashboard
                     │                           ├──> Filters
                     │                           └──> TokenDetails
```

## Adding New Features

### Adding a New Component
1. Create folder in `src/components/[feature-name]/`
2. Add component file: `[ComponentName].tsx`
3. Create `index.ts` for exports
4. Update `src/components/index.ts`

### Adding New Token Types
1. Update `types/token.types.ts` with new interfaces
2. Add to `TOKEN_GROUPS` in `utils/constants.ts`
3. Add colors to `TOKEN_COLORS`
4. Add labels to `TOKEN_GROUP_LABELS`
5. Update `FilterState` in `types/graph.types.ts`

### Adding New Constants
Add to `utils/constants.ts` and import where needed:
```typescript
export const MY_NEW_CONSTANT = {
  // ...
} as const;
```

## Best Practices

1. **Use TypeScript strictly** - No `any` types
2. **Import from index files** - Use `from './components'` not deep imports
3. **Use constants** - Don't hardcode colors, labels, or config values
4. **Keep components focused** - One responsibility per component
5. **Type your hooks** - Return types should be explicit
6. **Document complex logic** - Add comments for D3 code and algorithms

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **D3.js v7** - Data visualization
- **Vite 7** - Build tool
- **ESLint** - Code quality
