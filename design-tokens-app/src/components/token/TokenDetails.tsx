import type { TokenNode, ReportToken } from '../../types';

interface TokenDetailsProps {
  node: TokenNode | null;
  reportData: ReportToken[];
  onClose: () => void;
}

export function TokenDetails({ node, reportData, onClose }: TokenDetailsProps) {
  if (!node) return null;

  const token = reportData.find(t => t.path === node.id);

  return (
    <div className="token-details">
      <div className="token-details-header">
        <h3>Token Details</h3>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>

      <div className="token-details-content">
        <div className="detail-row">
          <strong>ID:</strong>
          <span>{node.id}</span>
        </div>

        <div className="detail-row">
          <strong>Label:</strong>
          <span>{node.label}</span>
        </div>

        <div className="detail-row">
          <strong>Type:</strong>
          <span className={`badge ${node.group}`}>
            {node.group}
          </span>
        </div>

        <div className="detail-row">
          <strong>Value:</strong>
          <code>{node.value}</code>
        </div>

        {node.type && (
          <div className="detail-row">
            <strong>Token Type:</strong>
            <span>{node.type}</span>
          </div>
        )}

        {node.description && (
          <div className="detail-row">
            <strong>Description:</strong>
            <span>{node.description}</span>
          </div>
        )}

        {token && (
          <>
            {token.references.length > 0 && (
              <div className="detail-section">
                <strong>References:</strong>
                <ul>
                  {token.references.map(ref => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            {token.referencedBy.length > 0 && (
              <div className="detail-section">
                <strong>Referenced By:</strong>
                <ul>
                  {token.referencedBy.map(ref => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
