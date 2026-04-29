import React from 'react';

/**
 * Color catalog. Reads the same CSS custom properties Storybook has
 * loaded globally (--color-neutral-50, --color-blue-500, etc.) and
 * renders them as swatches grouped by ramp.
 *
 * No imports from build/js — we read directly from CSS so this stays
 * truthful to what the browser actually sees.
 */

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
  const value = `var(--${varName})`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: 12 }}>
      <div style={{
        background: value,
        height: 56,
        borderRadius: 6,
        border: '1px solid var(--color-neutral-200)',
      }} />
      <div style={{ color: 'var(--color-neutral-700)' }}>--{varName}</div>
    </div>
  );
}

function Ramp({ name, prefix, steps }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{
        margin: '0 0 12px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--color-neutral-900)',
      }}>{name}</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {steps.map((step) => (
          <Swatch key={step} varName={`${prefix}-${step}`} />
        ))}
      </div>
    </section>
  );
}

function PrimitiveColors() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{
        margin: '0 0 24px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        fontSize: 20,
        fontWeight: 600,
      }}>Primitive Colors</h2>
      {RAMPS.map((ramp) => <Ramp key={ramp.name} {...ramp} />)}
    </div>
  );
}

export default {
  title: 'Foundations/Colors',
  component: PrimitiveColors,
  parameters: { layout: 'fullscreen' },
};

export const Primitives = {};
