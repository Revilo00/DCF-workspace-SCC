/**
 * Style Dictionary v5 build configuration.
 *
 * Reads tokens/tokens.json and emits CSS, JS, and JSON outputs.
 *
 * Conventions:
 *   - Strict DTCG ($value, $type, $description, alias = "{group.token}")
 *   - Three-tier source: primitives -> semantic -> component (the top-level
 *     wrapper keys are stripped at preprocess so aliases resolve cleanly)
 *   - CSS preserves var() references so theme overrides cascade
 *   - Composite typography is expanded to leaf custom properties for CSS
 *   - Composite shadows are kept whole (use Style Dictionary's built-in
 *     shadow shorthand transform, not expanded leaves)
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// excludeParentKeys strips the `primitives`/`semantic`/`component`
// wrappers so aliases like "{fontWeight.regular}" resolve correctly.
register(StyleDictionary, {
  excludeParentKeys: true,
});

// -----------------------------------------------------------------
// Slim JS exporter — a clean tree of {path: value}, none of SD's
// internal metadata. Better for Storybook stories and component code
// than the default `javascript/esm` format.
// -----------------------------------------------------------------
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

const sd = new StyleDictionary({
  source: ['tokens/tokens.json'],
  preprocessors: ['tokens-studio'],

  log: {
    verbosity: 'verbose',
    warnings: 'warn',
  },

  platforms: {
    // -------------------------------------------------------------
    // CSS — variables consumed by Storybook, docs site, web app
    // -------------------------------------------------------------
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      // Expand typography role tokens to per-property vars
      // (so .heading1 { font-size: var(--typography-role-heading1-font-size); ... })
      // but leave shadow as a single composite that gets stringified.
      expand: {
        include: ['typography'],
      },
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // var(--x) instead of resolved value
            selector: ':root',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // JavaScript — for component code and Storybook stories
    // -------------------------------------------------------------
    js: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/esm-slim',
        },
      ],
    },

    // -------------------------------------------------------------
    // JSON — flat key/value, useful for non-JS tooling and Figma sync
    // -------------------------------------------------------------
    json: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.flat.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
