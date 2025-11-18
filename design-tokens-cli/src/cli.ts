#!/usr/bin/env node

/**
 * CLI - Command-line interface for Design Tokens Explorer
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';
import { TokenParser } from './parser';
import { TokenAnalyzer } from './analyzer';
import { GraphBuilder } from './graph';
import { Visualizer } from './visualizer';
import { Reporter } from './reporter';

const program = new Command();

program
  .name('tokens-explorer')
  .description('CLI tool to analyze and visualize Design Tokens relationships')
  .version('1.0.0');

/**
 * Analyze command
 */
program
  .command('analyze')
  .description('Analyze design tokens and generate reports')
  .option('-i, --input <path>', 'Input directory or file containing tokens', './tokens')
  .option('-o, --output <path>', 'Output directory for reports and visualizations', './output')
  .option('-f, --format <formats...>', 'Output formats (json, text, markdown, html, d3, dot, mermaid)', ['json', 'html'])
  .option('--no-viz', 'Skip visualization generation')
  .option('--console', 'Print report to console')
  .action(async (options) => {
    try {
      console.log(chalk.blue.bold('\n🔍 Design Tokens Explorer\n'));

      // Parse tokens
      console.log(chalk.gray('📖 Parsing tokens...'));
      const parser = new TokenParser();
      const tokenMap = await parser.parseDirectory(options.input);
      parser.buildReverseReferences(tokenMap);
      console.log(chalk.green(`✓ Parsed ${Object.keys(tokenMap).length} tokens\n`));

      // Analyze tokens
      console.log(chalk.gray('🔬 Analyzing tokens...'));
      const analyzer = new TokenAnalyzer();
      const report = analyzer.analyze(tokenMap);
      console.log(chalk.green('✓ Analysis complete\n'));

      // Build graph
      console.log(chalk.gray('🕸️  Building relationship graph...'));
      const graphBuilder = new GraphBuilder();
      const graph = graphBuilder.buildGraph(tokenMap);
      console.log(chalk.green(`✓ Graph built: ${graph.nodes.length} nodes, ${graph.edges.length} edges\n`));

      // Generate outputs
      console.log(chalk.gray('📊 Generating outputs...'));
      const visualizer = new Visualizer();
      const reporter = new Reporter();

      const outputDir = options.output;
      await fs.mkdir(outputDir, { recursive: true });

      const formats = Array.isArray(options.format) ? options.format : [options.format];

      for (const format of formats) {
        switch (format.toLowerCase()) {
          case 'json':
            await reporter.generateJSONReport(report, graph, tokenMap, path.join(outputDir, 'report.json'));
            console.log(chalk.green(`✓ JSON report: ${path.join(outputDir, 'report.json')}`));
            break;

          case 'text':
            await reporter.generateTextReport(report, graph, path.join(outputDir, 'report.txt'));
            console.log(chalk.green(`✓ Text report: ${path.join(outputDir, 'report.txt')}`));
            break;

          case 'markdown':
          case 'md':
            await reporter.generateMarkdownReport(report, graph, path.join(outputDir, 'report.md'));
            console.log(chalk.green(`✓ Markdown report: ${path.join(outputDir, 'report.md')}`));
            break;

          case 'html':
            if (options.viz) {
              const html = visualizer.toInteractiveHTML(graph);
              await fs.writeFile(path.join(outputDir, 'visualization.html'), html);
              console.log(chalk.green(`✓ Interactive HTML: ${path.join(outputDir, 'visualization.html')}`));
            }
            break;

          case 'd3':
            if (options.viz) {
              const d3Data = visualizer.toD3Format(graph);
              await fs.writeFile(path.join(outputDir, 'd3-data.json'), JSON.stringify(d3Data.data, null, 2));
              console.log(chalk.green(`✓ D3.js data: ${path.join(outputDir, 'd3-data.json')}`));
            }
            break;

          case 'dot':
            if (options.viz) {
              const dotData = visualizer.toDotFormat(graph);
              await fs.writeFile(path.join(outputDir, 'graph.dot'), dotData.data);
              console.log(chalk.green(`✓ DOT file: ${path.join(outputDir, 'graph.dot')}`));
            }
            break;

          case 'mermaid':
            if (options.viz) {
              const mermaidData = visualizer.toMermaidFormat(graph);
              await fs.writeFile(path.join(outputDir, 'graph.mmd'), mermaidData.data);
              console.log(chalk.green(`✓ Mermaid diagram: ${path.join(outputDir, 'graph.mmd')}`));
            }
            break;
        }
      }

      console.log('');

      // Console output
      if (options.console) {
        reporter.printConsoleReport(report);
      }

      // Summary
      if (report.orphanTokens > 0) {
        console.log(chalk.yellow.bold(`⚠️  Warning: Found ${report.orphanTokens} orphan token(s) with invalid references`));
      } else {
        console.log(chalk.green.bold('✓ All tokens are properly linked!'));
      }

      if (report.statistics.circularReferences.length > 0) {
        console.log(chalk.red.bold(`⚠️  Warning: Found ${report.statistics.circularReferences.length} circular reference(s)`));
      }

      console.log('');
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

/**
 * Interactive command
 */
program
  .command('interactive')
  .alias('i')
  .description('Launch interactive mode')
  .action(async () => {
    console.log(chalk.blue.bold('\n🔍 Design Tokens Explorer - Interactive Mode\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: 'Enter the path to your tokens directory or file:',
        default: './tokens'
      },
      {
        type: 'input',
        name: 'output',
        message: 'Enter the output directory for reports:',
        default: './output'
      },
      {
        type: 'checkbox',
        name: 'formats',
        message: 'Select output formats:',
        choices: [
          { name: 'JSON Report', value: 'json', checked: true },
          { name: 'Text Report', value: 'text' },
          { name: 'Markdown Report', value: 'markdown' },
          { name: 'Interactive HTML Visualization', value: 'html', checked: true },
          { name: 'D3.js Data (JSON)', value: 'd3' },
          { name: 'DOT (Graphviz)', value: 'dot' },
          { name: 'Mermaid Diagram', value: 'mermaid' }
        ]
      },
      {
        type: 'confirm',
        name: 'console',
        message: 'Display report in console?',
        default: true
      }
    ]);

    // Run analysis with selected options
    program.parse(['', '', 'analyze', '-i', answers.input, '-o', answers.output, '-f', ...answers.formats, answers.console ? '--console' : '']);
  });

/**
 * Info command
 */
program
  .command('info <path>')
  .description('Get information about a specific token')
  .option('-i, --input <path>', 'Input directory or file containing tokens', './examples/tokens')
  .action(async (tokenPath, options) => {
    try {
      const parser = new TokenParser();
      const tokenMap = await parser.parseDirectory(options.input);
      parser.buildReverseReferences(tokenMap);

      const token = tokenMap[tokenPath];
      if (!token) {
        console.log(chalk.red(`Token "${tokenPath}" not found`));
        return;
      }

      console.log(chalk.blue.bold(`\nToken: ${token.path}\n`));
      console.log(chalk.gray('Type:'), token.type || 'N/A');
      console.log(chalk.gray('Value:'), token.value);
      console.log(chalk.gray('Is Global:'), token.isGlobal ? 'Yes' : 'No');

      if (token.description) {
        console.log(chalk.gray('Description:'), token.description);
      }

      if (token.references.length > 0) {
        console.log(chalk.gray('\nReferences:'));
        token.references.forEach(ref => {
          const exists = tokenMap[ref] ? chalk.green('✓') : chalk.red('✗');
          console.log(`  ${exists} ${ref}`);
        });
      }

      if (token.referencedBy.length > 0) {
        console.log(chalk.gray('\nReferenced by:'));
        token.referencedBy.forEach(ref => {
          console.log(`  - ${ref}`);
        });
      }

      console.log('');
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

/**
 * List command
 */
program
  .command('list')
  .description('List all tokens')
  .option('-i, --input <path>', 'Input directory or file containing tokens', './examples/tokens')
  .option('-t, --type <type>', 'Filter by token type')
  .option('-g, --global', 'Show only global tokens')
  .option('-s, --semantic', 'Show only semantic tokens')
  .option('-o, --orphan', 'Show only orphan tokens')
  .action(async (options) => {
    try {
      const parser = new TokenParser();
      const tokenMap = await parser.parseDirectory(options.input);
      parser.buildReverseReferences(tokenMap);

      const analyzer = new TokenAnalyzer();
      const report = analyzer.analyze(tokenMap);

      let tokens = Object.values(tokenMap);

      if (options.global) {
        tokens = tokens.filter(t => t.isGlobal);
      } else if (options.semantic) {
        tokens = tokens.filter(t => !t.isGlobal);
      } else if (options.orphan) {
        const orphanPaths = new Set(report.orphanTokensList.map(o => o.path));
        tokens = tokens.filter(t => orphanPaths.has(t.path));
      }

      if (options.type) {
        tokens = tokens.filter(t => t.type === options.type);
      }

      console.log(chalk.blue.bold(`\nFound ${tokens.length} token(s):\n`));

      tokens.forEach(token => {
        const icon = token.isGlobal ? chalk.green('●') : chalk.blue('○');
        console.log(`${icon} ${token.path} = ${token.value}`);
      });

      console.log('');
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
