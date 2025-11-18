# Design Tokens Explorer

A powerful CLI tool to analyze and visualize Design Tokens relationships according to the DTCG 2025.10 standard.

## Features

- Parse Design Tokens from JSON files following DTCG 2025.10 specification
- Build directed graph of token relationships
- Identify Global (Foundation) vs Semantic tokens
- Detect orphan tokens (semantic tokens with invalid references)
- Find circular references
- Generate multiple output formats:
  - JSON reports
  - Text reports
  - Markdown reports
  - Interactive HTML visualization (D3.js)
  - D3.js compatible JSON
  - DOT (Graphviz) format
  - Mermaid diagrams
- Both simple CLI commands and interactive mode

## Installation

```bash
npm install
npm run build
```

Or for development:

```bash
npm install
```

## Usage

### Quick Start

Analyze the sample tokens:

```bash
npm test
```

This will analyze the example tokens in `./examples/tokens` and generate outputs in `./output`.

### CLI Commands

#### Analyze tokens

```bash
# Basic usage
npm run dev analyze

# With options
npm run dev analyze --input ./my-tokens --output ./my-output

# Specify formats
npm run dev analyze --format json html d3 dot mermaid

# Print to console
npm run dev analyze --console

# Skip visualization
npm run dev analyze --no-viz
```

#### Interactive Mode

```bash
npm run dev interactive
```

Follow the prompts to select input/output paths and desired formats.

#### Get Token Information

```bash
npm run dev info color.blue.500
```

#### List Tokens

```bash
# List all tokens
npm run dev list

# List only global tokens
npm run dev list --global

# List only semantic tokens
npm run dev list --semantic

# List only orphan tokens
npm run dev list --orphan

# Filter by type
npm run dev list --type color
```

### Available Options

| Option | Description | Default |
|--------|-------------|---------|
| `-i, --input <path>` | Input directory or file containing tokens | `./tokens` |
| `-o, --output <path>` | Output directory for reports | `./output` |
| `-f, --format <formats...>` | Output formats (json, text, markdown, html, d3, dot, mermaid) | `json, html` |
| `--no-viz` | Skip visualization generation | `false` |
| `--console` | Print report to console | `false` |

## Output Formats

### Reports

1. **JSON Report** (`report.json`): Comprehensive analysis including all tokens, statistics, and issues
2. **Text Report** (`report.txt`): Human-readable plain text report
3. **Markdown Report** (`report.md`): Formatted markdown report

### Visualizations

1. **Interactive HTML** (`visualization.html`): Interactive D3.js force-directed graph with zoom, pan, and tooltips
2. **D3.js Data** (`d3-data.json`): JSON format compatible with D3.js
3. **DOT Format** (`graph.dot`): For use with Graphviz (`dot -Tpng graph.dot -o graph.png`)
4. **Mermaid** (`graph.mmd`): For use with Mermaid.js or GitHub

## Understanding the Output

### Token Types

- **Global/Foundation Tokens**: Tokens with static values (e.g., `#2196f3`, `16px`)
- **Semantic Tokens**: Tokens that reference other tokens (e.g., `{color.blue.500}`)
- **Orphan Tokens**: Semantic tokens that reference non-existent tokens (errors)

### Visualization Colors

- 🟢 **Green**: Global/Foundation tokens
- 🔵 **Blue**: Valid semantic tokens
- 🔴 **Red**: Orphan tokens (invalid references)

### Key Metrics

- **Total Tokens**: Total number of tokens found
- **Global Tokens**: Number of foundation tokens
- **Semantic Tokens**: Number of tokens referencing other tokens
- **Orphan Tokens**: Number of tokens with invalid references
- **Average References**: Average number of references per token
- **Max Depth**: Maximum depth of token reference chains
- **Circular References**: Number of circular reference loops detected

## Example Token Structure

### Foundation Tokens (Global)

```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "#2196f3"
      }
    }
  }
}
```

### Semantic Tokens

```json
{
  "button": {
    "primary": {
      "background": {
        "$type": "color",
        "$value": "{color.blue.500}"
      }
    }
  }
}
```

### Orphan Token (Invalid)

```json
{
  "button": {
    "error": {
      "background": {
        "$type": "color",
        "$value": "{color.purple.500}"
      }
    }
  }
}
```

## Project Structure

```
design-tokens-explorer/
├── src/
│   ├── types.ts          # Type definitions
│   ├── parser.ts         # Token parser
│   ├── analyzer.ts       # Token analyzer
│   ├── graph.ts          # Graph builder
│   ├── visualizer.ts     # Visualization generators
│   ├── reporter.ts       # Report generators
│   ├── cli.ts            # CLI interface
│   └── index.ts          # Main exports
├── examples/
│   └── tokens/
│       ├── foundation/   # Global tokens
│       └── semantic/     # Semantic tokens
├── output/               # Generated reports and visualizations
├── package.json
├── tsconfig.json
└── README.md
```

## API Usage

You can also use the tool programmatically:

```typescript
import { DesignTokensExplorer } from './src';

const explorer = new DesignTokensExplorer();

// Analyze tokens
const { tokenMap, report, graph } = await explorer.analyzeDirectory('./tokens');

// Get visualizer and reporter
const visualizer = explorer.getVisualizer();
const reporter = explorer.getReporter();

// Generate outputs
const html = visualizer.toInteractiveHTML(graph);
const d3Data = visualizer.toD3Format(graph);
const dotData = visualizer.toDotFormat(graph);
const mermaidData = visualizer.toMermaidFormat(graph);

// Generate reports
await reporter.generateJSONReport(report, graph, tokenMap, './output/report.json');
await reporter.generateTextReport(report, graph, './output/report.txt');
await reporter.generateMarkdownReport(report, graph, './output/report.md');
```

## Common Issues

### Orphan Tokens

If you see orphan tokens in the report, it means some semantic tokens reference tokens that don't exist. Common causes:

1. Typos in token references (e.g., `{spacng.md}` instead of `{spacing.md}`)
2. Missing foundation tokens
3. Incorrect token paths

### Circular References

Circular references occur when tokens reference each other in a loop:

```
token.a -> token.b -> token.c -> token.a
```

This should be avoided in design token systems.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
