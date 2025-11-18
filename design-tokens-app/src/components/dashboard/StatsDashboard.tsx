import type { ReportData } from '../../types';

interface StatsDashboardProps {
  data: ReportData;
}

export function StatsDashboard({ data }: StatsDashboardProps) {
  return (
    <div className="stats">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{data.summary.totalTokens}</div>
          <div className="stat-label">Total Tokens</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{data.summary.globalTokens}</div>
          <div className="stat-label">Global Tokens</div>
        </div>
        {data.summary.brandTokens !== undefined && (
          <div className="stat-item">
            <div className="stat-value">{data.summary.brandTokens}</div>
            <div className="stat-label">Brand Tokens</div>
          </div>
        )}
        <div className="stat-item">
          <div className="stat-value">{data.summary.semanticTokens}</div>
          <div className="stat-label">Semantic Tokens</div>
        </div>
        {data.summary.componentTokens !== undefined && (
          <div className="stat-item">
            <div className="stat-value">{data.summary.componentTokens}</div>
            <div className="stat-label">Component Tokens</div>
          </div>
        )}
        <div className="stat-item">
          <div className="stat-value">{data.summary.orphanTokens}</div>
          <div className="stat-label">Orphan Tokens</div>
        </div>
      </div>

      <div className="stats-details">
        <div className="stat-detail">
          <strong>Avg References per Token:</strong> {data.statistics.avgReferencesPerToken.toFixed(2)}
        </div>
        <div className="stat-detail">
          <strong>Max Depth:</strong> {data.statistics.maxDepth}
        </div>
        {data.statistics.circularReferences.length > 0 && (
          <div className="stat-detail warning">
            <strong>Circular References:</strong> {data.statistics.circularReferences.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
