/**
 * Style Dictionary v5 build configuration with light + dark theming.
 *
 * Two separate Style Dictionary builds run sequentially:
 *
 *   1. Light/base build
 *      Source: tokens/tokens.json
 *      Outputs: build/css/tokens.css        (scoped to :root)
 *               build/js/tokens.js          (slim ESM export)
 *               build/json/tokens.flat.json (flat key/value)
 *
 *   2. Dark theme build
 *      Source: tokens/tokens.json (for primitives) + tokens/themes/dark.json
 *              with a filter so only the dark file's tokens emit
 *      Output: build/css/tokens.dark.css    (scoped to [data-theme="dark"])
 *
 * Why two builds and not one with token sets:
 *   - SD's default behaviour when two source files define the same token
 *     path is to warn and let the second one win, which would corrupt the
 *     light :root output. Separate builds give each theme its own clean
 *     dictionary while still letting both resolve aliases against the
 *     same primitives.
 *
 * Conventions:
 *   - Strict DTCG ($value, $type, $description, alias = "{group.token}")
 *   - Three-tier source: primitives -> semantic -> component
 *   - CSS preserves var() refs so the cascade does the work at runtime
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary, {
  excludeParentKeys: true,
});

// -----------------------------------------------------------------
// Slim JS exporter — clean tree of {path: value}, no SD metadata.
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

// -----------------------------------------------------------------
// 1. Light/base build
// -----------------------------------------------------------------
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
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },

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

// -----------------------------------------------------------------
// 2. Dark theme build
//    Both files in `source` so aliases resolve. A filter narrows the
//    output to just the dark-file tokens. `outputReferences: false`
//    means alias targets get inlined as hex values rather than var()
//    refs — necessary because the primitives we reference aren't in
//    the same output file. The cascade still works: var() lookups
//    in COMPONENTS (e.g. --color-background-default) flip when
//    [data-theme="dark"] is set.
// -----------------------------------------------------------------
StyleDictionary.registerFilter({
  name: 'isDarkOverride',
  filter: (token) => token.filePath?.includes('themes/dark.json'),
});

const sdDark = new StyleDictionary({
  source: [
    'tokens/tokens.json',          // primitives, for alias resolution
    'tokens/themes/dark.json',     // the overrides we'll emit
  ],
  preprocessors: ['tokens-studio'],
  // Suppress the expected token-collision warnings; this build *is*
  // an intentional override of semantic tokens.
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
            outputReferences: false, // inline hex values, see note above
            selector: '[data-theme="dark"]',
          },
        },
      ],
    },
  },
});

// Run them.
await sdLight.cleanAllPlatforms();
await sdLight.buildAllPlatforms();

await sdDark.cleanAllPlatforms();
await sdDark.buildAllPlatforms();
