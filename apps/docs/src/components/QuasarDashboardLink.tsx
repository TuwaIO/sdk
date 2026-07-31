import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import React from 'react';

export function QuasarDashboardLink({
  children = 'Quasar Dashboard',
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const url = process.env.NEXT_PUBLIC_QUASAR_DASHBOARD_URL || 'https://quasar.tuwa.io/';
  const components = getThemeComponents();
  const Anchor = components.a;

  if (Anchor) {
    return (
      <Anchor href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </Anchor>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
