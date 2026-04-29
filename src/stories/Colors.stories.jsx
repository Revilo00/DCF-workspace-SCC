import React from 'react';

/**
 * Color catalog — two stories:
 *
 *   Primitives — raw colour ramps. These don't change between themes.
 *   Semantic   — purpose-driven tokens. These flip with [data-theme].
 *                Toggle the theme in the Storybook toolbar to see it.
 */

// ---------- Primitives ----------

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

function Swatch({ varName }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: 12 }}>
      <div style={{
        background: `var(--${varName})`,
        height: 56,
        borderRadius: 6,
        border: '1px solid var(--color-border-subtle)',
      }} />
      <div style={{ color: 'var(--color-text-secondary)' }}>--{varName}</div>
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
        color: 'var(--color-text-primary)',
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
      background: 'var(--color-background-default)',
      color: 'var(--color-text-primary)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Primitive Colors</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
        Raw colour ramps. These never change between themes — semantic tokens choose which step to use.
      </p>
      {RAMPS.map((ramp) => <Ramp key={ramp.name} {...ramp} />)}
    </div>
  );
}

// ---------- Semantic ----------

const SEMANTIC_GROUPS = [
  {
    name: 'Background',
    tokens: ['color-background-default', 'color-background-subtle', 'color-background-muted', 'color-background-inverse'],
  },
  {
    name: 'Surface',
    tokens: ['color-surface-default', 'color-surface-raised', 'color-surface-overlay', 'color-surface-sunken'],
  },
  {
    name: 'Text',
    tokens: ['color-text-primary', 'color-text-secondary', 'color-text-tertiary', 'color-text-disabled', 'color-text-inverse', 'color-text-on-accent'],
  },
  {
    name: 'Border',
    tokens: ['color-border-default', 'color-border-subtle', 'color-border-strong', 'color-border-focus'],
  },
  {
    name: 'Accent',
    tokens: ['color-accent-default', 'color-accent-hover', 'color-accent-active', 'color-accent-subtle', 'color-accent-muted'],
  },
  {
    name: 'Feedback — Success',
    tokens: ['color-feedback-success-default', 'color-feedback-success-subtle', 'color-feedback-success-muted', 'color-feedback-success-text'],
  },
  {
    name: 'Feedback — Warning',
    tokens: ['color-feedback-warning-default', 'color-feedback-warning-subtle', 'color-feedback-warning-muted', 'color-feedback-warning-text'],
  },
  {
    name: 'Feedback — Danger',
    tokens: ['color-feedback-danger-default', 'color-feedback-danger-subtle', 'color-feedback-danger-muted', 'color-feedback-danger-text'],
  },
  {
    name: 'Feedback — Info',
    tokens: ['color-feedback-info-default', 'color-feedback-info-subtle', 'color-feedback-info-muted', 'color-feedback-info-text'],
  },
];

function SemanticGroup({ name, tokens }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{
        margin: '0 0 12px',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--color-text-primary)',
      }}>{name}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
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
      background: 'var(--color-background-default)',
      color: 'var(--color-text-primary)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Semantic Colors</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
        Purpose-driven colours. Toggle the theme in the toolbar above to see them flip.
      </p>
      {SEMANTIC_GROUPS.map((g) => <SemanticGroup key={g.name} {...g} />)}
    </div>
  );
}

// ---------- Stories ----------

export default {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};

export const Primitives = { render: () => <PrimitiveColors /> };
export const Semantic   = { render: () => <SemanticColors /> };
