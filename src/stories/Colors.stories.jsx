import React from 'react';

/**
 * Color catalog — three stories:
 *
 *   Primitives  — raw colour ramps. Don't change between themes.
 *   Semantic    — property-first tokens (bgColor, fgColor, borderColor).
 *                 Toggle theme in the Storybook toolbar to see them flip.
 *   ShadowColor — alpha values used in shadows.
 *
 * Reads CSS custom properties directly so the catalog stays truthful
 * to what the browser sees. Hardcoded token lists keep the docs honest
 * about which tokens we intend to expose.
 */

// ------------------------------------------------------------------
// Primitives
// ------------------------------------------------------------------

const RAMPS = [
  { name: 'Neutral', prefix: 'color-neutral', steps: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] },
  { name: 'Blue',    prefix: 'color-blue',    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Green',   prefix: 'color-green',   steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Amber',   prefix: 'color-amber',   steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Red',     prefix: 'color-red',     steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Purple',  prefix: 'color-purple',  steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Teal',    prefix: 'color-teal',    steps: [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Oxblood', prefix: 'color-oxblood', steps: [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
];

function Swatch({ varName, label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
    }}>
      <div style={{
        background: `var(--${varName})`,
        height: 56,
        borderRadius: 6,
        border: '1px solid var(--border-color-muted)',
      }} />
      <div style={{ color: 'var(--fg-color-muted)' }}>--{label || varName}</div>
    </div>
  );
}

function Ramp({ name, prefix, steps }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{
        margin: '0 0 12px',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--fg-color-default)',
      }}>{name}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {steps.map((step) => <Swatch key={step} varName={`${prefix}-${step}`} />)}
      </div>
    </section>
  );
}

function PrimitiveColors() {
  return (
    <div style={{
      padding: 24,
      background: 'var(--bg-color-default)',
      color: 'var(--fg-color-default)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Primitive Colors</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--fg-color-muted)' }}>
        Raw colour ramps. Identical in light and dark themes — semantic tokens choose which step to use.
      </p>
      {RAMPS.map((ramp) => <Ramp key={ramp.name} {...ramp} />)}
    </div>
  );
}

// ------------------------------------------------------------------
// Semantic — grouped by property
// ------------------------------------------------------------------

const SEMANTIC_GROUPS = [
  {
    heading: 'bgColor — surfaces & defaults',
    tokens: [
      'bg-color-default',
      'bg-color-default-hover',
      'bg-color-muted',
      'bg-color-muted-hover',
      'bg-color-muted-selected',
      'bg-color-subtle',
      'bg-color-inset',
      'bg-color-inverse',
      'bg-color-disabled',
    ],
  },
  {
    heading: 'bgColor — primary brand (teal)',
    tokens: [
      'bg-color-primary',
      'bg-color-primary-muted',
      'bg-color-primary-emphasis',
      'bg-color-primary-emphasis-hover',
      'bg-color-primary-emphasis-active',
    ],
  },
  {
    heading: 'bgColor — secondary brand (oxblood)',
    tokens: [
      'bg-color-secondary',
      'bg-color-secondary-muted',
      'bg-color-secondary-emphasis',
      'bg-color-secondary-emphasis-hover',
      'bg-color-secondary-emphasis-active',
    ],
  },
  {
    heading: 'bgColor — status',
    tokens: [
      'bg-color-success-muted',
      'bg-color-success-emphasis',
      'bg-color-success-emphasis-hover',
      'bg-color-success-emphasis-active',
      'bg-color-attention-muted',
      'bg-color-attention-emphasis',
      'bg-color-attention-emphasis-hover',
      'bg-color-attention-emphasis-active',
      'bg-color-danger-muted',
      'bg-color-danger-emphasis',
      'bg-color-danger-emphasis-hover',
      'bg-color-danger-emphasis-active',
      'bg-color-info-emphasis',
      'bg-color-info-emphasis-hover',
      'bg-color-info-emphasis-active',
    ],
  },
  {
    heading: 'fgColor — text & defaults',
    tokens: [
      'fg-color-default',
      'fg-color-muted',
      'fg-color-subtle',
      'fg-color-disabled',
      'fg-color-inverse',
    ],
  },
  {
    heading: 'fgColor — on-fill (contrast text)',
    tokens: [
      'fg-color-on-emphasis',
      'fg-color-on-muted',
    ],
  },
  {
    heading: 'fgColor — brand & status',
    tokens: [
      'fg-color-primary',
      'fg-color-secondary',
      'fg-color-success',
      'fg-color-attention',
      'fg-color-danger',
      'fg-color-info',
      'fg-color-link',
    ],
  },
  {
    heading: 'borderColor — defaults & state',
    tokens: [
      'border-color-default',
      'border-color-muted',
      'border-color-emphasis',
      'border-color-disabled',
      'border-color-focus',
      'border-color-hover',
      'border-color-selected',
      'border-color-divider',
    ],
  },
  {
    heading: 'borderColor — brand & status',
    tokens: [
      'border-color-primary',
      'border-color-primary-emphasis',
      'border-color-secondary',
      'border-color-secondary-emphasis',
      'border-color-success',
      'border-color-attention',
      'border-color-danger',
      'border-color-info',
    ],
  },
];

function SemanticGroup({ heading, tokens }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{
        margin: '0 0 12px',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--fg-color-default)',
      }}>{heading}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 12,
      }}>
        {tokens.map((t) => <Swatch key={t} varName={t} />)}
      </div>
    </section>
  );
}

function SemanticColors() {
  return (
    <div style={{
      padding: 24,
      background: 'var(--bg-color-default)',
      color: 'var(--fg-color-default)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Semantic Colors</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--fg-color-muted)' }}>
        Property-first naming (Primer-aligned). Toggle the theme in the toolbar above to see them flip.
      </p>
      {SEMANTIC_GROUPS.map((g) => <SemanticGroup key={g.heading} {...g} />)}
    </div>
  );
}

// ------------------------------------------------------------------
// Shadow colours — these have alpha, so we render them on a varied bg
// ------------------------------------------------------------------

const SHADOW_COLOR_TOKENS = [
  'shadow-color-default',
  'shadow-color-muted',
  'shadow-color-emphasis',
  'shadow-color-overlay',
  'shadow-color-inset',
  'shadow-color-primary-muted',
  'shadow-color-secondary-muted',
  'shadow-color-danger-muted',
];

function ShadowColors() {
  return (
    <div style={{
      padding: 24,
      background: 'var(--bg-color-default)',
      color: 'var(--fg-color-default)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Shadow Colors</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--fg-color-muted)' }}>
        Alpha-tinted colours used inside box-shadow rules. The chequer pattern reveals each token's transparency.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 16,
      }}>
        {SHADOW_COLOR_TOKENS.map((token) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{
              height: 64,
              borderRadius: 6,
              background: `
                linear-gradient(var(--${token}), var(--${token})),
                conic-gradient(#cccccc 25%, #ffffff 25% 50%, #cccccc 50% 75%, #ffffff 75%) 0 0 / 16px 16px
              `,
              border: '1px solid var(--border-color-muted)',
            }} />
            <div style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              color: 'var(--fg-color-muted)',
            }}>--{token}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Stories config
// ------------------------------------------------------------------

export default {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};

export const Primitives  = { render: () => <PrimitiveColors /> };
export const Semantic    = { render: () => <SemanticColors /> };
export const ShadowColor = { render: () => <ShadowColors /> };
