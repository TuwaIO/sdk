import type { MDXComponents } from 'nextra/mdx-components';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

import { QuasarDashboardLink } from './components/QuasarDashboardLink';

const themeComponents = getThemeComponents();

export function useMDXComponents(components: MDXComponents) {
  return {
    ...themeComponents,
    QuasarDashboardLink,
    ...components,
  };
}
