/**
 * Example: Using Design Tokens Explorer Programmatically
 */

import { DesignTokensExplorer } from '../src';

async function main() {
  // Create an instance of the explorer
  const explorer = new DesignTokensExplorer();

  // Analyze tokens from a directory
  console.log('Analyzing design tokens...\n');
  const { tokenMap, report, graph } = await explorer.analyzeDirectory('./examples/tokens');

  // Display summary
  console.log('=== SUMMARY ===');
  console.log(`Total Tokens: ${report.totalTokens}`);
  console.log(`Global Tokens: ${report.globalTokens}`);
  console.log(`Semantic Tokens: ${report.semanticTokens}`);
  console.log(`Orphan Tokens: ${report.orphanTokens}\n`);

  // Display statistics
  console.log('=== STATISTICS ===');
  console.log(`Average References per Token: ${report.statistics.avgReferencesPerToken}`);
  console.log(`Maximum Reference Depth: ${report.statistics.maxDepth}`);
  console.log(`Circular References Found: ${report.statistics.circularReferences.length}\n`);

  // Display orphan tokens
  if (report.orphanTokensList.length > 0) {
    console.log('=== ORPHAN TOKENS ===');
    report.orphanTokensList.forEach((orphan, index) => {
      console.log(`${index + 1}. ${orphan.path}`);
      console.log(`   Value: ${orphan.value}`);
      console.log(`   Missing Reference: ${orphan.missingReference}`);
      if (orphan.description) {
        console.log(`   Description: ${orphan.description}`);
      }
      console.log();
    });
  }

  // Generate visualizations
  const visualizer = explorer.getVisualizer();

  // Get D3.js data
  const d3Data = visualizer.toD3Format(graph);
  console.log('=== D3.js DATA ===');
  console.log(`Nodes: ${d3Data.data.nodes.length}`);
  console.log(`Links: ${d3Data.data.links.length}\n`);

  // Generate HTML visualization
  const html = visualizer.toInteractiveHTML(graph);
  console.log(`Generated interactive HTML (${html.length} bytes)\n`);

  // Generate reports
  const reporter = explorer.getReporter();

  await reporter.generateJSONReport(report, graph, tokenMap, './output/example-report.json');
  console.log('JSON report saved to: ./output/example-report.json');

  await reporter.generateTextReport(report, graph, './output/example-report.txt');
  console.log('Text report saved to: ./output/example-report.txt');

  await reporter.generateMarkdownReport(report, graph, './output/example-report.md');
  console.log('Markdown report saved to: ./output/example-report.md\n');

  // Example: Get information about a specific token
  const buttonToken = tokenMap['button.primary.background'];
  if (buttonToken) {
    console.log('=== EXAMPLE TOKEN ===');
    console.log(`Path: ${buttonToken.path}`);
    console.log(`Value: ${buttonToken.value}`);
    console.log(`Type: ${buttonToken.type}`);
    console.log(`Is Global: ${buttonToken.isGlobal}`);
    console.log(`References: ${buttonToken.references.join(', ')}`);
    console.log(`Referenced By: ${buttonToken.referencedBy.join(', ')}\n`);
  }

  // Example: Filter tokens by type
  const colorTokens = Object.values(tokenMap).filter(t => t.type === 'color');
  console.log(`=== COLOR TOKENS ===`);
  console.log(`Found ${colorTokens.length} color tokens\n`);

  // Example: Get global tokens only
  const globalTokens = Object.values(tokenMap).filter(t => t.isGlobal);
  console.log(`=== GLOBAL TOKENS ===`);
  console.log(`Found ${globalTokens.length} global tokens`);
  globalTokens.slice(0, 5).forEach(token => {
    console.log(`- ${token.path} = ${token.value}`);
  });
  console.log();
}

// Run the example
main().catch(console.error);
