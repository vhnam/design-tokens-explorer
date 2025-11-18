import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { GraphData, TokenNode, TokenLink } from '../../types';
import { TOKEN_COLORS, TOKEN_GROUP_LABELS, SIMULATION_CONFIG } from '../../utils/constants';

interface ForceGraphProps {
  data: GraphData;
  onNodeClick?: (node: TokenNode) => void;
}

export function ForceGraph({ data, onNodeClick }: ForceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create a copy of the data to avoid mutating the original
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // Set up zoom behavior
    const g = svg.append('g');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

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

    // Create the simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<TokenNode, TokenLink>(links).id(d => d.id).distance(SIMULATION_CONFIG.linkDistance))
      .force('charge', d3.forceManyBody<TokenNode>().strength(SIMULATION_CONFIG.chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<TokenNode>().radius(SIMULATION_CONFIG.collisionRadius));

    // Create links
    const link = g.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .attr('fill', 'none')
      .attr('marker-end', 'url(#arrowhead)');

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('class', d => `node ${d.group}`)
      .attr('r', SIMULATION_CONFIG.nodeRadius)
      .attr('fill', d => TOKEN_COLORS[d.group] || TOKEN_COLORS.default)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(drag(simulation))
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick?.(d);
      });

    // Create labels
    const labels = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', 25)
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .attr('pointer-events', 'none')
      .text(d => d.label);

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '10px')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000);

    node
      .on('mouseover', function(event, d) {
        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d.id}</strong><br/>
            Type: ${d.type || 'N/A'}<br/>
            Value: ${d.value}<br/>
            ${d.description ? 'Description: ' + d.description : ''}
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        tooltip.style('opacity', 0);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link.attr('d', d => {
        const source = d.source as TokenNode;
        const target = d.target as TokenNode;
        return `M${source.x},${source.y}L${target.x},${target.y}`;
      });

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      labels
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

    // Drag behavior
    function drag(simulation: d3.Simulation<TokenNode, undefined>) {
      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, TokenNode, TokenNode>) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, TokenNode, TokenNode>) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, TokenNode, TokenNode>) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag<SVGCircleElement, TokenNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // Cleanup
    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data, dimensions, onNodeClick]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '800px', position: 'relative' }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
      <div className="legend">
        <h3>DTCG Hierarchy</h3>
        {Object.entries(TOKEN_COLORS).filter(([key]) => key !== 'default').map(([key, color]) => (
          <div key={key} className="legend-item">
            <div className="legend-color" style={{ background: color }}></div>
            <span>{TOKEN_GROUP_LABELS[key as keyof typeof TOKEN_GROUP_LABELS]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
