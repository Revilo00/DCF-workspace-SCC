import React from 'react';

/**
 * Spacing scale catalog. Renders each space token as a horizontal bar
 * sized by its actual value, alongside the token name and computed value.
 */

const SPACES = [
  { name: 'none', label: 'space.none' },
  { name: 'xs',   label: 'space.xs' },
  { name: 'sm',   label: 'space.sm' },
  { name: 'md',   label: 'space.md' },
  { name: 'lg',   label: 'space.lg' },
  { name: 'xl',   label: 'space.xl' },
  { name: '2xl',  label: 'space.2xl' },
  { name: '3xl',  label: 'space.3xl' },
  { name: '4xl',  label: 'space.4xl' },
];

function SpaceRow({ name, label }) {
  const value = `var(--space-${name})`;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '160px 100px 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid var(--color-neutral-100)',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      fontSize: 13,
    }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--color-neutral-700)' }}>{label}</div>
      <div style={{ color: 'var(--color-neutral-500)', fontFamily: 'ui-monospace, monospace' }}>{value}</div>
      <div style={{
        width: value,
        height: 24,
        background: 'var(--color-blue-200)',
        borderRadius: 2,
      }} />
    </div>
  );
}

function Spacing() {
  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600 }}>Spacing Scale</h2>
      {SPACES.map((s) => <SpaceRow key={s.name} {...s} />)}
    </div>
  );
}

export default {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: { layout: 'fullscreen' },
};

export const Scale = {};
