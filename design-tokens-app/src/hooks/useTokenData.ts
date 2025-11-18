import { useState, useEffect } from 'react';
import type { GraphData, ReportData } from '../types';

export function useTokenData() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/d3-data.json').then(res => res.json()),
      fetch('/report.json').then(res => res.json())
    ])
      .then(([graph, report]) => {
        setGraphData(graph);
        setReportData(report);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { graphData, reportData, loading, error };
}
