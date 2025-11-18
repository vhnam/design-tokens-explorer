/**
 * Token Parser - Reads and parses Design Token files
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { TokenDefinition, TokenGroup, TokenMap, Token } from './types';

export class TokenParser {
  private tokenMap: TokenMap = {};

  /**
   * Parse all token files in a directory
   */
  async parseDirectory(dirPath: string): Promise<TokenMap> {
    this.tokenMap = {};
    await this.readDirectory(dirPath);
    return this.tokenMap;
  }

  /**
   * Parse a single token file
   */
  async parseFile(filePath: string): Promise<TokenMap> {
    this.tokenMap = {};
    await this.readFile(filePath);
    return this.tokenMap;
  }

  /**
   * Recursively read directory
   */
  private async readDirectory(dirPath: string): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await this.readDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        await this.readFile(fullPath);
      }
    }
  }

  /**
   * Read and parse a single JSON file
   */
  private async readFile(filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const json = JSON.parse(content);
      this.parseTokenGroup(json, []);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }
  }

  /**
   * Recursively parse token groups and tokens
   */
  private parseTokenGroup(obj: any, parentPath: string[]): void {
    for (const key of Object.keys(obj)) {
      // Skip metadata keys
      if (key.startsWith('$') && key !== '$value' && key !== '$type' && key !== '$description') {
        continue;
      }

      const currentPath = [...parentPath, key];
      const value = obj[key];

      // Check if this is a token definition (has $value)
      if (typeof value === 'object' && value !== null && '$value' in value) {
        this.addToken(currentPath, value, obj['$type']);
      }
      // Otherwise, it's a group, recurse
      else if (typeof value === 'object' && value !== null) {
        this.parseTokenGroup(value, currentPath);
      }
    }
  }

  /**
   * Add a token to the token map
   */
  private addToken(tokenPath: string[], tokenDef: TokenDefinition, inheritedType?: string): void {
    const path = tokenPath.join('.');
    const name = tokenPath[tokenPath.length - 1];
    const value = tokenDef.$value;
    const type = tokenDef.$type || inheritedType;
    const description = tokenDef.$description;

    // Extract references from the value
    const references = this.extractReferences(value);

    // Determine if this is a global (foundation) token
    // Global tokens have static values, semantic tokens reference other tokens
    const isGlobal = references.length === 0;

    const token: Token = {
      path,
      name,
      value,
      type,
      description,
      isGlobal,
      references,
      referencedBy: []
    };

    this.tokenMap[path] = token;
  }

  /**
   * Extract token references from a value
   * References are in the format {path.to.token}
   */
  private extractReferences(value: any): string[] {
    if (typeof value !== 'string') {
      return [];
    }

    const referencePattern = /\{([^}]+)\}/g;
    const matches = value.matchAll(referencePattern);
    const references: string[] = [];

    for (const match of matches) {
      references.push(match[1]);
    }

    return references;
  }

  /**
   * Build reverse references (which tokens reference this token)
   */
  buildReverseReferences(tokenMap: TokenMap): void {
    // Reset all referencedBy arrays
    for (const token of Object.values(tokenMap)) {
      token.referencedBy = [];
    }

    // Build reverse references
    for (const [path, token] of Object.entries(tokenMap)) {
      for (const ref of token.references) {
        if (tokenMap[ref]) {
          tokenMap[ref].referencedBy.push(path);
        }
      }
    }
  }
}
