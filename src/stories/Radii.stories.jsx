import React from 'react';

const RADII = [
  { name: 'none', label: 'radius.none' },
  { name: 'sm',   label: 'radius.sm' },
  { name: 'md',   label: 'radius.md' },
  { name: 'lg',   label: 'radius.lg' },
  { name: 'xl',   label: 'radius.xl' },
  { name: '2xl',  label: 'radius.2xl' },
  { name: 'full', label: 'radius.full' },
];

function RadiusTile({ name, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 96,
        height: 96,
        background: 'var(--color-blue-200)',
        borderRadius: `var(--border-radius-${name})`,
        border: '1px solid var(--color-blue-300)',
      }} />
      <div style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12,
        color: 'var(--color-neutral-700)',
      }}>{label}</div>
    </div>
  );
}

function Radii() {
  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600 }}>Border Radius Scale</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 24,
      }}>
        {RADII.map((r) => <RadiusTile key={r.name} {...r} />)}
      </div>
    </div>
  );
}

export default {
  title: 'Foundations/Radii',
  component: Radii,
  parameters: { layout: 'fullscreen' },
};

export const Scale = {};
