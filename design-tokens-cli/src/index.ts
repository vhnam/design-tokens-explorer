/**
 * Design Tokens Explorer - Main Export
 */

export { TokenParser } from './parser';
export { TokenAnalyzer } from './analyzer';
export { GraphBuilder } from './graph';
export { Visualizer } from './visualizer';
export { Reporter } from './reporter';

export * from './types';

// Main API
import { TokenParser } from './parser';
import { TokenAnalyzer } from './analyzer';
import { GraphBuilder } from './graph';
import { Visualizer } from './visualizer';
import { Reporter } from './reporter';
import { TokenMap, AnalysisReport, Graph } from './types';

export class DesignTokensExplorer {
  private parser: TokenParser;
  private analyzer: TokenAnalyzer;
  private graphBuilder: GraphBuilder;
  private visualizer: Visualizer;
  private reporter: Reporter;

  constructor() {
    this.parser = new TokenParser();
    this.analyzer = new TokenAnalyzer();
    this.graphBuilder = new GraphBuilder();
    this.visualizer = new Visualizer();
    this.reporter = new Reporter();
  }

  /**
   * Analyze tokens from a directory
   */
  async analyzeDirectory(dirPath: string): Promise<{
    tokenMap: TokenMap;
    report: AnalysisReport;
    graph: Graph;
  }> {
    const tokenMap = await this.parser.parseDirectory(dirPath);
    this.parser.buildReverseReferences(tokenMap);

    const report = this.analyzer.analyze(tokenMap);
    const graph = this.graphBuilder.buildGraph(tokenMap);

    return { tokenMap, report, graph };
  }

  /**
   * Analyze tokens from a single file
   */
  async analyzeFile(filePath: string): Promise<{
    tokenMap: TokenMap;
    report: AnalysisReport;
    graph: Graph;
  }> {
    const tokenMap = await this.parser.parseFile(filePath);
    this.parser.buildReverseReferences(tokenMap);

    const report = this.analyzer.analyze(tokenMap);
    const graph = this.graphBuilder.buildGraph(tokenMap);

    return { tokenMap, report, graph };
  }

  /**
   * Get visualizer instance
   */
  getVisualizer(): Visualizer {
    return this.visualizer;
  }

  /**
   * Get reporter instance
   */
  getReporter(): Reporter {
    return this.reporter;
  }
}
