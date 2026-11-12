import '@/styles/app.css';

import { PreferenceExpiry, SiteLogo } from '@tuwaio/docs-ui';
import { localeOfPath } from '@tuwaio/docs-ui/locale';
import { DocsLayout } from '@tuwaio/docs-ui/nextra';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';

import { navLinks } from '@/constants';
import { localizedPages } from '@/i18n/pages';

// The size of the logo of tuwa.io: 110px on phones, 126px from 640px
const logo = <SiteLogo className="tuwadocs:transition-opacity tuwadocs:duration-300" />;

// --- Metadata Configuration ---
export const rootMetadata: Metadata = {
  metadataBase: new URL('https://sdk.docs.tuwa.io'),
  title: {
    default: 'TUWA SDK Documentation',
    template: '%s – TUWA SDK',
  },
  description:
    'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem.',
  manifest: '/manifest.json',
  icons: {
    icon: 'https://tuwa.io/brand/icon0.svg',
    shortcut: 'https://tuwa.io/brand/web-app-manifest-512x512.png',
    apple: 'https://tuwa.io/brand/web-app-manifest-512x512.png',
  },
  keywords: [
    'tuwa',
    'tuwa sdk',
    'web3 sdk',
    'react',
    'wallet connection',
    'transaction tracking',
    'multi-chain',
    'evm',
    'wagmi',
    'viem',
    'solana',
    '@solana/kit',
    'siwx',
    'typescript',
  ],
  authors: [{ name: 'TUWA', url: 'https://github.com/TuwaIO' }],

  openGraph: {
    title: 'TUWA SDK Documentation',
    description:
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem.',
    url: 'https://sdk.docs.tuwa.io/',
    siteName: 'TUWA SDK Docs',
    images: [
      {
        url: 'https://tuwa.io/brand/preview-logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TUWA SDK Documentation',
    description:
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem.',
    images: ['https://tuwa.io/brand/preview-logo.png'],
  },
};

export async function RootDocument({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      {/* The paper of each theme, as the body below: Nextra paints its sticky header and the foot of its sidebar with
          these colors */}
      <Head backgroundColor={{ light: '#f2f1ee', dark: '#101014' }}>
        <meta name="apple-mobile-web-app-title" content="TUWA SDK Docs" />
        {/* The theme and the language are kept 30 days after they are chosen (Cookie Policy) */}
        <PreferenceExpiry keys={['theme', 'tuwa-locale']} />
      </Head>
      <body
        className="antialiased bg-[var(--tuwa-docs-paper)] text-[var(--tuwa-text-primary)]"
        suppressHydrationWarning
      >
        {/* English, Ukrainian and Simplified Chinese: the language switch, the interface, the sidebar titles and the
            translated pages of src/i18n have their own URLs, /uk and /zh-CN */}
        <DocsLayout
          initialLocale={localeOfPath(`/${lang}`) ?? undefined}
          languageRoutes={Object.keys(localizedPages)}
          logo={logo}
          links={navLinks}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/TuwaIO/sdk/tree/main/apps/docs"
        >
          <NextTopLoader color="var(--tuwa-text-accent)" shadow={false} showSpinner={false} />
          {children}
        </DocsLayout>
      </body>
    </html>
  );
}
