import React from 'react';

const SHADOWS = [
  { name: 'sm-base',  label: 'shadow.smBase' },
  { name: 'md-base',  label: 'shadow.mdBase' },
  { name: 'lg-base',  label: 'shadow.lgBase' },
  { name: 'xl-base',  label: 'shadow.xlBase' },
  { name: '2xl-base', label: 'shadow.2xlBase' },
];

function ShadowCard({ name, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 160,
        height: 100,
        background: 'var(--color-neutral-0)',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: `var(--shadow-${name})`,
      }} />
      <div style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12,
        color: 'var(--color-neutral-700)',
      }}>{label}</div>
    </div>
  );
}

function Shadows() {
  return (
    <div style={{
      padding: 48,
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      background: 'var(--color-neutral-50)',
      minHeight: '100vh',
    }}>
      <h2 style={{ margin: '0 0 32px', fontSize: 20, fontWeight: 600 }}>Shadow Scale</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 40,
      }}>
        {SHADOWS.map((s) => <ShadowCard key={s.name} {...s} />)}
      </div>
    </div>
  );
}

export default {
  title: 'Foundations/Shadows',
  component: Shadows,
  parameters: { layout: 'fullscreen' },
};

export const Scale = {};
