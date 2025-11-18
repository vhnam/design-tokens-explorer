/**
 * Token Analyzer - Analyzes token relationships and finds issues
 */

import { TokenMap, Token, AnalysisReport } from './types';

export class TokenAnalyzer {
  /**
   * Analyze tokens and generate a comprehensive report
   */
  analyze(tokenMap: TokenMap): AnalysisReport {
    const tokens = Object.values(tokenMap);
    const globalTokens = tokens.filter(t => t.isGlobal);
    const semanticTokens = tokens.filter(t => !t.isGlobal);

    // Find orphan tokens (semantic tokens with invalid references)
    const orphanTokensList = this.findOrphanTokens(tokenMap);

    // Calculate statistics
    const statistics = this.calculateStatistics(tokenMap);

    return {
      totalTokens: tokens.length,
      globalTokens: globalTokens.length,
      semanticTokens: semanticTokens.length,
      orphanTokens: orphanTokensList.length,
      orphanTokensList,
      statistics
    };
  }

  /**
   * Find semantic tokens that reference non-existent tokens
   */
  private findOrphanTokens(tokenMap: TokenMap): AnalysisReport['orphanTokensList'] {
    const orphans: AnalysisReport['orphanTokensList'] = [];

    for (const [path, token] of Object.entries(tokenMap)) {
      // Skip global tokens
      if (token.isGlobal) {
        continue;
      }

      // Check each reference
      for (const ref of token.references) {
        if (!tokenMap[ref]) {
          orphans.push({
            path: token.path,
            value: token.value,
            missingReference: ref,
            description: token.description
          });
        }
      }
    }

    return orphans;
  }

  /**
   * Calculate various statistics about the token system
   */
  private calculateStatistics(tokenMap: TokenMap) {
    const tokens = Object.values(tokenMap);

    // Average references per token
    const totalReferences = tokens.reduce((sum, t) => sum + t.references.length, 0);
    const avgReferencesPerToken = tokens.length > 0
      ? totalReferences / tokens.length
      : 0;

    // Maximum reference depth
    const maxDepth = this.calculateMaxDepth(tokenMap);

    // Find circular references
    const circularReferences = this.findCircularReferences(tokenMap);

    return {
      avgReferencesPerToken: parseFloat(avgReferencesPerToken.toFixed(2)),
      maxDepth,
      circularReferences
    };
  }

  /**
   * Calculate the maximum depth of token references
   */
  private calculateMaxDepth(tokenMap: TokenMap): number {
    let maxDepth = 0;

    for (const token of Object.values(tokenMap)) {
      const depth = this.getTokenDepth(token.path, tokenMap, new Set());
      maxDepth = Math.max(maxDepth, depth);
    }

    return maxDepth;
  }

  /**
   * Get the depth of a token in the reference chain
   */
  private getTokenDepth(path: string, tokenMap: TokenMap, visited: Set<string>): number {
    const token = tokenMap[path];
    if (!token || token.isGlobal) {
      return 0;
    }

    if (visited.has(path)) {
      return 0; // Circular reference, stop
    }

    visited.add(path);

    let maxChildDepth = 0;
    for (const ref of token.references) {
      if (tokenMap[ref]) {
        const childDepth = this.getTokenDepth(ref, tokenMap, new Set(visited));
        maxChildDepth = Math.max(maxChildDepth, childDepth);
      }
    }

    return maxChildDepth + 1;
  }

  /**
   * Find circular references in the token system
   */
  private findCircularReferences(tokenMap: TokenMap): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const detectCycle = (path: string, currentPath: string[]): void => {
      const token = tokenMap[path];
      if (!token) return;

      if (recursionStack.has(path)) {
        // Found a cycle
        const cycleStart = currentPath.indexOf(path);
        if (cycleStart !== -1) {
          cycles.push(currentPath.slice(cycleStart));
        }
        return;
      }

      if (visited.has(path)) {
        return;
      }

      visited.add(path);
      recursionStack.add(path);
      currentPath.push(path);

      for (const ref of token.references) {
        if (tokenMap[ref]) {
          detectCycle(ref, [...currentPath]);
        }
      }

      recursionStack.delete(path);
    };

    for (const path of Object.keys(tokenMap)) {
      if (!visited.has(path)) {
        detectCycle(path, []);
      }
    }

    return cycles;
  }

  /**
   * Get tokens by category
   */
  getTokensByType(tokenMap: TokenMap): Map<string, Token[]> {
    const byType = new Map<string, Token[]>();

    for (const token of Object.values(tokenMap)) {
      const type = token.type || 'unknown';
      if (!byType.has(type)) {
        byType.set(type, []);
      }
      byType.get(type)!.push(token);
    }

    return byType;
  }

  /**
   * Get token dependency chain
   */
  getDependencyChain(tokenPath: string, tokenMap: TokenMap): string[] {
    const chain: string[] = [];
    const visited = new Set<string>();

    const buildChain = (path: string): void => {
      if (visited.has(path)) return;
      visited.add(path);

      const token = tokenMap[path];
      if (!token) return;

      chain.push(path);

      for (const ref of token.references) {
        buildChain(ref);
      }
    };

    buildChain(tokenPath);
    return chain;
  }
}
