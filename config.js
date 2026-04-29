/**
 * Style Dictionary v5 build configuration with light + dark theming.
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary, {
  excludeParentKeys: true,
});

// Slim JS exporter
StyleDictionary.registerFormat({
  name: 'javascript/esm-slim',
  format: ({ dictionary }) => {
    const tree = {};
    for (const token of dictionary.allTokens) {
      let cursor = tree;
      for (let i = 0; i < token.path.length - 1; i++) {
        const key = token.path[i];
        cursor[key] ??= {};
        cursor = cursor[key];
      }
      cursor[token.path.at(-1)] = token.$value ?? token.value;
    }
    return `export default ${JSON.stringify(tree, null, 2)};\n`;
  },
});

// Filter for dark-only tokens
StyleDictionary.registerFilter({
  name: 'isDarkOverride',
  filter: (token) => token.filePath?.includes('themes/dark.json'),
});

// 1. Light build
const sdLight = new StyleDictionary({
  source: ['tokens/tokens.json'],
  preprocessors: ['tokens-studio'],
  log: { verbosity: 'verbose', warnings: 'warn' },

  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      expand: { include: ['typography'] },
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true, selector: ':root' },
        },
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'build/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/esm-slim' }],
    },
    json: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/json/',
      files: [{ destination: 'tokens.flat.json', format: 'json/flat' }],
    },
  },
});

// 2. Dark build — separate instance to avoid clobbering :root tokens
const sdDark = new StyleDictionary({
  source: [
    'tokens/tokens.json',          // primitives, for alias resolution
    'tokens/themes/dark.json',     // the overrides we'll emit
  ],
  preprocessors: ['tokens-studio'],
  log: { verbosity: 'silent', warnings: 'disabled' },

  platforms: {
    cssDark: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          filter: 'isDarkOverride',
          options: {
            outputReferences: false,
            selector: '[data-theme="dark"]',
          },
        },
      ],
    },
  },
});

// Run them
await sdLight.cleanAllPlatforms();
await sdLight.buildAllPlatforms();

await sdDark.cleanAllPlatforms();
await sdDark.buildAllPlatforms();

console.log('\n✓ Build complete');