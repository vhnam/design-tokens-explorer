import { useState, useMemo } from 'react';
import { useTokenData } from './hooks/useTokenData';
import { ForceGraph, StatsDashboard, TokenDetails, Filters } from './components';
import type { TokenNode, GraphData, FilterState } from './types';
import './App.css';

function App() {
  const { graphData, reportData, loading, error } = useTokenData();
  const [selectedNode, setSelectedNode] = useState<TokenNode | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    showGlobal: true,
    showBrand: true,
    showSemantic: true,
    showComponent: true,
    showOrphan: true,
    searchTerm: ''
  });

  const filteredGraphData = useMemo<GraphData | null>(() => {
    if (!graphData) return null;

    const filteredNodes = graphData.nodes.filter(node => {
      // Filter by type
      if (!filters.showGlobal && node.group === 'global') return false;
      if (!filters.showBrand && node.group === 'brand') return false;
      if (!filters.showSemantic && node.group === 'semantic') return false;
      if (!filters.showComponent && node.group === 'component') return false;
      if (!filters.showOrphan && node.group === 'orphan') return false;

      // Filter by search term
      if (filters.searchTerm && !node.id.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = graphData.links.filter(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });

    return {
      nodes: filteredNodes,
      links: filteredLinks
    };
  }, [graphData, filters]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading design tokens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!graphData || !reportData || !filteredGraphData) {
    return (
      <div className="error">
        <h2>No data available</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Design Tokens Explorer</h1>
        <p>Interactive visualization of design token relationships and dependencies</p>
      </header>

      <main className="app-main">
        <StatsDashboard data={reportData} />

        <Filters filters={filters} onChange={setFilters} />

        <div className="visualization-container">
          <ForceGraph
            data={filteredGraphData}
            onNodeClick={setSelectedNode}
          />

          {selectedNode && (
            <TokenDetails
              node={selectedNode}
              reportData={reportData.tokens}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
