/**
 * Visualizer - Generates visualization outputs in various formats
 */

import { Graph, VisualizationOutput } from './types';

export class Visualizer {
  /**
   * Generate D3.js compatible JSON
   */
  toD3Format(graph: Graph): VisualizationOutput {
    const data = {
      nodes: graph.nodes.map(node => ({
        id: node.id,
        label: node.label,
        group: node.type,
        type: node.tokenType,
        value: node.value,
        description: node.description
      })),
      links: graph.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        label: edge.label
      }))
    };

    return {
      format: 'd3',
      data
    };
  }

  /**
   * Generate DOT language (Graphviz) format
   */
  toDotFormat(graph: Graph): VisualizationOutput {
    let dot = 'digraph DesignTokens {\n';
    dot += '  rankdir=LR;\n';
    dot += '  node [shape=box, style=rounded];\n\n';

    // Add node styles
    dot += '  // Node definitions\n';
    for (const node of graph.nodes) {
      const color = this.getNodeColor(node.type);
      const label = this.escapeLabel(node.label);
      const tooltip = this.escapeLabel(node.description || '');

      dot += `  "${node.id}" [label="${label}", fillcolor="${color}", style="rounded,filled", tooltip="${tooltip}"];\n`;
    }

    dot += '\n  // Edge definitions\n';
    for (const edge of graph.edges) {
      dot += `  "${edge.source}" -> "${edge.target}";\n`;
    }

    dot += '}\n';

    return {
      format: 'dot',
      data: dot
    };
  }

  /**
   * Generate Mermaid diagram format
   */
  toMermaidFormat(graph: Graph): VisualizationOutput {
    let mermaid = 'graph LR\n';

    // Add node class definitions
    mermaid += '  classDef global fill:#90EE90,stroke:#333,stroke-width:2px;\n';
    mermaid += '  classDef semantic fill:#87CEEB,stroke:#333,stroke-width:2px;\n';
    mermaid += '  classDef orphan fill:#FFB6C6,stroke:#333,stroke-width:2px;\n\n';

    // Create node ID mapping (Mermaid doesn't like dots in IDs)
    const nodeIdMap = new Map<string, string>();
    graph.nodes.forEach((node, index) => {
      nodeIdMap.set(node.id, `N${index}`);
    });

    // Add nodes
    for (const node of graph.nodes) {
      const id = nodeIdMap.get(node.id)!;
      const label = this.escapeMermaidLabel(node.label);
      mermaid += `  ${id}["${label}"]:::${node.type}\n`;
    }

    mermaid += '\n';

    // Add edges
    for (const edge of graph.edges) {
      const sourceId = nodeIdMap.get(edge.source)!;
      const targetId = nodeIdMap.get(edge.target)!;
      mermaid += `  ${sourceId} --> ${targetId}\n`;
    }

    return {
      format: 'mermaid',
      data: mermaid
    };
  }

  /**
   * Generate HTML with interactive D3.js visualization
   */
  toInteractiveHTML(graph: Graph): string {
    const d3Data = this.toD3Format(graph);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Tokens Explorer</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    #graph {
      width: 100%;
      height: 800px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .node {
      cursor: pointer;
      stroke: #fff;
      stroke-width: 2px;
    }
    .node.global { fill: #90EE90; }
    .node.semantic { fill: #87CEEB; }
    .node.orphan { fill: #FFB6C6; }
    .link {
      stroke: #999;
      stroke-opacity: 0.6;
      stroke-width: 1.5px;
      fill: none;
      marker-end: url(#arrowhead);
    }
    .node-label {
      font-size: 12px;
      pointer-events: none;
      text-anchor: middle;
      fill: #333;
    }
    .tooltip {
      position: absolute;
      padding: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .legend {
      position: absolute;
      top: 40px;
      right: 40px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin: 5px 0;
    }
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin-right: 10px;
    }
    h1 {
      margin: 0 0 20px 0;
      color: #333;
    }
    .stats {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-top: 10px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #2196f3;
    }
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <h1>Design Tokens Explorer</h1>

  <div class="stats">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value" id="total-nodes">0</div>
        <div class="stat-label">Total Tokens</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="global-nodes">0</div>
        <div class="stat-label">Global Tokens</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="semantic-nodes">0</div>
        <div class="stat-label">Semantic Tokens</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="orphan-nodes">0</div>
        <div class="stat-label">Orphan Tokens</div>
      </div>
    </div>
  </div>

  <div style="position: relative;">
    <div id="graph"></div>
    <div class="legend">
      <h3 style="margin: 0 0 10px 0; font-size: 14px;">Token Types</h3>
      <div class="legend-item">
        <div class="legend-color" style="background: #90EE90;"></div>
        <span>Global/Foundation</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #87CEEB;"></div>
        <span>Semantic</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #FFB6C6;"></div>
        <span>Orphan (Invalid)</span>
      </div>
    </div>
  </div>

  <div class="tooltip" id="tooltip"></div>

  <script>
    const data = ${JSON.stringify(d3Data.data, null, 2)};

    // Update statistics
    const stats = {
      total: data.nodes.length,
      global: data.nodes.filter(n => n.group === 'global').length,
      semantic: data.nodes.filter(n => n.group === 'semantic').length,
      orphan: data.nodes.filter(n => n.group === 'orphan').length
    };

    document.getElementById('total-nodes').textContent = stats.total;
    document.getElementById('global-nodes').textContent = stats.global;
    document.getElementById('semantic-nodes').textContent = stats.semantic;
    document.getElementById('orphan-nodes').textContent = stats.orphan;

    // Set up the SVG
    const width = document.getElementById('graph').clientWidth;
    const height = 800;

    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Add arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    const g = svg.append('g');

    // Create the simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Create links
    const link = g.append('g')
      .selectAll('path')
      .data(data.links)
      .join('path')
      .attr('class', 'link');

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('class', d => 'node ' + d.group)
      .attr('r', 10)
      .call(drag(simulation));

    // Create labels
    const labels = g.append('g')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .attr('class', 'node-label')
      .attr('dy', 25)
      .text(d => d.label);

    // Tooltip
    const tooltip = d3.select('#tooltip');

    node.on('mouseover', function(event, d) {
      tooltip.style('opacity', 1)
        .html(\`
          <strong>\${d.id}</strong><br/>
          Type: \${d.type || 'N/A'}<br/>
          Value: \${d.value}<br/>
          \${d.description ? 'Description: ' + d.description : ''}
        \`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    })
    .on('mouseout', function() {
      tooltip.style('opacity', 0);
    });

    // Update positions
    simulation.on('tick', () => {
      link.attr('d', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return \`M\${d.source.x},\${d.source.y}L\${d.target.x},\${d.target.y}\`;
      });

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Zoom
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 8])
      .on('zoom', ({transform}) => {
        g.attr('transform', transform);
      }));

    // Drag behavior
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  </script>
</body>
</html>`;
  }

  /**
   * Get color for node type
   */
  private getNodeColor(type: string): string {
    const colors: Record<string, string> = {
      'global': '#90EE90',
      'semantic': '#87CEEB',
      'orphan': '#FFB6C6'
    };
    return colors[type] || '#CCCCCC';
  }

  /**
   * Escape label for DOT format
   */
  private escapeLabel(label: string): string {
    return label.replace(/"/g, '\\"');
  }

  /**
   * Escape label for Mermaid format
   */
  private escapeMermaidLabel(label: string): string {
    return label.replace(/"/g, '#quot;');
  }
}
