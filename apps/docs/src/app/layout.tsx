import '@/styles/app.css';

import { PreferenceExpiry, SiteLogo } from '@tuwaio/docs-ui';
import { DocsLayout } from '@tuwaio/docs-ui/nextra';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';

import { navLinks } from '@/constants';

const logo = <SiteLogo width={126} height={40} className="tuwadocs:transition-opacity tuwadocs:duration-300" />;

// --- Metadata Configuration ---
export const metadata: Metadata = {
  title: {
    default: 'TUWA SDK Documentation',
    template: '%s – TUWA SDK',
  },
  description:
    'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
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
    'quasar',
    'typescript',
  ],
  authors: [{ name: 'TUWA', url: 'https://github.com/TuwaIO' }],

  openGraph: {
    title: 'TUWA SDK Documentation',
    description:
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
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
      'Documentation for the TUWA SDK: @tuwaio/sdk and its EVM and Solana add-ons, one set of packages for React apps built on the TUWA ecosystem, and @tuwaio/quasar-sdk, the client of the Quasar API.',
    images: ['https://tuwa.io/brand/preview-logo.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head backgroundColor={{ light: '#ffffff', dark: '#0a0e27' }}>
        <meta name="apple-mobile-web-app-title" content="TUWA SDK Docs" />
        {/* The theme and the language are kept 30 days after they are chosen (Cookie Policy) */}
        <PreferenceExpiry keys={['theme', 'tuwa-locale']} />
      </Head>
      <body
        className="antialiased bg-[var(--tuwa-bg-primary)] dark:bg-[#0a0e27] text-[var(--tuwa-text-primary)]"
        suppressHydrationWarning
      >
        {/* English, Ukrainian and Simplified Chinese: the language switch, the interface, the sidebar titles and the
            translated pages of src/i18n follow the reader's language without changing the URL */}
        <DocsLayout
          logo={logo}
          links={navLinks}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/TuwaIO/sdk/tree/main/apps/docs"
        >
          <NextTopLoader color="#0052ff" shadow="0 0 10px #0052ff,0 0 5px #0052ff" showSpinner={false} />
          {children}
        </DocsLayout>
      </body>
    </html>
  );
}
