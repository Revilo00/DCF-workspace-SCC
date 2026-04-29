import React from 'react';

/**
 * Typography catalog. Renders each role from your tokens at its
 * actual computed size by reading the corresponding CSS variables.
 */

const ROLES = [
  { name: 'display',    label: 'Display',    sample: 'The quick brown fox' },
  { name: 'displayLg',  label: 'Display Lg', sample: 'The quick brown fox' },
  { name: 'displayMd',  label: 'Display Md', sample: 'The quick brown fox' },
  { name: 'heading1',   label: 'Heading 1',  sample: 'The quick brown fox jumps' },
  { name: 'heading2',   label: 'Heading 2',  sample: 'The quick brown fox jumps' },
  { name: 'heading3',   label: 'Heading 3',  sample: 'The quick brown fox jumps' },
  { name: 'heading4',   label: 'Heading 4',  sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'heading5',   label: 'Heading 5',  sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'heading6',   label: 'Heading 6',  sample: 'The quick brown fox jumps over the lazy dog' },
  { name: 'bodyLg',     label: 'Body Lg',    sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { name: 'body',       label: 'Body',       sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { name: 'bodySm',     label: 'Body Sm',    sample: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { name: 'label',      label: 'Label',      sample: 'Form Label' },
  { name: 'labelSm',    label: 'Label Sm',   sample: 'Small Label' },
  { name: 'caption',    label: 'Caption',    sample: 'Caption text — used for metadata' },
];

function Row({ name, label, sample }) {
  const prefix = `--typography-role-${name}`;
  const style = {
    fontFamily: `var(${prefix}-font-family)`,
    fontSize:   `var(${prefix}-font-size)`,
    fontWeight: `var(${prefix}-font-weight)`,
    lineHeight: `var(${prefix}-line-height)`,
    letterSpacing: `var(${prefix}-letter-spacing)`,
    color: 'var(--color-neutral-900)',
    margin: 0,
  };
  return (
    <div style={{
      borderBottom: '1px solid var(--color-neutral-200)',
      padding: '20px 0',
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: 24,
      alignItems: 'baseline',
    }}>
      <div style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12,
        color: 'var(--color-neutral-600)',
      }}>{label}</div>
      <p style={style}>{sample}</p>
    </div>
  );
}

function Typography() {
  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>Typography Roles</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--color-neutral-600)', fontSize: 14 }}>
        Each role applies font family, size, weight, line-height and letter-spacing as a complete style.
      </p>
      {ROLES.map((role) => <Row key={role.name} {...role} />)}
    </div>
  );
}

export default {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: { layout: 'fullscreen' },
};

export const Roles = {};
