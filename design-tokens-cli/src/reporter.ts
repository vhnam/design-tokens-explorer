/**
 * Reporter - Generates reports in various formats
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { AnalysisReport, Graph, TokenMap } from './types';

export class Reporter {
  /**
   * Generate a comprehensive JSON report
   */
  async generateJSONReport(
    report: AnalysisReport,
    graph: Graph,
    tokenMap: TokenMap,
    outputPath: string
  ): Promise<void> {
    const fullReport = {
      summary: {
        totalTokens: report.totalTokens,
        globalTokens: report.globalTokens,
        semanticTokens: report.semanticTokens,
        orphanTokens: report.orphanTokens
      },
      statistics: report.statistics,
      orphanTokens: report.orphanTokensList,
      graph: {
        nodeCount: graph.nodes.length,
        edgeCount: graph.edges.length,
        nodesByType: this.groupByType(graph.nodes)
      },
      tokens: Object.values(tokenMap).map(token => ({
        path: token.path,
        value: token.value,
        type: token.type,
        isGlobal: token.isGlobal,
        references: token.references,
        referencedBy: token.referencedBy
      }))
    };

    await this.ensureDirectory(path.dirname(outputPath));
    await fs.writeFile(outputPath, JSON.stringify(fullReport, null, 2));
  }

  /**
   * Generate a human-readable text report
   */
  async generateTextReport(
    report: AnalysisReport,
    graph: Graph,
    outputPath: string
  ): Promise<void> {
    let text = '';

    text += '='.repeat(60) + '\n';
    text += 'DESIGN TOKENS ANALYSIS REPORT\n';
    text += '='.repeat(60) + '\n\n';

    // Summary
    text += 'SUMMARY\n';
    text += '-'.repeat(60) + '\n';
    text += `Total Tokens:     ${report.totalTokens}\n`;
    text += `Global Tokens:    ${report.globalTokens}\n`;
    text += `Semantic Tokens:  ${report.semanticTokens}\n`;
    text += `Orphan Tokens:    ${report.orphanTokens}\n\n`;

    // Statistics
    text += 'STATISTICS\n';
    text += '-'.repeat(60) + '\n';
    text += `Avg References/Token:  ${report.statistics.avgReferencesPerToken}\n`;
    text += `Max Reference Depth:   ${report.statistics.maxDepth}\n`;
    text += `Circular References:   ${report.statistics.circularReferences.length}\n\n`;

    // Circular references details
    if (report.statistics.circularReferences.length > 0) {
      text += 'CIRCULAR REFERENCES DETECTED\n';
      text += '-'.repeat(60) + '\n';
      report.statistics.circularReferences.forEach((cycle, index) => {
        text += `${index + 1}. ${cycle.join(' -> ')}\n`;
      });
      text += '\n';
    }

    // Orphan tokens
    if (report.orphanTokensList.length > 0) {
      text += 'ORPHAN TOKENS (Invalid References)\n';
      text += '-'.repeat(60) + '\n';
      report.orphanTokensList.forEach((orphan, index) => {
        text += `${index + 1}. ${orphan.path}\n`;
        text += `   Value: ${orphan.value}\n`;
        text += `   Missing Reference: ${orphan.missingReference}\n`;
        if (orphan.description) {
          text += `   Description: ${orphan.description}\n`;
        }
        text += '\n';
      });
    } else {
      text += 'ORPHAN TOKENS\n';
      text += '-'.repeat(60) + '\n';
      text += 'No orphan tokens found. All semantic tokens reference valid tokens.\n\n';
    }

    // Graph info
    text += 'GRAPH INFORMATION\n';
    text += '-'.repeat(60) + '\n';
    text += `Nodes: ${graph.nodes.length}\n`;
    text += `Edges: ${graph.edges.length}\n`;
    text += `Global Nodes:   ${graph.nodes.filter(n => n.type === 'global').length}\n`;
    text += `Semantic Nodes: ${graph.nodes.filter(n => n.type === 'semantic').length}\n`;
    text += `Orphan Nodes:   ${graph.nodes.filter(n => n.type === 'orphan').length}\n\n`;

    text += '='.repeat(60) + '\n';

    await this.ensureDirectory(path.dirname(outputPath));
    await fs.writeFile(outputPath, text);
  }

  /**
   * Generate a markdown report
   */
  async generateMarkdownReport(
    report: AnalysisReport,
    graph: Graph,
    outputPath: string
  ): Promise<void> {
    let md = '';

    md += '# Design Tokens Analysis Report\n\n';

    // Summary
    md += '## Summary\n\n';
    md += '| Metric | Count |\n';
    md += '|--------|-------|\n';
    md += `| Total Tokens | ${report.totalTokens} |\n`;
    md += `| Global Tokens | ${report.globalTokens} |\n`;
    md += `| Semantic Tokens | ${report.semanticTokens} |\n`;
    md += `| Orphan Tokens | ${report.orphanTokens} |\n\n`;

    // Statistics
    md += '## Statistics\n\n';
    md += `- **Average References per Token**: ${report.statistics.avgReferencesPerToken}\n`;
    md += `- **Maximum Reference Depth**: ${report.statistics.maxDepth}\n`;
    md += `- **Circular References**: ${report.statistics.circularReferences.length}\n\n`;

    // Circular references
    if (report.statistics.circularReferences.length > 0) {
      md += '### Circular References Detected\n\n';
      report.statistics.circularReferences.forEach((cycle, index) => {
        md += `${index + 1}. \`${cycle.join(' -> ')}\`\n`;
      });
      md += '\n';
    }

    // Orphan tokens
    if (report.orphanTokensList.length > 0) {
      md += '## Orphan Tokens (Invalid References)\n\n';
      md += 'These semantic tokens reference non-existent tokens:\n\n';
      report.orphanTokensList.forEach((orphan, index) => {
        md += `### ${index + 1}. \`${orphan.path}\`\n\n`;
        md += `- **Value**: \`${orphan.value}\`\n`;
        md += `- **Missing Reference**: \`${orphan.missingReference}\`\n`;
        if (orphan.description) {
          md += `- **Description**: ${orphan.description}\n`;
        }
        md += '\n';
      });
    } else {
      md += '## Orphan Tokens\n\n';
      md += 'No orphan tokens found. All semantic tokens reference valid tokens.\n\n';
    }

    // Graph information
    md += '## Graph Information\n\n';
    md += `- **Total Nodes**: ${graph.nodes.length}\n`;
    md += `- **Total Edges**: ${graph.edges.length}\n`;
    md += `- **Global Nodes**: ${graph.nodes.filter(n => n.type === 'global').length}\n`;
    md += `- **Semantic Nodes**: ${graph.nodes.filter(n => n.type === 'semantic').length}\n`;
    md += `- **Orphan Nodes**: ${graph.nodes.filter(n => n.type === 'orphan').length}\n\n`;

    await this.ensureDirectory(path.dirname(outputPath));
    await fs.writeFile(outputPath, md);
  }

  /**
   * Console output with colors
   */
  printConsoleReport(report: AnalysisReport): void {
    console.log('\n' + '='.repeat(60));
    console.log('DESIGN TOKENS ANALYSIS REPORT');
    console.log('='.repeat(60) + '\n');

    console.log('SUMMARY');
    console.log('-'.repeat(60));
    console.log(`Total Tokens:     ${report.totalTokens}`);
    console.log(`Global Tokens:    ${report.globalTokens}`);
    console.log(`Semantic Tokens:  ${report.semanticTokens}`);
    console.log(`Orphan Tokens:    ${report.orphanTokens}`);
    console.log('');

    console.log('STATISTICS');
    console.log('-'.repeat(60));
    console.log(`Avg References/Token:  ${report.statistics.avgReferencesPerToken}`);
    console.log(`Max Reference Depth:   ${report.statistics.maxDepth}`);
    console.log(`Circular References:   ${report.statistics.circularReferences.length}`);
    console.log('');

    if (report.statistics.circularReferences.length > 0) {
      console.log('CIRCULAR REFERENCES DETECTED');
      console.log('-'.repeat(60));
      report.statistics.circularReferences.forEach((cycle, index) => {
        console.log(`${index + 1}. ${cycle.join(' -> ')}`);
      });
      console.log('');
    }

    if (report.orphanTokensList.length > 0) {
      console.log('ORPHAN TOKENS (Invalid References)');
      console.log('-'.repeat(60));
      report.orphanTokensList.forEach((orphan, index) => {
        console.log(`${index + 1}. ${orphan.path}`);
        console.log(`   Value: ${orphan.value}`);
        console.log(`   Missing Reference: ${orphan.missingReference}`);
        if (orphan.description) {
          console.log(`   Description: ${orphan.description}`);
        }
        console.log('');
      });
    } else {
      console.log('ORPHAN TOKENS');
      console.log('-'.repeat(60));
      console.log('No orphan tokens found. All semantic tokens reference valid tokens.');
      console.log('');
    }

    console.log('='.repeat(60) + '\n');
  }

  /**
   * Ensure directory exists
   */
  private async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }

  /**
   * Group nodes by type
   */
  private groupByType(nodes: any[]): Record<string, number> {
    const groups: Record<string, number> = {};
    for (const node of nodes) {
      const type = node.type || 'unknown';
      groups[type] = (groups[type] || 0) + 1;
    }
    return groups;
  }
}
